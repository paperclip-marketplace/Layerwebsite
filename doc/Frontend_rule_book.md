# Layerwebsite — Frontend Rule Book

Standards for the Layer marketing site (`Layerwebsite`): landing, pricing, product pages, and shared chrome.

---

## 1. Stack and scope

| Area | Choice |
|------|--------|
| Framework | **Next.js 14** (App Router) |
| UI | **React 18**, **TypeScript** |
| Styling (marketing) | **CSS Modules** (`.module.css`) + shared **`landing-fluid.css`** |
| Fonts | **Geist** via `geist` package — use `var(--layer-font-geist-sans)` |
| Icons | **Material Symbols Rounded** (`material-symbols-rounded`), green checks `#009360` where Figma specifies |
| Motion | **GSAP** (scroll/smooth), **Motion** where already used |
| Images | **`next/image`** / **`LandingOptimizedImage`** for content images; plain `<img>` only when blend/position requires it (e.g. decorative card art) |

Do **not** introduce Tailwind for new marketing sections unless the team explicitly migrates. Existing pages are module-CSS–first.

---

## 2. Figma as source of truth

1. **Reference node IDs** in comments and optional `data-node-id` / `data-name` on sections (see pricing components).
2. **Design canvas**: **1440px** wide; fluid scaling uses `--l-vw` (see §3). Do not upscale above 1440px — use white side gutters.
3. **Implement from Figma specs**, not from ad-hoc spacing: typography, borders, radii, gradients, and layer opacity matter.
4. **Download assets** into `public/assets/images/…` with stable paths. Prefer **WebP** (lossless for flat/decorative art) over PNG for committed assets.
5. **Do not commit** local-only files: `.cursor-screenshots/`, `.env*.local`, optimization backups (`/_image-backup-pre-optimize/`).

When Figma layer opacity behaves differently in browser (e.g. black-matte PNGs), document the compensating technique in the component CSS (e.g. `mix-blend-mode: screen` + mask opacity), not one-off magic numbers without comment.

---

## 3. Fluid layout (`landing-fluid.css`)

Marketing pages use the **`.landing-main`** wrapper (via `LandingPageShell`) which defines:

- **`--l-vw`**: `min(calc(100vw / 1440), 1px)` — scale down below 1440px only.
- **Spacing / type**: prefer `calc(N * var(--l-vw))` and tokens `--l-fs-*`, `--l-lh-*`, `--l-section-px`, `--l-tracking`.
- **Section padding**: typically `--l-section-px` (40px @ 1440).

**Rules**

- Add new **page-level tokens** to `landing-fluid.css` with a Figma comment (file + node if known).
- In module CSS, use fluid tokens instead of raw `px` for marketing layout/type unless a fixed pixel is required (e.g. 1px hairline).
- Use **`landing-page-gutter`** / **`landing-main__inner`** patterns already on landing and pricing pages.

---

## 4. File and component structure

```
app/                    # Routes (App Router)
components/
  landing/              # Shared marketing chrome and sections
  pricing/              # Pricing-specific sections
  products/             # Product pages
public/assets/images/   # Static assets (webp/svg preferred)
doc/                    # Human docs (this file)
lib/config/constants.ts # ROUTES, feature flags
```

**Conventions**

- One section ≈ one folder pair: `section-name.tsx` + `section-name.module.css`.
- Page composer: thin `*-page.tsx` that imports sections and `LandingPageShell`.
- Shared behavior: `@/lib/...`, `@/components/landing/...` path aliases.
- Client components only when needed (`"use client"` for hooks, dropdowns, GSAP, etc.).

---

## 5. Typography and color

- **Primary text**: `#020100`
- **Secondary**: `#606060`
- **Tertiary / suffix**: `#8d8d8d`
- **Brand / accent**: `#f45523`, tints `#faede9`, `#fcccbd`
- **Borders**: `#eee`, `#dedede` (align with `--layer-gray-200` where defined)
- **Letterspacing**: default marketing `--l-tracking` (`-0.04em`) unless Figma specifies a px-based tracking token.

