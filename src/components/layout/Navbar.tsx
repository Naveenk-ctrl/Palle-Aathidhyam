'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';
import Image from 'next/image';
import { navItems } from '@/constants/navigation';
import { useSiteConfig } from '@/components/providers/site-config-provider';

const navVariants = {
  transparent: { height: 80, backgroundColor: 'rgba(0,0,0,0)' },
  solid: { height: 68, backgroundColor: 'rgba(31, 77, 46, 0.95)' },
};

const mobileMenuVariants = {
  closed: { opacity: 0, y: -20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: 'easeIn' as const } },
};

const mobileItemVariants = {
  closed: { opacity: 0, x: -30 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.35, ease: 'easeOut' as const },
  }),
};

export default function Navbar() {
  const { siteConfig } = useSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <>
      <motion.nav
        initial={false}
        animate={scrolled ? 'solid' : 'transparent'}
        variants={navVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 transition-all duration-300 ${
          scrolled
            ? 'glass-dark shadow-luxury-md'
            : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#home" className="relative z-10 flex items-center gap-2" aria-label={`${siteConfig.restaurantInfo.name} Home`}>
          <Image
            src={siteConfig.images.logo}
            alt={`${siteConfig.restaurantInfo.name} Logo`}
            width={44}
            height={44}
            className="rounded-full object-cover border border-gold/30 shadow-gold/20 shadow-sm shrink-0"
          />
          <span
            className={`hidden sm:inline-block font-[family-name:var(--font-cormorant)] text-lg font-semibold transition-colors duration-300 ${
              scrolled ? 'text-cream' : 'text-cream'
            }`}
          >
            {siteConfig.restaurantInfo.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative px-3 py-2 font-[family-name:var(--font-poppins)] text-sm text-cream/90 transition-colors duration-200 hover:text-gold"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3 relative z-10">
          {/* Phone (desktop) */}
          <a
            href={`tel:${siteConfig.footerLinks.contact.phone.replace(/\s/g, '')}`}
            className="hidden md:flex items-center gap-1.5 text-cream/80 text-sm font-[family-name:var(--font-poppins)] hover:text-gold transition-colors"
            aria-label="Call us"
          >
            <Phone size={14} />
            <span>{siteConfig.footerLinks.contact.phone}</span>
          </a>

          {/* Reserve Button (desktop) */}
          <a
            href="#reservation"
            className="hidden sm:inline-flex items-center rounded-[18px] bg-gold px-6 py-2.5 text-sm font-semibold text-primary-green font-[family-name:var(--font-poppins)] transition-colors duration-200 hover:bg-light-gold shadow-gold"
          >
            Reserve Table
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-cream hover:text-gold transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col glass-dark"
          >
            {/* Close Button */}
            <div className="flex items-center justify-between px-4 py-5">
              <a href="#home" className="flex items-center gap-2" aria-label={`${siteConfig.restaurantInfo.name} Home`}>
                <Image
                  src={siteConfig.images.logo}
                  alt={`${siteConfig.restaurantInfo.name} Logo`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border border-gold/30 shadow-gold/20 shadow-sm shrink-0"
                />
                <span className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-cream">
                  {siteConfig.restaurantInfo.name}
                </span>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-cream hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-6" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between py-3.5 px-4 rounded-xl text-2xl font-[family-name:var(--font-cormorant)] font-semibold text-cream hover:text-gold hover:bg-white/5 transition-colors duration-200"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={20} className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-60 group-hover:translate-x-0" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.35 }}
              className="px-6 pb-8 space-y-4"
            >
              <a
                href="#reservation"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full rounded-[18px] bg-gold py-3.5 text-base font-semibold text-primary-green font-[family-name:var(--font-poppins)] hover:bg-light-gold transition-colors shadow-gold"
              >
                Reserve Table
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}