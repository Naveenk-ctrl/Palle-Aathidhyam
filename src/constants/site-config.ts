import { images } from './images';
import { footerLinks, restaurantInfo, ctaText } from './navigation';
import { menuItems, type MenuItem } from './menu-data';

type MapLiteralToPrimitive<T> = T extends string
  ? string
  : T extends readonly string[]
  ? readonly string[]
  : T extends object
  ? { [K in keyof T]: MapLiteralToPrimitive<T[K]> }
  : T;

export type SiteConfig = {
  images: MapLiteralToPrimitive<typeof images>;
  footerLinks: MapLiteralToPrimitive<typeof footerLinks>;
  restaurantInfo: MapLiteralToPrimitive<typeof restaurantInfo>;
  ctaText: MapLiteralToPrimitive<typeof ctaText>;
  menuItems: MenuItem[];
  dailySpecialIds: string[];
};

export const defaultSiteConfig: SiteConfig = {
  images,
  footerLinks,
  restaurantInfo,
  ctaText,
  menuItems,
  dailySpecialIds: ['ml-02', 'br-02', 'bg-01'],
};
