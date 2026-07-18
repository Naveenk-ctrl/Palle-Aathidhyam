import { images } from './images';

// ── Types ────────────────────────────────────────────────────────────────────

export type MenuCategory =
  | 'breakfast'
  | 'meals'
  | 'biryani'
  | 'bagara-specials'
  | 'beverages'
  | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isVeg: boolean;
  isSpicy: boolean;
  isPopular: boolean;
  isChefSpecial: boolean;
}

// ── Category metadata ───────────────────────────────────────────────────────

export const menuCategories: {
  id: MenuCategory;
  name: string;
  telugu?: string;
}[] = [
  { id: 'breakfast', name: 'Breakfast', telugu: 'ఉదయపు భోజనం' },
  { id: 'meals', name: 'Meals', telugu: 'భోజనం' },
  { id: 'biryani', name: 'Biryani', telugu: 'బిర్యానీ' },
  { id: 'bagara-specials', name: 'Bagara Specials' },
  { id: 'beverages', name: 'Beverages', telugu: 'పానీయాలు' },
  { id: 'desserts', name: 'Desserts', telugu: 'స్వీట్లు' },
];

// ── Menu items ──────────────────────────────────────────────────────────────

export const menuItems: MenuItem[] = [
  // ── Breakfast / Tiffins ────────────────────────────────────────────────
  {
    id: 'bk-01',
    name: 'పొంగలి (Pongali)',
    description:
      'Creamy rice and moong dal tempered with ghee, cumin, pepper and cashews — a classic temple-style breakfast.',
    price: 100,
    category: 'breakfast',
    image: images.idli,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'bk-02',
    name: 'ఉప్మా (Upma)',
    description:
      'Savoury semolina porridge studded with mustard seeds, urad dal, curry leaves and freshly grated coconut.',
    price: 80,
    category: 'breakfast',
    image: images.meals[0],
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    isChefSpecial: false,
  },
  {
    id: 'bk-03',
    name: 'మసాలా దోస (Masala Dosa)',
    description:
      'Crispy golden crepe filled with spiced potato masala, served with coconut chutney and sambar.',
    price: 120,
    category: 'breakfast',
    image: images.dosa,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'bk-04',
    name: 'ఇడ్లీ వడ (Idli Vada)',
    description:
      'Steamed rice cakes and crispy urad dal fritters served with a trio of chutneys and piping-hot sambar.',
    price: 110,
    category: 'breakfast',
    image: images.idli,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'bk-05',
    name: 'పూరి (Puri)',
    description:
      'Puffed golden puris with a bowl of aromatic potato kurma and tangy tomato chutney.',
    price: 130,
    category: 'breakfast',
    image: images.curry,
    isVeg: true,
    isSpicy: true,
    isPopular: false,
    isChefSpecial: true,
  },

  // ── Meals ──────────────────────────────────────────────────────────────
  {
    id: 'ml-01',
    name: 'వేగ భోజనం (Veg Meals)',
    description:
      'Traditional unlimited thali with steamed rice, sambar, rasam, kootu, papad, pickle, buttermilk and payasam.',
    price: 250,
    category: 'meals',
    image: images.meals[0],
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'ml-02',
    name: 'ప్రత్యేక భోజనం (Special Meals)',
    description:
      'Premium thali featuring a daily-rotating special curry, ghee rice, appadam, two varieties of chutney and sweet.',
    price: 350,
    category: 'meals',
    image: images.meals[1],
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: true,
  },
  {
    id: 'ml-03',
    name: 'గుండు భోజనం (Gundu Meals)',
    description:
      'Hearty meals served in a traditional banana leaf with extra rice portions, pachadi and a fried special.',
    price: 300,
    category: 'meals',
    image: images.meals[2],
    isVeg: true,
    isSpicy: true,
    isPopular: false,
    isChefSpecial: false,
  },
  {
    id: 'ml-04',
    name: 'బిర్యానీ భోజనం (Biryani Meals)',
    description:
      'A complete combo of fragrant biryani paired with raita, mirchi ka salan and a serving of shrikhand.',
    price: 320,
    category: 'meals',
    image: images.biryani,
    isVeg: true,
    isSpicy: true,
    isPopular: true,
    isChefSpecial: false,
  },

  // ── Biryani ────────────────────────────────────────────────────────────
  {
    id: 'br-01',
    name: 'వేగ బిర్యానీ (Veg Biryani)',
    description:
      'Aromatic basmati rice layered with garden-fresh vegetables, saffron and whole spices, slow-cooked in dum style.',
    price: 280,
    category: 'biryani',
    image: images.biryani,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'br-02',
    name: 'పన్నీర్ బిర్యానీ (Paneer Biryani)',
    description:
      'Tender paneer cubes marinated in yoghurt and spices, layered with fragrant rice and caramelised onions.',
    price: 320,
    category: 'biryani',
    image: images.biryani,
    isVeg: true,
    isSpicy: true,
    isPopular: true,
    isChefSpecial: true,
  },
  {
    id: 'br-03',
    name: 'గుగ్గిలు బిర్యానీ (Mushroom Biryani)',
    description:
      'Earthy button mushrooms and aromatic herbs folded into delicately spiced basmati rice.',
    price: 300,
    category: 'biryani',
    image: images.biryani,
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    isChefSpecial: false,
  },
  {
    id: 'br-04',
    name: 'తక్కలి బిర్యానీ (Tomato Biryani)',
    description:
      'Tangy Hyderabadi-style tomato biryani with fresh mint, coriander and a hint of star anise.',
    price: 260,
    category: 'biryani',
    image: images.biryani,
    isVeg: true,
    isSpicy: true,
    isPopular: false,
    isChefSpecial: true,
  },
  {
    id: 'br-05',
    name: 'పులావ్ (Veg Pulao)',
    description:
      'Light and fluffy basmati rice tossed with mixed vegetables, whole garam masala and a drizzle of ghee.',
    price: 220,
    category: 'biryani',
    image: images.meals[1],
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    isChefSpecial: false,
  },

  // ── Bagara Specials ────────────────────────────────────────────────────
  {
    id: 'bg-01',
    name: 'బగార బైంగన్ (Bagara Baingan)',
    description:
      'Roasted baby aubergines simmered in a rich, nutty peanut-sesame gravy with tamarind and jaggery.',
    price: 240,
    category: 'bagara-specials',
    image: images.curry,
    isVeg: true,
    isSpicy: true,
    isPopular: true,
    isChefSpecial: true,
  },
  {
    id: 'bg-02',
    name: 'మిర్చి కా సలాన్ (Mirchi Ka Salan)',
    description:
      'Stuffed chillies in a creamy coconut-peanut sauce — the quintessential Hyderabadi accompaniment to biryani.',
    price: 220,
    category: 'bagara-specials',
    image: images.curry,
    isVeg: true,
    isSpicy: true,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'bg-03',
    name: 'గొబ్బు మంచూర్ (Cauliflower Manchurian)',
    description:
      'Crispy cauliflower florets tossed in a tangy soy-chilli-garlic sauce with a sprinkle of spring onions.',
    price: 200,
    category: 'bagara-specials',
    image: images.curry,
    isVeg: true,
    isSpicy: true,
    isPopular: false,
    isChefSpecial: false,
  },
  {
    id: 'bg-04',
    name: 'పనీర్ బుట్ట మసాలా (Paneer Butter Masala)',
    description:
      'Soft paneer cubes in a velvety tomato-butter gravy finished with cream and kasuri methi.',
    price: 260,
    category: 'bagara-specials',
    image: images.curry,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'bg-05',
    name: 'దాల్ తడ్కా (Dal Tadka)',
    description:
      'Yellow lentils tempered with ghee, cumin, garlic and dried red chillies — soul food at its best.',
    price: 180,
    category: 'bagara-specials',
    image: images.meals[2],
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    isChefSpecial: false,
  },

  // ── Beverages ──────────────────────────────────────────────────────────
  {
    id: 'bv-01',
    name: 'మజ్జిగ (Majjiga — Buttermilk)',
    description:
      'Chilled churned buttermilk spiked with ginger, green chilli, curry leaves and a pinch of roasted cumin.',
    price: 60,
    category: 'beverages',
    image: images.beverages,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'bv-02',
    name: 'మంచుపాలు (Badam Milk)',
    description:
      'Warm almond milk infused with saffron, cardamom, rose water and slivers of pistachio and almond.',
    price: 120,
    category: 'beverages',
    image: images.beverages,
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    isChefSpecial: true,
  },
  {
    id: 'bv-03',
    name: 'మసాలా ఛాయ్ (Masala Chai)',
    description:
      'House-blend Assam tea brewed with fresh ginger, cardamom, cinnamon and a splash of farm milk.',
    price: 50,
    category: 'beverages',
    image: images.beverages,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'bv-04',
    name: 'లస్సీ (Sweet Lassi)',
    description:
      'Thick and creamy yoghurt drink blended with sugar, cardamom and topped with a layer of fresh malai.',
    price: 100,
    category: 'beverages',
    image: images.beverages,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'bv-05',
    name: 'ఫిల్టర్ కాఫీ (Filter Coffee)',
    description:
      'Authentic South Indian filter coffee made with freshly ground dark roast beans and frothed milk.',
    price: 80,
    category: 'beverages',
    image: images.beverages,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },

  // ── Desserts ───────────────────────────────────────────────────────────
  {
    id: 'ds-01',
    name: 'పాయసం (Payasam)',
    description:
      'Traditional vermicelli payasam slow-cooked in milk, ghee, cashews, raisins and fragrant cardamom.',
    price: 120,
    category: 'desserts',
    image: images.dessert,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: true,
  },
  {
    id: 'ds-02',
    name: 'గులాబ్ జామున్ (Gulab Jamun)',
    description:
      'Golden, melt-in-mouth milk-solid dumplings soaked in warm rose-cardamom sugar syrup.',
    price: 100,
    category: 'desserts',
    image: images.dessert,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    isChefSpecial: false,
  },
  {
    id: 'ds-03',
    name: 'బోండా మిఠాయి (Mysore Pak)',
    description:
      'Crumbly, ghee-rich Gram flour fudge with a hint of cardamom — a Mysore classic.',
    price: 90,
    category: 'desserts',
    image: images.dessert,
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    isChefSpecial: true,
  },
  {
    id: 'ds-04',
    name: 'ద్వాదశ రసా (Double Ka Meetha)',
    description:
      'Hyderabadi bread pudding soaked in reduced milk, flavoured with saffron, rose water and fried nuts.',
    price: 140,
    category: 'desserts',
    image: images.dessert,
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    isChefSpecial: false,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getItemsByCategory(category: MenuCategory): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function getPopularItems(): MenuItem[] {
  return menuItems.filter((item) => item.isPopular);
}

export function getChefSpecials(): MenuItem[] {
  return menuItems.filter((item) => item.isChefSpecial);
}