---
name: Maksym Zhuk Portfolio
description: A systems-terminal portfolio for a backend-first, Rust-leaning engineer — near-black canvas, one signal-green accent, monospace precision.
colors:
  signal-green: "oklch(0.76 0.13 153)"
  canvas: "oklch(0.11 0.004 156)"
  surface: "oklch(0.17 0.006 156)"
  surface-raised: "oklch(0.235 0.008 156)"
  muted-surface: "oklch(0.205 0.006 156)"
  ink: "oklch(0.93 0 0)"
  ink-soft: "oklch(0.88 0 0)"
  ink-muted: "oklch(0.66 0.012 156)"
  border: "oklch(0.3 0.01 156)"
  input: "oklch(0.24 0.008 156)"
  destructive: "oklch(0.62 0.2 25)"
  chart-teal: "oklch(0.62 0.12 215)"
  chart-lime: "oklch(0.75 0.15 130)"
  chart-violet: "oklch(0.66 0.17 303)"
  chart-amber: "oklch(0.72 0.15 70)"
typography:
  display:
    fontFamily: "Syne, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Syne, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Syne, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Syne, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  "2xl": "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.canvas}"
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "{colors.input}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
---

# Design System: Maksym Zhuk Portfolio

## 1. Overview

**Creative North Star: "The Systems Terminal"**

This is a portfolio rendered as a well-lit terminal session. The canvas is dark graphite (`oklch(0.11 0.004 156)`), ruled with a faint 48px engineering grid, and lit by exactly one signal: a refined terminal-green (`oklch(0.76 0.13 153)`) that marks every interactive and "active" state. The voice is that of a systems engineer who lives in a monospace world — direct, precise, unembellished. Confidence is conveyed by what is removed, not by what is piled on. Closer to a well-formatted man page than a marketing site.

The system is built for a technical recruiter skimming for fast credibility. Hierarchy is loud at the top (a Syne display headline, the typewriter `about_me.rs` code editor) and calm everywhere else, so the engineer-type registers in seconds and depth rewards a longer read. Type does the heavy lifting: Syne for expressive display, JetBrains Mono for every label, status string, and code surface — the mono is *earned* here (this is a literal developer who ships CLI tooling), never costume.

What this system rejects, explicitly: the interchangeable Next.js-template dev portfolio (hero gradient + identical project-card grid); stiff corporate sterility with no point of view; and the 2026 AI-aesthetic defaults — cream/sand editorial backgrounds, gradient text, decorative glassmorphism, and tracked-uppercase eyebrows stacked above every section.

**Key Characteristics:**
- Near-black canvas + one signal-green accent. No second accent competes.
- Monospace (JetBrains Mono) for all labels/metadata/code; Syne for display and prose.
- Flat by default; depth comes from tonal layering and a sparing green glow, not drop shadows.
- A faint structural grid texture, fixed to the viewport, signals "systems / precision."
- Restraint is the flex: one deliberate motion (the typewriter code reveal) beats five reflexive fades.

## 2. Colors

A graphite stack lit by a single refined green. The drama is the contrast between dark, clearly-layered surfaces and one calm signal — not a spread of hues, and not a neon. The neutrals carry a faint green tint (chroma ≤0.01 toward hue 156) so the dark reads as graphite, never dead black.

### Primary
- **Signal Green** (`oklch(0.76 0.13 153)`): The one voice. Carries links, primary buttons, focus rings, the active nav state, glow accents, and the skip link. Green reads as *passing / live / active* — the status color of a clean build. Chroma is held at 0.13 (deliberately below neon) so it signals without shouting; it is the only chromatic color a visitor should remember.

### Secondary
- **Destructive Red** (`oklch(0.62 0.2 25)`): Reserved strictly for admin/CMS destructive actions and error states. Never decorative.

### Tertiary
- **Chart Set** (Teal `oklch(0.6 0.14 195)`, Lime `oklch(0.75 0.18 130)`, Violet `oklch(0.65 0.22 303)`, Amber `oklch(0.7 0.18 70)`): Data-viz / categorization roles only. Not for general UI accenting — they exist so charts and category tags don't overload the single green signal.

### Neutral
- **Canvas** (`oklch(0.11 0.004 156)`): The page background — dark graphite, not pure black, with a faint green tint so it never reads as a dead void.
- **Surface** (`oklch(0.17 0.006 156)`): Cards, popovers, sidebar, header bar — a clear ~0.06-lightness step off the canvas so surfaces visibly separate (no black-on-black).
- **Surface Raised** (`oklch(0.235 0.008 156)`): Secondary buttons, the neutral hover surface, and the next layer up the tonal ladder.
- **Muted Surface** (`oklch(0.205 0.006 156)`): Muted fills and inset regions.
- **Ink** (`oklch(0.93 0 0)`): Primary text. Hits well above 4.5:1 on canvas and surface.
- **Ink Soft** (`oklch(0.88 0 0)`): Secondary-button text and slightly de-emphasized copy.
- **Ink Muted** (`oklch(0.66 0.012 156)`): Captions, secondary metadata, placeholders. Now clears 4.5:1 on every surface — see the Contrast Floor Rule.
- **Border** (`oklch(0.3 0.01 156)`) / **Input** (`oklch(0.24 0.008 156)`): Dividers and field fills, green-tinted (chroma toward the brand hue, not toward warm-by-default), and lifted enough to read as real separation against the surfaces.

