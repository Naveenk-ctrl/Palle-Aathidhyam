'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSiteConfig } from '@/components/providers/site-config-provider';
import { backendUrl } from '@/lib/backend';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const hours = [
  { day: 'Monday – Friday', time: '11:00 AM – 3:00 PM, 6:00 PM – 10:30 PM' },
  { day: 'Saturday – Sunday', time: '10:00 AM – 11:00 PM' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function ContactSection() {
  const { siteConfig } = useSiteConfig();
  const [submitted, setSubmitted] = useState(false);
  const { contact } = siteConfig.footerLinks;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    const response = await fetch(backendUrl('/api/contact'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="bg-ivory py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="mb-10 sm:mb-14 text-center"
        >
          <p className="font-[family-name:var(--font-poppins)] mb-2 text-sm tracking-widest text-gold uppercase">
            We&apos;d Love to Hear From You
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-primary-green sm:text-4xl md:text-5xl">
            Get In <span className="text-gradient-gold">Touch</span>
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: Info + Map ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Address */}
            <motion.div custom={1} variants={fadeUp} className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-green/10">
                <MapPin className="size-5 text-primary-green" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-primary-green">
                  Visit Us
                </h3>
                <p className="font-[family-name:var(--font-poppins)] mt-1 text-sm text-wood-brown/80">
                  {contact.address}
                </p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div custom={2} variants={fadeUp} className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-green/10">
                <Phone className="size-5 text-primary-green" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-primary-green">
                  Call Us
                </h3>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="font-[family-name:var(--font-poppins)] mt-1 text-sm text-wood-brown/80 transition hover:text-primary-green"
                >
                  {contact.phone}
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div custom={3} variants={fadeUp} className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-green/10">
                <Mail className="size-5 text-primary-green" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-primary-green">
                  Email Us
                </h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-[family-name:var(--font-poppins)] mt-1 text-sm text-wood-brown/80 transition hover:text-primary-green"
                >
                  {contact.email}
                </a>
              </div>
            </motion.div>

            {/* Working Hours */}
            <motion.div custom={4} variants={fadeUp} className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-green/10">
                <Clock className="size-5 text-primary-green" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-primary-green">
                  Working Hours
                </h3>
                <div className="font-[family-name:var(--font-poppins)] mt-1 space-y-1 text-sm text-wood-brown/80">
                  {hours.map((h) => (
                    <p key={h.day}>
                      <span className="font-medium text-wood-brown">{h.day}:</span> {h.time}
                    </p>
                  ))}
                  <p className="mt-1 text-xs text-leaf-green">
                    Open 365 days — no weekly off!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div custom={5} variants={fadeUp}>
              <a
                href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(siteConfig.restaurantInfo.name)}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <MessageCircle className="size-5" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Map */}
            <motion.div custom={6} variants={fadeUp} className="overflow-hidden rounded-2xl shadow-luxury-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.0254209415!2d78.3809941!3d17.5062999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91005f859e41%3A0xc3359ba69c3f6184!2sPALLE+AATHIDHYAM!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant location on Google Maps"
                className="w-full"
              />
            </motion.div>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-[24px] bg-white p-6 shadow-luxury-lg md:p-8"
            >
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label className="font-[family-name:var(--font-poppins)] text-sm text-wood-brown">
                    Name *
                  </Label>
                  <Input
                    {...register('name')}
                    placeholder="Your name"
                    className="rounded-xl border-border bg-cream/50 font-[family-name:var(--font-poppins)]"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="font-[family-name:var(--font-poppins)] text-sm text-wood-brown">
                    Email *
                  </Label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-xl border-border bg-cream/50 font-[family-name:var(--font-poppins)]"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label className="font-[family-name:var(--font-poppins)] text-sm text-wood-brown">
                    Phone *
                  </Label>
                  <Input
                    {...register('phone')}
                    type="tel"
                    placeholder={contact.phone}
                    className="rounded-xl border-border bg-cream/50 font-[family-name:var(--font-poppins)]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <Label className="font-[family-name:var(--font-poppins)] text-sm text-wood-brown">
                    Subject *
                  </Label>
                  <Input
                    {...register('subject')}
                    placeholder="How can we help?"
                    className="rounded-xl border-border bg-cream/50 font-[family-name:var(--font-poppins)]"
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mt-5 space-y-1.5">
                <Label className="font-[family-name:var(--font-poppins)] text-sm text-wood-brown">
                  Message *
                </Label>
                <Textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="resize-none rounded-xl border-border bg-cream/50 font-[family-name:var(--font-poppins)]"
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="mt-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 rounded-full bg-leaf-green/10 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold text-leaf-green"
                  >
                    <CheckCircle className="size-5" />
                    Message sent successfully!
                  </motion.div>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-gold py-5 sm:py-6 font-[family-name:var(--font-poppins)] text-sm font-semibold text-primary-green shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-light-gold disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-primary-green/30 border-t-primary-green" />
                        Sending...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <Send className="size-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}