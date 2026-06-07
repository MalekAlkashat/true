# TRUE Backend

Node.js/Express backend for receiving React form submissions, storing uploaded files on disk, sending email notifications, and serving a protected admin dashboard.

## Setup

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env` and update the values for your environment.

## Environment

```env
PORT=3001
HOST=127.0.0.1
ADMIN_USER=replace-with-non-default-admin-user
ADMIN_PASS=replace-with-strong-admin-password
SESSION_SECRET=replace-with-long-random-session-secret
EMAIL_HOST=webmail.true.com.kw
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=webmail@true.com.kw
EMAIL_PASS=replace-with-real-email-password
EMAIL_FROM=webmail@true.com.kw
EMAIL_TO=info@true.com.kw,malek@true.com.kw
FRONTEND_URL=https://true.com.kw
```

`ADMIN_PASS` may be a plain text password or a bcrypt hash. Use a strong `SESSION_SECRET` in production.

Do not commit `.env`, uploaded files, logs, or `data/submissions.json`. Keep production secrets in the VPS environment or in a server-only `.env` file outside any public web root.

In production, `FRONTEND_URL` is the only browser origin allowed by CORS for API requests. In local development, common localhost dev origins are also allowed.

Email notifications are sent through the SMTP values above. `EMAIL_TO` is a comma-separated recipient list. `EMAIL_SECURE=true` is typical for port `465`; `EMAIL_SECURE=false` is typical for port `587` with STARTTLS.

SMTP TLS is separate from website HTTPS. On the VPS, serve the frontend/API over HTTPS with a reverse proxy such as Nginx or Caddy using Let's Encrypt, then proxy API traffic to this Node server on localhost.

## VPS Deployment Notes

- Run the backend with `NODE_ENV=production`, `HOST=127.0.0.1`, and `PORT=3001` behind Nginx or Caddy.
- Do not expose port `3001` publicly unless you intentionally set `HOST=0.0.0.0` and firewall it yourself.
- Serve the built frontend from the web server, not from the backend `uploads/` or `data/` folders.
- Keep `.env`, `data/submissions.json`, `uploads/`, logs, and PID files outside any public web root.
- If using a separate API domain, set frontend `VITE_API_URL=https://api.true.com.kw` before building and backend `FRONTEND_URL=https://true.com.kw`.
- If proxying `/api` and `/admin` under the main domain, set frontend `VITE_API_URL` to that same origin or use a relative API base.

If the placeholder values are left in place, submissions are still stored and the email send is skipped with a console warning.

Notifications are sent after upload completion when files are uploaded. If no upload arrives within 2 seconds after `/api/submit`, the notification is sent without attachments. Uploaded files are attached to the email when available.

## Run

```bash
npm start
```

The server logs:

```text
Server running on 127.0.0.1:3001
```

The server automatically creates:

- `data/submissions.json`
- `uploads/`

## API

### `POST /api/submit`

Accepts JSON:

```json
{
  "fullName": "string",
  "email": "string",
  "countryCode": "string",
  "mobile": "string",
  "spaceType": "string",
  "systems": ["string"],
  "wiringPreference": "string",
  "homeSystems": ["string"],
  "notes": "string",
  "files": [
    { "name": "string", "size": 123, "type": "string" }
  ]
}
```

Returns:

```json
{ "success": true, "id": "uuid" }
```

This route is rate limited to 5 requests per IP per hour.

### `POST /api/upload`

Accepts `multipart/form-data`.

Required fields:

- `submissionId`: the ID returned by `/api/submit`
- `files`: up to 5 files

Accepted file types:

- `.pdf`
- `.dwg`
- `.dwf`
- `.jpg`
- `.jpeg`
- `.png`
- `.zip`

Each file is limited to 25MB. Files are checked by extension/MIME metadata and by file signature before being saved. Invalid file types return HTTP 400 with:

```json
{ "error": "Invalid file type" }
```

Files with an allowed extension but invalid content return HTTP 400 with:

```json
{ "error": "Invalid file content: filename.ext" }
```

This route is rate limited to 20 requests per IP per hour.

Successful upload response:

```json
{ "success": true, "files": ["filename1", "filename2"] }
```

## React Integration

Replace the `sendViaEmail()` TODO flow with:

1. `POST /api/submit` using the current JSON payload.
2. Read `{ success: true, id }` from the response.
3. If files exist, `POST /api/upload` with `FormData` containing:
   - `submissionId`
   - each file appended under the `files` field name
4. On success, show the confirmation screen.
5. On any failure, show:

```text
Something went wrong. Please try again or reach us directly at info@true.com.kw
```

## Admin Panel

Open:

```text
http://localhost:3001/admin/login
```

Login uses `ADMIN_USER` and `ADMIN_PASS` from `.env`. The session expires after 24 hours.

Admin routes:

- `GET /admin/login`
- `POST /admin/login`
- `GET /admin/logout`
- `GET /admin`
- `POST /admin/status/:id`
- `GET /admin/files/:submissionId/:filename`

The dashboard shows newest submissions first, supports search by name, phone, or service, expands rows for details, and cycles status from `New` to `Contacted` to `Closed`.

Uploaded files are not served directly from `uploads/`; they are only available through protected `/admin/files/...` routes.

## Cleanup

A weekly cleanup job runs every Sunday at 2:00 AM server time. It scans folders inside `uploads/` and deletes a client folder only when all files in that folder are older than 8 months. The `uploads/` root folder is never deleted.

Cleanup logs:

```text
Cleanup: deleted uploads/FolderName (older than 8 months)
Cleanup complete. X folders removed.
```
