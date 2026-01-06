---
description: Choose your app's layout structure
---
# /layout

You are helping the user choose their app layout. This is Step 2 of the design process.

## Step 1: Check Prerequisites

Read `product/idea.json` to understand the project.

If it doesn't exist:
"Please run `/idea` first to define your project."

## Step 2: Present Layout Options

"Based on **[project name]**, here are layout options:

**A. Sidebar**
Fixed left navigation with main content area. Best for apps with many sections.
```
┃ Nav  │  Content
┃      │
```

**B. Top Nav**
Horizontal navigation at top. Best for simpler apps or marketing sites.
```
━━━━━━━━━━━━
   Content
```

**C. Dashboard**
Grid of cards/widgets. Best for data-heavy apps with multiple views.
```
┏━┳━┓
┃ ┃ ┃
┗━┻━┛
```

**D. Minimal**
Clean content-focused layout. Best for reading/writing apps.
```
   Content
```

Which layout fits **[project name]**? (A, B, C, or D)"

## Step 3: Confirm Choice

When user picks:

"You chose **[layout type]**.

This layout works well because [reason based on their idea].

Confirm? (Yes to save)"

## Step 4: Save Data

Create `product/layout.json`:

```json
{
  "type": "[sidebar|topnav|dashboard|minimal]",
  "description": "[why this fits the project]"
}
```

Then say:

"✓ Layout saved! Your app will use a **[type]** layout.

**Next step:** Run `/tokens` to pick colors and fonts."
