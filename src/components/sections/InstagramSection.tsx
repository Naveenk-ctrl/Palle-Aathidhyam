'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';

export default function InstagramSection() {
  const { siteConfig } = useSiteConfig();

  return (
    <section className="bg-cream py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <motion.div
            className="mb-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Instagram className="h-6 w-6 text-gold" />
          </motion.div>
          <motion.h2
            className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold text-primary-green md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Follow Us on Instagram
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {siteConfig.images.instagram.map((src, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/palle_aathidhyam/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Image
                src={src}
                alt={`Instagram post ${i + 1}`}
                className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                fill
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                <Instagram className="h-7 w-7 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}