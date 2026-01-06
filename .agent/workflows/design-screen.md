---
description: Create screen designs for a section of your product
---
# Design Screen

You are helping the user create Svelte 5 components for a section of their product. Components will render in the right preview panel.

## Step 1: Check Prerequisites

1. Read `/product/product-roadmap.md` for sections
2. Check for `/product/sections/[section-id]/spec.md`

If only one section, auto-select it. Otherwise ask:

"Which section would you like to design?

1. Please select:
A. [Section 1 Title]
B. [Section 2 Title]
C. [Section 3 Title]"

If spec.md missing:
"Run `/shape-section` first to define the UI specification."

## Step 2: Check Design Tokens

Read design tokens if they exist:
- `/product/design-system/colors.json`
- `/product/design-system/typography.json`
- `/product/design-system/motion.json`

If missing, warn:
"Note: Run `/design-tokens` for consistent styling."

## Step 3: Analyze Requirements

Read the spec and identify needed views:
- List/dashboard view
- Detail view
- Form/create view

"The specification suggests [N] views for **[Section]**.

1. Which view first?
A. [View 1] (Main list/dashboard)
B. [View 2] (Detail/profile)
C. [View 3] (Create/edit form)"

## Step 4: Create Svelte 5 Component

Create `src/sections/[section-id]/[Component].svelte`:

```svelte
<script lang="ts">
  interface Props {
    items: Item[]
    onSelect?: (id: string) => void
    onCreate?: () => void
  }

  let { items, onSelect, onCreate }: Props = $props()
</script>

<div id="[component]-root" class="component-grid">
  {#each items as item (item.id)}
    <button
      id="item-{item.id}"
      class="item-card"
      onclick={() => onSelect?.(item.id)}
    >
      {item.name}
    </button>
  {/each}
</div>

<style>
  .component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .item-card {
    padding: 16px;
    background: var(--surface);
    transition: transform 0.15s ease-out;
  }

  .item-card:hover {
    transform: translateY(-2px);
  }
</style>
```

## Component Requirements

### Props Pattern
- Use `$props()` rune for all props
- Optional callbacks with `?` and `?.()` calls
- Type all props with interfaces

### Styling Rules
- **CSS Grid only** (no flexbox)
- **Unique IDs** on all elements
- **CSS transitions** for hover/focus states
- **Dark mode** support via `dark:` classes or CSS vars

### Motion
Apply motion tokens:
```css
.element {
  transition: all var(--duration-fast) var(--easing-out);
}
```

### What to Include
- All UI requirements from spec
- Hover, focus, active states
- Loading states if applicable
- Empty states

### What NOT to Include
- No data fetching
- No routing logic
- No navigation chrome

## Step 5: Animation Pass

After basic layout, add motion:

"Let's add animations. For **[Component]**:

1. Entry animation?
A. Fade in (subtle)
B. Slide up + fade (engaging)
C. Stagger children (dynamic)

2. Hover effect?
A. Scale up (1.02)
B. Lift shadow
C. Color shift"

Apply Svelte transitions:
```svelte
<script>
  import { fade, fly } from 'svelte/transition'
</script>

<div transition:fade={{ duration: 200 }}>
  Content
</div>
```

## Step 6: Confirm Completion

"I've created the component for **[Section]**:

**File:** `src/sections/[section-id]/[Component].svelte`

**Features:**
- Svelte 5 with `$props()` rune
- CSS Grid layout
- [Hover effect]
- [Entry animation]
- Dark mode support

The component will appear in the Preview Panel. Select it from the dropdown to view.

**Next:**
- `/refine-ui` to iterate on visual polish
- `/animate-ui` to add more motion
- `/design-screen` for additional views"

## Important Notes

- All components use Svelte 5 syntax (`$props()`)
- CSS Grid only, no flexbox
- Every element needs a unique `id`
- Apply motion tokens for consistency
- Components render in the 6-col preview panel
