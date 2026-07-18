'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews } from '@/constants';

const avatarColors = [
  'bg-primary-green',
  'bg-secondary-green',
  'bg-wood-brown',
  'bg-dark-brown',
  'bg-leaf-green',
  'bg-gold/80',
  'bg-gold',
  'bg-primary-green/80',
];

function ReviewCard({
  review,
  index,
  colorIndex,
}: {
  review: (typeof reviews)[0];
  index: number;
  colorIndex: number;
}) {
  const fullStars = Math.floor(review.rating);
  const hasHalf = review.rating % 1 >= 0.5;

  return (
    <div className="mr-4 w-[280px] shrink-0 rounded-[22px] bg-white/80 p-5 shadow-luxury-sm backdrop-blur-sm sm:mr-6 sm:w-[340px] md:w-[380px]">
      {/* Stars */}
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? 'fill-gold text-gold'
                : i === fullStars && hasHalf
                  ? 'fill-gold/50 text-gold'
                  : 'fill-none text-gold/30'
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <p className="mb-1.5 font-[family-name:var(--font-cormorant)] text-lg font-semibold text-primary-green">
        {review.title}
      </p>

      {/* Text */}
      <p className="mb-5 line-clamp-4 font-[family-name:var(--font-poppins)] text-sm italic leading-relaxed text-wood-brown/70">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColors[colorIndex % avatarColors.length]}`}
        >
          {review.avatarInitials}
        </div>
        <div>
          <p className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-primary-green">
            {review.name}
          </p>
          <p className="font-[family-name:var(--font-poppins)] text-xs text-wood-brown/60">
            {review.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Duplicate for seamless infinite loop
  const duplicated = [...reviews, ...reviews];

  return (
    <section className="bg-cream py-20 md:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <motion.h2
            className="mb-4 font-[family-name:var(--font-cormorant)] text-4xl font-semibold text-primary-green md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What Our Guests Say
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
      </div>

      {/* Infinite scroll track */}
      <motion.div
        className="flex gap-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex animate-[scroll_60s_linear_infinite] gap-0 sm:animate-[scroll_40s_linear_infinite]">
          {duplicated.map((review, i) => (
            <ReviewCard
              key={`${review.id}-${i}`}
              review={review}
              index={i}
              colorIndex={i}
            />
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}