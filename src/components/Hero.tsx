import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { brands } from '../data/cars';
import Counter from './Counter';

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Interactive mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const carX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const carY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const glowX = useTransform(sx, [-0.5, 0.5], [40, -40]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-dvh flex-col overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-ink-950" />
      <motion.div
        style={{ x: glowX }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-60" />

      {/* Background car video */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <motion.div
          style={{ x: carX, y: carY }}
          className="absolute -inset-[5%]"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease }}
        >
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-car.png"
            aria-label="Cinematic footage of a luxury sports car"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 lg:px-10"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-500 uppercase tracking-[0.3em] text-slate-300">
              Curated Performance & Luxury
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-4xl font-display text-5xl font-600 leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-8xl"
          >
            Drive the <span className="gradient-text">extraordinary</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg"
          >
            A hand-selected collection of the world's most exceptional
            automobiles. From track-bred supercars to electric grand tourers —
            find the one that moves you.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#inventory"
              className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-500 text-white shadow-glow transition-transform duration-200 hover:scale-[1.04]"
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#experience"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-500 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
            >
              The Apex Experience
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8"
          >
            {[
              { to: 250, suffix: '+', label: 'Vehicles in stock' },
              { to: 40, suffix: '', label: 'Marques represented' },
              { to: 98, suffix: '%', label: 'Client satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-600 text-white sm:text-4xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Brand marquee */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 border-t border-white/5 bg-ink-950/40 backdrop-blur-sm"
      >
        <div className="group flex overflow-hidden py-6">
          <div className="flex shrink-0 animate-none items-center gap-16 px-8 motion-safe:[animation:marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...brands, ...brands].map((b, i) => (
              <img
                key={b.name + i}
                src={b.logo}
                alt={b.name}
                className="h-7 w-auto opacity-50 grayscale transition hover:opacity-90"
              />
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
