import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const links = [
  { label: 'Collection', href: '#inventory' },
  { label: 'Brands', href: '#brands' },
  { label: 'Experience', href: '#experience' },
  { label: 'Finance', href: '#finance' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-ink-950/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-white shadow-glow">
            <span className="font-display text-xl font-700 leading-none">A</span>
          </span>
          <span className="font-display text-xl font-600 tracking-wide">
            Apex<span className="text-accent">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-400 tracking-wide text-slate-300 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            +1 800 555 0199
          </a>
          <a
            href="#inventory"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-500 text-ink-950 transition-transform duration-200 hover:scale-[1.04]"
          >
            Book a Test Drive
          </a>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md text-slate-200 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-t border-white/5 bg-ink-950/95 px-6 pb-6 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-slate-200 transition-colors hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#inventory"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-500 text-white"
            >
              Book a Test Drive
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