### Named Rules
**The One Signal Rule.** Signal Green is the *only* accent. It appears on a small fraction of any screen; its rarity is what makes "active" legible. Never introduce a second decorative accent — reach into the chart set only for genuine data/categorization.

**The Contrast Floor Rule.** Body text must clear 4.5:1 against its surface. Ink Muted is now tuned to `oklch(0.66 0.012 156)` so it clears the floor on canvas, surface, and surface-raised (~5.4–6.6:1). Never drop muted text below this lightness for body copy; if it must go dimmer for decorative chrome, keep it off the reading path.

## 3. Typography

**Display Font:** Syne (with `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Syne (same family, lighter weights)
**Label / Mono Font:** JetBrains Mono (with `ui-monospace, SFMono-Regular, monospace`)

**Character:** A two-family system pairing one expressive geometric-grotesque display sans (Syne — wide, slightly eccentric letterforms that give headlines personality) against a precise monospace (JetBrains Mono). The contrast axis is *expressive sans vs. machine mono*, not two similar sans-serifs. Mono is reserved for anything that wants to read as system output: the logo wordmark, nav, labels, metadata, and all code.

### Hierarchy
- **Display** (Syne 800, `clamp(2.5rem, 6vw, 4.5rem)`, line-height 1.05, tracking -0.03em): Hero headline only. One per page.
- **Headline** (Syne 700, `clamp(1.75rem, 3vw, 2.5rem)`, line-height 1.1, tracking -0.02em): Section titles.
- **Title** (Syne 600, 1.125rem, line-height 1.3): Card titles, sub-section headers.
- **Body** (Syne 400, 1rem, line-height 1.6): Prose and descriptions. Cap measure at 65–75ch.
- **Label** (JetBrains Mono 500, 0.8125rem): Nav items, metadata, status strings, the wordmark, tags.
- **Code** (JetBrains Mono 400, 0.8125rem, line-height 1.6): The code editor and any inline code.

### Named Rules
**The Mono-Means-Machine Rule.** JetBrains Mono is for things that are literally system output or labels (code, nav, metadata, the wordmark). Never set body prose in mono for "techy" flavor — that's costume. Syne carries human voice; mono carries machine voice.

**The Dark-Mode Leading Rule.** Light type on the near-black canvas reads lighter than it measures. Keep body line-height at 1.6 (not 1.5) and never tighten display tracking past -0.04em or the wide Syne caps collide.

## 4. Elevation

Flat by default. This is a dark, tonal system: depth is built by stepping surfaces up the lightness ladder (Canvas `0.07` → Surface `0.11` → Surface Raised `0.15`) and separating them with faint green-tinted hairline borders — not by stacking drop shadows. Shadcn primitives carry a near-invisible `shadow-xs`/`shadow-sm` that survives only as the faintest seam; the real depth cue is tone + border.

The one expressive elevation material is **glow**, not shadow: a soft green halo applied sparingly to signal "live / energized."

### Shadow Vocabulary
- **Hairline seam** (default `shadow-xs` / `shadow-sm` on cards, buttons, inputs): Barely-there separation; the border does most of the work.
- **Green glow** (`box-shadow: 0 0 24px oklch(from var(--primary) l c h / 0.22)` — `.glow-primary`): Halo for hero/featured elements and key CTAs at rest or on hover. Derived from `--primary` so it tracks the accent.
- **Green glow, small** (`box-shadow: 0 0 12px oklch(from var(--primary) l c h / 0.18)` — `.glow-primary-sm`): Subtler version for smaller interactive accents.

### Named Rules
**The Glow-Not-Shadow Rule.** Depth on this canvas is light, not darkness — you cannot cast a believable drop shadow on near-black. When an element needs to feel lifted or active, reach for the green glow, never a heavier dark shadow. Reserve glow for genuinely primary elements; glow everywhere kills the signal.

## 5. Components

### Buttons
- **Shape:** Gently rounded (6px / `rounded-md`).
- **Primary:** Signal Green fill (`oklch(0.76 0.13 153)`) with near-black text (`oklch(0.13 0.01 156)`), `8px 16px` padding (default `h-9`), hairline shadow. The highest-emphasis action.
- **Hover / Focus:** Hover drops opacity to ~90% (`hover:bg-primary/90`); focus shows a 3px green ring (`focus-visible:ring-ring/50`) plus the global 2px green focus outline.
- **Outline:** Transparent/canvas fill, green-tinted input border, ink text; hover fills to a faint accent tint.
- **Ghost:** No fill at rest; hover gets a faint accent tint. For low-emphasis and icon actions.
- **Secondary:** Surface-Raised fill (`oklch(0.15 0 0)`) with Ink-Soft text, for neutral mid-emphasis actions.

### Chips / Tags
- **Style:** Monospace (JetBrains Mono) label on a faint surface fill with a hairline border; small radius. Used for skill categories and tech tags.
- **State:** Active/selected category takes the green signal (text or border); inactive stays neutral mono on surface.

### Cards / Containers
- **Corner Style:** 12px (`rounded-xl`); the header bar uses 16px (`rounded-2xl`).
- **Background:** Surface (`oklch(0.17 0.006 156)`) on the Canvas page — a clear tonal step so cards read as lifted.
- **Shadow Strategy:** Flat — see Elevation. Separation comes from the green-tinted hairline border + tonal step, with at most a faint `shadow-sm` seam. Featured cards may take the green glow.
- **Border:** 1px green-tinted (`oklch(0.22 0.008 142)`).
- **Internal Padding:** 24px (`py-6 px-6`).
- **Never nest cards.** A surface inside a surface flattens the tonal ladder; use spacing or a hairline divider instead.

### Inputs / Fields
- **Style:** 1px green-tinted border, faint translucent fill (`input` ~`oklch(0.18 0.005 142)` / `bg-input/30`), 6px radius, 36px tall, `4px 12px` padding.
- **Focus:** Border shifts to the green ring + 3px green ring glow (`focus-visible:ring-ring/50`). No layout shift.
- **Placeholder:** Ink Muted — but ensure real placeholders stay legible; do not rely on placeholder text to convey required field info.
- **Error / Disabled:** Destructive-red ring on `aria-invalid`; disabled drops to 50% opacity with `not-allowed` cursor.

### Navigation
- **Style:** A floating pill — Surface-filled bar with a 16px-radius border (`rounded-2xl`), sticky at top, sitting on a transparent header gutter. Logo + monospace wordmark on the left, mono nav links on the right.
- **States:** Links are mono (JetBrains Mono), Ink at rest; active/hover takes Signal Green. Visible green focus outline on every link.
- **Mobile:** Hamburger opens a full-screen overlay nav (body scroll locked); the header background turns solid Canvas while open.

### Signature Component — The `about_me.rs` Code Editor
The hero's centerpiece: a macOS-style editor chrome (traffic-light dots, a mono filename caption, optional copy button) over a Shiki-highlighted code block that **types itself out** character-by-character on first view, with a blinking caret. This is the system's one piece of choreographed motion and its strongest brand signal — the engineer is introduced *as code that compiles*. Built on `bg-muted/50`, 12px radius, hairline border, mono throughout. It must respect `prefers-reduced-motion` (render the final code instantly, no typewriter).

## 6. Do's and Don'ts

### Do:
- **Do** keep Signal Green (`oklch(0.76 0.13 153)`) as the single accent — links, primary buttons, focus rings, active states, glows. Its rarity is the point (The One Signal Rule), and its chroma stays at 0.13 so it reads refined, never neon.
- **Do** set all labels, metadata, nav, the wordmark, and code in JetBrains Mono; set display and prose in Syne (The Mono-Means-Machine Rule).
- **Do** build depth with tonal steps (Canvas → Surface → Surface-Raised) and green-tinted hairline borders; reach for the green *glow*, not dark shadows, to lift elements (The Glow-Not-Shadow Rule).
- **Do** keep body text at Ink (`oklch(0.93 0 0)`), Ink-Soft, or Ink-Muted (`oklch(0.66 0.012 156)`) and verify ≥4.5:1; never dim muted text below that lightness on the reading path (The Contrast Floor Rule).
- **Do** give every animation — especially the typewriter code editor — a `prefers-reduced-motion` fallback that shows final content instantly.
- **Do** lead with concrete proof (Oxide, Rust CLI work, real repos); show, don't tell.

### Don't:
- **Don't** ship the generic SaaS/Next.js-template portfolio look: hero gradient + an identical icon-heading-text project-card grid repeated endlessly.
- **Don't** drift corporate/sterile — keep the systems point of view; safe equals invisible.
- **Don't** use the 2026 AI-aesthetic defaults: cream/sand/parchment backgrounds, **gradient text** (`background-clip: text`), decorative **glassmorphism**, or tracked-uppercase eyebrows stacked above every section.
- **Don't** use a colored `border-left`/`border-right` stripe (>1px) as an accent on cards, list items, or callouts — use full hairline borders or a tonal step.
- **Don't** introduce a second decorative accent color; the chart set is for data/categorization only.
- **Don't** set body prose in monospace for "techy" flavor, and don't let the green glow appear on more than the genuinely primary elements.
- **Don't** nest cards or cast dark drop shadows on the near-black canvas — both read as a 2014 app.
