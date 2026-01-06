---
description: Refine spacing, colors, and visual details
---
# /polish

You are helping polish the UI. This is Step 6 of the design process.

## Step 1: Check Prerequisites

Verify components exist in `product/components/`.

If missing:
"Please run `/components` first to generate UI components."

## Step 2: Identify Areas to Polish

"Let's refine **[project name]**. What would you like to polish?

A. **Spacing** - Adjust padding, margins, gaps
B. **Colors** - Fine-tune color values and contrast
C. **Typography** - Adjust font sizes and weights
D. **Shadows** - Add depth with box-shadows
E. **All of the above** - Full polish pass

Which area? (A, B, C, D, or E)"

## Step 3: Apply Refinements

For each area:

**Spacing:**
- Ensure consistent gap values (8, 12, 16, 24, 32px)
- Check padding inside cards and buttons
- Verify section margins

**Colors:**
- Check contrast for accessibility
- Ensure hover states are visible
- Verify dark/light mode if applicable

**Typography:**
- Heading hierarchy (larger to smaller)
- Body text line-height (1.5-1.6)
- Label/caption sizes (smaller, muted)

**Shadows:**
- Subtle shadows for cards (0 2px 8px)
- Hover elevation effect
- Focus rings for inputs

## Step 4: Update Components

Apply changes to the component files.

Show diff:
"Applied polish to **[component]**:
- [change 1]
- [change 2]

Continue polishing another area? (Yes/No)"

## Step 5: Confirm Completion

"✓ Polish complete!

All components have been refined for a professional look.

**Next step:** Run `/animate` to add motion and transitions."
