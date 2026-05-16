# Portfolio Redesign — Design Spec

**Date:** 2026-05-16
**Author:** Aleksandr Dyusov (level designer) + frontend collaborator
**Source site:** https://aleksandrdyusov.wixsite.com/portfolio
**Target:** Replace the Wix site with a recruiter-focused SPA that surfaces level-design substance instead of cinematic CG vibes.

---

## 1. Goal

A small, fast, recruiter-friendly portfolio site that — in the first 5 seconds — communicates:
1. Who: **Aleksandr Dyusov, Level & Scenario Designer at Wargaming (World of Tanks).**
2. What he's done: **a grid of 4 (and growing) shipped projects.**
3. How to reach him: **email, LinkedIn, downloadable CV — visible in the header.**

The current Wix site buries all of that under cinematic banners and empty parallax sections; recruiters mistake the author for a CG/VFX artist. This redesign reverses that priority.

## 2. Non-goals

- **Not rewriting project copy.** All project descriptions (Himmelsdorf, Siegfried Line, Airfield, Paris bridge) are copy-pasted verbatim from the Wix source. Authoring/editorial work is out of scope.
- **No CMS / admin UI.** Content is a static TS data file, edited by hand. Adding a 5th project = editing one object.
- **No SSR / SEO optimization.** Single-page Vite app. Recruiters reach the site via direct link from CV/LinkedIn — no Google traffic to optimize for.
- **No i18n.** English only.
- **No blog / writing section.** Just portfolio.

## 3. Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** for all styling — no CSS-in-JS, no separate stylesheets except `index.css` for fonts and base resets.
- **React Router** (`react-router-dom`) for routes.
- **Fonts:** Inter (variable) + JetBrains Mono — loaded via `@fontsource-variable/inter` and `@fontsource/jetbrains-mono` (npm), self-hosted.
- **Deploy:** static build, target Vercel/Netlify/GitHub Pages — any static host works.

## 4. Information Architecture

```
/                     Home (hero + projects grid + about + footer)
/projects/:slug       Project case-study page
*                     404 — minimal "lost in the dunes" page with link back
```

Single home page. About block is a section of `/`, not a separate route. The grid lives on `/`, not on a separate "All projects" page.

## 5. Page Layout — Home (`/`)

```
┌─────────────────────────────────────────────────────┐
│ [AD]                          Email LinkedIn [CV ↓] │  ← Header (sticky)
├─────────────────────────────────────────────────────┤
│                                                     │
│   Aleksandr Dyusov                                  │  ← Hero, ~40vh
│   LEVEL & SCENARIO DESIGNER · World of Tanks,       │
│   Wargaming                                         │
│                                                     │
├─────────────────────────────────────────────────────┤
│   → Selected projects                               │  ← Section label (mono)
│   ┌───────────┐ ┌───────────┐ ┌───────────┐         │
│   │  01       │ │  02       │ │  03       │         │  ← Projects grid
│   │   Image   │ │   Image   │ │   Image   │         │     3 cols desktop
│   │           │ │           │ │           │         │     2 cols tablet
│   └───────────┘ └───────────┘ └───────────┘         │     1 col mobile
│   ┌───────────┐                                     │
│   │  04       │ … (room to grow)                    │
│   └───────────┘                                     │
├─────────────────────────────────────────────────────┤
│   → About                                           │
│   {{ABOUT_BIO — 3-5 lines}}                         │  ← About block
│   Tools: {{TOOLS}}                                  │
│   [CV ↓]                                            │
├─────────────────────────────────────────────────────┤
│   Email · LinkedIn · ArtStation? · © 2026           │  ← Footer
└─────────────────────────────────────────────────────┘
```

### 5.1 Header
- Sticky, height ~64px, dark background with bottom border.
- Left: **monogram `AD`** in a 28px square (1px white-30 border, no fill). Click → `/`.
- Right: three links in pill style — `Email` (mailto:), `LinkedIn` (external), `CV ↓` (solid white background, black text, downloads `/aleksandr-dyusov-cv.pdf`).
- No nav menu. The site has 2 pages — a menu adds nothing.

