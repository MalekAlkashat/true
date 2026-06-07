import express from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'fs/promises';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import { findSubmission, updateSubmission } from '../db.js';
import { clearScheduledNotification, sendNotification } from '../services/email.js';
import { clientFolder } from '../utils/files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler(_req, res) {
    return res.status(429).json({ success: false, message: 'Too many upload attempts' });
  },
});
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
    files: 5,
  },
  fileFilter(_req, file, callback) {
    if (!isAllowedFile(file)) {
      return callback(new Error('Invalid file type'));
    }

    return callback(null, true);
  },
});

const allowedExtensions = new Set(['.pdf', '.dwg', '.dwf', '.jpg', '.jpeg', '.png', '.zip']);
const allowedMimeTypes = {
  '.pdf': ['application/pdf'],
  '.jpg': ['image/jpeg'],
  '.jpeg': ['image/jpeg'],
  '.png': ['image/png'],
  '.zip': ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip', 'application/octet-stream'],
};

function isAllowedFile(file) {
  const ext = path.extname(file.originalname || '').toLowerCase();

  if (!allowedExtensions.has(ext)) {
    return false;
  }

  if (!allowedMimeTypes[ext]) {
    return true;
  }

  return Boolean(allowedMimeTypes[ext]?.includes(file.mimetype));
}

function startsWithBytes(buffer, bytes) {
  return bytes.every((byte, index) => buffer[index] === byte);
}

function startsWithAscii(buffer, text) {
  return buffer.subarray(0, text.length).toString('ascii') === text;
}

function hasValidFileContent(file) {
  const ext = path.extname(file.originalname || '').toLowerCase();
  const buffer = file.buffer;

  if (!buffer?.length) {
    return false;
  }

  switch (ext) {
    case '.pdf':
      return startsWithAscii(buffer, '%PDF-');
    case '.dwg':
      return startsWithAscii(buffer, 'AC10');
    case '.dwf':
      return startsWithAscii(buffer, '(DWF') || startsWithAscii(buffer, 'DWF');
    case '.jpg':
    case '.jpeg':
      return startsWithBytes(buffer, [0xff, 0xd8, 0xff]);
    case '.png':
      return startsWithBytes(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case '.zip':
      return (
        startsWithBytes(buffer, [0x50, 0x4b, 0x03, 0x04]) ||
        startsWithBytes(buffer, [0x50, 0x4b, 0x05, 0x06]) ||
        startsWithBytes(buffer, [0x50, 0x4b, 0x07, 0x08])
      );
    default:
      return false;
  }
}

function savedFilename(originalName) {
  const ext = path.extname(originalName).toLowerCase();
  const base = path
    .basename(originalName, ext)
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .slice(0, 80) || 'file';

  return `${Date.now()}_${uuidv4()}_${base}${ext}`;
}

router.post('/upload', uploadLimiter, (req, res) => {
  console.log('POST /api/upload received');

  upload.array('files', 5)(req, res, async (error) => {
    try {
      if (error) {
        const message = error.message === 'Invalid file type' ? 'Invalid file type' : error.message;
        return res.status(400).json({ error: message });
      }

      const submissionId = String(req.body?.submissionId || '');
      const submission = await findSubmission(submissionId);

      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      if (!req.files?.length) {
        return res.status(400).json({ error: 'files are required' });
      }

      const invalidFile = req.files.find((file) => !hasValidFileContent(file));
      if (invalidFile) {
        return res.status(400).json({ error: `Invalid file content: ${invalidFile.originalname}` });
      }

      const folder = clientFolder(submission);
      const uploadDir = path.join(__dirname, '..', 'uploads', folder);
      await fs.mkdir(uploadDir, { recursive: true });

      const savedFiles = [];
      for (const file of req.files) {
        const name = savedFilename(file.originalname);
        await fs.writeFile(path.join(uploadDir, name), file.buffer);
        savedFiles.push(name);
      }

      const updatedSubmission = await updateSubmission(submissionId, (current) => ({
        ...current,
        files: savedFiles,
      }));
      clearScheduledNotification(submissionId);
      await sendNotification(updatedSubmission);

      return res.json({ success: true, files: savedFiles });
    } catch (writeError) {
      console.error('Upload error:', writeError);
      return res.status(500).json({ error: 'Unable to save files' });
    }
  });
});

export default router;
