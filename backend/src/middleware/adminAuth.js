import { config } from '../config.js';

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader.split(';').map((part) => {
      const [key, ...valueParts] = part.trim().split('=');
      return [key, decodeURIComponent(valueParts.join('='))];
    }).filter(([key]) => key)
  );
}

export function adminAuth(req, res, next) {
  if (!config.adminSecret) {
    return res.status(500).json({ ok: false, message: 'ADMIN_SECRET is not configured.' });
  }

  const expectedToken = Buffer.from(`admin:${config.adminSecret}`).toString('base64url');
  const cookies = parseCookies(req.headers.cookie || '');
  const cookieToken = cookies.admin_token;
  const secret = req.header('x-admin-secret');

  if (secret !== config.adminSecret && cookieToken !== expectedToken) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }

  next();
}
