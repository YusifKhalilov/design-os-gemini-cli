---
description: Choose colors, typography, and motion for your product design system
---
# Design Tokens

You are helping the user define visual tokens for their Svelte 5 UI. These tokens ensure consistency across all designed components.

## Step 1: Check Prerequisites

Read `/product/product-overview.md` to understand the product.

If it doesn't exist:
"Before defining design tokens, run `/product-vision` first."

## Step 2: Explain the Process

"Let's define the visual identity for **[Product Name]**. We'll choose:
- **Colors** — Primary, secondary, neutral palettes
- **Typography** — Heading, body, mono fonts
- **Motion** — Transition durations and easing curves

Reasoning: A consistent design system makes every component feel unified.

1. Do you have existing brand preferences?
A. Yes, I have specific colors/fonts
B. No, suggest based on my product
C. Use a 'Modern Tech' theme"

## Step 3: Choose Colors

Help the user select from Tailwind's palette:

"1. What vibe fits **[Product Name]**?
A. Professional & Trustworthy (Blues/Slates)
B. Creative & Energetic (Violets/Limes)
C. Clean & Minimal (Zincs/Grays)

2. Which accent color?
A. `blue` / `indigo` (Stable)
B. `emerald` / `teal` (Calm)
C. `rose` / `amber` (Vibrant)"

## Step 4: Choose Typography

"For typography, we'll use Google Fonts.

**Heading:** `DM Sans`, `Inter`, `Poppins`, `Space Grotesk`, `Outfit`
**Body:** Same as heading, or `Inter`, `Source Sans 3`, `Nunito Sans`
**Mono:** `IBM Plex Mono`, `JetBrains Mono`, `Fira Code`

My suggestions for [Product Name]:
- **Heading:** [suggestion] — [why]
- **Body:** [suggestion] — [why]
- **Mono:** [suggestion] — [why]"

## Step 5: Choose Motion Tokens

"Motion defines how interactions feel.

1. What interaction style?
A. Snappy (100-150ms, ease-out) — Fast, responsive
B. Smooth (200-300ms, ease-in-out) — Elegant, deliberate
C. Playful (300-400ms, spring) — Dynamic, bouncy

Based on your choice, I'll set:
- `fast`: [duration]
- `normal`: [duration]
- `slow`: [duration]
- `easing`: [curve]"

## Step 6: Create the Files

Once approved, create three files:

**File 1:** `/product/design-system/colors.json`
```json
{
  "primary": "[color]",
  "secondary": "[color]",
  "neutral": "[color]"
}
```

**File 2:** `/product/design-system/typography.json`
```json
{
  "heading": "[Font Name]",
  "body": "[Font Name]",
  "mono": "[Font Name]"
}
```

**File 3:** `/product/design-system/motion.json`
```json
{
  "durations": {
    "fast": "150ms",
    "normal": "250ms",
    "slow": "400ms"
  },
  "easing": {
    "default": "cubic-bezier(0.4, 0, 0.2, 1)",
    "in": "cubic-bezier(0.4, 0, 1, 1)",
    "out": "cubic-bezier(0, 0, 0.2, 1)"
  }
}
```

## Step 7: Confirm Completion

"I've saved your design tokens:
- `/product/design-system/colors.json`
- `/product/design-system/typography.json`
- `/product/design-system/motion.json`

**Your palette:** [primary] / [secondary] / [neutral]
**Your fonts:** [heading] / [body] / [mono]
**Your motion:** [style] with [durations]

Next: Run `/design-shell` to create your 4+6 kiosk layout."

## Reference: Tailwind Colors

- **Warm:** `red`, `orange`, `amber`, `yellow`, `lime`
- **Cool:** `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`
- **Purple:** `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`
- **Neutral:** `slate`, `gray`, `zinc`, `neutral`, `stone`

## Reference: Motion Presets

- **Snappy:** fast=100ms, normal=150ms, slow=250ms, ease-out
- **Smooth:** fast=150ms, normal=250ms, slow=400ms, ease-in-out
- **Playful:** fast=200ms, normal=350ms, slow=500ms, spring
