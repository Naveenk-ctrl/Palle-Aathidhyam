import { Router } from 'express';
import { getSiteConfig, saveSiteConfig } from '../controllers/siteConfigController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

router.get('/site-config', getSiteConfig);
router.put('/site-config', adminAuth, saveSiteConfig);

export default router;
