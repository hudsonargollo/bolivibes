export interface ReportItem {
  id: string;
  title: string;
  filename: string;
  relativePath: string;
  category: string;
  content: string;
}

export const HERMES_REPORTS: ReportItem[] = [
  {
    id: "landing-auth",
    title: "Landing Hero, Slide-in Auth & Bilingual Auto-Detection Spec",
    filename: "landing-and-slidein-auth-specs.md",
    relativePath: "docs/landing-and-slidein-auth-specs.md",
    category: "Architecture & Frontend",
    content: `# BoliVibes — Landing Hero Redesign, Slide-in Auth Drawer & Bilingual Auto-Detection

This document details the technical and design specification for the BoliVibes Landing Page evolution, integrating:
1. Slide-in Authentication Drawer: Immediate access to Sign In and Sign Up without leaving the homepage context.
2. Automatic Language Detection (ES / EN): Intelligent browser/device language detection with local persistence.
3. Hero Optimization & Brand Storytelling: New visual layout, persuasive copywriting for both visitors and venue hosts.
4. Brand Illustration Prompts: Exact specifications for Midjourney / Imagen based on Bolivian clay aesthetics and warm tones.

---

## 1. User Experience (UX): Slide-in Auth Drawer

Instead of redirecting users to isolated auth pages, main CTAs trigger a Framer Motion Slide-in Drawer:
* Frictionless Access: Users maintain 3D map and city context while interacting with authentication.
* Interactive Tabs: Seamless toggle between Sign In and Sign Up.
* Dual Roles: Explicit welcome for end-user visitors and business owners/creators.

---

## 2. Automatic Language Detection (Smart ES / EN)

The system automatically checks browser preferences on load:
- Spanish (ES) set as default for local markets.
- English (EN) auto-enabled for international visitors or English browser configurations.
- Persistent manual toggle in the top header.

---

## 3. Brand Illustration Prompts (BoliVibes Aesthetic)

### Prompt 1: Hero Illustration / Ambient Background (3D Clay Style)
> A warm Bolivian clay aesthetic scene of Santa Cruz de la Sierra nightlife and urban culture, matte terracotta red #C04A2F, vibrant orange #E2792F, golden yellow #E3A52F, sage green #8BA672, and cream #F4EEE2 surfaces. Soft rounded geometric shapes, glowing ambient orbs, modern isometric city skyline with cathedral steeple and palm trees, cozy warm lighting, premium editorial style, high contrast, clean vectors, zero photorealism, no fake text. --ar 16:9 --v 6.0

### Prompt 2: Background Texture & Orbs (Framer-like Ambient)
> Abstract subtle clay texture background with floating blurred glowing spheres in golden yellow, terracotta, and soft sage, matte ceramic finish, depth of field, warm organic aesthetic, minimalist branding background. --ar 16:9 --v 6.0
`,
  },
  {
    id: "agents-spec",
    title: "BoliVibes Monorepo & Agent Instructions",
    filename: "AGENTS.md",
    relativePath: "AGENTS.md",
    category: "Monorepo & DevOps",
    content: `# BoliVibes Agent Instructions

## Project overview

BoliVibes is a pnpm/Turbo monorepo.

- apps/web: Next.js 15 App Router deployed to Cloudflare Workers through @opennextjs/cloudflare.
- apps/mobile: Expo Router mobile app.
- apps/cron-worker: Cloudflare Worker for scheduled notifications/emails.
- packages/*: shared schema, database, API client, AI, notifications, and design tokens.

## Environment

- Use Node 22 or newer.
- Use pnpm 10.13.1, matching packageManager in package.json.
- Do not commit secrets. Cloudflare Worker secrets are set with wrangler secret put.

## Common commands

Run from the repository root unless noted.

- Install: pnpm install
- Build all: pnpm build
- Lint all: pnpm lint
- Typecheck all: pnpm typecheck
- Web build: pnpm --filter @bolivibes/web build
- Web deploy: pnpm --filter @bolivibes/web deploy
- Cron worker build/typecheck: pnpm --filter @bolivibes/cron-worker build
- Cron worker deploy: pnpm --filter @bolivibes/cron-worker deploy
- Mobile export build: pnpm --filter @bolivibes/mobile build
`,
  },
  {
    id: "design-system",
    title: "Sun-Mark Identity & Brand Design System (Brand Guide v1.0)",
    filename: "DESIGN-SYSTEM.md",
    relativePath: "BRANDGUIDE/DESIGN-SYSTEM.md",
    category: "Brand & UI",
    content: `# BoliVibes Brand Design System (Brand Guide v1.0)

Source of truth for the sun-mark identity and brand design tokens.
All logo assets are consolidated to two base forms across web and mobile:
1. logo-clay.webp (Primary 3D wordmark & hero visual)
2. logo-icon.webp (App icon, favicon, 3D map pins, and header mark)

Colors:
- Terracotta Red: #C04A2F
- Vibrant Orange: #E2792F
- Golden Yellow: #E3A52F
- Sage Green: #8BA672
- Cream: #F4EEE2
- Charcoal Dark: #33302C
`,
  },
];
