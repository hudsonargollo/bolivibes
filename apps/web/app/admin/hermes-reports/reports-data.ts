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
    content: `# BoliVibes — Rediseño del Hero, Panel Deslizante de Login y Multilingüismo Automático

Este documento detalla la especificación técnica y de diseño para la evolución de la página de inicio (Landing Page) de BoliVibes, integrando:
1. Panel deslizante de Autenticación (Slide-in Auth Drawer): Acceso inmediato a Iniciar Sesión y Crear Cuenta sin abandonar la página principal.
2. Detección Automática de Idioma (ES / EN): Adaptación inteligente basada en la configuración del navegador del usuario con persistencia local.
3. Optimización del Hero y Storytelling de Marca: Nueva disposición visual, mensajes persuasivos para ambos públicos (Exploradores y Negocios) y directrices estrictas de la identidad visual BoliVibes.
4. Prompts de Generación de Imagen (Brand Illustrations): Especificaciones exactas para Midjourney / Imagen basadas en la estética de arcilla boliviana y tonos cálidos.

---

## 1. Experiencia de Usuario (UX): Panel Deslizante de Autenticación

En lugar de redirigir al usuario a una página aislada de login o registro, las CTAs principales de la landing activan un Panel Deslizante Lateral (Slide-in Drawer) impulsado por framer-motion:
* Acceso sin fricción: El usuario mantiene el contexto visual del mapa 3D y de la ciudad de Santa Cruz de la Sierra mientras interactúa con el formulario.
* Pestañas Interactivas de Acceso: Selector fluido entre Iniciar Sesión (Sign In) y Crear Cuenta (Sign Up).
* Dualidad de Roles: Bienvenida explícita tanto para usuarios finales (exploradores/turistas) como para dueños de negocios y creadores de contenido (anfitriones).

---

## 2. Multilingüismo Automático (ES / EN Inteligente)

El sistema detecta automáticamente el idioma preferido del dispositivo o navegador al cargar la página:
- Español (ES) configurado como idioma predeterminado para el mercado local.
- Inglés (EN) activado automáticamente para visitantes internacionales o navegadores configurados en inglés.
- Control manual persistente mediante el selector de idioma en la barra superior.

---

## 3. Disposición del Hero y Copywriting Persuasivo

El Hero se reestructura en una cuadrícula asimétrica de alto impacto:
* Columna Izquierda (Propuesta de Valor & Acciones): Kicker BoliVibes · Santa Cruz de la Sierra, Headline principal y subtítulo explicativo de la agenda cultural en tiempo real, BoliPass y bolivIA.
* Columna Derecha (Tarjeta Interactiva de Acceso Rápido): Logo oficial arcilla 3D (logo-clay.webp) e icono de marca (logo-icon.webp) con micro-interacciones.

---

## 4. Prompts de Generación de Ilustraciones (Estética BoliVibes)

### Prompt 1: Ilustración Hero / Ambient Background (Estilo Arcilla 3D)
> A warm Bolivian clay aesthetic scene of Santa Cruz de la Sierra nightlife and urban culture, matte terracotta red #C04A2F, vibrant orange #E2792F, golden yellow #E3A52F, sage green #8BA672, and cream #F4EEE2 surfaces. Soft rounded geometric shapes, glowing ambient orbs, modern isometric city skyline with cathedral steeple and palm trees, cozy warm lighting, premium editorial style, high contrast, clean vectors, zero photorealism, no fake text. --ar 16:9 --v 6.0

### Prompt 2: Textura de Fondo y Orbes (Framer-like Ambient)
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
