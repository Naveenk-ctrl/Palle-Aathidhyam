import { Router } from 'express';
import { listSubmissions, updateSubmission } from '../controllers/submissionController.js';
import { config } from '../config.js';
import { adminAuth } from '../middleware/adminAuth.js';
import crypto from 'node:crypto';

const router = Router();

function adminToken() {
	return Buffer.from(`admin:${config.adminSecret}`).toString('base64url');
}

router.post('/login', (req, res) => {
	if (!config.adminSecret) {
		return res.status(500).json({ ok: false, message: 'ADMIN_SECRET is not configured.' });
	}

	const { secret } = req.body || {};

	if (secret !== config.adminSecret) {
		return res.status(401).json({ ok: false, message: 'Invalid admin secret.' });
	}

	const token = adminToken();
	res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400`);
	return res.json({ ok: true });
});

router.post('/logout', (_req, res) => {
	res.setHeader('Set-Cookie', 'admin_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0');
	return res.json({ ok: true });
});

router.get('/session', adminAuth, (_req, res) => {
	return res.json({ ok: true });
});

router.get('/submissions', adminAuth, listSubmissions);
router.patch('/submissions/:id', adminAuth, updateSubmission);

export default router;
