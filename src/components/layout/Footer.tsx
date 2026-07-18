'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';

 

const footerFade = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function Footer() {
  const { siteConfig } = useSiteConfig();
  const currentYear = new Date().getFullYear();
  const socialIcons = [
    { icon: Instagram, href: siteConfig.footerLinks.social.instagram, label: 'Instagram' },
    { icon: Facebook, href: siteConfig.footerLinks.social.facebook, label: 'Facebook' },
    { icon: Youtube, href: siteConfig.footerLinks.social.youtube, label: 'YouTube' },
    { icon: Twitter, href: siteConfig.footerLinks.social.twitter, label: 'Twitter' },
  ];
  const hours = [
    { day: 'Monday – Friday', time: siteConfig.footerLinks.hours.weekdays },
    { day: 'Saturday – Sunday', time: siteConfig.footerLinks.hours.weekends },
    { day: '', time: siteConfig.footerLinks.hours.closedOn },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="bg-gradient-to-b from-primary-green to-[#0f2e1a] text-cream/90"
      role="contentinfo"
    >
      {/* Gold separator */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pt-12 pb-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* About */}
          <motion.div custom={0} variants={footerFade} className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2.5 mb-4">
              <Image
                src={siteConfig.images.logo}
                alt="Palle Aathidhyam Logo"
                width={42}
                height={42}
                className="rounded-full object-cover border border-gold/30 shadow-sm shrink-0"
              />
              <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-cream">
                {siteConfig.restaurantInfo.name}
              </span>
            </a>
            <p className="font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-cream/60 max-w-xs">
              {siteConfig.restaurantInfo.description}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-gold/25 text-gold/70 hover:text-gold hover:border-gold/50 transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div custom={0.1} variants={footerFade}>
            <h4 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-block font-[family-name:var(--font-poppins)] text-sm text-cream/60 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Working Hours */}
          <motion.div custom={0.2} variants={footerFade}>
            <h4 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-gold mb-4">
              Working Hours
            </h4>
            <div className="space-y-3">
              {hours.map((row, i) => (
                <div key={i}>
                  {row.day && (
                    <p className="font-[family-name:var(--font-poppins)] text-sm font-medium text-cream/80">
                      {row.day}
                    </p>
                  )}
                  <p className={`font-[family-name:var(--font-poppins)] text-sm text-cream/50 ${!row.day ? 'text-gold/60' : ''}`}>
                    {row.time}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div custom={0.3} variants={footerFade}>
            <h4 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-gold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3.5">
              <li className="flex gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold/60" />
                <span className="font-[family-name:var(--font-poppins)] text-sm text-cream/60 leading-relaxed">
                  {siteConfig.footerLinks.contact.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.footerLinks.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 font-[family-name:var(--font-poppins)] text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-gold/60" />
                  {siteConfig.footerLinks.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.footerLinks.contact.email}`}
                  className="flex items-center gap-2.5 font-[family-name:var(--font-poppins)] text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  <Mail size={14} className="shrink-0 text-gold/60" />
                  {siteConfig.footerLinks.contact.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          custom={0.4}
          variants={footerFade}
          className="mt-10 pt-6 border-t border-gold/10 text-center"
        >
          <p className="font-[family-name:var(--font-poppins)] text-xs text-cream/35">
            © {currentYear} {siteConfig.restaurantInfo.name}. All rights reserved. Crafted with love in Hyderabad.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}