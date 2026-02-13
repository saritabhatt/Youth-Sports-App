# CLAUDE.md - AI Assistant Guide for The Long Game

## Project Overview

**The Long Game** is a client-side youth sports assessment web application that helps parents discover sports matching their child's physical attributes, interests, and local opportunities. It uses a multi-factor scoring engine to rank 50+ sports based on a child's profile (age, gender, height, location).

There is no backend, database, or authentication. All persistence uses `localStorage`.

## Tech Stack

- **Framework:** React 18 + TypeScript 5.3
- **Build tool:** Vite 5
- **Styling:** Tailwind CSS 3.4 (with PostCSS + Autoprefixer)
- **Font:** Outfit (Google Fonts, loaded via `index.html`)
- **Module system:** ESM (`"type": "module"` in package.json)
- **Target:** ES2020, bundler module resolution

## Commands

```bash
npm run dev      # Start Vite dev server on port 5173
npm run build    # TypeScript check + Vite production build (tsc && vite build)
npm run preview  # Preview production build locally
```

There are no test, lint, or format commands configured. The `build` command is the primary way to verify correctness — `tsc` enforces strict TypeScript checks before Vite bundles.

## Project Structure

```
src/
├── components/              # React UI components
│   ├── ChildProfileForm.tsx # Profile creation/edit form with validation
│   ├── CompareMode.tsx      # Side-by-side sport comparison (up to 4)
│   ├── ExportMenu.tsx       # PDF/Text/CSV export dropdown
│   ├── ProfileSelector.tsx  # Profile list and switcher
│   ├── ScoringWeightsSliders.tsx # Adjustable weight sliders (5 factors)
│   ├── SportCard.tsx        # Individual sport recommendation card
│   └── SportDetailModal.tsx # Full sport detail overlay
├── data/                    # Business logic and data
│   ├── sportsData.ts        # Sport definitions, categories, local orgs, helpers (~2300 lines)
│   ├── scoringEngine.ts     # Core scoring algorithm and profile types
│   ├── storage.ts           # localStorage CRUD operations
│   └── exportUtils.ts       # Text/CSV/PDF export functions
├── App.tsx                  # Root component, state management, view routing
├── main.tsx                 # ReactDOM entry point
└── index.css                # Tailwind imports + custom scrollbar/slider styles
```

### Key configuration files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and npm scripts |
| `tsconfig.json` | Strict TS config (strict, noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch) |
| `tsconfig.node.json` | TS config for Vite config file |
| `vite.config.ts` | Vite + React plugin, dev server on port 5173 with `host: true` |
| `tailwind.config.js` | Content paths, custom Outfit font family |
| `postcss.config.js` | Tailwind + Autoprefixer plugins |

## Architecture and Key Patterns

### State Management

No external state library. The app uses React hooks exclusively:

- `useState` for all UI and data state in `App.tsx`
- `useMemo` for memoized sport scoring calculations
- `useEffect` for persisting weights to localStorage
- `useRef` for click-outside detection on dropdowns

### Routing

No router library. A simple `viewMode: 'setup' | 'results'` state in `App.tsx` controls which view is rendered via conditional rendering.

### Data Flow

1. Profiles load from localStorage on mount
2. User creates/selects a child profile
3. `scoreAllSports()` in `scoringEngine.ts` calculates weighted scores for all sports
4. Results are filtered by category and displayed as ranked `SportCard` components
5. Weight changes trigger re-scoring via `useMemo` dependency

### Scoring Engine (`src/data/scoringEngine.ts`)

Five scoring factors (each 1-10, weighted by user-adjustable sliders):
1. **Fun Factor** — enjoyment potential
2. **Skill Focus** — technical development opportunity
3. **Competition** — inverted regional competition level (lower competition = higher score)
4. **Opportunity** — height advantage match for the child
5. **Accessibility** — cost and program availability

Height advantage applies bonuses/penalties to the final weighted total (0-100 scale).

### Key Types

- `ChildProfile` — name, age, gender, location, heights, ethnicity
- `Sport` — full sport definition with scores, costs, age ranges, height data, regional data
- `ScoredSport` — calculated result with all factor scores and weighted total
- `ScoringWeights` — five weight values (0-100 each, normalized at calculation time)
- `SportCategory` — discriminated union of 10 categories

### localStorage Keys

All prefixed with `the-long-game-`:
- `the-long-game-profiles`
- `the-long-game-active-profile`
- `the-long-game-weights`
- `the-long-game-compare`

### Local Organizations Feature

When the ZIP code starts with `931` (Santa Barbara area), sport cards display relevant local organizations with type, age ranges, competition level, and cost information. Defined in `sportsData.ts`.

## Coding Conventions

### Naming

- **Components:** PascalCase (`SportCard.tsx`, `ChildProfileForm.tsx`)
- **Functions/variables:** camelCase (`scoreSport`, `calculateWeightedTotal`)
- **Constants/data arrays:** UPPER_SNAKE_CASE (`SPORTS_DATA`, `SPORT_CATEGORIES`)
- **Types/interfaces:** PascalCase (`Sport`, `ChildProfile`, `ScoredSport`)

### Component Patterns

- Functional components with typed props interfaces defined at top of file
- Inline conditional rendering with ternary operators and `&&`
- Event handlers passed as props (`onViewDetails`, `onToggleCompare`)
- Tailwind utility classes for all styling (no CSS modules or styled-components)

### TypeScript

- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- Strong typing throughout — no `any` types
- Discriminated unions for category and region types
- All component props have explicit interfaces

### Styling

- Tailwind utility-first approach exclusively
- Color palette: emerald (primary), slate (neutral), blue/amber/purple/rose (accents)
- Consistent patterns: `rounded-xl`, shadow effects, 150ms transitions
- Responsive grid layouts using Tailwind breakpoints
- Custom scrollbar and range input styles in `index.css`

### Error Handling

- `try-catch` in all `storage.ts` functions with graceful fallbacks (empty arrays/objects)
- Form validation in `ChildProfileForm.tsx` (age 3-18, ZIP code 5 digits)
- No external error tracking or logging

## Verification

Before submitting changes, always run:

```bash
npm run build
```

This runs `tsc && vite build` which will catch:
- TypeScript type errors
- Unused locals/parameters
- Missing imports
- Build-time bundling issues

There is no test suite or linter configured.
