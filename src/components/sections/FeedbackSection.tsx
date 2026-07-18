'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star, CheckCircle2, Send } from 'lucide-react';
import { reviews } from '@/constants';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { backendUrl } from '@/lib/backend';

const ic = 'rounded-[18px] bg-ivory border-border focus-visible:border-gold focus-visible:ring-gold/20';
const lc = 'font-[family-name:var(--font-poppins)] text-sm font-medium text-foreground/80 mb-1.5 block';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
  rating: z.number().min(1, 'Please select a rating').max(5),
  review: z.string().min(20, 'At least 20 characters').max(500, 'Max 500 characters'),
});

type FV = z.infer<typeof schema>;
const recent = reviews.slice(0, 4);

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} type="button" onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110 focus:outline-none" aria-label={`Rate ${i} stars`}>
          <Star className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${i <= (hover || value) ? 'fill-gold text-gold' : 'text-gray-300 fill-gray-300'}`} />
        </button>
      ))}
    </div>
  );
}

export default function FeedbackSection() {
  const [ok, setOk] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<FV>({ resolver: zodResolver(schema), mode: 'onChange', defaultValues: { rating: 0 } });

  const text = watch('review') || '';

  return (
    <section id="feedback" className="bg-cream py-16 px-4 sm:py-20 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl text-primary-green text-center mb-8 sm:mb-12">
          Share Your <span className="text-gold">Experience</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Feedback form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {ok ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                  className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4 shadow-luxury-md">
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </motion.div>
                <p className="font-[family-name:var(--font-cormorant)] text-2xl text-primary-green">Thank you for your feedback!</p>
                <p className="text-wood-brown/60 text-sm mt-2">Your review helps us serve you better.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(async (data) => {
                  const response = await fetch(backendUrl('/api/feedback'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  });

                  if (!response.ok) {
                    throw new Error('Failed to submit feedback');
                  }

                  setOk(true);
                })}
                className="space-y-4"
              >
                <div><label className={lc}>Your Name *</label>
                  <Input {...register('name')} placeholder="Your name"
                    className={`${ic} w-full ${errors.name ? 'border-red-500' : dirtyFields.name ? 'border-leaf-green' : ''}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div><label className={lc}>Phone Number</label>
                  <Input {...register('phone')} placeholder="Optional" className={`${ic} w-full`} />
                </div>

                <div><label className={lc}>Rating *</label>
                  <Controller control={control} name="rating" render={({ field }) => (
                    <div><StarRating value={field.value} onChange={field.onChange} />
                      {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}</div>
                  )} />
                </div>

                <div><label className={lc}>Your Review *</label>
                  <Textarea {...register('review')} placeholder="Tell us about your experience..."
                    className={`${ic} w-full min-h-[100px] resize-none ${errors.review ? 'border-red-500' : dirtyFields.review ? 'border-leaf-green' : ''}`} />
                  <div className="flex justify-between text-xs mt-1">
                    {errors.review ? <span className="text-red-500">{errors.review.message}</span> : <span />}
                    <span className={text.length > 500 ? 'text-red-500' : 'text-wood-brown/40'}>{text.length}/500</span>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-[18px] bg-gold hover:bg-gold/90 text-primary-green font-semibold shadow-gold transition-colors">
                  <Send className="w-4 h-4 mr-2" /> Submit Review
                </Button>
              </form>
            )}
          </motion.div>

          {/* Recent reviews */}
          <div className="space-y-4">
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl text-primary-green mb-2">Recent Reviews</h3>
            {recent.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-luxury-sm border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < Math.round(r.rating) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-wood-brown/50">{r.date}</span>
                </div>
                <p className="text-sm text-foreground/80 line-clamp-3 mb-3">&ldquo;{r.text}&rdquo;</p>
                <p className="text-sm font-semibold text-primary-green">&mdash; {r.name}, {r.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}