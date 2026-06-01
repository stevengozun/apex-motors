import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Banknote, Sparkles } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Certified & Inspected',
    body: 'Every vehicle passes a rigorous 200-point inspection by master technicians before it earns the Apex seal.',
  },
  {
    icon: Truck,
    title: 'White-Glove Delivery',
    body: 'Your car arrives enclosed and detailed, anywhere in the country, on your schedule.',
  },
  {
    icon: Banknote,
    title: 'Bespoke Financing',
    body: 'Tailored finance and lease structures arranged by our in-house specialists, with instant pre-approval.',
  },
  {
    icon: Sparkles,
    title: 'Lifetime Concierge',
    body: 'From servicing to your next acquisition, a dedicated advisor stays with you for the long haul.',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-y border-white/5 bg-ink-900/50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-500 uppercase tracking-[0.3em] text-slate-400">
              The Apex Experience
            </span>
          </div>
          <h2 className="font-display text-4xl font-600 leading-tight text-balance sm:text-5xl">
            Ownership, elevated to an art form
          </h2>
          <p className="mt-5 text-slate-300/90">
            Buying an exceptional car should feel exceptional. We've removed the
            friction at every step so you can focus on the drive.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="group bg-ink-900 p-8 transition-colors hover:bg-ink-800"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/12 text-accent transition-transform duration-300 group-hover:scale-110">
                <f.icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-xl font-600 text-white">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
