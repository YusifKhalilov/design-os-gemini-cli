---
description: Pick colors, fonts, and motion for your design system
---
# /tokens

You are helping the user define design tokens. This is Step 3 of the design process.

## Step 1: Check Prerequisites

Read `product/idea.json` and `product/layout.json`.

If missing:
"Please complete previous steps first:
- `/idea` - Define your project
- `/layout` - Choose layout"

## Step 2: Ask About Color Vibe

"Let's pick your visual style for **[project name]**.

**1. What color vibe?**
A. Dark & Bold (dark backgrounds, vibrant accents)
B. Light & Clean (white backgrounds, subtle colors)
C. Colorful & Vibrant (rich colors throughout)
D. Neutral & Professional (gray tones, minimal color)"

Wait for response.

## Step 3: Pick Primary Color

Based on their vibe, suggest colors:

"**2. Pick a primary color:**

For [vibe], I suggest:
A. Red (#dc2626) - Bold, attention-grabbing
B. Blue (#2563eb) - Trustworthy, calm
C. Green (#16a34a) - Fresh, growth
D. Purple (#9333ea) - Creative, premium
E. Orange (#ea580c) - Energetic, friendly

Or tell me a specific color."

## Step 4: Pick Fonts

"**3. Pick a font style:**

A. Modern Sans (Inter) - Clean and versatile
B. Geometric (Outfit) - Distinctive and bold
C. Rounded (Nunito) - Friendly and approachable
D. Technical (JetBrains Mono) - Developer-focused"

## Step 5: Confirm and Save

"Here are your design tokens:

**Colors:**
- Primary: [color]
- Secondary: [derived color]
- Neutral: [gray tone based on vibe]

**Fonts:**
- Heading: [font]
- Body: [font]

**Motion:**
- Duration: 200ms
- Easing: ease-out

Save these? (Yes to confirm)"

## Step 6: Save Data

Create `product/tokens.json`:

```json
{
  "colors": {
    "primary": "[hex]",
    "secondary": "[hex]",
    "neutral": "[hex]"
  },
  "fonts": {
    "heading": "[font name]",
    "body": "[font name]"
  },
  "motion": {
    "duration": "200ms",
    "easing": "ease-out"
  }
}
```

Then say:

"✓ Tokens saved! Your design system is ready.

**Next step:** Run `/shell` to design your navigation."
