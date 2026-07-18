import mongoose from 'mongoose';
import { config } from './config.js';
import { SiteConfig } from './models/SiteConfig.js';
import { defaultSiteConfig } from './seedData.js';

const SITE_CONFIG_KEY = 'site-config';

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  await mongoose.connect(config.mongoUri);

  try {
    const count = await SiteConfig.countDocuments({ key: SITE_CONFIG_KEY });
    if (count === 0) {
      console.log('No site config found. Seeding default data...');
      await SiteConfig.create({
        key: SITE_CONFIG_KEY,
        data: defaultSiteConfig,
      });
      console.log('Seeding complete!');
    } else {
      const doc = await SiteConfig.findOne({ key: SITE_CONFIG_KEY });
      if (doc && doc.data && doc.data.footerLinks && doc.data.footerLinks.contact) {
        const currentUrl = doc.data.footerLinks.contact.mapEmbedUrl;
        if (!currentUrl || currentUrl.includes('17.49')) {
          console.log('Updating mapEmbedUrl in database to the correct Kukatpally URL...');
          doc.data.footerLinks.contact.mapEmbedUrl = defaultSiteConfig.footerLinks.contact.mapEmbedUrl;
          doc.markModified('data');
          await doc.save();
          console.log('Database updated successfully!');
        }
      }
    }
  } catch (error) {
    console.error('Failed to seed or update default site config:', error);
  }

  return mongoose.connection;
}
