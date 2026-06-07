export function safeSegment(value) {
  return String(value || 'unknown')
    .trim()
    .replace(/[^a-zA-Z0-9+._-]+/g, '')
    .slice(0, 80) || 'unknown';
}

export function clientFolder(submission) {
  return `${safeSegment(submission.fullName)}_${safeSegment(submission.mobile)}`;
}
