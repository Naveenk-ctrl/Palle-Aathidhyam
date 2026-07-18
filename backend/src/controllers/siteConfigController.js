import { SiteConfig } from '../models/SiteConfig.js';

const SITE_CONFIG_KEY = 'site-config';

export async function getSiteConfig(req, res) {
  const doc = await SiteConfig.findOne({ key: SITE_CONFIG_KEY });
  res.json({ ok: true, data: doc?.data || null });
}

export async function saveSiteConfig(req, res) {
  const configData = req.body && req.body.config ? req.body.config : req.body;
  const doc = await SiteConfig.findOneAndUpdate(
    { key: SITE_CONFIG_KEY },
    { key: SITE_CONFIG_KEY, data: configData },
    { new: true, upsert: true }
  );

  res.json({ ok: true, data: doc.data });
}
