'use client';

import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Search, X, UtensilsCrossed } from 'lucide-react';
import { menuCategories, type MenuItem, type MenuCategory } from '@/constants';
import { useSiteConfig } from '@/components/providers/site-config-provider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function MenuSection() {
  const { siteConfig } = useSiteConfig();
  const [active, setActive] = useState<MenuCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = useMemo(() => {
    let items = active === 'all' ? siteConfig.menuItems : siteConfig.menuItems.filter((d) => d.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    return items;
  }, [active, search, siteConfig.menuItems]);

  return (
    <section id="full-menu" className="bg-ivory py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 font-[family-name:var(--font-cormorant)] text-4xl font-semibold text-primary-green md:text-5xl">
            Our <span className="text-gradient-gold">Menu</span>
          </h2>
          <p className="mx-auto max-w-xl font-[family-name:var(--font-poppins)] text-sm text-wood-brown/70">
            Explore our curated selection of authentic Telugu dishes, each crafted with love and tradition.
          </p>
        </motion.div>

        {/* Sticky filter bar + search */}
        <div className="sticky top-[80px] z-30 -mx-4 rounded-2xl border border-border/60 bg-cream/90 px-3 py-3 sm:px-4 sm:py-4 shadow-luxury-sm backdrop-blur-md sm:-mx-6 sm:px-6">
          <div className="mx-auto max-w-5xl">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-wood-brown/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes..."
                className="w-full rounded-xl border border-border bg-ivory py-2 pl-9 pr-9 sm:py-2.5 sm:pl-10 sm:pr-10 font-[family-name:var(--font-poppins)] text-sm text-foreground placeholder:text-wood-brown/40 focus:border-gold focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-wood-brown/40 hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {/* Category buttons */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActive('all')}
                className={`shrink-0 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 font-[family-name:var(--font-poppins)] text-[11px] font-semibold sm:text-xs tracking-wide transition-all ${
                  active === 'all' ? 'bg-gold text-white shadow-gold' : 'border border-leaf-green/40 text-primary-green hover:border-gold hover:text-gold'
                }`}
              >
                All
              </button>
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`shrink-0 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 font-[family-name:var(--font-poppins)] text-[11px] font-semibold sm:text-xs tracking-wide transition-all ${
                    active === cat.id ? 'bg-gold text-white shadow-gold' : 'border border-leaf-green/40 text-primary-green hover:border-gold hover:text-gold'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {filtered.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((dish, i) => (
                  <article
                    key={dish.id}
                    className="group cursor-pointer overflow-hidden rounded-[24px] bg-ivory shadow-luxury-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury-lg"
                    onClick={() => setSelected(dish)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={dish.image} alt={dish.name} className="h-full w-full transition-transform duration-500 group-hover:scale-105" fill loading="lazy" />
                      {/* Badges */}
                      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        {dish.isPopular && (
                          <span className="rounded-full bg-gold/90 px-3 py-0.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold uppercase tracking-wider text-white">
                            Popular
                          </span>
                        )}
                        {dish.isChefSpecial && (
                          <span className="rounded-full bg-leaf-green/90 px-3 py-0.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold uppercase tracking-wider text-white">
                            Chef&apos;s Special
                          </span>
                        )}
                        {dish.isSpicy && (
                          <span className="rounded-full bg-orange-500/90 px-3 py-0.5 font-[family-name:var(--font-poppins)] text-[10px] font-bold uppercase tracking-wider text-white">
                            Spicy
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-4 sm:p-5">
                      <div className="mb-1 flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${dish.isVeg ? 'bg-leaf-green' : 'bg-red-500'}`} />
                        <span className="font-[family-name:var(--font-poppins)] text-[10px] uppercase tracking-wider text-wood-brown/50">
                          {dish.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                      <h3 className="mb-1 font-[family-name:var(--font-cormorant)] text-base font-semibold sm:text-lg text-primary-green">
                        {dish.name}
                      </h3>
                      <p className="mb-3 line-clamp-2 font-[family-name:var(--font-poppins)] text-xs leading-relaxed text-wood-brown/70">
                        {dish.description}
                      </p>
                      <span className="text-gradient-gold font-[family-name:var(--font-poppins)] text-base font-bold">
                        ₹{dish.price}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20">
              
                <UtensilsCrossed className="mb-4 h-12 w-12 text-wood-brown/20" />
                <p className="font-[family-name:var(--font-poppins)] text-sm text-wood-brown/50">No dishes found</p>
                <button
                  onClick={() => { setActive('all'); setSearch(''); }}
                  className="mt-3 text-sm font-medium text-gold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Dish Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-[22px] bg-ivory p-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-t-[22px]">
              <Image src={selected.image} alt={selected.name} className="h-full w-full" fill loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6 pt-2">
              <DialogHeader>
                <DialogTitle className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-primary-green">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="sr-only">{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="mb-3 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${selected.isVeg ? 'bg-leaf-green' : 'bg-red-500'}`} />
                <span className="font-[family-name:var(--font-poppins)] text-xs text-wood-brown/60">
                  {selected.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
                <span className="text-gradient-gold ml-auto font-[family-name:var(--font-poppins)] text-xl font-bold">
                  ₹{selected.price}
                </span>
              </div>
              <p className="mb-5 font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-wood-brown/80">
                {selected.description}
              </p>
              <h4 className="mb-2 font-[family-name:var(--font-cormorant)] text-lg font-semibold text-primary-green">
                Key Ingredients
              </h4>
              <p className="font-[family-name:var(--font-poppins)] text-xs leading-relaxed text-wood-brown/60">
                Fresh seasonal vegetables, hand-ground spice blends, ghee, curry leaves, tamarind, and traditional Telugu spices.
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}