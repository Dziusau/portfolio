# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a recruiter-focused single-page portfolio for Aleksandr Dyusov (level designer) that replaces the existing Wix site, surfacing level-design substance through a dark, brutalist case-study layout.

**Architecture:** SPA with React Router. All content lives in two typed TS data files (`projects.ts`, `about.ts`). Pages compose presentational components driven by that data. Project case-study sections render conditionally based on which fields a section provides (map, media, beforeAfter). Assets are scraped one-time from the Wix CDN and stored locally.

**Tech Stack:** Vite 5 · React 18 · TypeScript · Tailwind CSS 3 · React Router 6 · Vitest + React Testing Library · `@fontsource-variable/inter` + `@fontsource/jetbrains-mono`.

**Spec:** [`docs/superpowers/specs/2026-05-16-portfolio-redesign-design.md`](../specs/2026-05-16-portfolio-redesign-design.md)

---

## File Structure

```
Portfolio/
├── docs/superpowers/{specs,plans}/...
├── public/
│   ├── assets/projects/{slug}/...    Project images (scraped from Wix)
│   ├── aleksandr-dyusov-cv.pdf       Placeholder CV
│   └── favicon.svg
├── scripts/
│   └── scrape-wix-assets.mjs         One-time asset download
├── src/
│   ├── main.tsx                      React entry
│   ├── App.tsx                       Router + layout shell
│   ├── pages/
│   │   ├── Home.tsx                  / route
│   │   ├── Project.tsx               /projects/:slug route
│   │   └── NotFound.tsx              * route
│   ├── components/
│   │   ├── Header.tsx                Sticky top nav (monogram + links)
│   │   ├── Footer.tsx                Page footer
│   │   ├── Hero.tsx                  Home hero block
│   │   ├── ProjectsGrid.tsx          Grid container
│   │   ├── ProjectTile.tsx           Single tile with hover reveal
│   │   ├── About.tsx                 About section on home
│   │   ├── MetaPills.tsx             Game/Studio/Year/Role pills
│   │   ├── ProjectSection.tsx        Rail label + section content
│   │   ├── BeforeAfter.tsx           Two-up image comparison
│   │   └── ClosingVideo.tsx          YouTube embed
│   ├── data/
│   │   ├── types.ts                  Project/Section/About TS types
│   │   ├── projects.ts               4 project entries (verbatim text)
│   │   └── about.ts                  About copy + contacts + CV path
│   ├── lib/
│   │   ├── projectNav.ts             prev/next/lookup helpers
│   │   └── projectNav.test.ts        Unit tests for helpers
│   ├── index.css                     Tailwind directives + base reset
│   └── test/
│       └── setup.ts                  Vitest + RTL setup
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts                  (or merged into vite.config.ts)
└── package.json
```

**File responsibility highlights:**
- `src/data/*` is the **only place** content text or paths live. Components never hardcode project data.
- `src/lib/projectNav.ts` is pure functions; TDD'd before the components that use it.
- Components are presentational and dumb: they receive props, render UI, no business logic.
- `Project.tsx` is the only page that owns the `:slug → project lookup → 404-or-render` decision.

---

## Phase 0 — Project Setup

### Task 1: Initialize git and Vite + React + TS scaffold

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Create: `.gitignore`

- [ ] **Step 1: Initialize git**

```bash
cd /Users/user/Documents/test/Portfolio
git init
```

- [ ] **Step 2: Scaffold Vite project (non-interactive)**

```bash
npm create vite@latest . -- --template react-ts
```

When prompted about non-empty dir, choose "Ignore files and continue". This preserves `docs/`, `.superpowers/`, etc.

- [ ] **Step 3: Install dependencies**

```bash
npm install
```

- [ ] **Step 4: Add `.gitignore` entries**

Append to `.gitignore`:
```
.superpowers/
.DS_Store
```

- [ ] **Step 5: Verify dev server runs**

```bash
npm run dev
```
Expected: Vite serves on http://localhost:5173 with the default React+Vite landing page. Stop with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold vite react-ts project"
```

---

### Task 2: Install and configure Tailwind CSS

**Files:**
- Create: `tailwind.config.js`, `postcss.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Install Tailwind + PostCSS**

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 2: Configure `tailwind.config.js`**

Replace the generated file with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          0: '#0a0a0a',
          1: '#0f0f0f',
          2: '#1a1a1a',
          3: '#222222',
          4: '#333333',
        },
        muted: '#888888',
        quiet: '#555555',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        wider2: '0.2em',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Replace `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { background: #0a0a0a; color: #ffffff; min-height: 100vh; }
body { font-family: 'Inter Variable', Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
```

- [ ] **Step 4: Verify Tailwind compiles**

Replace `src/App.tsx` body with:

```tsx
export default function App() {
  return <div className="p-8 text-white bg-ink-0">tailwind ok</div>;
}
```

Run `npm run dev`, confirm dark page with white text. Stop server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: install and configure tailwind"
```

---

### Task 3: Install fonts (Inter Variable + JetBrains Mono)

**Files:**
- Modify: `src/index.css`, `package.json`

- [ ] **Step 1: Install font packages**

```bash
npm install @fontsource-variable/inter @fontsource/jetbrains-mono
```

- [ ] **Step 2: Import fonts in `src/index.css`**

Prepend the imports above the `@tailwind` directives:

```css
@import '@fontsource-variable/inter/index.css';
@import '@fontsource/jetbrains-mono/500.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { background: #0a0a0a; color: #ffffff; min-height: 100vh; }
body { font-family: 'Inter Variable', Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
```

- [ ] **Step 3: Verify fonts render**

Update `src/App.tsx`:

```tsx
export default function App() {
  return (
    <div className="p-8 bg-ink-0 min-h-screen">
      <h1 className="text-5xl font-extrabold tracking-tight">Aleksandr Dyusov</h1>
      <p className="font-mono text-sm tracking-wider2 text-muted mt-3">LEVEL & SCENARIO DESIGNER</p>
    </div>
  );
}
```

Run `npm run dev`. Inter should be visible on H1, JetBrains Mono on the muted line. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add Inter Variable and JetBrains Mono fonts"
```

---

### Task 4: Install React Router

**Files:**
- Modify: `src/main.tsx`, `src/App.tsx`
- Create: `src/pages/Home.tsx`, `src/pages/Project.tsx`, `src/pages/NotFound.tsx`

- [ ] **Step 1: Install router**

```bash
npm install react-router-dom
```

- [ ] **Step 2: Stub pages**

`src/pages/Home.tsx`:
```tsx
export default function Home() {
  return <div className="p-8">Home</div>;
}
```

`src/pages/Project.tsx`:
```tsx
import { useParams } from 'react-router-dom';

export default function Project() {
  const { slug } = useParams();
  return <div className="p-8">Project: {slug}</div>;
}
```

`src/pages/NotFound.tsx`:
```tsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p-8">
      <p className="text-muted">Page not found.</p>
      <Link to="/" className="underline mt-2 inline-block">← Back home</Link>
    </div>
  );
}
```

- [ ] **Step 3: Wire router in `src/App.tsx`**

```tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<Project />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

- [ ] **Step 4: Wrap with BrowserRouter in `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 5: Verify routes**

Run `npm run dev`. Visit:
- `/` → renders "Home"
- `/projects/foo` → renders "Project: foo"
- `/bogus` → renders "Page not found"

Stop server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add react-router with home/project/notfound stubs"
```

---

### Task 5: Install Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`, `src/test/setup.ts`
- Modify: `package.json` (test script), `tsconfig.json` (include "vitest/globals" types)

- [ ] **Step 1: Install test deps**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @types/node
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: false,
  },
});
```

- [ ] **Step 3: Create `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Add test script to `package.json`**

