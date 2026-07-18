// Sample customer reviews for Palle Aathidhyam

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number; // 1–5
  title: string;
  text: string;
  date: string;
  avatarInitials: string;
}

export const reviews: Review[] = [
  {
    id: 'r-01',
    name: 'Lakshmi Narayana',
    location: 'Hyderabad',
    rating: 5,
    title: 'Authentic Telugu taste after a long time!',
    text: 'The Pongali here reminds me of my grandmother\'s cooking. Perfectly tempered with ghee and pepper, and the banana-leaf meals are a nostalgic touch. We drive 40 km just for the weekend thali.',
    date: '2024-12-15',
    avatarInitials: 'LN',
  },
  {
    id: 'r-02',
    name: 'Suresh Kumar',
    location: 'Gachibowli, Hyderabad',
    rating: 4.5,
    title: 'Best Biryani in the area, hands down',
    text: 'The Paneer Biryani is outstanding — fragrant, perfectly spiced, and the portion size is generous. The Mirchi Ka Salan on the side is a must-try. Only wish they had a larger seating area.',
    date: '2024-11-28',
    avatarInitials: 'SK',
  },
  {
    id: 'r-03',
    name: 'Priya Sharma',
    location: 'Mumbai (visited Hyderabad)',
    rating: 5,
    title: 'A foodie\'s paradise in the heart of Telangana',
    text: 'I visited during a work trip and was blown away. The Bagara Baingan is unlike anything I\'ve had elsewhere — rich, nutty, and deeply flavourful. The filter coffee was the perfect end to the meal.',
    date: '2024-11-10',
    avatarInitials: 'PS',
  },
  {
    id: 'r-04',
    name: 'Rajesh Reddy',
    location: 'Warangal',
    rating: 4,
    title: 'Great ambience, homely food',
    text: 'We hosted a family dinner here and everyone loved it. The Gundu Meals is value for money — unlimited rice, three curries, and payasam. The rustic village-themed décor adds a wonderful charm.',
    date: '2024-10-22',
    avatarInitials: 'RR',
  },
  {
    id: 'r-05',
    name: 'Anjali Devi',
    location: 'Secunderabad',
    rating: 5,
    title: 'Vegetarian heaven!',
    text: 'Finally a place that takes vegetarian food seriously. Every dish bursts with flavour. The Mysore Pak and Double Ka Meetha are absolutely divine. This is now our go-to family restaurant.',
    date: '2024-10-05',
    avatarInitials: 'AD',
  },
  {
    id: 'r-06',
    name: 'Venkat Rao',
    location: 'Kukatpally, Hyderabad',
    rating: 4.5,
    title: 'Consistently excellent quality',
    text: 'I\'ve been a regular for over six months now and the quality has never dipped. The Masala Dosa is crispy perfection and their Majjiga (buttermilk) is the best I\'ve had anywhere. Highly recommended!',
    date: '2024-09-18',
    avatarInitials: 'VR',
  },
  {
    id: 'r-07',
    name: 'Kavitha Menon',
    location: 'Bengaluru (visited Hyderabad)',
    rating: 5,
    title: 'Worth every rupee',
    text: 'The Special Meals thali is an experience — so many flavours on one banana leaf. The sambar has that perfect tangy-spicy balance and the payasam is heavenly. Service is warm and attentive.',
    date: '2024-09-02',
    avatarInitials: 'KM',
  },
  {
    id: 'r-08',
    name: 'Ravi Teja',
    location: 'Madhapur, Hyderabad',
    rating: 4,
    title: 'Perfect weekend brunch spot',
    text: 'Came here on a Sunday morning and had the Idli Vada combo with filter coffee. Simple, comforting and exactly what I needed. The ambience is beautiful with all the traditional touches. Will be back for the Biryani!',
    date: '2024-08-20',
    avatarInitials: 'RT',
  },
];

// Average rating helper
export function getAverageRating(): number {
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}