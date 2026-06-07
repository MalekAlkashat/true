import bcrypt from 'bcrypt';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { findSubmission, readSubmissions, updateSubmission } from '../db.js';
import { requireAdmin, requireAdminFile } from '../middleware/auth.js';
import { clientFolder } from '../utils/files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const statuses = ['New', 'Contacted', 'Closed'];

async function renderView(name, replacements = {}) {
  const view = await fs.readFile(path.resolve('views', name), 'utf8');
  return Object.entries(replacements).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    view,
  );
}

async function validPassword(candidate, configured) {
  if (!configured) {
    return false;
  }

  if (/^\$2[aby]\$/.test(configured)) {
    return bcrypt.compare(candidate, configured);
  }

  return candidate === configured;
}

router.get('/login', async (req, res) => {
  const html = await renderView('login.html', {
    ERROR: req.query.error ? '<p class="error">Invalid username or password.</p>' : '',
  });
  res.send(html);
});

router.post('/login', async (req, res) => {
  const username = String(req.body.username || '');
  const password = String(req.body.password || '');
  const usernameMatches = username === process.env.ADMIN_USER;
  const passwordMatches = await validPassword(password, process.env.ADMIN_PASS);

  if (!usernameMatches || !passwordMatches) {
    return res.redirect('/admin/login?error=1');
  }

  req.session.isAdmin = true;
  return res.redirect('/admin');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

router.get('/', requireAdmin, async (_req, res) => {
  const submissions = await readSubmissions();
  const newestFirst = [...submissions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  const json = JSON.stringify(newestFirst).replaceAll('<', '\\u003c');
  const html = await renderView('dashboard.html', { SUBMISSIONS_JSON: json });
  res.send(html);
});

router.post('/status/:id', requireAdmin, async (req, res) => {
  const updated = await updateSubmission(req.params.id, (submission) => {
    const currentIndex = statuses.indexOf(submission.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    return { ...submission, status: nextStatus };
  });

  if (!updated) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  return res.json({ success: true, status: updated.status });
});

router.get('/files/:submissionId/:filename', requireAdminFile, async (req, res) => {
  const submission = await findSubmission(req.params.submissionId);
  const requested = path.basename(req.params.filename);

  if (!submission || !submission.files?.includes(requested)) {
    return res.status(404).send('File not found');
  }

  const filePath = path.join(__dirname, '..', 'uploads', clientFolder(submission), requested);
  return res.download(filePath, requested);
});

export default router;
