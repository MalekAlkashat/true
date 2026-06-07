import path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'submissions.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, []);

export async function readSubmissions() {
  await db.read();
  db.data ||= [];
  return db.data;
}

export async function writeSubmissions(submissions) {
  db.data = submissions;
  await db.write();
}

export async function addSubmission(submission) {
  const submissions = await readSubmissions();
  submissions.push(submission);
  await writeSubmissions(submissions);
  return submission;
}

export async function findSubmission(id) {
  const submissions = await readSubmissions();
  return submissions.find((submission) => submission.id === id);
}

export async function updateSubmission(id, updater) {
  const submissions = await readSubmissions();
  const index = submissions.findIndex((submission) => submission.id === id);

  if (index === -1) {
    return null;
  }

  submissions[index] = updater(submissions[index]);
  await writeSubmissions(submissions);
  return submissions[index];
}
