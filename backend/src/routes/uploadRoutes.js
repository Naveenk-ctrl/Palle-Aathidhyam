import { Router } from 'express';
import cloudinary from '../config/cloudinary.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

router.post('/upload', adminAuth, async (req, res, next) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ ok: false, message: 'No image data provided.' });
    }

    console.log('Uploading image to Cloudinary...');
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'palle-aathidhyam',
      resource_type: 'auto',
    });

    console.log('Cloudinary upload successful:', uploadResponse.secure_url);
    return res.json({
      ok: true,
      url: uploadResponse.secure_url,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