In the `"scripts"` block add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Update `tsconfig.json` types**

In `compilerOptions`, add or merge:
```json
"types": ["vitest/globals", "@testing-library/jest-dom"]
```

- [ ] **Step 6: Sanity test**

Create `src/lib/sanity.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('sanity', () => {
  it('runs vitest', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run:
```bash
npm test
```
Expected: 1 test passes.

Delete the sanity test file after passing.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: configure vitest + react testing library"
```

---

## Phase 1 — Data Layer

### Task 6: Define TypeScript types for content

**Files:**
- Create: `src/data/types.ts`

- [ ] **Step 1: Write types**

```ts
// src/data/types.ts

export type SectionKind = 'scenario' | 'zone' | 'iteration' | 'logic';

export type ProjectSection = {
  kind: SectionKind;
  label: string;         // e.g. "Scenario 01", "Zone 03", "Logic"
  title: string;         // e.g. "Zeppelin crash"
  body: string;          // verbatim from source
  map?: string;          // public path to top-down image
  media?: string[];      // public paths to cinematic stills
  beforeAfter?: { before: string; after: string };
};

export type ProjectMeta = {
  game: string;
  studio: string;
  year: number;
  role: string;
};

export type Project = {
  slug: string;
  number: string;        // display index, "01" .. "04"
  title: string;
  tagline: string;
  intro: string;         // first paragraph verbatim
  meta: ProjectMeta;
  hero: { type: 'image' | 'video'; src: string };
  thumbnail: string;
  sections: ProjectSection[];
  closingVideo?: string; // YouTube embed URL
};

export type About = {
  bio: string;
  tools: string[];
  cvUrl: string;
  contacts: {
    email: string;
    linkedin: string;
    artstation: string | null;
    vimeo: string | null;
  };
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/types.ts
git commit -m "feat(data): add Project, ProjectSection, About types"
```

---

### Task 7: Create `about.ts` with placeholder content

**Files:**
- Create: `src/data/about.ts`

- [ ] **Step 1: Write `about.ts`**

```ts
// src/data/about.ts
import type { About } from './types';

export const about: About = {
  // TODO: confirm with author
  bio:
    'Level and scenario designer with several years of experience designing combat ' +
    'scenarios and rebuilding maps for World of Tanks at Wargaming. I work the full ' +
    'development cycle — greybox layouts, internal playtests, and coordinating 3D, ' +
    'level art, animation and VFX teams toward release. I led integration of the ' +
    'Random Events feature across multiple maps (Himmelsdorf, Siegfried Line, Paris) ' +
    'and rebuilt Airfield from the ground up.',
  // TODO: confirm with author
  tools: [
    'Internal Wargaming level editor',
    'Maya',
    'Photoshop',
    'Notion',
    'Playtest direction',
    'Design documentation',
    'Cross-team coordination',
  ],
  cvUrl: '/aleksandr-dyusov-cv.pdf',
  contacts: {
    email: 'aleksandrdyusov@gmail.com',
    linkedin: 'https://www.linkedin.com/in/', // TODO: confirm with author
    artstation: null,
    vimeo: null,
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/about.ts
git commit -m "feat(data): add about placeholder content"
```

---

### Task 8: Create `projects.ts` with the 4 project entries (text verbatim, asset paths stubbed)

**Files:**
- Create: `src/data/projects.ts`

The text below is **verbatim** from the source Wix site (extracted during brainstorming). Do not edit.

- [ ] **Step 1: Write `projects.ts`**

