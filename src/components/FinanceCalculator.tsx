import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { cars } from '../data/cars';
import { formatPrice } from '../lib/format';

const ease = [0.22, 1, 0.36, 1] as const;

export default function FinanceCalculator() {
  const [price, setPrice] = useState(150000);
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm] = useState(60);
  const [apr, setApr] = useState(5.9);

  const down = Math.round((price * downPct) / 100);

  const monthly = useMemo(() => {
    const principal = price - down;
    const r = apr / 100 / 12;
    if (r === 0) return principal / term;
    return (principal * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
  }, [price, down, term, apr]);

  const totalInterest = monthly * term - (price - down);

  return (
    <section
      id="finance"
      className="relative scroll-mt-20 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Copy */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs font-500 uppercase tracking-[0.3em] text-slate-400">
                Finance
              </span>
            </div>
            <h2 className="font-display text-4xl font-600 leading-tight text-balance sm:text-5xl">
              Estimate your monthly drive
            </h2>
            <p className="mt-5 max-w-md text-slate-300/90">
              Adjust the terms to see an indicative monthly payment. Our finance
              specialists will tailor a structure — including leasing and
              balloon options — to suit you.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/8 bg-ink-800/60 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Amount financed
                </p>
                <p className="mt-1 font-display text-2xl font-600 text-white">
                  {formatPrice(price - down)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-ink-800/60 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Total interest
                </p>
                <p className="mt-1 font-display text-2xl font-600 text-white">
                  {formatPrice(Math.max(0, Math.round(totalInterest)))}
                </p>
              </div>
            </div>
          </div>

          {/* Calculator card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-7 shadow-card sm:p-9">
            <div className="mb-7 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-300">
                <Calculator className="h-4 w-4 text-accent" /> Payment estimator
              </span>
              <label htmlFor="fin-model" className="sr-only">
                Choose a model
              </label>
              <select
                id="fin-model"
                onChange={(e) => e.target.value && setPrice(Number(e.target.value))}
                className="cursor-pointer rounded-full border border-white/10 bg-ink-950 px-3 py-1.5 text-xs text-white outline-none focus-visible:ring-2 focus-visible:ring-accent"
                defaultValue=""
              >
                <option value="">Choose a model…</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.price}>
                    {c.brand} {c.model}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl bg-ink-950/60 p-6 text-center">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Estimated monthly payment
              </p>
              <p className="mt-2 font-display text-5xl font-700 text-white tabular-nums">
                {formatPrice(Math.round(monthly))}
                <span className="text-lg font-400 text-slate-400">/mo</span>
              </p>
            </div>

            <div className="mt-7 space-y-6">
              <Slider
                label="Vehicle price"
                value={formatPrice(price)}
                min={50000}
                max={550000}
                step={5000}
                current={price}
                onChange={setPrice}
              />
              <Slider
                label="Down payment"
                value={`${downPct}% · ${formatPrice(down)}`}
                min={0}
                max={60}
                step={5}
                current={downPct}
                onChange={setDownPct}
              />
              <Slider
                label="Term"
                value={`${term} months`}
                min={24}
                max={84}
                step={12}
                current={term}
                onChange={setTerm}
              />
              <Slider
                label="APR"
                value={`${apr.toFixed(1)}%`}
                min={1.9}
                max={12.9}
                step={0.5}
                current={apr}
                onChange={setApr}
              />
            </div>

            <a
              href="#contact"
              className="mt-8 block rounded-xl bg-accent py-3.5 text-center text-sm font-500 text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              Get pre-approved
            </a>
            <p className="mt-3 text-center text-xs text-slate-500">
              Indicative only. Not a finance offer.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
}) {
  const pct = ((current - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm text-slate-300">{label}</label>
        <span className="text-sm font-500 text-white tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white"
        style={{
          background: `linear-gradient(to right, #DC2626 ${pct}%, rgba(255,255,255,0.12) ${pct}%)`,
        }}
      />
    </div>
  );
}
