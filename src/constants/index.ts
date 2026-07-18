// Palle Aathidhyam — Centralised constants barrel file
// Import anything from '@/constants' instead of individual files.

export { images, type ImageKey } from './images';
export { colors, gradients, type ColorName, type GradientName } from './colors';
export {
  menuItems,
  menuCategories,
  getItemsByCategory,
  getPopularItems,
  getChefSpecials,
  type MenuItem,
  type MenuCategory,
} from './menu-data';
export { reviews, getAverageRating, type Review } from './reviews';
export {
  navItems,
  footerLinks,
  restaurantInfo,
  ctaText,
  type NavItem,
} from './navigation';