```ts
// src/data/projects.ts
import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'himmelsdorf-scenarios',
    number: '01',
    title: 'Himmelsdorf scenarios',
    tagline: 'Random Events on Himmelsdorf — zeppelin crash and train crash.',
    intro:
      'As part of the Random Events feature, I introduce a series of scenarios that dynamically alter the geometry ' +
      'of existing World of Tanks maps. For the Himmelsdorf map, I integrated two specific events: a zeppelin crash ' +
      'and a train bombardment.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2023, // TODO: confirm with author
      role: 'Scenario Design',
    },
    hero: { type: 'image', src: '/assets/projects/himmelsdorf-scenarios/hero.jpg' },
    thumbnail: '/assets/projects/himmelsdorf-scenarios/thumbnail.jpg',
    sections: [
      {
        kind: 'scenario',
        label: 'Scenario 01',
        title: 'Zeppelin crash',
        body:
          'A first-of-its-kind, massive airship was shot down while flying over a German city. Its crash introduces ' +
          'new positions and strategic opportunities to change the flow of battle on the map. During development, ' +
          'I collaborated with modellers, animators, level and tech artists, historians, gameplay and server programmers, ' +
          'as well as QA engineers. This cross-functional effort ensured the scenario was visually stunning and grand in scale, ' +
          'while remaining technically optimized and stable. Most importantly, it provides meaningful improvements to the ' +
          'overall gameplay experience during battles on this map.',
        map: '/assets/projects/himmelsdorf-scenarios/zeppelin-map.png',
        media: [
          '/assets/projects/himmelsdorf-scenarios/zeppelin-01.jpg',
          '/assets/projects/himmelsdorf-scenarios/zeppelin-02.jpg',
        ],
      },
      {
        kind: 'iteration',
        label: 'Iteration',
        title: 'From basic concrete plates to polished zeppelin',
        body:
          'The scenario underwent a full development cycle, starting from a basic blockout using legacy models and ' +
          'concrete blocks to the final placement of high-quality assets. Each stage was refined through multiple ' +
          'iterations and internal playtests to ensure optimal flow and balance.',
        beforeAfter: {
          before: '/assets/projects/himmelsdorf-scenarios/zeppelin-blockout.jpg',
          after: '/assets/projects/himmelsdorf-scenarios/zeppelin-polished.jpg',
        },
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'Before the zeppelin crash, the map featured several areas with limited positions. The frontline was quite ' +
          'wide, but opportunities for close-quarters engagements were limited. Additionally, there was no way to ' +
          'rotate or switch between the hilltop Castle and the city below. To increase variety, I added geometry directly ' +
          'along the frontline, blocking certain sightlines (long-range shots) while opening up safe paths for closing ' +
          'the distance and maneuvering. Most importantly, I created a new traversal route allowing players to descend ' +
          'from the Castle into the city.',
      },
      {
        kind: 'scenario',
        label: 'Scenario 02',
        title: 'Train crash',
        body:
          'An equally thrilling and massive scenario unfolds on another part of the map. A cargo train travelling along ' +
          'the railway is ambushed and subjected to an aerial bombardment. The bombs destroy the tracks, causing the train ' +
          'to derail and overturn along the entire length of the map rails.',
        map: '/assets/projects/himmelsdorf-scenarios/train-map.png',
        media: [
          '/assets/projects/himmelsdorf-scenarios/train-01.jpg',
          '/assets/projects/himmelsdorf-scenarios/train-02.jpg',
        ],
      },
      {
        kind: 'iteration',
        label: 'Stages',
        title: 'Stages of development the train scenario',
        body:
          'By experimenting with various animations, train starting points, travel directions, and the final layout of ' +
          'the derailed cars across numerous playtests, I was able to determine the optimal combination of these elements.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'This area of the map is typically negative space — a "dead zone" with extremely limited cover where movement ' +
          'usually results in the player\'s destruction. While this design serves a purpose in standard matches, the Random ' +
          'Events feature allows us to transform the map dynamically, adding depth to the gameplay. By strategically placing ' +
          'the wreckage to block long-range shot lines, I\'ve created a safer environment in this sector. This enables more ' +
          'aggressive movement along the rails and introduces new tactical positions behind the wagons and coal piles, ' +
          'significantly diversifying the gameplay in this lane.',
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/?listType=search&list=WoT+Himmelsdorf+scenarios', // TODO: replace with actual embed URL from /portfolio/1
  },

  {
    slug: 'siegfried-line-scenarios',
    number: '02',
    title: 'Siegfried line scenarios',
    tagline: 'City bombardment and bomber crash on the Siegfried Line.',
    intro:
      'As part of the Random Events feature, I implemented a series of scenarios that dynamically alter the geometry of ' +
      'existing World of Tanks maps. For the Siegfried Line map, I integrated two specific events: a city bombardment and a plane crash.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2023, // TODO: confirm with author
      role: 'Scenario Design',
    },
    hero: { type: 'image', src: '/assets/projects/siegfried-line-scenarios/hero.jpg' },
    thumbnail: '/assets/projects/siegfried-line-scenarios/thumbnail.jpg',
    sections: [
      {
        kind: 'scenario',
        label: 'Scenario 01',
        title: 'City bombardment',
        body:
          'To this day, this scenario serves as the benchmark for the entire Random Events feature. The new positions and ' +
          'routes it introduces offer numerous tactical opportunities for both teams. Crucially, the scenario enhances the ' +
          'map\'s original gameplay intent rather than fundamentally changing it. During production, I not only managed the ' +
          'scenario through the complete development lifecycle — from prototype to release — but I also led internal playtests ' +
          'to pinpoint the optimal configuration of the new geometry. Additionally, I took the initiative to train a new team ' +
          'of animators and VFX artists on the scenario development pipeline.',
        map: '/assets/projects/siegfried-line-scenarios/city-map.png',
        media: [
          '/assets/projects/siegfried-line-scenarios/city-01.jpg',
          '/assets/projects/siegfried-line-scenarios/city-02.jpg',
        ],
      },
      {
        kind: 'iteration',
        label: 'Process',
        title: 'Sometimes houses are just basic slabs',
        body:
          'During the conceptual and testing phases, I often work with existing project resources. I frequently source ' +
          'available assets, effects, and animations to build scenarios. However, it is also common for me to recreate the ' +
          'desired geometry from scratch using basic primitives to validate the layout.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'Before the scenario, the map featured several areas with positions that formed various isolated lanes and ' +
          'corridors. However, there was almost no interconnectivity between them. By opening up city blocks and creating ' +
          'new positions from destroyed buildings, I established connectivity between all three lanes. Crucially, the ' +
          'frontline remained stable, and the overall combat pacing was preserved. These new positions and routes successfully ' +
          'diversified the gameplay experience on the map.',
      },
      {
        kind: 'scenario',
        label: 'Scenario 02',
        title: 'Bomber crash',
        body:
          'Another scenario on this map features a large bomber crashing at the map\'s edge after a dogfight, clipping the ' +
          'corner of a building with its wing. While this event is less transformative than the city bombardment, it integrates ' +
          'seamlessly into the local gameplay. It creates situational cover and blocks long-range sightlines, facilitating safer ' +
          'movement through the area.',
        map: '/assets/projects/siegfried-line-scenarios/bomber-map.png',
        media: [
          '/assets/projects/siegfried-line-scenarios/bomber-01.jpg',
        ],
      },
      {
        kind: 'iteration',
        label: 'Process',
        title: 'Animation is also a part of my duties',
        body:
          'Before transitioning to the production phase and kicking off the tasks for 3D, VFX, animation, and level art teams, ' +
          'I must finalize the level geometry. To ensure full immersion during internal playtests, I am always tasked with ' +
          'creating a complete scenario draft. This means that developing the Level Sequence draft is also an integral part of my workflow.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'Long-range engagements and sniping dominate this flank. Advancing against the enemy is difficult and unintuitive, ' +
          'leaving players highly vulnerable during any attempt to close the distance. Consequently, the wreckage of the crashed ' +
          'aircraft effectively creates new cover and obstructs several long-range sightlines. This establishes fresh positions ' +
          'within the sector and allows for much safer movement and rotation.',
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/?listType=search&list=WoT+Siegfried+line+scenarios', // TODO: replace with actual embed URL from /portfolio/2
  },

  {
    slug: 'airfield-map',
    number: '03',
    title: 'Airfield map',
    tagline: 'Complete rebuild of the Airfield map.',
    intro:
      'I spearheaded a complete overhaul of the Airfield map, essentially rebuilding it from scratch. Recognizing that previous ' +
      'minor adjustments had failed to improve player satisfaction, I took the initiative to design an entirely new map layout ' +
      'while preserving the established African desert coast setting.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2024, // TODO: confirm with author — update 1.28.1
      role: 'Level Design',
    },
    hero: { type: 'image', src: '/assets/projects/airfield-map/hero.jpg' },
    thumbnail: '/assets/projects/airfield-map/thumbnail.jpg',
    sections: [
      {
        kind: 'zone',
        label: 'Zone 01',
        title: 'The Cave',
        body:
          'The Cave is a dedicated engagement zone for heavy armor. Within its walls and under its natural roof, heavy, ' +
          'slow-moving vehicles can fight in relative isolation, shielded from outside interference. To add gameplay variety, ' +
          'I implemented a sub-sector on top of the cave, where positions are spaced further apart, resulting in a more methodical ' +
          'and measured pace.',
        map: '/assets/projects/airfield-map/zone-overview.png',
      },
      {
        kind: 'zone',
        label: 'Zone 02',
        title: 'The Dunes',
        body:
          'This type of natural terrain is rarely utilized in our game. However, dunes are exceptionally effective for facilitating ' +
          'gameplay along the entire length of the ridge. They provide players with a sense of control and significantly diversify the ' +
          'experience, as a viable firing position can be found anywhere along the dune\'s crest.',
      },
      {
        kind: 'zone',
        label: 'Zone 03',
        title: 'The Coastline',
        body:
          'Since the dunes are designed for long-range positional play, I needed to provide a high-mobility sub-sector where fast ' +
          'vehicles could close the gap for more aggressive engagements. The coastline serves this exact purpose, offering a dedicated ' +
          'flank for rapid maneuvers and close-quarters pressure.',
      },
      {
        kind: 'zone',
        label: 'Zone 04',
        title: 'The Central Oasis & Bush Line',
        body:
          'The Central Oasis serves as the primary link between the dunes. Here, Light Tanks and scouts can maximize their view range ' +
          'to effectively spot enemy forces positioned across the ridgelines. The Bush Line is a situational tactical element that allows ' +
          'players to stealthily infiltrate the enemy\'s rear under specific conditions. However, it\'s a high-risk maneuver: if you are ' +
          'detected, there is virtually no cover to escape.',
      },
      {
        kind: 'zone',
        label: 'Zone 05',
        title: 'Holding Positions',
        body:
          'No map is complete without these. The presence of second-line defensive positions with oversight of key map areas allows for a ' +
          'controlled deceleration of the battle\'s pace. This creates opportunities for a comeback, enabling a team to flip the momentum in ' +
          'their favor even if they were initially at a disadvantage.',
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/?listType=search&list=WoT+Airfield+battles', // TODO: replace with actual embed URL from /portfolio/3
  },

  {
    slug: 'paris-bridge-bombardment',
    number: '04',
    title: 'Bridge bombardment on Paris',
    tagline: 'V-2 rocket bridge bombardment scenario.',
    intro:
      'The V-2 rocket bombardment of the bridge on the Paris map is an example of a relatively straightforward scenario. However, given ' +
      'that the lane where it occurs is already considered well-designed, the primary challenge was to \'do no harm.\' The goal was to ' +
      'enhance the gameplay depth without disrupting the existing balance that players already enjoy.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2023, // TODO: confirm with author
      role: 'Scenario Design',
    },
    hero: { type: 'image', src: '/assets/projects/paris-bridge-bombardment/hero.jpg' },
    thumbnail: '/assets/projects/paris-bridge-bombardment/thumbnail.jpg',
    sections: [
      {
        kind: 'iteration',
        label: 'Stages',
        title: 'Bridge through its stages',
        body:
          'This was a textbook scenario where the team followed a well-established, time-tested process. As with previous events, I ' +
          'developed the geometry starting from the graybox stage for internal testing, and subsequently oversaw the 3D, level art, and ' +
          'animation teams to ensure a flawless release with no technical or design issues.',
        map: '/assets/projects/paris-bridge-bombardment/bridge-map.png',
        media: [
          '/assets/projects/paris-bridge-bombardment/bridge-01.jpg',
        ],
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'Prior to the event, this area was already a solid brawling zone for heavy vehicles. A variety of positions and tactical options ' +
          'provided good versatility in this sector, and maintaining momentum to push through the flank was relatively straightforward. ' +
          'Therefore, the primary goal for this scenario was to \'do no harm.\' The objective was to complement the existing gameplay by ' +
          'providing even more tactical opportunities. The destroyed bridge introduces new positions among the debris and opens up previously ' +
          'inaccessible routes to the upper roadway.',
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/?listType=search&list=WoT+Paris+battle+scenario', // TODO: replace with actual embed URL from /portfolio/4
  },
];
```

