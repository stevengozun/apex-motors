import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { brands, cars, type BodyType, type Car } from '../data/cars';
import CarCard from './CarCard';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'power';

const bodyTypes: (BodyType | 'All')[] = ['All', 'Coupe', 'Sedan', 'SUV'];

export default function Inventory({
  onSelect,
}: {
  onSelect: (car: Car) => void;
}) {
  const [brand, setBrand] = useState<string>('All');
  const [body, setBody] = useState<BodyType | 'All'>('All');
  const [sort, setSort] = useState<Sort>('featured');

  const filtered = useMemo(() => {
    let list = cars.filter(
      (c) =>
        (brand === 'All' || c.brand === brand) &&
        (body === 'All' || c.body === body),
    );
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'power':
        list = [...list].sort((a, b) => b.horsepower - a.horsepower);
        break;
      default:
        list = [...list].sort(
          (a, b) => (a.tag === 'Featured' ? -1 : 0) - (b.tag === 'Featured' ? -1 : 0),
        );
    }
    return list;
  }, [brand, body, sort]);

  const brandCount = (name: string) =>
    name === 'All' ? cars.length : cars.filter((c) => c.brand === name).length;

  return (
    <section id="inventory" className="relative scroll-mt-20 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs font-500 uppercase tracking-[0.3em] text-slate-400">
                The Collection
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-4xl font-600 leading-tight text-balance sm:text-5xl">
              Find your next masterpiece
            </h2>
          </motion.div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <SlidersHorizontal className="h-4 w-4" />
            <label htmlFor="sort" className="sr-only">
              Sort vehicles
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer rounded-full border border-white/10 bg-ink-800 px-4 py-2.5 text-sm text-white outline-none transition-colors hover:border-white/25 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <option value="featured">Featured first</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="power">Most powerful</option>
            </select>
          </div>
        </div>

        {/* Brand filter */}
        <div id="brands" className="mt-10 flex scroll-mt-24 flex-wrap gap-2.5">
          <BrandChip
            active={brand === 'All'}
            label="All Brands"
            count={brandCount('All')}
            onClick={() => setBrand('All')}
          />
          {brands.map((b) => (
            <BrandChip
              key={b.name}
              active={brand === b.name}
              label={b.name}
              logo={b.logo}
              count={brandCount(b.name)}
              onClick={() => setBrand(b.name)}
            />
          ))}
        </div>

        {/* Body type filter */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs uppercase tracking-wider text-slate-500">
            Body
          </span>
          {bodyTypes.map((t) => (
            <button
              key={t}
              onClick={() => setBody(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-500 transition-colors ${
                body === t
                  ? 'bg-white text-ink-950'
                  : 'border border-white/10 text-slate-300 hover:border-white/30'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="mt-8 text-sm text-slate-400">
          Showing <span className="font-600 text-white">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'vehicle' : 'vehicles'}
          {brand !== 'All' && (
            <>
              {' '}
              from <span className="text-white">{brand}</span>
            </>
          )}
        </p>

        {/* Grid */}
        <motion.div
          layout
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} onSelect={onSelect} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 py-20 text-center">
            <p className="text-slate-300">
              No vehicles match these filters yet.
            </p>
            <button
              onClick={() => {
                setBrand('All');
                setBody('All');
              }}
              className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm font-500 text-white"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function BrandChip({
  active,
  label,
  count,
  logo,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  logo?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-500 transition-all duration-200 ${
        active
          ? 'border-accent bg-accent/15 text-white'
          : 'border-white/10 bg-ink-800/50 text-slate-300 hover:border-white/30 hover:text-white'
      }`}
    >
      {logo && (
        <img
          src={logo}
          alt=""
          aria-hidden
          className={`h-4 w-4 transition-opacity ${active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
        />
      )}
      {label}
      <span
        className={`rounded-full px-1.5 text-[11px] tabular-nums ${
          active ? 'bg-accent text-white' : 'bg-white/10 text-slate-400'
        }`}
      >
        {count}
      </span>
    </button>
  );
}
