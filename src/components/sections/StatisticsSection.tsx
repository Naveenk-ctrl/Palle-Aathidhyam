'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { UtensilsCrossed, Users, Star, Leaf } from 'lucide-react';

const stats = [
  { icon: UtensilsCrossed, value: 20, suffix: '+', label: 'Traditional Recipes' },
  { icon: Users, value: 5000, suffix: '+', label: 'Happy Customers' },
  { icon: Star, value: 4.8, suffix: '★', label: 'Average Rating', decimals: 1 },
  { icon: Leaf, value: 100, suffix: '%', label: 'Fresh Ingredients' },
];

function useCountUp(
  target: number,
  isInView: boolean,
  duration = 2000,
  decimals = 0
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * target;
      setCount(Number(start.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration, decimals]);

  return count;
}

function StatItem({
  stat,
  isInView,
}: {
  stat: (typeof stats)[0];
  isInView: boolean;
}) {
  const count = useCountUp(
    stat.value,
    isInView,
    2200,
    'decimals' in stat ? stat.decimals : 0
  );

  return (
    <div className="text-center">
      <stat.icon className="mx-auto mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-gold" />
      <p className="mb-1 font-[family-name:var(--font-cormorant)] text-4xl font-bold text-white sm:text-5xl md:text-6xl">
        {count}
        <span className="text-gold">{stat.suffix}</span>
      </p>
      <p className="font-[family-name:var(--font-poppins)] text-xs tracking-wider text-cream/80 sm:text-sm">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatisticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-primary-green py-20 md:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <StatItem stat={stat} isInView={isInView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}