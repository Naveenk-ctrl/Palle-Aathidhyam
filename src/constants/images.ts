// All image paths centralized for easy replacement
// Brand assets are local files in /public; others are from Unsplash

export const images = {
  // Brand assets (local)
  logo: '/assets/brand-logo.jpeg',
  ambience: '/assets/ambience1.jpeg',
  menuCard: '/assets/tiffins-menu.jpg',

  // Hero background
  heroBg: '/assets/homepage-full.png',

  // Food images — South Indian cuisine
  meals: ['/assets/tiffins-menu.jpg', '/assets/optimized-homepage.png', '/assets/homepage-screenshot.png'],

  // Specific dishes
  biryani: '/assets/gallery-section.png',
  dosa: '/assets/reservation-section.png',
  idli: '/assets/ambience1.jpeg',
  curry: '/assets/homepage-mobile.png',
  dessert: '/assets/optimized-homepage.png',
  beverages: '/assets/tiffins-menu.jpg',

  // Restaurant interiors
  interiors: ['/assets/ambience1.jpeg', '/assets/reservation-section.png', '/assets/homepage-full.png'],

  // Gallery images (organised by type)
  gallery: {
    food: ['/assets/tiffins-menu.jpg', '/assets/optimized-homepage.png', '/assets/homepage-screenshot.png', '/assets/homepage-mobile.png', '/assets/gallery-section.png', '/assets/reservation-section.png'],
    restaurant: ['/assets/ambience1.jpeg', '/assets/homepage-full.png', '/assets/optimized-homepage.png'],
    kitchen: ['/assets/reservation-section.png', '/assets/homepage-mobile.png'],
  },

  // Instagram-style square posts
  instagram: ['/assets/tiffins-menu.jpg', '/assets/optimized-homepage.png', '/assets/homepage-screenshot.png', '/assets/homepage-mobile.png', '/assets/gallery-section.png', '/assets/reservation-section.png'],
} as const;

export type ImageKey = keyof typeof images;