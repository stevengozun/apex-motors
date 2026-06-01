import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gauge, Timer, Zap, Cog, Fuel, Compass, Check } from 'lucide-react';
import type { Car } from '../data/cars';
import { formatPrice } from '../lib/format';

const ease = [0.22, 1, 0.36, 1] as const;

export default function CarModal({
  car,
  onClose,
}: {
  car: Car | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!car) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [car, onClose]);

  const specs = car
    ? [
        { icon: Gauge, label: 'Power', value: `${car.horsepower} hp` },
        { icon: Timer, label: '0–60 mph', value: `${car.zeroToSixty}s` },
        { icon: Zap, label: 'Top speed', value: `${car.topSpeed} mph` },
        { icon: Cog, label: 'Transmission', value: car.transmission },
        { icon: Compass, label: 'Drivetrain', value: car.drivetrain },
        { icon: Fuel, label: 'Powertrain', value: car.fuel },
      ]
    : [];

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${car.brand} ${car.model} details`}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-900 shadow-card sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                <div className="absolute bottom-5 left-6 flex items-center gap-3">
                  <img
                    src={`/logos/${car.brand.toLowerCase().replace('mercedes-benz', 'mercedes')}.svg`}
                    alt=""
                    aria-hidden
                    className="h-8 w-8"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                      {car.brand} · {car.year}
                    </p>
                    <h2 className="font-display text-3xl font-600 text-white sm:text-4xl">
                      {car.model}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Starting price
                    </p>
                    <p className="font-display text-4xl font-700 text-white">
                      {formatPrice(car.price)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      onClick={onClose}
                      className="rounded-full bg-accent px-6 py-3 text-sm font-500 text-white shadow-glow transition-transform hover:scale-[1.04]"
                    >
                      Schedule a Test Drive
                    </a>
                    <a
                      href="#contact"
                      onClick={onClose}
                      className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-500 text-white transition-colors hover:bg-white/10"
                    >
                      Request a Quote
                    </a>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-3">
                  {specs.map((s) => (
                    <div key={s.label} className="bg-ink-800 p-5">
                      <s.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                      <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-500">
                        {s.label}
                      </p>
                      <p className="mt-0.5 text-base font-500 text-white">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="font-display text-lg font-600 text-white">
                    Included with every Apex delivery
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      'Multi-point certified inspection',
                      'Complimentary white-glove delivery',
                      '2-year Apex assurance warranty',
                      'Concierge financing & trade-in',
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm text-slate-300"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
