# Aether Motors — EV Showcase Website

A fictional electric hypercar brand showcase website featuring an interactive 3D-style vehicle configurator, live specs comparison, financing calculator, and a global showroom network — built as a front-end portfolio project.

**🔗 Live Demo:** [aethermotors-showcase.netlify.app](https://aethermotors-showcase.netlify.app)

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)

## Overview

Aether Motors is a concept EV automaker landing page inspired by modern hyper-luxury car brand sites. It showcases a fleet of four fictional electric vehicles (a hypercar, a grand sedan, a cyber SUV, and a roadster) with rich interactive features throughout.

## Features

- **Interactive 3D-Style Configurator** — Customize paint, wheels, interior, ambient lighting, and option packages, with a live Canvas-based vehicle visualizer rendering 5 different camera angles (front 3/4, side profile, rear diffuser, interior cockpit, and an aerodynamics wind-tunnel view)
- **Live Pricing & Financing** — Real-time price breakdown as you configure, plus a dedicated loan/lease calculator with adjustable term, down payment, and APR
- **Side-by-Side Comparison Tool** — Compare specs across models with automatic "best in class" highlighting
- **VIP Test Drive Booking** — A 4-step booking wizard that generates a digital pass with a booking reference
- **Pre-Order Flow** — A simulated reservation checkout with a build summary and deposit breakdown
- **Global Showroom & Charging Network** — Browsable map of showroom locations with amenities and live stall availability
- **Press & Owner Reviews** — Editorial accolades and verified owner testimonials
- **Ambient Sound Design** — A small Web Audio API synthesizer for UI clicks, "engine" launch sounds, and startup chimes

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for tooling and dev server
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **HTML5 Canvas API** for the vehicle visualizer (no 3D engine — all hand-drawn 2D graphics)

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

The dev server runs at `http://localhost:3000` by default.

## Project Structure

```
src/
├── components/       # All UI components (Navbar, Hero, Configurator, etc.)
├── data/             # Static vehicle, showroom, and review data
├── types/            # Shared TypeScript interfaces
├── utils/            # Web Audio sound engine
├── App.tsx           # Root component composing all sections
└── main.tsx          # App entry point
```

## Notes

This is a demo/portfolio project — Aether Motors is a fictional brand, and all vehicle specs, pricing, and locations are illustrative rather than real product data.

## License

This project is open source and available for learning purposes.
