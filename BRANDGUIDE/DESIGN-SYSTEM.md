# BoliVibes Design System & Brand Guide

Source of truth for the **BoliVibes brand identity** as implemented in code across `apps/web`, `apps/mobile`, and `packages/design-tokens`.

---

## 1. Brand Essence

BoliVibes is the premier **Smart Tourism, Culture & Urban Discovery App** for Santa Cruz de la Sierra, Bolivia.
The visual identity is a warm, sun-baked "clay" aesthetic — soft-shadowed, rounded, matte surfaces (like unglazed terracotta), built around the sun-mark identity and consolidated logo forms. Tone is warm, vibrant, and welcoming to both local residents and international visitors.

---

## 2. Consolidated Brand Logos

All logo assets across web, mobile, and print are consolidated into **two base forms**:

1. **`logo-clay.webp` (Primary 3D Wordmark & Hero Visual):**
   * The primary logo combining the bold display wordmark with the sun ray mark in warm terracotta, gold, orange, sage, and cream.
   * Used on landing pages, auth hero screens, presentation decks, and admin headers.

2. **`logo-icon.webp` (Standalone Icon & Pin Mark):**
   * The iconic app mark / sun-sunburst badge.
   * Used for favicons, app store icons, 3D map pins, mobile navigation badges, and compact UI avatar containers.

---

## 3. Color Palette

Canonical brand tokens (`packages/design-tokens/src/tokens.ts`):

| Token | Hex | Role |
|---|---|---|
| `boli-red` | `#C04A2F` | Headlines, primary buttons, terracotta highlights |
| `boli-orange` | `#E2792F` | VIBES accents, highlight tags, warm interactive states |
| `boli-yellow` | `#E3A52F` | Sol / gold sunshine, badges, active states |
| `boli-sage` | `#8BA672` | Selva green, verified badges, map pins |
| `boli-cream` | `#F4EEE2` | Warm off-white background surfaces, card bases |
| `boli-charcoal` | `#33302C` | Deep ink, typography body, structure |

---

## 4. Typography

* **Display Font:** `Caprasimo` or `Anton` (Bold, heavy impact, high warmth).
* **Body Font:** `Figtree` / `Archivo` (Clean, legible, modern sans-serif).

---

## 5. UI & Component Principles

* **Clay Surface Cards:** Rounded corners (`rounded-2xl`, `rounded-3xl`), warm background fills (`#fdfaf3`, `#f4eee2`), subtle hard shadows (`0 4px 0 #8e4a20` or soft drop shadows).
* **Interactive States:** Smooth transitions (`framer-motion` spring animations), clear focus rings, and zero sharp rectangular edges.
