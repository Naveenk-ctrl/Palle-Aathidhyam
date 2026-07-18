'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';

export default function ReservationCTASection() {
  const { siteConfig } = useSiteConfig();

  return (
    <section
      id="reservation-cta"
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
      style={{ background: 'linear-gradient(135deg, #1F4D2E 0%, #2E6A3D 50%, #1F4D2E 100%)' }}
    >
      {/* Decorative corner leaves */}
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 opacity-10">
        <svg viewBox="0 0 200 200" fill="none" className="h-full w-full text-gold">
          <path d="M0 0 C60 40 100 100 200 200 L0 200 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rotate-180 opacity-10">
        <svg viewBox="0 0 200 200" fill="none" className="h-full w-full text-gold">
          <path d="M0 0 C60 40 100 100 200 200 L0 200 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="mb-6 font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {siteConfig.ctaText.heading}
        </motion.h2>

        <motion.p
          className="mx-auto mb-10 max-w-xl font-[family-name:var(--font-poppins)] text-base leading-relaxed text-cream/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {siteConfig.ctaText.subheading}
        </motion.p>

        <motion.a
          href={siteConfig.ctaText.buttonHref}
          className="animate-glow-pulse inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-3.5 sm:px-10 sm:py-4 font-[family-name:var(--font-poppins)] text-sm font-bold uppercase tracking-wider sm:tracking-widest text-primary-green transition-all duration-300 hover:bg-light-gold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {siteConfig.ctaText.buttonText}
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
}