# Apex Motors

A premium, dark-luxury **car dealership** website — built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

**Live demo:** _coming soon_ · **Highlights:** cinematic video hero, interactive brand filtering, a live finance calculator, and fully responsive, accessible UI.

![Apex Motors](./public/hero-car.png)

## Features

- **Cinematic video hero** — a luxury-car video plays as the background with a still poster for instant load, layered with scroll parallax, real-time pointer parallax, a staggered headline reveal, animated stat counters, and an infinite brand marquee. Honors `prefers-reduced-motion`.
- **Real inventory** — 16 models across 7 marques (Porsche, Ferrari, Lamborghini, BMW, Mercedes-Benz, Audi, Tesla) with accurate specs (power, 0–60, top speed, transmission, drivetrain) and pricing.
- **Interactive filtering** — filter the grid by brand (logo + live count) and body type, and sort by price, power, or featured. Transitions use Framer Motion layout animations.
- **Vehicle detail modal** — full-bleed imagery, complete spec sheet, and CTAs, with a backdrop scrim, `Esc`-to-close, and scroll lock.
- **Finance calculator** — a live payment estimator (price / down payment / term / APR sliders, or pick a model) computing monthly payment, amount financed, and total interest.
- **Testimonials** and an **FAQ accordion** for social proof and objection handling.
- **3D tilt cards** with a cursor-tracking light glare, a scroll-progress indicator, and animated section reveals.
- Fully responsive (mobile → desktop) and keyboard accessible.

## Tech stack

| Area | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS (custom dark theme) |
| Animation | Framer Motion |
| Icons | Lucide |
| Type | Bodoni Moda + Jost |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Project structure

| Path | Purpose |
|---|---|
| `src/data/cars.ts` | Inventory + brand dataset |
| `src/components/Hero.tsx` | Animated video hero |
| `src/components/Inventory.tsx` | Brand/body filters, sort, animated grid |
| `src/components/CarCard.tsx` | Listing card (3D tilt + glare) |
| `src/components/CarModal.tsx` | Vehicle detail dialog |
| `src/components/FinanceCalculator.tsx` | Payment estimator |
| `src/components/Testimonials.tsx` · `FAQ.tsx` | Social proof & FAQ |

## Deployment

Optimised for **Cloudflare Pages** (or any static host):

- **Build command:** `npm run build`
- **Output directory:** `dist`

## Notes

Imagery is royalty-free stock used for demonstration. Apex Motors is a fictional brand created for this showcase.

## License

MIT
