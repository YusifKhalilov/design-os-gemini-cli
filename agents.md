# Design Studio - Agent Instructions

This is a **UI Design Studio** that guides users through a 7-step process to create animated, interactive web apps.

## How It Works

1. User runs commands (`/idea`, `/layout`, etc.) to progress through steps
2. AI collects information via conversation
3. Data is saved to `product/` folder
4. App dashboard displays progress and visualizes collected data

## The 7 Steps

| Step | Command | Purpose | Output |
|------|---------|---------|--------|
| 1 | `/idea` | Define project, users, features | `product/idea.json` |
| 2 | `/layout` | Choose app structure | `product/layout.json` |
| 3 | `/tokens` | Pick colors, fonts, motion | `product/tokens.json` |
| 4 | `/shell` | Design navigation | `product/shell/spec.md` |
| 5 | `/components` | Generate Svelte components | `product/components/*.svelte` |
| 6 | `/polish` | Refine spacing, shadows | Updates existing files |
| 7 | `/animate` | Add transitions | Updates with motion |

**Bonus:** `/redesign [name]` - Rework a specific component

## Data Storage

All step data goes in `product/` folder:

```
product/
├── idea.json           # Step 1
├── layout.json         # Step 2
├── tokens.json         # Step 3
├── shell/
│   └── spec.md         # Step 4
└── components/
    └── *.svelte        # Step 5+
```

## Component Requirements

When generating Svelte components:

1. **Svelte 5 syntax** - Use `$props()` rune
2. **CSS Grid only** - No flexbox
3. **Unique IDs** - Every HTML element needs an `id` attribute
4. **Design tokens** - Use colors/fonts from tokens.json
5. **Animations** - Use Svelte transitions (fade, fly, slide)

## Response Style

- Be conversational but efficient
- Ask one question at a time
- Confirm before saving
- Always tell user the next step
- Show progress: "Step X of 7"
