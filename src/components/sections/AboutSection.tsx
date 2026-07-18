'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Flame, Leaf, Clock, Heart, Eye, Target, Sparkles, User } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';

const timeline = [
  { year: '2015', title: 'Founded', desc: 'Palle Aathidhyam was born from a dream to bring authentic village-style Telugu cuisine to the heart of Hyderabad.' },
  { year: '2017', title: 'First Milestone', desc: 'Recognised as one of the top 10 vegetarian restaurants in the city by leading food critics.' },
  { year: '2020', title: 'Growth', desc: 'Expanded our kitchen and introduced the legendary Bagara Specials menu, delighting hundreds of new patrons.' },
  { year: '2023', title: 'Present', desc: 'Now a beloved dining destination, serving over 500 guests daily while staying true to our roots.' },
];

const pillars = [
  { icon: Target, title: 'Mission', text: 'To preserve and celebrate the rich culinary heritage of Telugu cuisine' },
  { icon: Eye, title: 'Vision', text: 'To become the most loved Telugu dining destination' },
  { icon: Sparkles, title: 'Values', text: 'Authenticity, Freshness, Hospitality, Family' },
];

const kitchenPoints = [
  { icon: Flame, label: 'Wood-Fire Cooking' },
  { icon: Leaf, label: 'Farm-Fresh Ingredients' },
  { icon: Clock, label: 'Slow-Cooked Traditions' },
  { icon: Heart, label: 'Made with Love' },
];

export default function AboutSection() {
  const { siteConfig } = useSiteConfig();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="about" ref={ref}>
      {/* Hero Banner */}
      <div className="relative flex h-72 items-center justify-center md:h-96">
        <Image src={siteConfig.images.interiors[0]} alt="Restaurant interior" className="absolute inset-0 h-full w-full" fill loading="lazy" />
        <div className="absolute inset-0 bg-black/60" />
        <motion.h1
          className="relative z-10 font-[family-name:var(--font-cormorant)] text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h1>
      </div>

      {/* Timeline */}
      <div className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-16 text-center font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-primary-green sm:text-3xl md:text-4xl">
            Our Journey
          </h2>
          <div className="relative">
            {/* Gold line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gold/40 md:left-1/2 md:-translate-x-1/2" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className={`relative mb-12 flex flex-col md:flex-row md:items-start ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
              >
                {/* Dot */}
                <div className="absolute left-4 top-1 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-gold bg-ivory md:left-1/2" />
                {/* Content */}
                <div className={`w-full pl-12 md:w-1/2 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-gradient-gold font-[family-name:var(--font-poppins)] text-sm font-bold tracking-widest">
                    {item.year}
                  </span>
                  <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-primary-green">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-wood-brown/70">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((card, i) => (
              <motion.div
                key={card.title}
                className="rounded-[22px] bg-cream p-8 text-center shadow-luxury-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                  <card.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-primary-green">
                  {card.title}
                </h3>
                <p className="font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-wood-brown/70">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Kitchen Philosophy */}
      <div className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              className="overflow-hidden rounded-[24px] shadow-luxury-md"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image src={siteConfig.images.gallery.kitchen[0]} alt="Kitchen" className="h-full w-full object-cover" width={800} height={600} loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-primary-green sm:text-3xl md:text-4xl">
                Kitchen Philosophy
              </h2>
              <p className="mb-8 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-wood-brown/70">
                Our kitchen honours the age-old traditions of Telugu cooking — from hand-ground masalas and stone-ground
                batter to slow-simmered curries on wood fire. Every dish carries the warmth of a grandmother&apos;s kitchen
                and the precision of a master chef.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {kitchenPoints.map((pt, i) => (
                  <motion.div
                    key={pt.label}
                    className="flex items-center gap-3 rounded-xl bg-cream p-4 shadow-luxury-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    <pt.icon className="h-5 w-5 shrink-0 text-gold" />
                    <span className="font-[family-name:var(--font-poppins)] text-xs font-medium text-primary-green">
                      {pt.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Chef Section */}
      <div className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            className="flex flex-col items-center gap-8 md:flex-row md:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-primary-green/10">
              <User className="h-16 w-16 text-primary-green/50" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-primary-green sm:text-2xl md:text-3xl">
                Chef Ramesh Kumar
              </h3>
              <p className="text-gradient-gold mt-1 font-[family-name:var(--font-poppins)] text-sm font-semibold">
                Head Chef
              </p>
              <p className="mt-3 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-wood-brown/70">
                With over 20 years of experience in authentic Telugu cuisine, Chef Ramesh Kumar brings passion and
                tradition to every plate. Trained under master chefs from the Rayalaseema and Telangana regions, he
                specialises in reviving forgotten heirloom recipes and presenting them with modern elegance.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}