### 5.2 Hero
- ~40vh tall, no background image, just type on the page background.
- **Name** (display): Inter 800, ~clamp(40px, 7vw, 80px), tight tracking (-0.02em), line-height 1.
- **Role line** below: JetBrains Mono small-caps `LEVEL & SCENARIO DESIGNER` (white) · Inter `World of Tanks, Wargaming` (muted).
- No CTA button in hero — the grid IS the CTA.

### 5.3 Projects grid
- Section label `→ Selected projects` in JetBrains Mono, tracked +0.2em, muted.
- Grid: 3 columns desktop (≥1024px), 2 columns tablet (≥640px), 1 column mobile.
- Tile = 16:10 aspect ratio image with overlay number `01` top-left.
- **Idle state:** only the image and the number visible.
- **Hover state:** dark overlay (rgba(0,0,0,0.55)) fades in; project title + meta line + "↗ Open project" appear bottom-left.
- **Mobile fallback:** since there's no hover, the meta line is **always visible** at the bottom of the tile on screens < 1024px.
- Click anywhere on tile → `/projects/:slug`.

### 5.4 About block
- Section label `→ About` (mono, tracked).
- 3-5 lines of biography (placeholder copy below — author to edit).
- One-line **Tools:** list, comma-separated.
- A second `CV ↓` button — recruiter who scrolled this far gets a second chance to grab it.

#### Placeholder copy

> Level and scenario designer with several years of experience designing combat scenarios and rebuilding maps for **World of Tanks** at **Wargaming**. I work the full development cycle — greybox layouts, internal playtests, and coordinating 3D, level art, animation and VFX teams toward release. I led integration of the **Random Events** feature across multiple maps (Himmelsdorf, Siegfried Line, Paris) and rebuilt **Airfield** from the ground up.

**Tools (placeholder):** Internal Wargaming level editor · Maya · Photoshop · Notion · plus playtest direction, design documentation, cross-team coordination.

> **NOTE for author:** edit `src/data/about.ts` to replace the bio/tools text and drop your CV PDF at `public/aleksandr-dyusov-cv.pdf`.

### 5.5 Footer
- Same dark background, top border separator.
- Three columns on desktop, stack on mobile:
  1. `Contact` → email, LinkedIn
  2. `Elsewhere` → ArtStation/Vimeo/itch.io if author supplies; otherwise hidden
  3. `Site` → © 2026 · "Built with React + Tailwind" (one small line)

## 6. Page Layout — Project case-study (`/projects/:slug`)

```
┌─────────────────────────────────────────────────────┐
│ [AD]                          Email LinkedIn [CV ↓] │  ← Same sticky header
├─────────────────────────────────────────────────────┤
│   [ hero media — full bleed, 60vh ]                 │  ← Hero
├─────────────────────────────────────────────────────┤
│   [World of Tanks]  [Wargaming · 2023]  [Scenario]  │  ← Meta pills
│                                                     │
│   Himmelsdorf Scenarios                             │  ← H1
│   As part of the Random Events feature, …            │  ← Intro (verbatim)
├─────────────────────────────────────────────────────┤
│ Scenario 01 │ Zeppelin crash                        │  ← Left rail label
│             │ A first-of-its-kind, massive airship… │     + section
│             │ [ top-down map · 16:9 large ]         │
│             │ [ cinematic media row · 1-2 images ]  │
├─────────────────────────────────────────────────────┤
│ Iteration   │ From blockout to polished             │
│             │ The scenario underwent a full dev …   │
│             │ [ before │ after ]   ← optional       │
├─────────────────────────────────────────────────────┤
│ Logic       │ Logic behind                          │
│             │ Before the zeppelin crash, the map …  │
├─────────────────────────────────────────────────────┤
│ Scenario 02 │ Train crash                           │
│             │ …                                     │
├─────────────────────────────────────────────────────┤
│   [ closing video embed · 16:9 ]                    │
│   ← Back to projects        To the next project →   │
└─────────────────────────────────────────────────────┘
```

