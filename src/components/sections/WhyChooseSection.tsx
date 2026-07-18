'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, ChefHat, Wine, Users } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description:
      'Farm-fresh ingredients sourced daily from local farmers to ensure every dish bursts with natural flavour.',
  },
  {
    icon: ChefHat,
    title: 'Authentic Recipes',
    description:
      'Generations-old Telugu recipes preserved with love, bringing the true taste of Andhra and Telangana to your table.',
  },
  {
    icon: Wine,
    title: 'Premium Dining',
    description:
      'A dining experience that matches the finest restaurants — elegant ambience, impeccable service, and unforgettable food.',
  },
  {
    icon: Users,
    title: 'Family Friendly',
    description:
      'A warm, welcoming space for families and celebrations — because good food is best shared with the ones you love.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

export default function WhyChooseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-ivory py-16 sm:py-20 md:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <motion.h2
            className="mb-4 font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-primary-green sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
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

        {/* Cards grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group cursor-default rounded-[22px] bg-cream p-5 sm:p-6 shadow-luxury-sm transition-all duration-300 hover:-translate-y-4 hover:shadow-luxury-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 sm:h-14 sm:w-14 transition-transform duration-300 group-hover:rotate-6">
                <f.icon className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-lg font-semibold text-primary-green sm:text-xl">
                {f.title}
              </h3>
              <p className="font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-wood-brown/70">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}