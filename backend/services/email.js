import fs from 'fs/promises';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

import { findSubmission } from '../db.js';
import { clientFolder } from '../utils/files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, '..', 'uploads');

// Notification recipients. Edit EMAIL_TO in .env to add or remove recipients.
const NOTIFY_EMAILS = (process.env.EMAIL_TO || '')
  .split(',')
  .map((email) => email.trim())
  .filter(Boolean);

const pendingTimers = new Map();
const sentNotifications = new Set();

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

function listItems(items) {
  if (!items?.length) {
    return '<li>None</li>';
  }

  return items.map((item) => `<li>${escapeHtml(typeof item === 'string' ? item : item.name)}</li>`).join('');
}

function getSubmissionChannel(submission) {
  return submission.submissionChannel === 'whatsapp' ? 'whatsapp' : 'email';
}

function formatChannelLabel(channel) {
  return channel === 'whatsapp' ? 'WhatsApp request' : 'Website email request';
}

function formatPriorityLabel(channel) {
  return channel === 'whatsapp' ? 'Normal - client also opened WhatsApp' : 'Urgent - direct email request';
}

function formatSubmissionHtml(submission) {
  const channel = getSubmissionChannel(submission);

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; line-height: 1.5;">
      <h2 style="margin: 0 0 16px;">New Project Enquiry</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
        <tr><td><strong>Request UUID</strong></td><td>${escapeHtml(submission.id)}</td></tr>
        <tr><td><strong>Request channel</strong></td><td>${escapeHtml(formatChannelLabel(channel))}</td></tr>
        <tr><td><strong>Priority</strong></td><td>${escapeHtml(formatPriorityLabel(channel))}</td></tr>
        <tr><td><strong>Received at</strong></td><td>${escapeHtml(submission.timestamp || 'Not provided')}</td></tr>
        <tr><td><strong>Client name</strong></td><td>${escapeHtml(submission.fullName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(submission.email)}</td></tr>
        <tr><td><strong>Mobile</strong></td><td>${escapeHtml(submission.mobile)}</td></tr>
        <tr><td><strong>Space type</strong></td><td>${escapeHtml(submission.spaceType || 'Not provided')}</td></tr>
        <tr><td><strong>Wiring preference</strong></td><td>${escapeHtml(submission.wiringPreference || 'Not provided')}</td></tr>
        <tr><td><strong>Home systems</strong></td><td>${escapeHtml((submission.homeSystems || []).join(', ') || 'None')}</td></tr>
      </table>

      <h3 style="margin: 20px 0 8px;">Systems selected</h3>
      <ul>${listItems(submission.systems || [])}</ul>

      <h3 style="margin: 20px 0 8px;">Notes</h3>
      <p>${escapeHtml(submission.notes || 'None')}</p>

      <h3 style="margin: 20px 0 8px;">Uploaded files</h3>
      <ul>${listItems(submission.files || [])}</ul>
    </div>
  `;
}

async function buildAttachments(submission) {
  if (!submission.files?.length) {
    return [];
  }

  const folder = clientFolder(submission);
  return submission.files
    .filter((file) => typeof file === 'string')
    .map((filename) => ({
      filename,
      path: path.join(uploadsRoot, folder, filename),
    }));
}

function shouldSkipEmail() {
  const required = [
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
    NOTIFY_EMAILS.length ? NOTIFY_EMAILS.join(',') : '',
  ];

  const hasPlaceholder = required.some((value) => !value || value.includes('your'));
  if (hasPlaceholder) {
    console.warn('Email notification skipped: configure SMTP values in .env.');
    return true;
  }

  return false;
}

export async function sendNotification(submission) {
  if (sentNotifications.has(submission.id) || shouldSkipEmail()) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const attachments = await buildAttachments(submission);
  const channel = getSubmissionChannel(submission);
  const subjectPrefix = channel === 'whatsapp' ? '[WhatsApp - Normal]' : '[URGENT Email Request]';

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: NOTIFY_EMAILS,
    subject: `${subjectPrefix} New Project Enquiry - ${submission.fullName} - ${submission.id}`,
    html: formatSubmissionHtml(submission),
    attachments,
  });

  sentNotifications.add(submission.id);
}

export function scheduleSubmissionNotification(submissionId) {
  clearScheduledNotification(submissionId);

  const timer = setTimeout(async () => {
    pendingTimers.delete(submissionId);

    try {
      const submission = await findSubmission(submissionId);
      if (submission) {
        await sendNotification(submission);
      }
    } catch (error) {
      console.error('Delayed email notification error:', error);
    }
  }, 2000);

  pendingTimers.set(submissionId, timer);
}

export function clearScheduledNotification(submissionId) {
  const timer = pendingTimers.get(submissionId);
  if (timer) {
    clearTimeout(timer);
    pendingTimers.delete(submissionId);
  }
}
