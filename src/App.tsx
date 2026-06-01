import { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inventory from './components/Inventory';
import Experience from './components/Experience';
import FinanceCalculator from './components/FinanceCalculator';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CarModal from './components/CarModal';
import type { Car } from './data/cars';

export default function App() {
  const [selected, setSelected] = useState<Car | null>(null);

  return (
    <div className="min-h-dvh bg-ink-950">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Inventory onSelect={setSelected} />
        <Experience />
        <FinanceCalculator />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <CarModal car={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
