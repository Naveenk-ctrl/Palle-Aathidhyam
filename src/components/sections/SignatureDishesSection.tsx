'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';

export default function SignatureDishesSection() {
  const { siteConfig } = useSiteConfig();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const featured = siteConfig.dailySpecialIds.length
    ? siteConfig.menuItems.filter((item) => siteConfig.dailySpecialIds.includes(item.id))
    : siteConfig.menuItems.filter((item) => item.isPopular || item.isChefSpecial).slice(0, 3);

  return (
    <section id="menu" className="bg-cream py-16 sm:py-20 md:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <motion.h2
            className="mb-4 font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-primary-green sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Signature Dishes
          </motion.h2>
          <motion.div
            className="mx-auto flex items-center justify-center gap-2"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="h-[1px] w-8 bg-gold" />
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="h-[1px] w-8 bg-gold" />
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((dish, i) => (
            <motion.article
              key={dish.id}
              className="group cursor-pointer overflow-hidden rounded-[24px] bg-ivory shadow-luxury-sm transition-shadow duration-300 hover:shadow-luxury-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  fill
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover CTA */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center pb-6 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/90 px-4 py-1.5 sm:px-5 sm:py-2 font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wider text-primary-green">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 sm:p-6">
                <h3 className="mb-1.5 font-[family-name:var(--font-cormorant)] text-lg font-semibold text-primary-green sm:text-xl">
                  {dish.name}
                </h3>
                <p className="mb-4 line-clamp-2 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-wood-brown/70">
                  {dish.description}
                </p>
                <span className="text-gradient-gold font-[family-name:var(--font-poppins)] text-lg font-bold">
                  ₹{dish.price}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}