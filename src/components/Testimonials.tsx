import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote:
      'From the first call to delivery, the experience was flawless. My Taycan arrived gleaming, exactly as promised. This is how buying a car should feel.',
    name: 'Daniel R.',
    role: 'Porsche Taycan Turbo S owner',
  },
  {
    quote:
      'I traded in two cars and Apex made the paperwork disappear. Transparent pricing, no pressure, and an advisor who actually knew the machines.',
    name: 'Sofia M.',
    role: 'Ferrari Roma owner',
  },
  {
    quote:
      'The white-glove delivery was unreal — they walked me through every feature on my driveway. I have already recommended them to three friends.',
    name: 'James O.',
    role: 'BMW M4 Competition owner',
  },
];

export default function Testimonials() {
  return (
    <section className="relative border-y border-white/5 bg-ink-900/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs font-500 uppercase tracking-[0.3em] text-slate-400">
                Client Stories
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-4xl font-600 leading-tight text-balance sm:text-5xl">
              Trusted by collectors & enthusiasts
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm text-slate-300">
              <span className="font-600 text-white">4.9</span> / 5 · 1,200+ reviews
            </span>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-white/8 bg-ink-800/60 p-7"
            >
              <Quote className="h-8 w-8 text-accent/60" />
              <blockquote className="mt-4 flex-1 text-slate-200">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-white/8 pt-5">
                <p className="font-500 text-white">{t.name}</p>
                <p className="text-sm text-slate-400">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
