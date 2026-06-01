import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Check } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer id="contact" className="relative scroll-mt-20">
      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-10 sm:p-16"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-600 leading-tight text-balance sm:text-5xl">
                Begin your acquisition
              </h2>
              <p className="mt-4 max-w-md text-slate-300/90">
                Tell us what you're looking for. A personal advisor will reach
                out within the hour to arrange a private viewing or test drive.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <a
                  href="tel:+18005550199"
                  className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  +1 800 555 0199
                </a>
                <a
                  href="mailto:concierge@apexmotors.com"
                  className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  concierge@apexmotors.com
                </a>
                <p className="flex items-center gap-3 text-slate-300">
                  <MapPin className="h-4 w-4 text-accent" />
                  1 Grand Boulevard, Beverly Hills, CA
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="flex flex-col justify-center gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-wider text-slate-400"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
                />
              </div>
              <button
                type="submit"
                className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-500 transition-all duration-200 ${
                  sent
                    ? 'bg-emerald-500 text-white'
                    : 'bg-accent text-white shadow-glow hover:scale-[1.02]'
                }`}
              >
                {sent ? (
                  <>
                    <Check className="h-4 w-4" /> Request received
                  </>
                ) : (
                  <>
                    Request a callback
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-500">
                No spam — just one advisor, one conversation.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row lg:px-10">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded bg-accent text-white">
              <span className="font-display text-sm font-700 leading-none">A</span>
            </span>
            <span className="font-display text-base font-600 text-slate-300">
              Apex<span className="text-accent">.</span> Motors
            </span>
          </div>
          <p>© {new Date().getFullYear()} Apex Motors. A concept showcase.</p>
          <div className="flex gap-6">
            <a href="#inventory" className="transition-colors hover:text-white">
              Collection
            </a>
            <a href="#experience" className="transition-colors hover:text-white">
              Experience
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
