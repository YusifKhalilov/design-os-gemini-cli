---
description: Design the application shell with 4+6 kiosk layout
---
# Design Shell

You are helping the user design the application shell — a full-viewport 4+6 column kiosk layout for their Svelte 5 app. No vertical page scroll.

## Step 1: Check Prerequisites

1. Read `/product/product-overview.md` — Product name
2. Read `/product/product-roadmap.md` — Sections for navigation
3. Check for `/product/design-system/` tokens

If overview or roadmap missing:
"Before designing the shell, run:
1. `/product-vision`
2. `/product-roadmap`"

If tokens missing, warn but continue:
"Note: Run `/design-tokens` first for consistent styling."

## Step 2: Explain the Kiosk Layout

"I'm designing a **4+6 kiosk shell** for **[Product Name]**:

```
┌────────────────────────────────────────────────┐
│  Header (compact)                              │
├──────────────┬─────────────────────────────────┤
│  Left Panel  │  Right Panel                    │
│  (4 cols)    │  (6 cols)                       │
│              │                                 │
│  • Steps     │  • Live Preview                 │
│  • Progress  │  • Component Display            │
│  • Selector  │  • Device Frames                │
│              │                                 │
└──────────────┴─────────────────────────────────┘
```

**Key features:**
- No vertical page scroll (panels scroll internally)
- Left: Steps, indicators, component selector
- Right: Live preview of designed components

Reasoning: This layout keeps context visible while maximizing preview space.

1. What should the header contain?
A. Logo + section title only (minimal)
B. Logo + breadcrumbs + theme toggle (standard)
C. Full navigation bar (complex)"

## Step 3: Gather Details

"1. How should sections appear in the left panel?
A. Collapsible accordion (one open at a time)
B. Vertical tabs (all visible, scrollable)
C. Dropdown selector (compact)

2. What device frames for the preview panel?
A. Desktop only (full width preview)
B. Desktop + Tablet + Mobile frames
C. Responsive slider (any width)"

## Step 4: Present Shell Specification

"Here's your shell design:

**Layout:** 4+6 kiosk grid (no page scroll)

**Header:**
- [Contents based on choice]
- Height: ~48px fixed

**Left Panel (4 cols):**
- Section/step list with [pattern]
- Progress indicators
- Component selector dropdown

**Right Panel (6 cols):**
- Live preview area
- Device frame: [choice]
- Dark/light toggle for preview

**CSS Grid:**
```css
.shell {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 48px 1fr;
  height: 100vh;
}
```

Does this look good?"

## Step 5: Create Shell Specification

Create `/product/shell/spec.md`:

```markdown
# Application Shell Specification

## Layout Pattern
4+6 kiosk grid, no vertical page scroll

## Grid Structure
- Header: full width, 48px height
- Left panel: columns 1-4
- Right panel: columns 5-10

## Left Panel Features
- [Section/step display pattern]
- Progress/fulfillment indicators
- Component selector dropdown

## Right Panel Features
- Live component preview
- Device frame selector
- Theme toggle for preview
```

## Step 6: Create Shell Component

Create `src/shell/AppShell.svelte`:

```svelte
<script lang="ts">
  interface Props {
    sections: Array<{ id: string; title: string; complete: boolean }>
    selectedComponent?: string
    children?: import('svelte').Snippet
  }

  let { sections, selectedComponent, children }: Props = $props()
</script>

<div id="shell-root" class="shell-grid">
  <header id="shell-header">
    <!-- Header content -->
  </header>

  <aside id="left-panel" class="left-panel">
    <!-- Steps, selector -->
  </aside>

  <main id="right-panel" class="right-panel">
    {@render children?.()}
  </main>
</div>

<style>
  .shell-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 48px 1fr;
    height: 100vh;
    overflow: hidden;
  }

  #shell-header {
    grid-column: 1 / 11;
  }

  .left-panel {
    grid-column: 1 / 5;
    overflow-y: auto;
  }

  .right-panel {
    grid-column: 5 / 11;
    overflow: hidden;
  }
</style>
```

## Step 7: Confirm Completion

"I've designed the shell for **[Product Name]**:

**Created:**
- `/product/shell/spec.md`
- `src/shell/AppShell.svelte`

**Features:**
- 4+6 kiosk layout (no page scroll)
- [Header style]
- [Left panel pattern]
- [Preview options]

Next: Run `/design-screen` to create Svelte 5 components."

## Important Notes

- Shell uses CSS Grid only (no flexbox)
- All elements need unique `id` attributes
- Output is Svelte 5 with `$props()` rune
- Body never scrolls; panels may scroll internally
- Preview panel shows designed components in real-time
