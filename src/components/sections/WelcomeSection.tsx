'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';

export default function WelcomeSection() {
  const { siteConfig } = useSiteConfig();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="welcome" className="bg-cream py-16 sm:py-20 md:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text side */}
          <div>
            <motion.span
              className="mb-4 inline-block font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.25em] text-gold"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.span>

            <motion.h2
              className="mb-6 font-[family-name:var(--font-cormorant)] text-3xl font-semibold leading-tight text-primary-green sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Where Tradition Meets Taste
            </motion.h2>

            <motion.div
              className="mb-8 h-1 w-16 rounded-full bg-gold"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.p
              className="mb-6 font-[family-name:var(--font-poppins)] text-base leading-relaxed text-wood-brown/80 md:text-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Born from a deep love for the rich culinary heritage of Andhra Pradesh
              and Telangana, Palle Aathidhyam is more than a restaurant — it is a
              heartfelt tribute to the flavours that shaped our childhoods. Every
              dish we serve carries the warmth of a mother&apos;s kitchen, the
              authenticity of village feasts, and the time-honoured recipes passed
              down through generations.
            </motion.p>

            <motion.p
              className="mb-8 font-[family-name:var(--font-poppins)] text-base leading-relaxed text-wood-brown/80 md:text-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We source the freshest ingredients from local farmers, grind our
              spices in-house, and cook every meal with the same care and devotion
              that defines Telugu hospitality. From the crackle of a perfectly
              crisped dosa to the aromatic steam of dum biryani, every bite tells a
              story of tradition, love, and the vibrant spirit of rural India.
            </motion.p>

            <motion.a
              href="#menu"
              className="group inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-primary-green transition-colors hover:text-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <span className="relative">
                Learn More
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>

          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="animate-float rounded-[24px] overflow-hidden shadow-luxury-lg">
              <Image
                src={siteConfig.images.ambience}
                alt="Restaurant ambience"
                className="h-[300px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                width={800}
                height={600}
                loading="lazy"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-[24px] border-2 border-gold/30 hidden sm:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}