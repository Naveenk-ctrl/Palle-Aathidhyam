'use client';

import { motion } from 'framer-motion';
import { useSiteConfig } from '@/components/providers/site-config-provider';

export default function ExperienceSection() {
  const { siteConfig } = useSiteConfig();

  return (
    <section className="relative flex min-h-[50vh] sm:min-h-[60vh] items-center justify-center overflow-hidden py-16 sm:py-20 md:py-28">
      {/* Static background — no bg-fixed to avoid repaints */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${siteConfig.images.interiors[1]})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        <motion.div
          className="mb-6 mx-auto flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-[1px] w-10 bg-gold" />
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="h-[1px] w-10 bg-gold" />
        </motion.div>

        <motion.h2
          className="mx-auto max-w-2xl sm:max-w-3xl font-[family-name:var(--font-cormorant)] text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Every Meal Tells a Story
        </motion.h2>

        <motion.div
          className="mt-6 mx-auto flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <span className="h-[1px] w-10 bg-gold" />
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="h-[1px] w-10 bg-gold" />
        </motion.div>
      </div>
    </section>
  );
}