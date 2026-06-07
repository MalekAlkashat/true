import express from 'express';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';

import { addSubmission } from '../db.js';
import { scheduleSubmissionNotification } from '../services/email.js';

const router = express.Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler(_req, res) {
    return res.status(429).json({ success: false, message: 'Too many requests' });
  },
});

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeSubmissionChannel(value) {
  return value === 'whatsapp' ? 'whatsapp' : 'email';
}

router.post('/submit', submitLimiter, async (req, res) => {
  try {
    console.log('POST /api/submit received:', req.body);

    const payload = req.body || {};
    const submission = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      status: 'New',
      submissionChannel: normalizeSubmissionChannel(payload.submissionChannel),
      fullName: String(payload.fullName || '').trim(),
      email: String(payload.email || '').trim(),
      mobile: String(payload.mobile || '').trim(),
      spaceType: String(payload.spaceType || '').trim(),
      systems: asArray(payload.systems).map(String),
      wiringPreference: String(payload.wiringPreference || '').trim(),
      homeSystems: asArray(payload.homeSystems).map(String),
      notes: String(payload.notes || '').trim(),
      files: asArray(payload.files).map((file) => ({
        name: String(file?.name || ''),
        size: Number(file?.size || 0),
        type: String(file?.type || ''),
      })),
    };

    if (!submission.fullName || !submission.email || !submission.mobile) {
      return res.status(400).json({ error: 'fullName, email, and mobile are required' });
    }

    await addSubmission(submission);
    scheduleSubmissionNotification(submission.id);

    return res.json({ success: true, id: submission.id });
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
