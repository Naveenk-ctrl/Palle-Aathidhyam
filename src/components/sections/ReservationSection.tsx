'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarCheck, CheckCircle2, Clock, Phone } from 'lucide-react';
import { useSiteConfig } from '@/components/providers/site-config-provider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { backendUrl } from '@/lib/backend';

const ic = 'rounded-[18px] bg-ivory border-border focus-visible:border-gold focus-visible:ring-gold/20';
const lc = 'font-[family-name:var(--font-poppins)] text-sm font-medium text-foreground/80 mb-1.5 block';

const timeSlots = Array.from({ length: 23 }, (_, i) => {
  const m = 660 + i * 30;
  if (m > 1320) return null;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const p = h >= 12 ? 'PM' : 'AM';
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${mm.toString().padStart(2, '0')} ${p}`;
}).filter(Boolean) as string[];

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit Indian number'),
  email: z.string().email('Enter a valid email'),
  guests: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  time: z.string().min(1, 'Required'),
  occasion: z.string().min(1, 'Required'),
  requests: z.string().max(500, 'Max 500 characters').optional(),
});

type FV = z.infer<typeof schema>;
const anim = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: i * 0.07, duration: 0.5 },
});

function FieldState({ error, dirty, children, cls }: { error?: string; dirty?: boolean; cls?: string; children?: React.ReactNode }) {
  return (
    <>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
}

export default function ReservationSection() {
  const { siteConfig } = useSiteConfig();
  const [ok, setOk] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<FV>({ resolver: zodResolver(schema), mode: 'onChange' });

  if (ok) {
    return (
      <section id="reservation" className="min-h-[80vh] flex items-center justify-center bg-cream py-20 px-4">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury-lg">
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </motion.div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl text-primary-green mb-3">Reservation Confirmed!</h2>
          <p className="text-wood-brown/70 max-w-md mx-auto">We look forward to welcoming you. A confirmation will be sent to your email shortly.</p>
        </motion.div>
      </section>
    );
  }

  const selCls = (name: keyof FV) =>
    `${ic} w-full ${errors[name] ? 'border-red-500' : dirtyFields[name] ? 'border-leaf-green' : ''}`;

  const onSubmit = async (data: FV) => {
    const response = await fetch(backendUrl('/api/reservation'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit reservation request');
    }

    setOk(true);
  };

  return (
    <section id="reservation" className="bg-cream py-16 lg:py-0">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left decorative panel */}
        <div className="hidden lg:block relative overflow-hidden">
          <Image src={siteConfig.images.interiors[1]} alt="Restaurant interior" fill loading="lazy" className="object-cover" />
          <div className="absolute inset-0 bg-primary-green/80" />
          <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="font-[family-name:var(--font-cormorant)] text-5xl mb-4">Reserve Your Experience</motion.h2>
            <p className="text-white/70 mb-10 max-w-md leading-relaxed">
              Indulge in an authentic Telugu dining experience, handcrafted with love using farm-fresh ingredients and age-old recipes.
            </p>
            <div className="space-y-5 text-white/80 text-sm">
              <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div><p className="font-semibold text-white">Weekdays</p><p>{siteConfig.footerLinks.hours.weekdays}</p></div></div>
              <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div><p className="font-semibold text-white">Weekends</p><p>{siteConfig.footerLinks.hours.weekends}</p></div></div>
              <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div><p className="font-semibold text-white">Call Us</p><p>{siteConfig.footerLinks.contact.phone}</p></div></div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex items-center justify-center p-5 sm:p-10 lg:p-16">
          <motion.form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-4">
            <motion.div {...anim(0)} className="mb-8">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-4xl text-primary-green">Book a Table</h2>
              <p className="text-wood-brown/60 text-sm mt-2">Fill in the details and we&apos;ll confirm your reservation.</p>
            </motion.div>

            <motion.div {...anim(1)}><label className={lc}>Full Name *</label>
              <FieldState error={errors.name?.message} dirty={!!dirtyFields.name}>
                <Input className={`${ic} w-full ${errors.name ? 'border-red-500' : dirtyFields.name ? 'border-leaf-green' : ''}`} {...register('name')} placeholder="Your full name" />
              </FieldState></motion.div>

            <motion.div {...anim(2)}><label className={lc}>Phone Number *</label>
              <FieldState error={errors.phone?.message} dirty={!!dirtyFields.phone}>
                <Input className={`${ic} w-full ${errors.phone ? 'border-red-500' : dirtyFields.phone ? 'border-leaf-green' : ''}`} {...register('phone')} placeholder="10-digit mobile number" maxLength={10} />
              </FieldState></motion.div>

            <motion.div {...anim(3)}><label className={lc}>Email *</label>
              <FieldState error={errors.email?.message} dirty={!!dirtyFields.email}>
                <Input className={`${ic} w-full ${errors.email ? 'border-red-500' : dirtyFields.email ? 'border-leaf-green' : ''}`} {...register('email')} type="email" placeholder="your@email.com" />
              </FieldState></motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <motion.div {...anim(4)}><label className={lc}>Guests *</label>
                <Controller control={control} name="guests" render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selCls('guests')}><SelectValue placeholder="1–20" /></SelectTrigger>
                    <SelectContent>{Array.from({ length: 20 }, (_, i) => <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
                {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
              </motion.div>

              <motion.div {...anim(5)}><label className={lc}>Date *</label>
                <FieldState error={errors.date?.message} dirty={!!dirtyFields.date}>
                  <Input className={`${ic} w-full ${errors.date ? 'border-red-500' : dirtyFields.date ? 'border-leaf-green' : ''}`} {...register('date')} type="date" min={new Date().toISOString().split('T')[0]} />
                </FieldState></motion.div>

              <motion.div {...anim(6)}><label className={lc}>Time *</label>
                <Controller control={control} name="time" render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selCls('time')}><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent className="max-h-48">{timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
              </motion.div>
            </div>

            <motion.div {...anim(7)}><label className={lc}>Occasion *</label>
              <Controller control={control} name="occasion" render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={selCls('occasion')}><SelectValue placeholder="Select occasion" /></SelectTrigger>
                  <SelectContent>
                    {['Casual', 'Birthday', 'Anniversary', 'Corporate', 'Family Gathering', 'Other'].map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} />
              {errors.occasion && <p className="text-red-500 text-xs mt-1">{errors.occasion.message}</p>}
            </motion.div>

            <motion.div {...anim(8)}><label className={lc}>Special Requests</label>
              <Textarea {...register('requests', { maxLength: 500 })} className={`${ic} min-h-[80px] resize-none`} placeholder="Dietary requirements, seating preference..." />
              {errors.requests && <p className="text-red-500 text-xs mt-1">{errors.requests.message}</p>}
            </motion.div>

            <motion.div {...anim(9)}>
              <Button type="submit" className="w-full h-12 rounded-[18px] bg-gold hover:bg-gold/90 text-primary-green font-semibold text-base shadow-gold transition-colors">
                <CalendarCheck className="w-5 h-5 mr-2" /> Reserve Table
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}