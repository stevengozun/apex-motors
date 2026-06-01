import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: 'Do you ship vehicles nationwide?',
    a: 'Yes. Every purchase includes complimentary enclosed, insured delivery to any address in the continental United States, fully detailed and ready to drive.',
  },
  {
    q: 'Can I trade in my current car?',
    a: 'Absolutely. Share your details and we will provide a competitive, no-obligation valuation within 24 hours, applied directly against your new vehicle.',
  },
  {
    q: 'What financing options are available?',
    a: 'We offer tailored finance, lease, and balloon structures through our network of premium lenders, with instant pre-approval and rates from 1.9% APR for qualified buyers.',
  },
  {
    q: 'Are the vehicles certified?',
    a: 'Every car undergoes an independent 200-point inspection and comes with a 2-year Apex assurance warranty and full service history.',
  },
  {
    q: 'Can I reserve a car before viewing?',
    a: 'Yes. A fully refundable deposit holds any vehicle for 7 days, giving you time to arrange a private viewing or a test drive at your convenience.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-500 uppercase tracking-[0.3em] text-slate-400">
              Questions
            </span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-display text-4xl font-600 leading-tight text-balance sm:text-5xl">
            Everything you need to know
          </h2>
        </motion.div>

        <div className="mt-12 divide-y divide-white/8 border-y border-white/8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg font-500 text-white">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-slate-300"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-slate-300/90">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
