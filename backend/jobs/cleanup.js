import cron from 'node-cron';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, '..', 'uploads');
const eightMonthsMs = 8 * 30 * 24 * 60 * 60 * 1000;

async function newestFileMtime(folderPath) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile());

  if (!files.length) {
    return null;
  }

  const stats = await Promise.all(
    files.map(async (file) => fs.stat(path.join(folderPath, file.name))),
  );

  return stats.reduce((newest, stat) => Math.max(newest, stat.mtimeMs), 0);
}

export async function cleanupOldUploads() {
  let removed = 0;
  const cutoff = Date.now() - eightMonthsMs;

  try {
    const entries = await fs.readdir(uploadsRoot, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const folderPath = path.join(uploadsRoot, entry.name);
      const newest = await newestFileMtime(folderPath);

      if (newest !== null && newest < cutoff) {
        await fs.rm(folderPath, { recursive: true, force: true });
        removed += 1;
        console.log(`Cleanup: deleted uploads/${entry.name} (older than 8 months)`);
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }

  console.log(`Cleanup complete. ${removed} folders removed.`);
}

export function startCleanupJob() {
  cron.schedule('0 2 * * 0', cleanupOldUploads);
}
