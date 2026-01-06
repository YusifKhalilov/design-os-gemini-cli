---
description: Add transitions and micro-interactions
---
# /animate

You are adding animation to the UI. This is Step 7 (final step) of the design process.

## Step 1: Check Prerequisites

Verify polished components exist in `product/components/`.

If missing:
"Please run `/polish` first to refine your components."

## Step 2: Identify Animation Opportunities

"Let's add motion to **[project name]**. Here are animation areas:

**Entry Animations:**
- Page/section fade-in
- Staggered list items

**Interaction Feedback:**
- Button hover/active states
- Card hover effects
- Input focus transitions

**State Changes:**
- Loading states
- Success/error feedback

Which would you like to add?
A. Entry animations
B. Interaction feedback
C. State changes
D. All of the above"

## Step 3: Apply Animations

For each type, add Svelte transitions:

**Entry:**
```svelte
<script>
  import { fade, fly } from 'svelte/transition'
</script>

<div in:fly={{ y: 20, duration: 200 }}>
  Content
</div>
```

**Hover:**
```css
.card {
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

**Focus:**
```css
.input:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  transition: outline-offset 0.1s ease-out;
}
```

## Step 4: Confirm Completion

"✓ **Animation complete!**

Your app now has:
- [List of animations added]

**🎉 All 7 steps complete!**

Your design is ready. Use the **Export** button in the app to get your Svelte files."
