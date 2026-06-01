import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { Gauge, Timer, Zap, ArrowUpRight } from 'lucide-react';
import type { Car } from '../data/cars';
import { formatPrice } from '../lib/format';

const ease = [0.22, 1, 0.36, 1] as const;

const tagStyles: Record<string, string> = {
  New: 'bg-accent text-white',
  Featured: 'bg-white text-ink-950',
  Certified: 'bg-emerald-500/90 text-white',
};

export default function CarCard({
  car,
  onSelect,
  index = 0,
}: {
  car: Car;
  onSelect: (car: Car) => void;
  index?: number;
}) {
  const reduce = useReducedMotion();

  // Pointer position (0..1) drives 3D tilt + light glare
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), {
    stiffness: 150,
    damping: 18,
  });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(240px circle at ${glareX} ${glareY}, rgba(255,255,255,0.14), transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.button
      layout
      onClick={() => onSelect(car)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease, delay: Math.min(index * 0.06, 0.5) }}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1100,
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-800/60 text-left shadow-card backdrop-blur-sm transition-[box-shadow,border-color] duration-300 hover:border-accent/40 hover:shadow-[0_34px_90px_-24px_rgba(220,38,38,0.4)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent opacity-80" />

        {car.tag && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + Math.min(index * 0.06, 0.5), duration: 0.4 }}
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-600 uppercase tracking-wider ${tagStyles[car.tag]}`}
          >
            {car.tag}
          </motion.span>
        )}

        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[11px] font-500 text-slate-200 backdrop-blur-sm">
          {car.body} · {car.fuel}
        </span>

        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <img
            src={`/logos/${car.brand.toLowerCase().replace('mercedes-benz', 'mercedes')}.svg`}
            alt=""
            aria-hidden
            className="h-5 w-5 opacity-90"
          />
          <span className="text-xs font-500 uppercase tracking-wider text-slate-300">
            {car.brand}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-600 leading-tight text-white">
              {car.model}
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">{car.year} Model</p>
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>

        {/* Specs */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/8 py-4">
          <Spec icon={<Gauge className="h-4 w-4" />} value={`${car.horsepower}`} label="hp" />
          <Spec icon={<Timer className="h-4 w-4" />} value={`${car.zeroToSixty}s`} label="0–60" />
          <Spec icon={<Zap className="h-4 w-4" />} value={`${car.topSpeed}`} label="mph top" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500">
              Starting at
            </p>
            <p className="font-display text-2xl font-600 text-white">
              {formatPrice(car.price)}
            </p>
          </div>
          <span className="rounded-full bg-white/8 px-4 py-2 text-xs font-500 text-slate-200 transition-colors group-hover:bg-accent group-hover:text-white">
            View details
          </span>
        </div>
      </div>

      {/* Cursor-following light glare */}
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.button>
  );
}

function Spec({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-accent/80">{icon}</span>
      <span className="text-sm font-600 text-white tabular-nums">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </span>
    </div>
  );
}
