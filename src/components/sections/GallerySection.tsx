'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'food', label: 'Food' },
  { key: 'restaurant', label: 'Restaurant' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'events', label: 'Events' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

const heightClasses = [
  'h-48 sm:h-64',
  'h-64 sm:h-80',
  'h-56 sm:h-72',
  'h-44 sm:h-56',
  'h-56 sm:h-72',
  'h-48 sm:h-64',
  'h-64 sm:h-80',
  'h-44 sm:h-56',
  'h-56 sm:h-72',
  'h-48 sm:h-64',
  'h-64 sm:h-80',
  'h-56 sm:h-72',
  'h-48 sm:h-64',
  'h-44 sm:h-56',
];

export default function GallerySection() {
  const { siteConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const eventImages = siteConfig.images.gallery.food.slice(0, 3);
  const allImages: Record<TabKey, readonly string[]> = {
    all: [
      ...siteConfig.images.gallery.food,
      ...siteConfig.images.gallery.restaurant,
      ...siteConfig.images.gallery.kitchen,
      ...eventImages,
    ],
    food: siteConfig.images.gallery.food,
    restaurant: siteConfig.images.gallery.restaurant,
    kitchen: siteConfig.images.gallery.kitchen,
    events: eventImages,
  };
  const currentImages = allImages[activeTab];

  const openViewer = useCallback((index: number) => setViewerIndex(index), []);
  const closeViewer = useCallback(() => setViewerIndex(null), []);

  const goNext = useCallback(() => {
    setViewerIndex((i) => (i !== null ? (i + 1) % currentImages.length : null));
  }, [currentImages.length]);

  const goPrev = useCallback(() => {
    setViewerIndex((i) =>
      i !== null ? (i - 1 + currentImages.length) % currentImages.length : null,
    );
  }, [currentImages.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (viewerIndex === null) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [viewerIndex, closeViewer, goNext, goPrev]);

  return (
    <section id="gallery" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="font-[family-name:var(--font-poppins)] mb-2 text-sm tracking-widest text-gold uppercase">
            Moments We Cherish
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-primary-green md:text-5xl">
            Our <span className="text-gradient-gold">Gallery</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setViewerIndex(null);
              }}
              className={`rounded-full px-4 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm font-medium font-[family-name:var(--font-poppins)] transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-primary-green text-ivory shadow-luxury-md'
                  : 'bg-white text-wood-brown hover:bg-primary-green/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          >
            {currentImages.map((src, i) => (
              <motion.div
                key={`${activeTab}-${src}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`mb-4 break-inside-avoid ${heightClasses[i % heightClasses.length]}`}
              >
                <div
                  className="group relative h-full cursor-pointer overflow-hidden rounded-[24px] shadow-luxury-md"
                  onClick={() => openViewer(i)}
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                    fill
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                    <Eye className="size-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Viewer Dialog */}
      <Dialog open={viewerIndex !== null} onOpenChange={(open) => !open && closeViewer()}>
        {viewerIndex !== null && (
          <DialogContent
            showCloseButton={false}
            className="flex max-w-none items-center justify-center border-none bg-transparent p-0 sm:max-w-none inset-0 translate-x-0 translate-y-0 top-0 left-0"
          >
            <DialogTitle className="sr-only">Gallery Image Viewer</DialogTitle>
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative aspect-[4/3] h-[60vh] w-[95vw] sm:h-[80vh] sm:w-[90vw] max-w-5xl">
                <Image
                  src={currentImages[viewerIndex]}
                  alt={`Gallery image ${viewerIndex + 1}`}
                  className="h-full w-full object-contain"
                  fill
                  loading="lazy"
                />
              </div>

              {/* Nav arrows */}
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 sm:p-3 text-white backdrop-blur-sm transition hover:bg-white/20 md:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 sm:p-3 text-white backdrop-blur-sm transition hover:bg-white/20 md:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="size-6" />
              </button>

              {/* Close button */}
              <DialogClose className="absolute right-3 top-3 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20">
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1.5 font-[family-name:var(--font-poppins)] text-xs sm:px-4 sm:py-2 sm:text-sm text-white backdrop-blur-sm">
                {viewerIndex + 1} / {currentImages.length}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}