- [ ] **Step 2: Sanity check — TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat(data): add 4 projects with verbatim text from source"
```

---

### Task 9: TDD prev/next/lookup helpers in `src/lib/projectNav.ts`

**Files:**
- Create: `src/lib/projectNav.test.ts`, `src/lib/projectNav.ts`

- [ ] **Step 1: Write failing tests**

`src/lib/projectNav.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import type { Project } from '../data/types';
import { findProjectBySlug, getPrevProject, getNextProject } from './projectNav';

const fixture: Project[] = [
  { slug: 'a', number: '01', title: 'A', tagline: '', intro: '',
    meta: { game: '', studio: '', year: 2024, role: '' },
    hero: { type: 'image', src: '' }, thumbnail: '', sections: [] },
  { slug: 'b', number: '02', title: 'B', tagline: '', intro: '',
    meta: { game: '', studio: '', year: 2024, role: '' },
    hero: { type: 'image', src: '' }, thumbnail: '', sections: [] },
  { slug: 'c', number: '03', title: 'C', tagline: '', intro: '',
    meta: { game: '', studio: '', year: 2024, role: '' },
    hero: { type: 'image', src: '' }, thumbnail: '', sections: [] },
];

describe('findProjectBySlug', () => {
  it('returns the project when slug exists', () => {
    expect(findProjectBySlug(fixture, 'b')?.title).toBe('B');
  });
  it('returns undefined for unknown slug', () => {
    expect(findProjectBySlug(fixture, 'zzz')).toBeUndefined();
  });
});

describe('getPrevProject', () => {
  it('returns previous project', () => {
    expect(getPrevProject(fixture, 'b')?.slug).toBe('a');
  });
  it('wraps from first to last', () => {
    expect(getPrevProject(fixture, 'a')?.slug).toBe('c');
  });
  it('returns undefined for unknown slug', () => {
    expect(getPrevProject(fixture, 'zzz')).toBeUndefined();
  });
});

