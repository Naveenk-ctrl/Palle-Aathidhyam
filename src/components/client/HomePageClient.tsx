'use client';

import dynamic from 'next/dynamic';
import { Navbar, Footer } from '@/components/layout';
import { SiteConfigProvider } from '@/components/providers/site-config-provider';

import HeroSection from '@/components/sections/HeroSection';

const WelcomeSection = dynamic(() => import('@/components/sections/WelcomeSection'));
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'));
const WhyChooseSection = dynamic(() => import('@/components/sections/WhyChooseSection'));
const SignatureDishesSection = dynamic(() => import('@/components/sections/SignatureDishesSection'));
const MenuSection = dynamic(() => import('@/components/sections/MenuSection'));
const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'));
const ReviewsSection = dynamic(() => import('@/components/sections/ReviewsSection'));
const StatisticsSection = dynamic(() => import('@/components/sections/StatisticsSection'));
const ReservationCTASection = dynamic(() => import('@/components/sections/ReservationCTASection'));
const ReservationSection = dynamic(() => import('@/components/sections/ReservationSection'));
const FeedbackSection = dynamic(() => import('@/components/sections/FeedbackSection'));
const InstagramSection = dynamic(() => import('@/components/sections/InstagramSection'));
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));

export default function HomePageClient() {
  return (
    <SiteConfigProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <WelcomeSection />
          <AboutSection />
          <WhyChooseSection />
          <SignatureDishesSection />
          <MenuSection />
          <ExperienceSection />
          <ReviewsSection />
          <StatisticsSection />
          <ReservationCTASection />
          <ReservationSection />
          <FeedbackSection />
          <InstagramSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </SiteConfigProvider>
  );
}