### 6.1 Rail labels — adaptive
- For Himmelsdorf / Siegfried / Paris: `Scenario 01`, `Scenario 02`, `Iteration`, `Logic`.
- For Airfield (5 zones, no scenarios): `Zone 01` … `Zone 05`, `Logic`.
- Rail label comes from the section data (`label` field), not hard-coded.
- On mobile (<1024px) the rail collapses — label becomes an uppercase mono caption above the section title.

### 6.2 Component parameters
| Component        | Conditional on data      | Notes |
|------------------|--------------------------|-------|
| Hero media       | Always                   | Image or YouTube embed |
| Meta pills       | Always                   | Game / Studio · Year / Role |
| Top-down map     | `section.map` present    | Renders 16:9 full-column |
| Cinematic row    | `section.media` present  | 1-3 images side by side, equal aspect |
| Before/After     | `section.beforeAfter`    | Two-up grid with `Before · blockout` / `After · polished` labels |
| Closing video    | `project.closingVideo`   | YouTube iframe, lazy-loaded |
| Prev/Next links  | Always                   | Computed from project order in data |

## 7. Data Model

`src/data/projects.ts`:

```typescript
export type SectionKind = 'scenario' | 'zone' | 'iteration' | 'logic';

export type ProjectSection = {
  kind: SectionKind;
  label: string;            // e.g. "Scenario 01", "Zone 03", "Logic"
  title: string;            // e.g. "Zeppelin crash"
  body: string;             // verbatim text from Wix
  map?: string;             // path to top-down image
  media?: string[];         // paths to cinematic stills
  beforeAfter?: { before: string; after: string };
};

export type Project = {
  slug: string;             // "himmelsdorf-scenarios"
  number: string;           // "01" — display index
  title: string;            // "Himmelsdorf Scenarios"
  tagline: string;          // short one-liner above the title
  intro: string;            // first paragraph from Wix, verbatim
  meta: {
    game: string;           // "World of Tanks"
    studio: string;         // "Wargaming"
    year: number;           // placeholder until author confirms
    role: string;           // "Scenario Design", "Level Design", etc.
  };
  hero: { type: 'image' | 'video'; src: string };
  thumbnail: string;        // tile image for the grid
  sections: ProjectSection[];
  closingVideo?: string;    // YouTube embed URL
};

export const projects: Project[] = [ /* 4 entries */ ];
```

`src/data/about.ts`:

```typescript
export const about = {
  bio: '...placeholder paragraph...',
  tools: ['Internal Wargaming level editor', 'Maya', 'Photoshop', 'Notion'],
  cvUrl: '/aleksandr-dyusov-cv.pdf',
  contacts: {
    email: 'aleksandrdyusov@gmail.com',
    linkedin: 'https://www.linkedin.com/in/...',  // placeholder
    artstation: null,
    vimeo: null,
  },
};
```

## 8. Visual Style

- **Theme:** dark brutalist.
- **Background:** `#0a0a0a`. Surface variations: `#0f0f0f`, `#1a1a1a` for cards.
- **Text:** `#ffffff` primary, `#888` muted, `#555` quietest.
- **Borders:** `#1a1a1a` / `#222` / `#333` ascending contrast.
- **Accent:** white only. No blue/red. CTAs are inverted (white background, black text).
- **Typography:**
  - **Display + body:** Inter Variable (weights 400, 500, 600, 700, 800).
  - **Mono accents:** JetBrains Mono (weight 500) for numbers, labels, technical meta.
