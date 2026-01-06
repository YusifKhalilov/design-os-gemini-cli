# Agent Directives for Design OS

Design OS is a **Svelte 5 frontend design studio** that helps users create polished, animated, interactive UI components through a guided design workflow. The output is production-ready Svelte 5 code.

> **Important**: Design OS focuses purely on frontend UI—no backend, no API integrations, no data fetching logic. The goal is a beautiful, functional interface.

---

## Understanding Design OS Context

### 1. Design OS Application (React)
The React app that powers the design studio interface:
- Files in `src/` (components, pages, utilities)
- Uses a 4+6 column kiosk layout (no vertical scroll)
- Left panel (4 cols): Steps, indicators, component selector
- Right panel (6 cols): Live preview of designed components

### 2. Designed Product (Svelte 5 Output)
The UI you're creating for the user's product:
- Svelte 5 components in `src/sections/[section-name]/`
- Uses `$props()` rune for all component props
- CSS transitions and Svelte transitions for animations
- Design tokens from `product/design-system/`

---

## Questioning & Data Gathering

When gathering information, follow these guidelines:

1. **Use Reasoning**: Explain *why* you're asking before each question
2. **Numbered Questions**: Clearly number all questions
3. **Provide Options (A, B, C)**: Include three distinct options

**Example:**
> "Reasoning: Understanding the interaction style helps me choose appropriate animations.
>
> 1. What feel should interactions have?
> A. Snappy & responsive (fast, minimal motion)
> B. Smooth & elegant (medium easing, subtle motion)
> C. Playful & dynamic (springs, bounces, rich motion)"

---

## The Design Flow

Design OS follows a structured sequence:

### 1. Product Vision (`/product-vision`)
Define what you're building and why.
**Output:** `product/product-overview.md`

### 2. Design Tokens (`/design-tokens`)
Choose colors, typography, and motion curves.
**Output:** `product/design-system/colors.json`, `typography.json`, `motion.json`

### 3. Shell Design (`/design-shell`)
Create the app shell with 4+6 kiosk layout.
**Output:** `src/shell/AppShell.svelte`

### 4. For Each Section:
- `/shape-section` — Define UI specification
- `/design-screen` — Create Svelte 5 components
- `/refine-ui` — Iterate on visual polish
- `/animate-ui` — Add motion and transitions

---

## File Structure

```
product/                           # Product definition
├── product-overview.md            # Vision and goals
├── design-system/
│   ├── colors.json                # { primary, secondary, neutral }
│   ├── typography.json            # { heading, body, mono }
│   └── motion.json                # { durations, easings }
└── sections/
    └── [section-name]/
        └── spec.md                # UI specification

src/
├── shell/                         # Shell Svelte components
│   └── AppShell.svelte
└── sections/
    └── [section-name]/
        ├── [Component].svelte     # Designed components
        └── index.ts               # Exports
```

---

## The Four Pillars

1. **Design Tokens** — Visual foundation
   - Color palette (Tailwind colors)
   - Typography (Google Fonts)
   - Motion (durations, easings, springs)
   - Spacing (consistent gaps)

2. **UI Architecture** — 4+6 kiosk grid
   - Left panel: Steps, fulfillment indicators
   - Right panel: Live component preview
   - No vertical page scroll

3. **Component Library** — Svelte 5 components
   - Props via `$props()` rune
   - CSS transitions for interactions
   - Dark mode support
   - Responsive design

4. **Live Preview** — Real-time visualization
   - Component selector dropdown
   - Device frame options (desktop/tablet/mobile)
   - Dark/light mode toggle

---

## Svelte 5 Component Requirements

When creating Svelte 5 components:

### Props Pattern
```svelte
<script lang="ts">
  interface Props {
    items: Item[]
    onSelect?: (id: string) => void
  }

  let { items, onSelect }: Props = $props()
</script>
```

### Transitions
```svelte
<script>
  import { fade, slide } from 'svelte/transition'
</script>

<div transition:fade={{ duration: 200 }}>
  Content
</div>
```

### CSS Transitions
```svelte
<button class="btn">Click me</button>

<style>
  .btn {
    transition: all 0.2s ease-out;
  }
  .btn:hover {
    transform: scale(1.02);
  }
</style>
```

### Required Attributes
- All interactive elements must have unique `id` attributes
- Use CSS Grid (no flexbox per user preference)
- Support dark mode via CSS custom properties or classes

---

## Design Requirements

- **No Vertical Scroll**: Body never scrolls; panels may scroll internally
- **CSS Grid Only**: No flexbox layouts (user preference)
- **Dark Mode**: Support both light and dark themes
- **Micro-animations**: Hover, focus, and interaction feedback
- **Unique IDs**: Every HTML element needs an id attribute

---

## Refinement Loops

Design OS encourages iterative polish:

1. **Design** → Create initial component
2. **Preview** → View in right panel
3. **Refine** → Adjust spacing, colors, typography
4. **Animate** → Add motion and transitions
5. **Repeat** → Until visually polished

Use `/refine-ui` and `/animate-ui` workflows for iteration.

---

## Design OS Application Style

The Design OS interface itself uses:
- **Typography**: Bricolage Grotesque for headings, JetBrains Mono for code
- **Colors**: Stone palette for neutrals, lime for accents
- **Layout**: 4+6 column kiosk grid, no body scroll
- **Cards**: Glassmorphic panels with subtle blur
- **Motion**: Fast transitions (150-200ms), no bouncy animations
