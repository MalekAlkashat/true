import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

import submitRouter from './routes/submit.js';
import uploadRouter from './routes/upload.js';
import adminRouter from './routes/admin.js';
import { startCleanupJob } from './jobs/cleanup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 'loopback');
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';
const host = process.env.HOST || (isProduction ? '165.227.205.236' : '165.227.205.236');
const developmentOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173'];
const configuredOrigins = (process.env.FRONTEND_URL || '')
.split(',')
.map((origin) => origin.trim())
.filter(Boolean);
const allowedOrigins = [
...configuredOrigins, 
...(isProduction ? [] : developmentOrigins),
].filter(Boolean);
const allowAllOrigins = allowedOrigins.includes('#');
const sessionSecret = process.env.SESSION_SECRET;

function isWeakSecret(value, weakValues) {
  const normalized = String(value || '').trim().toLowerCase();
  return !normalized || weakValues.includes(normalized) || normalized.includes('your');
}

function validateSecurityConfig() {
  const issues = [];

  if (isWeakSecret(process.env.ADMIN_USER, ['admin', 'administrator'])) {
    issues.push('ADMIN_USER must not be missing or a default value');
  }

  if (isWeakSecret(process.env.ADMIN_PASS, ['password', 'admin', 'changeme', 'yourpassword'])) {
    issues.push('ADMIN_PASS must be a strong password or bcrypt hash');
  }

  if (isWeakSecret(sessionSecret, ['changeme', 'keyboard cat', 'secret', 'your-secret'])) {
    issues.push('SESSION_SECRET must be a strong random value');
  }

  if (!issues.length) {
    return;
  }

  const message = `Security configuration error:\n- ${issues.join('\n- ')}`;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(message);
  }

  console.warn(message);
}

validateSecurityConfig();

await fs.mkdir(path.join(__dirname, 'uploads'), { recursive: true });
await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });

try {
  await fs.access(path.join(__dirname, 'data', 'submissions.json'));
} catch {
  await fs.writeFile(path.join(__dirname, 'data', 'submissions.json'), '[]\n');
}

app.set('views', path.join(__dirname, 'views'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin(origin, callback) {
      if (allowAllOrigins || !origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  }),
);
app.use(
  session({
    name: 'trueq8.sid',
    secret: sessionSecret || 'dev-only-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use('/api', submitRouter);
app.use('/api', uploadRouter);
app.use('/admin', adminRouter);
startCleanupJob();

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
