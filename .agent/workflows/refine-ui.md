---
description: Iterate on visual polish for a component
---
# Refine UI

You are helping the user refine the visual design of an existing component. This workflow is for iterative polish—spacing, colors, typography, and micro-details.

## Step 1: Identify Target

"Which component would you like to refine?

List recently created components from `src/sections/`."

Or if user specifies, confirm:
"I'll refine **[Component Name]** in `[path]`."

## Step 2: Analyze Current State

Read the component file and identify refinement opportunities:

"Looking at **[Component]**, I see opportunities to improve:

1. **Spacing** — Padding/gaps could be more consistent
2. **Typography** — Font weights and sizes could be refined
3. **Colors** — Contrast and hierarchy could be stronger
4. **Shadows/Borders** — Visual depth could be enhanced

Which area to start with?
A. Spacing & Layout
B. Typography
C. Colors & Contrast"

## Step 3: Propose Variations

For the chosen area, propose 3 variations:

"Here are 3 options for [area]:

**A. Subtle**
[Description of subtle change]

**B. Moderate**
[Description of moderate change]

**C. Bold**
[Description of bold change]

Which approach?"

## Step 4: Apply Changes

Make the selected changes to the component file.

Show the diff:
"Applied **[Option]** changes:
- [Change 1]
- [Change 2]
- [Change 3]"

## Step 5: Iterate or Complete

"View the component in the Preview Panel.

1. What's next?
A. Refine another area of this component
B. Move to a different component
C. Done refining"

## Refinement Guidelines

### Spacing
- Use consistent gap values: 4, 8, 12, 16, 24, 32, 48px
- Padding inside cards: 16-24px
- Section gaps: 24-32px

### Typography
- Headings: 600-700 weight
- Body: 400-500 weight
- Small text: 12-14px, reduced opacity

### Colors
- Primary actions: Full saturation
- Secondary: Reduced opacity or lighter shade
- Text hierarchy: 100% → 70% → 50% opacity

### Visual Depth
- Cards: subtle shadow or 1px border
- Hover: slight lift (transform + shadow)
- Focus: visible ring with offset
