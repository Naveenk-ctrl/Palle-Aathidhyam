import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    isVeg: Boolean,
    isSpicy: Boolean,
    isPopular: Boolean,
    isChefSpecial: Boolean,
  },
  { _id: false }
);

const siteConfigSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true },
    data: {
      images: mongoose.Schema.Types.Mixed,
      footerLinks: mongoose.Schema.Types.Mixed,
      restaurantInfo: mongoose.Schema.Types.Mixed,
      ctaText: mongoose.Schema.Types.Mixed,
      menuItems: [menuItemSchema],
      dailySpecialIds: [String],
    },
  },
  { timestamps: true }
);

export const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);
