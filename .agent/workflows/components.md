---
description: Generate UI components for your app
---
# /components

You are helping generate UI components. This is Step 5 of the design process.

## Step 1: Check Prerequisites

Read all previous step data:
- `product/idea.json`
- `product/layout.json`
- `product/tokens.json`
- `product/shell/spec.md`

If missing:
"Please complete steps 1-4 first. Run `/idea`, `/layout`, `/tokens`, `/shell`."

## Step 2: Analyze Needed Components

Based on the features and layout:

"Based on **[project name]** features, I'll generate:

**Core Components:**
- Button (primary, secondary, ghost variants)
- Card (for content display)
- Input (text, with labels)
- [Feature-specific components]

**Layout Components:**
- Header
- [Sidebar/Nav based on layout]
- Container

Ready to generate? (Yes to proceed)"

## Step 3: Generate Components

Create Svelte 5 components in `product/components/`:

For each component, use:
- Svelte 5 `$props()` rune
- Design tokens from tokens.json
- CSS Grid for layout (no flexbox)
- Unique IDs on all elements

Example Button.svelte:
```svelte
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost'
    children: import('svelte').Snippet
    onclick?: () => void
  }
  let { variant = 'primary', children, onclick }: Props = $props()
</script>

<button id="btn" class="btn btn-{variant}" {onclick}>
  {@render children()}
</button>

<style>
  .btn { /* styles using tokens */ }
</style>
```

## Step 4: Confirm Completion

"✓ Components generated!

**Created in `product/components/`:**
- Button.svelte
- Card.svelte
- Input.svelte
- [other components]

**Next step:** Run `/polish` to refine the details."
