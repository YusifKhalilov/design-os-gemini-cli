---
description: Add motion and transitions to components
---
# Animate UI

You are helping the user add animations and transitions to Svelte 5 components. Focus on micro-interactions that enhance UX without being distracting.

## Step 1: Identify Target

"Which component needs animation?

List components from `src/sections/`."

## Step 2: Identify Animation Opportunities

"Looking at **[Component]**, I see opportunities for motion:

1. **Entry** — How elements appear on screen
2. **Interaction** — Hover, click, focus feedback
3. **State Changes** — Loading, success, error
4. **Layout Shifts** — Adding/removing items

Which to add first?
A. Entry animations
B. Interaction feedback
C. State transitions"

## Step 3: Propose Animation Style

Based on motion tokens, propose options:

"For [animation type], here are options:

**A. Subtle** (per motion tokens: fast, ease-out)
- Fade: 150ms
- Scale: 1.01
- Minimal movement

**B. Standard** (normal duration)
- Fade + slide: 250ms
- Scale: 1.02-1.03
- Comfortable motion

**C. Expressive** (slow, spring-like)
- Staggered entries
- Bouncy transforms
- Rich feedback

Which style?"

## Step 4: Implement Animation

Add Svelte transitions or CSS animations:

### Svelte Transitions
```svelte
<script>
  import { fade, fly, slide, scale } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
</script>

<!-- Entry animation -->
<div in:fly={{ y: 20, duration: 200, easing: cubicOut }}>
  Content
</div>

<!-- List stagger -->
{#each items as item, i}
  <div in:fly={{ y: 10, delay: i * 50 }}>
    {item.name}
  </div>
{/each}
```

### CSS Transitions
```svelte
<style>
  .card {
    transition:
      transform 0.15s ease-out,
      box-shadow 0.15s ease-out;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .card:active {
    transform: scale(0.98);
  }
</style>
```

### Focus States
```svelte
<style>
  .button:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
</style>
```

## Step 5: Confirm and Continue

"Added [animation type] to **[Component]**:
- [What was added]
- [Timing/easing used]

View in Preview Panel.

1. What's next?
A. Add more animations to this component
B. Animate a different component
C. Done with animations"

## Animation Guidelines

### Timing
- Micro-interactions: 100-200ms
- Navigation/state: 200-300ms
- Complex sequences: 300-500ms

### Easing
- **ease-out**: Most interactions (cubicOut)
- **ease-in-out**: Modals, page transitions
- **spring**: Playful, bouncy effects

### Best Practices
- Animate transforms (not layout properties)
- Keep durations under 400ms
- Stagger lists with 30-50ms delay
- Respect `prefers-reduced-motion`

### Reduced Motion
```svelte
<script>
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
</script>

<div transition:fade={{ duration: reduced ? 0 : 200 }}>
```