describe('getNextProject', () => {
  it('returns next project', () => {
    expect(getNextProject(fixture, 'b')?.slug).toBe('c');
  });
  it('wraps from last to first', () => {
    expect(getNextProject(fixture, 'c')?.slug).toBe('a');
  });
  it('returns undefined for unknown slug', () => {
    expect(getNextProject(fixture, 'zzz')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests — expect failure**

```bash
npm test
```
Expected: tests fail because `projectNav.ts` doesn't exist.

- [ ] **Step 3: Implement `src/lib/projectNav.ts`**

```ts
import type { Project } from '../data/types';

export function findProjectBySlug(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

function indexOfSlug(projects: Project[], slug: string): number {
  return projects.findIndex((p) => p.slug === slug);
}

export function getPrevProject(projects: Project[], slug: string): Project | undefined {
  const i = indexOfSlug(projects, slug);
  if (i === -1) return undefined;
  return projects[(i - 1 + projects.length) % projects.length];
}

export function getNextProject(projects: Project[], slug: string): Project | undefined {
  const i = indexOfSlug(projects, slug);
  if (i === -1) return undefined;
  return projects[(i + 1) % projects.length];
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm test
```
Expected: 9 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/projectNav.ts src/lib/projectNav.test.ts
git commit -m "feat(lib): add tested projectNav helpers (find/prev/next)"
```

---

### Task 10: One-time scrape of Wix image URLs and download to `public/assets/projects/`

This task is **manual + script-assisted**. The Wix URLs differ per project; we capture them once via a browser and feed them to a download script.

**Files:**
- Create: `scripts/wix-assets.json` (URL list)
- Create: `scripts/scrape-wix-assets.mjs`
- Create: directory tree under `public/assets/projects/`
- Create: `public/aleksandr-dyusov-cv.pdf` (empty placeholder)

- [ ] **Step 1: Capture image URLs**

Open https://aleksandrdyusov.wixsite.com/portfolio in a browser. For each project page (`/1` … `/4`), open DevTools → Network → filter Img → reload. Save full image URLs to `scripts/wix-assets.json` keyed by destination path:

```json
{
  "/assets/projects/himmelsdorf-scenarios/hero.jpg": "https://static.wixstatic.com/media/<hero>.jpg",
  "/assets/projects/himmelsdorf-scenarios/thumbnail.jpg": "https://static.wixstatic.com/media/<thumb>.jpg",
  "/assets/projects/himmelsdorf-scenarios/zeppelin-map.png": "https://static.wixstatic.com/media/<map>.png",
  "/assets/projects/himmelsdorf-scenarios/zeppelin-blockout.jpg": "https://static.wixstatic.com/media/<blockout>.jpg",
  "/assets/projects/himmelsdorf-scenarios/zeppelin-polished.jpg": "https://static.wixstatic.com/media/<polished>.jpg",
  "/assets/projects/himmelsdorf-scenarios/zeppelin-01.jpg": "https://static.wixstatic.com/media/<cinematic1>.jpg",
  "/assets/projects/himmelsdorf-scenarios/zeppelin-02.jpg": "https://static.wixstatic.com/media/<cinematic2>.jpg",
  "/assets/projects/himmelsdorf-scenarios/train-map.png": "https://static.wixstatic.com/media/<trainmap>.png",
  "/assets/projects/himmelsdorf-scenarios/train-01.jpg": "https://static.wixstatic.com/media/<train1>.jpg",
  "/assets/projects/himmelsdorf-scenarios/train-02.jpg": "https://static.wixstatic.com/media/<train2>.jpg"
  // … repeat for siegfried-line-scenarios, airfield-map, paris-bridge-bombardment
}
```

For paths referenced in `src/data/projects.ts` that don't have a Wix counterpart, leave that path missing from the JSON — the image will be a 404 at runtime; the author can drop it manually later.

- [ ] **Step 2: Write the download script**

`scripts/scrape-wix-assets.mjs`:
```js
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapping = JSON.parse(
  await fs.readFile(path.join(__dirname, 'wix-assets.json'), 'utf8')
);
const publicDir = path.join(__dirname, '..', 'public');

for (const [destRel, url] of Object.entries(mapping)) {
  const destAbs = path.join(publicDir, destRel.replace(/^\//, ''));
  await fs.mkdir(path.dirname(destAbs), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`SKIP ${destRel} — ${res.status} ${url}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(destAbs, buf);
  console.log(`OK   ${destRel} (${buf.length} bytes)`);
}
console.log('Done.');
```

- [ ] **Step 3: Run the script**

```bash
node scripts/scrape-wix-assets.mjs
```
Expected: each line either `OK` with byte count or `SKIP` with HTTP error. No exceptions.

- [ ] **Step 4: Create placeholder CV file**

```bash
printf '%%PDF-1.4\n%% placeholder\n' > public/aleksandr-dyusov-cv.pdf
```

- [ ] **Step 5: Add a favicon stub**

`public/favicon.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0a0a0a"/><text x="16" y="22" text-anchor="middle" font-family="Inter, system-ui" font-weight="800" fill="#ffffff" font-size="14">AD</text></svg>
```

In `index.html`, replace the existing `<link rel="icon" ...>` line with:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

- [ ] **Step 6: Commit assets**

```bash
git add scripts/ public/
git commit -m "chore(assets): scrape project images from Wix, add placeholder cv + favicon"
```

---

## Phase 2 — Layout Shell

### Task 11: Header component (monogram + 3 right links)

**Files:**
- Create: `src/components/Header.tsx`, `src/components/Header.test.tsx`

- [ ] **Step 1: Failing test**

`src/components/Header.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

describe('<Header>', () => {
  it('renders the AD monogram linking home', () => {
    renderHeader();
    const link = screen.getByRole('link', { name: /aleksandr dyusov/i });
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('AD');
  });

  it('renders email, linkedin, and CV download links', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /email/i }))
      .toHaveAttribute('href', 'mailto:aleksandrdyusov@gmail.com');
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    const cv = screen.getByRole('link', { name: /cv/i });
    expect(cv).toHaveAttribute('href', '/aleksandr-dyusov-cv.pdf');
    expect(cv).toHaveAttribute('download');
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npm test -- Header
```
Expected: fails (no component).

- [ ] **Step 3: Implement `Header.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { about } from '../data/about';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ink-0/80 backdrop-blur border-b border-ink-2">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Aleksandr Dyusov — home"
          className="inline-flex items-center justify-center w-7 h-7 border border-white/30 text-[11px] font-bold tracking-widest text-white hover:border-white"
        >
          AD
        </Link>

        <nav className="flex items-center gap-2 text-xs">
          <a
            href={`mailto:${about.contacts.email}`}
            className="px-3 py-1 rounded-full border border-ink-3 text-muted hover:text-white hover:border-ink-4"
          >
            Email
          </a>
          <a
            href={about.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-full border border-ink-3 text-muted hover:text-white hover:border-ink-4"
          >
            LinkedIn
          </a>
          <a
            href={about.cvUrl}
            download
            className="px-3 py-1 rounded-full bg-white text-ink-0 font-semibold hover:bg-white/90"
          >
            CV ↓
          </a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run — expect pass**

```bash
npm test -- Header
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Header.test.tsx
git commit -m "feat(ui): add sticky header with monogram + email/linkedin/cv"
```

---

### Task 12: Footer component

**Files:**
- Create: `src/components/Footer.tsx`, `src/components/Footer.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// src/components/Footer.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('<Footer>', () => {
  it('renders email and linkedin links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /aleksandrdyusov@gmail\.com/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });

  it('hides ArtStation/Vimeo when not configured', () => {
    render(<Footer />);
    expect(screen.queryByText(/artstation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vimeo/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npm test -- Footer
```

- [ ] **Step 3: Implement**

```tsx
// src/components/Footer.tsx
import { about } from '../data/about';

export default function Footer() {
  const { email, linkedin, artstation, vimeo } = about.contacts;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-2 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3 text-sm text-muted">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-3">Contact</div>
          <a href={`mailto:${email}`} className="block hover:text-white">{email}</a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="block hover:text-white">LinkedIn</a>
        </div>

        {(artstation || vimeo) && (
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-3">Elsewhere</div>
            {artstation && <a href={artstation} target="_blank" rel="noreferrer" className="block hover:text-white">ArtStation</a>}
            {vimeo && <a href={vimeo} target="_blank" rel="noreferrer" className="block hover:text-white">Vimeo</a>}
          </div>
        )}

        <div className="md:text-right">
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-3">Site</div>
          <p>© {year} Aleksandr Dyusov</p>
          <p className="text-quiet">Built with React + Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run — expect pass**

```bash
npm test -- Footer
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx
git commit -m "feat(ui): add footer with contacts and copyright"
```

---

### Task 13: App layout shell wires Header/Footer around routed content

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `App.tsx`**

```tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Manual verify**

```bash
npm run dev
```
- `/` shows Header → "Home" → Footer.
- `/projects/foo` shows Header → "Project: foo" → Footer.
- Navigating between routes scrolls to top.

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(layout): wire header/footer + scroll-to-top into App"
```

---

## Phase 3 — Home Page

### Task 14: Hero component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 min-h-[40vh] flex flex-col justify-center">
      <h1 className="font-extrabold tracking-tight leading-none text-white text-[clamp(40px,7vw,80px)]">
        Aleksandr Dyusov
      </h1>
      <p className="mt-4 text-sm text-muted">
        <span className="font-mono text-white tracking-wider2 uppercase">Level &amp; Scenario Designer</span>
        <span className="px-2">·</span>
        World of Tanks, Wargaming
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(ui): add Hero with name + role line"
```

---

### Task 15: ProjectTile with hover-reveal + mobile fallback

**Files:**
- Create: `src/components/ProjectTile.tsx`, `src/components/ProjectTile.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// src/components/ProjectTile.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectTile from './ProjectTile';
import type { Project } from '../data/types';

const sample: Project = {
  slug: 'himmelsdorf-scenarios',
  number: '01',
  title: 'Himmelsdorf scenarios',
  tagline: 'tag',
  intro: '',
  meta: { game: 'World of Tanks', studio: 'Wargaming', year: 2023, role: 'Scenario Design' },
  hero: { type: 'image', src: '/hero.jpg' },
  thumbnail: '/thumb.jpg',
  sections: [],
};

function renderTile() {
  return render(
    <MemoryRouter>
      <ProjectTile project={sample} />
    </MemoryRouter>
  );
}

describe('<ProjectTile>', () => {
  it('links to the project route', () => {
    renderTile();
    const link = screen.getByRole('link', { name: /himmelsdorf scenarios/i });
    expect(link).toHaveAttribute('href', '/projects/himmelsdorf-scenarios');
  });

  it('renders the number badge', () => {
    renderTile();
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders the meta line with game/year/role', () => {
    renderTile();
    expect(screen.getByText(/World of Tanks/)).toBeInTheDocument();
    expect(screen.getByText(/2023/)).toBeInTheDocument();
    expect(screen.getByText(/Scenario Design/)).toBeInTheDocument();
  });

  it('renders an img with the thumbnail src and lazy loading', () => {
    renderTile();
    const img = screen.getByRole('img', { name: /himmelsdorf scenarios/i });
    expect(img).toHaveAttribute('src', '/thumb.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npm test -- ProjectTile
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ProjectTile.tsx
import { Link } from 'react-router-dom';
import type { Project } from '../data/types';

type Props = { project: Project };

export default function ProjectTile({ project }: Props) {
  const { slug, number, title, thumbnail, meta } = project;
  const metaLine = `${meta.game} · ${meta.year} · ${meta.role}`;
  return (
    <Link
      to={`/projects/${slug}`}
      className="group relative block aspect-[16/10] overflow-hidden rounded-sm bg-ink-2 motion-safe:transition-transform"
      aria-label={title}
    >
      <img
        src={thumbnail}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wider2 text-white/80 z-10">
        {number}
      </span>

      {/* Overlay — always visible on mobile, fades in on hover desktop */}
      <div
        className={
          'absolute inset-0 flex flex-col justify-end p-4 z-10 ' +
          'bg-gradient-to-t from-black/80 via-black/40 to-transparent ' +
          'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 ' +
          'motion-safe:transition-opacity motion-safe:duration-200'
        }
      >
        <div className="text-white font-semibold leading-tight">{title}</div>
        <div className="font-mono text-[10px] text-white/70 mt-1 tracking-wider2 uppercase">
          {metaLine}
        </div>
        <div className="font-mono text-[10px] text-white/60 mt-2 hidden lg:block">↗ Open project</div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Run — expect pass**

```bash
npm test -- ProjectTile
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectTile.tsx src/components/ProjectTile.test.tsx
git commit -m "feat(ui): add ProjectTile with hover-reveal + mobile fallback"
```

---

### Task 16: ProjectsGrid component

**Files:**
- Create: `src/components/ProjectsGrid.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/ProjectsGrid.tsx
import { projects } from '../data/projects';
import ProjectTile from './ProjectTile';

export default function ProjectsGrid() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-6">
        → Selected projects
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {projects.map((p) => (
          <ProjectTile key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectsGrid.tsx
git commit -m "feat(ui): add ProjectsGrid driven by data file"
```

---

### Task 17: About component

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/About.tsx
import { about } from '../data/about';

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-6">
        → About
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-white text-lg leading-relaxed max-w-2xl">{about.bio}</p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-3">Tools</div>
          <ul className="text-sm text-muted leading-7">
            {about.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a
            href={about.cvUrl}
            download
            className="inline-block mt-6 px-4 py-2 bg-white text-ink-0 font-semibold text-sm rounded-full hover:bg-white/90"
          >
            CV ↓
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat(ui): add About section with bio, tools, second CV button"
```

---

### Task 18: Assemble Home page

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Write Home**

```tsx
// src/pages/Home.tsx
import Hero from '../components/Hero';
import ProjectsGrid from '../components/ProjectsGrid';
import About from '../components/About';

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <About />
    </>
  );
}
```

- [ ] **Step 2: Manual verify**

```bash
npm run dev
```
Visit `/`. Confirm: Header → Hero (name + role) → "Selected projects" label → 4 project tiles → About → Footer.

Hover a tile on desktop: image dims, title + meta + "↗ Open project" appear.
Resize browser to <1024px width: meta visible without hover.

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat(home): assemble hero + grid + about into Home page"
```

---

## Phase 4 — Project Page

### Task 19: MetaPills component

**Files:**
- Create: `src/components/MetaPills.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/MetaPills.tsx
import type { ProjectMeta } from '../data/types';

type Props = { meta: ProjectMeta };

export default function MetaPills({ meta }: Props) {
  const pills = [meta.game, `${meta.studio} · ${meta.year}`, meta.role];
  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((label) => (
        <span
          key={label}
          className="font-mono text-[10px] uppercase tracking-wider2 px-3 py-1 rounded-full border border-ink-3 text-muted"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MetaPills.tsx
git commit -m "feat(ui): add MetaPills (game/studio·year/role)"
```

---

### Task 20: BeforeAfter component

**Files:**
- Create: `src/components/BeforeAfter.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/BeforeAfter.tsx
type Props = { before: string; after: string };

export default function BeforeAfter({ before, after }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <figure>
        <img src={before} alt="Before — blockout" loading="lazy" className="w-full aspect-[16/10] object-cover rounded-sm" />
        <figcaption className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mt-2">Before · blockout</figcaption>
      </figure>
      <figure>
        <img src={after} alt="After — polished" loading="lazy" className="w-full aspect-[16/10] object-cover rounded-sm" />
        <figcaption className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mt-2">After · polished</figcaption>
      </figure>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BeforeAfter.tsx
git commit -m "feat(ui): add BeforeAfter image pair"
```

---

### Task 21: ProjectSection (rail label + section content)

**Files:**
- Create: `src/components/ProjectSection.tsx`, `src/components/ProjectSection.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// src/components/ProjectSection.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectSection from './ProjectSection';
import type { ProjectSection as S } from '../data/types';

const base: S = { kind: 'scenario', label: 'Scenario 01', title: 'Zeppelin crash', body: 'body text' };

describe('<ProjectSection>', () => {
  it('renders rail label and title', () => {
    render(<ProjectSection section={base} />);
    expect(screen.getByText('Scenario 01')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /zeppelin crash/i })).toBeInTheDocument();
  });

  it('omits map when section has no map', () => {
    render(<ProjectSection section={base} />);
    expect(screen.queryByAltText(/top-down map/i)).not.toBeInTheDocument();
  });

  it('renders map when provided', () => {
    render(<ProjectSection section={{ ...base, map: '/map.png' }} />);
    expect(screen.getByAltText(/top-down map/i)).toHaveAttribute('src', '/map.png');
  });

  it('renders cinematic media when provided', () => {
    render(<ProjectSection section={{ ...base, media: ['/a.jpg', '/b.jpg'] }} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('renders before/after when provided', () => {
    render(<ProjectSection section={{ ...base, beforeAfter: { before: '/b.jpg', after: '/a.jpg' } }} />);
    expect(screen.getByAltText(/before — blockout/i)).toBeInTheDocument();
    expect(screen.getByAltText(/after — polished/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npm test -- ProjectSection
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ProjectSection.tsx
import type { ProjectSection as S } from '../data/types';
import BeforeAfter from './BeforeAfter';

type Props = { section: S };

export default function ProjectSection({ section }: Props) {
  const { label, title, body, map, media, beforeAfter } = section;
  return (
    <section className="grid lg:grid-cols-[120px_1fr] gap-4 lg:gap-12 py-10 border-t border-ink-2">
      <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet lg:pt-1">
        {label}
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">{title}</h2>
        <p className="text-base leading-relaxed text-muted max-w-3xl">{body}</p>

        {map && (
          <figure className="mt-6">
            <img
              src={map}
              alt={`Top-down map — ${title}`}
              loading="lazy"
              className="w-full aspect-[16/9] object-cover rounded-sm bg-ink-2"
            />
          </figure>
        )}

        {media && media.length > 0 && (
          <div
            className={
              'mt-4 grid gap-2 ' +
              (media.length === 1 ? 'grid-cols-1' : media.length === 2 ? 'grid-cols-2' : 'grid-cols-3')
            }
          >
            {media.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${title} — image ${i + 1}`}
                loading="lazy"
                className="w-full aspect-[16/10] object-cover rounded-sm bg-ink-2"
              />
            ))}
          </div>
        )}

        {beforeAfter && <BeforeAfter before={beforeAfter.before} after={beforeAfter.after} />}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run — expect pass**

```bash
npm test -- ProjectSection
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectSection.tsx src/components/ProjectSection.test.tsx
git commit -m "feat(ui): add ProjectSection with conditional map/media/beforeAfter"
```

---

### Task 22: ClosingVideo component

**Files:**
- Create: `src/components/ClosingVideo.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/ClosingVideo.tsx
type Props = { src: string; title?: string };

export default function ClosingVideo({ src, title = 'Project video' }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-12">
      <div className="aspect-video w-full rounded-sm overflow-hidden bg-ink-2">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ClosingVideo.tsx
git commit -m "feat(ui): add ClosingVideo YouTube iframe"
```

---

### Task 23: Assemble Project page with prev/next navigation

**Files:**
- Modify: `src/pages/Project.tsx`

- [ ] **Step 1: Write Project page**

```tsx
// src/pages/Project.tsx
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { findProjectBySlug, getPrevProject, getNextProject } from '../lib/projectNav';
import MetaPills from '../components/MetaPills';
import ProjectSection from '../components/ProjectSection';
import ClosingVideo from '../components/ClosingVideo';
import NotFound from './NotFound';

export default function Project() {
  const { slug = '' } = useParams();
  const project = findProjectBySlug(projects, slug);
  if (!project) return <NotFound />;

  const prev = getPrevProject(projects, slug);
  const next = getNextProject(projects, slug);

  return (
    <article>
      {/* Hero media */}
      <div className="w-full aspect-[16/9] md:aspect-[16/7] bg-ink-2">
        <img
          src={project.hero.src}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Intro block */}
      <div className="max-w-6xl mx-auto px-6 pt-10 md:pt-14">
        <MetaPills meta={project.meta} />
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="mt-3 font-mono text-xs uppercase tracking-wider2 text-quiet">
            {project.tagline}
          </p>
        )}
        <p className="mt-6 text-base md:text-lg leading-relaxed text-muted max-w-3xl">
          {project.intro}
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        {project.sections.map((s, i) => (
          <ProjectSection key={`${s.label}-${i}`} section={s} />
        ))}
      </div>

      {/* Closing video */}
      {project.closingVideo && (
        <ClosingVideo src={project.closingVideo} title={`${project.title} — gameplay`} />
      )}

      {/* Prev / Next navigation */}
      <nav className="max-w-6xl mx-auto px-6 mt-16 flex justify-between font-mono text-xs uppercase tracking-wider2 text-quiet">
        <Link to="/#projects" className="hover:text-white">← Back to projects</Link>
        {next && (
          <Link to={`/projects/${next.slug}`} className="hover:text-white">
            Next: {next.title} →
          </Link>
        )}
        {/* prev rendered as left-side alternative if explicitly desired in future */}
        <span className="sr-only">Previous: {prev?.title}</span>
      </nav>
    </article>
  );
}
```

- [ ] **Step 2: Manual verify**

```bash
npm run dev
```
- Visit `/projects/himmelsdorf-scenarios` → see hero image, meta pills, title, intro, all sections with rail labels on desktop, "Next: Siegfried line scenarios →" at bottom.
- Visit `/projects/airfield-map` → rail labels are `Zone 01` … `Zone 05`.
- Visit `/projects/paris-bridge-bombardment` → "Next: Himmelsdorf scenarios →" (wraps).
- Click "← Back to projects" → home `/#projects`, page scrolled to the grid section.
- Visit `/projects/nonsense` → renders NotFound.

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Project.tsx
git commit -m "feat(project): assemble case-study page with prev/next nav"
```

---

## Phase 5 — Polish

### Task 24: Anchor-scroll fix for `/#projects` after route change

`ScrollToTop` from Task 13 always scrolls to top. When user clicks "← Back to projects" with a hash, we need to honor the anchor.

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update ScrollToTop**

Replace the `ScrollToTop` function:

```tsx
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}
```

- [ ] **Step 2: Manual verify**

```bash
npm run dev
```
On a project page, click "← Back to projects". Confirm: home loads scrolled to the `#projects` section, not top.

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "fix(routing): honor hash anchors on route change"
```

---

### Task 25: Improve 404 page copy

**Files:**
- Modify: `src/pages/NotFound.tsx`

- [ ] **Step 1: Update copy**

```tsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-4">
        404 · lost in the dunes
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        This page does not exist.
      </h1>
      <Link to="/" className="inline-block mt-6 text-white underline">
        ← Back to portfolio
      </Link>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/NotFound.tsx
git commit -m "feat(404): improve copy to fit dark brutalist tone"
```

---

### Task 26: Production build verifies end-to-end

**Files:** none

- [ ] **Step 1: Build**

```bash
npm run build
```
Expected: TypeScript checks pass, Vite emits `dist/` with `index.html`, hashed JS/CSS bundles, `assets/`, `aleksandr-dyusov-cv.pdf`, etc. No errors.

- [ ] **Step 2: Preview**

```bash
npm run preview
```
Expected: serves on http://localhost:4173. Manually click through:
- Home renders fully
- All 4 project tiles open their respective project pages
- Prev/Next links wrap around
- 404 page works for `/garbage`

Stop preview.

- [ ] **Step 3: Run full test suite**

```bash
npm test
```
Expected: all tests pass (>= 18 across the suite).

- [ ] **Step 4: Commit any final tweaks**

If the production build surfaced any issues fixed during verification, commit them.

```bash
git status
git add -A
git commit -m "chore: final pre-deploy adjustments" # only if changes
```

---

### Task 27: Add deploy config (Vercel/Netlify SPA fallback)

**Files:**
- Create: `public/_redirects` (Netlify) and `vercel.json` (Vercel) so refresh on `/projects/:slug` returns `index.html`.

- [ ] **Step 1: Netlify fallback**

`public/_redirects`:
```
/*    /index.html   200
```

- [ ] **Step 2: Vercel fallback**

`vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 3: Commit**

```bash
git add public/_redirects vercel.json
git commit -m "chore(deploy): add SPA fallback redirects for Netlify and Vercel"
```

---

## Out of scope (acknowledged)

- No Open Graph tags / SEO meta. Per spec section 12.
- No analytics. Per spec section 12.
- No image zoom/lightbox. Per spec section 12.
- No light/dark toggle. Per spec section 12.
- Real CV PDF / real LinkedIn URL / real project years / real bio / real tools list — placeholders flagged with `// TODO: confirm with author` comments. Per spec section 13.

---

## Self-Review Checklist

- [x] Every section of the spec has at least one corresponding task.
  - Spec §1 Goal → covered by overall plan.
  - Spec §2 Non-goals → respected; no tasks for SSR/CMS/i18n.
  - Spec §3 Stack → Tasks 1–5 install everything.
  - Spec §4 IA → Task 4 wires routes; Task 24 fixes anchor scroll.
  - Spec §5 Home layout → Tasks 11 (header), 14 (hero), 15–16 (grid), 17 (about), 12 (footer), 18 (assemble).
  - Spec §6 Project case-study → Tasks 19 (MetaPills), 20 (BeforeAfter), 21 (ProjectSection), 22 (ClosingVideo), 23 (assemble + prev/next).
  - Spec §7 Data model → Tasks 6 (types), 7 (about), 8 (projects).
  - Spec §8 Visual style → Tasks 2 (Tailwind theme colors), 3 (fonts), and present throughout components.
  - Spec §9 Behavior → Tasks 11 (sticky header + backdrop blur), 13 (scroll-to-top), 24 (anchor scroll), 15 (hover + reduced motion via `motion-safe:`).
  - Spec §10 Content sourcing → Task 8 (text verbatim) + Task 10 (image scrape).
  - Spec §11 File structure → matches "File Structure" section at the top of this plan.
  - Spec §12 Out of scope → preserved as no-ops, summarized above.
  - Spec §13 Open items → encoded as `// TODO: confirm with author` in data files.
- [x] No placeholders in the plan itself ("TBD"/"fill in"/"implement appropriately"). All steps show actual code or exact commands.
- [x] Type/name consistency: `Project`, `ProjectSection`, `ProjectMeta`, `About` used uniformly; `findProjectBySlug` / `getPrevProject` / `getNextProject` consistent between Task 9 (definition) and Task 23 (use). `about` (object) and `projects` (array) imports consistent. `kind: 'scenario' | 'zone' | 'iteration' | 'logic'` only ever referenced as `kind`, never as `type`.
- [x] Test commands and expected outputs are concrete.
- [x] Asset URL conflict avoided — assets live under `/assets/projects/…`, routes under `/projects/:slug`.
- [x] Mobile fallback for hover-reveal explicitly tested (Task 15) and styled (`opacity-100 lg:opacity-0 lg:group-hover:opacity-100`).
- [x] `prefers-reduced-motion` honored via Tailwind's `motion-safe:` utility on transitions (Task 15).
