// Navigation structure, footer links and restaurant contact details

// ── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

// ── Main navigation ─────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservation', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
  { label: 'Feedback', href: '#feedback' },
];

// ── Footer data ─────────────────────────────────────────────────────────────

export const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reservations', href: '#reservation' },
    { label: 'Contact', href: '#contact' },
  ],

  hours: {
    weekdays: '11:00 AM – 3:00 PM, 6:00 PM – 10:30 PM',
    weekends: '10:00 AM – 11:00 PM',
    closedOn: 'No weekly off — open 365 days',
  },

  contact: {
    address: '12-3-456, Main Road, Kukatpally, Hyderabad, Telangana 500085',
    phone: '+91 98765 43210',
    email: 'hello@palleaathidhyam.com',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.0254209415!2d78.3809941!3d17.5062999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91005f859e41%3A0xc3359ba69c3f6184!2sPALLE+AATHIDHYAM!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  },

  social: {
    instagram: 'https://www.instagram.com/palle_aathidhyam/',
    facebook: 'https://facebook.com/palleaathidhyam',
    youtube: 'https://youtube.com/@palleaathidhyam',
    twitter: 'https://twitter.com/palleaathidhyam',
  },
} as const;

// ── Restaurant info (reusable across components) ────────────────────────────

export const restaurantInfo = {
  name: 'Palle Aathidhyam',
  tagline: 'పల్లె ఆతిథ్యం — The Village Feast',
  description:
    'Experience the authentic flavours of rural Telugu cuisine, handcrafted with love using age-old recipes and farm-fresh ingredients.',
  foundedYear: 2020,
} as const;

// ── CTA section text ────────────────────────────────────────────────────────

export const ctaText = {
  heading: 'Reserve Your Table Today',
  subheading:
    'Join us for an unforgettable culinary journey through the heartlands of Telangana and Andhra Pradesh.',
  buttonText: 'Book a Table',
  buttonHref: '#reservation',
} as const;