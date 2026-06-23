# Product

## Register

brand

## Users

Primary audience is **technical recruiters and hiring engineering managers** evaluating Maksym Zhuk (a backend-first, Rust-leaning developer and lead of the Oxide CLI org) for roles. They arrive with limited time, skimming for fast credibility and scannable proof of skill: real shipped work, depth in backend/systems, and evidence of taste. The site must establish competence within seconds and reward a deeper read (Oxide, Rust CLI tooling, the project list) without making anyone dig for it.

Secondary: engineering peers and open-source collaborators who recognize the work and judge it on craft.

## Product Purpose

A personal portfolio that presents Maksym as a precise, systems-minded engineer. It exists to convert a recruiter's quick scan into a credible, memorable impression and a contact action. Content (about, skills, contacts, organizations, projects) is database-backed and editable through a protected `/admin` CMS, so the site stays current without code changes. Success = a recruiter immediately understanding *what kind of engineer this is*, trusting it, and reaching out.

## Brand Personality

**Precise, technical, confident.** Systems-engineer energy: terminal-native, no fluff, the work speaks for itself. The voice is direct and unembellished — closer to a well-formatted man page than a marketing site. Confidence shown through restraint and craft, not loud claims. The current direction (near-black canvas, terminal-green accent, Syne display + JetBrains Mono, a faint engineering grid) is the right register.

## Anti-references

- **Generic SaaS / template portfolio** — the interchangeable Next.js-template dev site: hero gradient, identical project card grid, stock "I build cool things" copy.
- **Corporate / sterile** — stiff enterprise styling with no point of view or personality.
- **Trend-chasing AI aesthetic** — cream/sand editorial backgrounds, gradient text, glassmorphism-by-default, and tracked uppercase eyebrows above every section. These are saturated AI defaults; avoid them even where they'd be "safe."

## Design Principles

1. **The work speaks.** Lead with concrete proof — Oxide, Rust CLI tooling, real repos — not adjectives. Show, don't tell.
2. **Terminal-native, not terminal-cosplay.** The systems aesthetic should feel earned and functional (mono, grid, precise spacing), never a gimmicky "hacker" skin.
3. **Fast credibility for a skimmer.** A recruiter should grasp the engineer type in seconds; depth is available but never required.
4. **Restraint is the flex.** Confidence comes from precision and editing things out, not from effects. One deliberate motion beats five reflexive ones.
5. **Backend-first hierarchy.** Order content by what Maksym actually is: backend → Rust → the rest. Don't let frontend polish misrepresent the priorities.

## Accessibility & Inclusion

Target **WCAG 2.2 AA**. Body text ≥4.5:1 against its background (watch muted-gray-on-near-black — verify the muted foreground passes), large text ≥3:1. Full keyboard navigation with visible focus states, semantic markup, and a `prefers-reduced-motion` alternative for every animation. Don't rely on the green accent alone to convey meaning (color-blind safe).