- **Spacing rhythm:** 4 / 8 / 16 / 24 / 40 / 64 / 96 px. No arbitrary values.
- **Section pacing:** ~80px vertical padding between major sections on desktop, ~48px on mobile.
- **Images:** WebP where possible (regenerated from source assets). Lazy-loaded below the fold via native `loading="lazy"`.

## 9. Behavior

- **Sticky header:** position fixed top, full width, with backdrop-blur(8px) + dark/60 background. Hides on scroll-down, reappears on scroll-up (optional polish, can ship without).
- **Hover on tiles:** 200ms ease-out fade for overlay + text. No movement/scale animations.
- **Page transitions:** none beyond default React Router behavior. Smooth scroll to top on route change.
- **Mobile breakpoints:** Tailwind defaults — `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280`.
- **Reduced motion:** respect `prefers-reduced-motion` — disable fade-in on hover.

## 10. Content sourcing

### 10.1 Project text
Copy verbatim from `aleksandrdyusov.wixsite.com/portfolio/{1..4}`. Already extracted during brainstorming, stored inline in `projects.ts`. **Do not edit.**

### 10.2 Images and videos
- One-time scrape from Wix CDN URLs during initial implementation.
- Save under `public/assets/projects/{slug}/`:
  - `hero.jpg` (or `.webm` for video)
  - `thumbnail.jpg` (smaller, for the grid)
  - `map-01.png`, `map-02.png` etc. (top-down)
  - `media-01.jpg`, `media-02.jpg` etc. (cinematic stills)
- Closing YouTube videos: keep as embed URLs in data, no download.

### 10.3 About / CV / years / LinkedIn URL
Placeholders in `src/data/about.ts` and `src/data/projects.ts`. Marked with `// TODO: confirm with author` comments. Site ships with the placeholders rendered; author replaces them later.

## 11. Project structure (file layout)

```
src/
├── main.tsx
├── App.tsx                      ← Router setup
├── pages/
│   ├── Home.tsx
│   ├── Project.tsx              ← Reads :slug, renders case-study
│   └── NotFound.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProjectsGrid.tsx
│   ├── ProjectTile.tsx
│   ├── About.tsx
│   ├── MetaPills.tsx
│   ├── ProjectSection.tsx       ← Renders one section (rail + content)
│   ├── BeforeAfter.tsx
│   └── ClosingVideo.tsx
├── data/
│   ├── projects.ts
│   └── about.ts
└── index.css                    ← font imports + tailwind directives
public/
├── assets/projects/{slug}/...
├── aleksandr-dyusov-cv.pdf      ← placeholder until author drops real one
└── favicon.svg
```

## 12. Out of scope (now); maybe later

- Dark/light theme switcher — stick with dark.
- 404 page beyond a minimal one.
- Image zoom/lightbox on project page media.
- Analytics (Plausible/Fathom) — defer.
- Open Graph tags for nicer link previews — defer until SEO matters.
- CMS — defer until author wants self-edit.

## 13. Open items for author to fill in later

- Real LinkedIn URL.
- Year for each of the 4 projects.
- Final About bio (or approve placeholder).
- Tools list (or approve placeholder).
- CV PDF file.
- Whether ArtStation / Vimeo / itch.io profiles exist.
- Optional: extra projects beyond the current 4.

---

## 14. Decisions snapshot (the brainstorm output)

| Decision           | Chosen                                                |
|--------------------|-------------------------------------------------------|
| Stack              | Vite + React + TS + Tailwind                          |
| Hero layout        | Tight hero + grid immediately below                   |
| Name dedup         | Monogram `AD` in header, full name in hero            |
| Tile style         | Minimal idle, hover reveals title/meta + open link    |
| Project page       | Case-study, left rail labels, parameterized sections  |
| Visual style       | Dark brutalist, Inter + JetBrains Mono                |
| Image sourcing     | One-time scrape from Wix CDN to `public/assets/projects/` |
| Data shape         | Single typed TS file `src/data/projects.ts`           |
| About / CV         | Placeholder bio + dummy CV; author replaces later     |
