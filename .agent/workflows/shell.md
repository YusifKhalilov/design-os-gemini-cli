---
description: Design your app's navigation and shell
---
# /shell

You are helping the user design the app shell. This is Step 4 of the design process.

## Step 1: Check Prerequisites

Read `product/idea.json`, `product/layout.json`, and `product/tokens.json`.

If missing:
"Please complete previous steps first. Run `/idea`, `/layout`, then `/tokens`."

## Step 2: Analyze and Propose

Based on the layout type and features:

"Based on your **[layout]** layout and features, here's your shell:

**Header:**
- Logo/app name: [name]
- [Navigation items based on features]
- User menu (if applicable)

**Navigation:**
[Based on layout - sidebar items or top nav items]

**Structure:**
```
[ASCII preview of shell]
```

Does this structure work? (Yes, or suggest changes)"

## Step 3: Generate Shell Code

When confirmed, create shell components in `product/shell/`:

Create `product/shell/spec.md`:
```markdown
# Shell Specification

## Layout: [type]
## Primary Color: [color]

## Header
- Logo: [name]
- Nav items: [list]

## Navigation
[details based on layout]
```

## Step 4: Confirm Completion

"✓ Shell designed! Your navigation structure is set.

**Created:**
- `product/shell/spec.md`

**Next step:** Run `/components` to generate UI components."
