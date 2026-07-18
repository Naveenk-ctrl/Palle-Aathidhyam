'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';

const words = ['Authentic', 'Telugu', 'Hospitality'];

export default function HeroSection() {
  const { siteConfig } = useSiteConfig();
  const particles = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 6 + 8,
      tx: `${(Math.random() - 0.5) * 100}px`,
      ty: `${(Math.random() - 0.5) * 100}px`,
    }))
  )[0];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-[-40px] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${siteConfig.images.heroBg})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Minimal particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-gold/30"
            style={{
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              ['--tx' as string]: p.tx,
              ['--ty' as string]: p.ty,
              animation: `particle-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 flex flex-wrap justify-center font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-tight tracking-wide text-white">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="mr-2 sm:mr-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mb-10 max-w-lg font-[family-name:var(--font-poppins)] text-base tracking-widest text-cream sm:text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Traditional Taste. Modern Experience.
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <a
            href="#reservation"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-primary-green transition-all duration-300 hover:bg-light-gold hover:shadow-gold"
          >
            Reserve Table
          </a>
          <a
            href="#full-menu"
            className="inline-flex items-center justify-center rounded-full border-2 border-cream/40 px-6 py-3 sm:px-8 sm:py-3.5 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Explore Menu
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <a href="#about" aria-label="Scroll down" className="flex flex-col items-center gap-2">
          <span className="font-[family-name:var(--font-poppins)] text-xs uppercase tracking-[0.3em] text-cream/70">Scroll</span>
          <ChevronDown className="h-6 w-6 animate-scroll-indicator text-gold" />
        </a>
      </motion.div>
    </section>
  );
}