Match Figma **weight and size steps** (e.g. 28px medium titles, 32px prices, 14px feature lines) via `--l-fs-*` or explicit `calc(14 * var(--l-vw))` when no token exists.

---

## 6. Images and media

| Use case | Rule |
|----------|------|
| Hero / marketing photos | `LandingOptimizedImage` or `next/image` with `sizes` |
| SVG badges | `next/image` or inline SVG from `public/` |
| Full-bleed decorative card backgrounds | Often `<img>` inside absolutely positioned masks; **`object-fit: fill`** + **`object-position: bottom`** when Figma uses `size-full` + `object-bottom` on wide top-weighted assets |
| Black-matte PNG/WebP (art in top strip) | **`mix-blend-mode: screen`** on the image; opacity on **mask wrapper**, not double-fading with black |
| Gradients over art | Separate overlay div; match Figma stop percentages (e.g. solid white by ~9–17% for header fade) |

**Growth / special crops**: position with explicit `top` / `transform` when Figma uses non-default image frames; keep vertical alignment to gradient stops documented in CSS comments.

---

## 7. Accessibility

- One **`h1`** per page; sections use **`h2`/`h3`** in order.
- **`aria-label`** on `<section>` when the visible title is not enough.
- Icon-only or decorative rows: **`aria-hidden`** on icons; visible text for CTAs.
- Links: use **`ROUTES`** from `@/lib/config/constants` for internal/app URLs; meaningful link text (avoid “click here”).

---

## 8. Pricing page patterns (reference)

- **Four plans** in one row @ 1440: Solo, Team, Growth (featured shell + badge), Enterprise.
- **Row alignment**: standard columns **`padding-top: 34px`**; Growth column starts at 0 with badge; card surfaces **`height: calc(1037 * var(--l-vw))`**; **`align-items: flex-end`** on the row.
- **Plan summary**: **`min-height: calc(92 * var(--l-vw))`** so price rows align across cards.
- **CTAs**: pill buttons (`border-radius: calc(99 * var(--l-vw))`); Growth primary uses orange gradient.
- **Assets**: `/assets/images/pricing/plans/{solo,team,growth}.webp`, `experts-choice-diamond.svg`.

---

## 9. Quality checks before PR

- [ ] `npm run lint` and `npm run type-check`
- [ ] Visual check @ **1440px** and **mobile** breakpoints defined in module `@media`
- [ ] No temp screenshots or env files in the diff
- [ ] New assets under `public/assets/images/` with correct format (webp/svg)
- [ ] Figma node noted in CSS header comment for non-trivial sections

---

## 10. Git and PR hygiene

- **Do not commit** `.cursor-screenshots/` or one-off comparison PNGs from design reviews.
- Keep commits focused; push feature branches and update the PR description when layout/assets change materially.

---

## 11. Related entry points

| Page | Composer | Shell |
|------|----------|--------|
| Home | `components/landing/…` | `LandingPageShell` |
| Pricing | `components/pricing/pricing-page.tsx` | `LandingPageShell` + `landing-fluid.css` |
| Products | `components/products/…` | Product-specific shells |

For route URLs and feature flags, see **`lib/config/constants.ts`**.

---

## 12. Layer Platform app (PitchBots)

The **product app** (`PitchBots/`) uses a separate icon and datatable spec from this marketing site.

**Canonical doc:** [`PitchBots/doc/Frontend_rule_book.md`](../../PitchBots/doc/Frontend_rule_book.md) — icon size table, matrix/list toggle, filter/sort pills, sidebar, header contact, account menu (Figma **Layer — Platform**).

---

*Last updated: 2026-09-28 — reflects pricing page implementation and asset pipeline (WebP, Figma alignment); links PitchBots Platform icon rulebook.*
