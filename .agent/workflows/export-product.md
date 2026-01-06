---
description: Export your complete product design as a handoff package for implementation
---
# Export Product

You are helping the user export their complete product design as a handoff package for implementation. This generates all files needed to build the product in a real codebase.

## Step 1: Check Prerequisites

Verify the minimum requirements exist:

**Required:**
- `/product/product-overview.md` — Product overview
- `/product/product-roadmap.md` — Sections defined
- At least one section with screen designs in `src/sections/[section-id]/`

**Recommended (show warning if missing):**
- `/product/data-model/data-model.md` — Global data model
- `/product/design-system/colors.json` — Color tokens
- `/product/design-system/typography.json` — Typography tokens
- `src/shell/components/AppShell.tsx` — Application shell

If required files are missing:

"To export your product, you need at minimum:
- A product overview (`/product-vision`)
- A roadmap with sections (`/product-roadmap`)
- At least one section with screen designs

Please complete these first."

Stop here if required files are missing.

If recommended files are missing, show warnings but continue:

"Note: Some recommended items are missing:
- [ ] Data model — Run `/data-model` for consistent entity definitions
- [ ] Design tokens — Run `/design-tokens` for consistent styling
- [ ] Application shell — Run `/design-shell` for navigation structure

You can proceed without these, but they help ensure a complete handoff."

## Step 2: Gather Export Information

Read all relevant files and follow the **Questioning & Data Gathering** guidelines if anything is unclear.

"I'm preparing to generate your product handoff package.

Reasoning: A complete handoff requires context about your target environment to provide the most helpful implementation instructions.

1. How do you plan to implement this product?
A. Modern React + Next.js (App Router)
B. Single Page App (Vite + React Router)
C. Other / Not decided yet

2. Which implementation strategy do you prefer?
A. One-shot (Build the whole app in one session)
B. Incremental (Build section-by-section)
C. TDD-focused (Focus on tests first)"

## Step 3: Create Export Directory Structure

Create the `product-plan/` directory with this structure:

```
product-plan/
├── README.md                    # Quick start guide
├── product-overview.md          # Product summary (always provide)
│
├── prompts/                     # Ready-to-use prompts for coding agents
│   ├── one-shot-prompt.md       # Prompt for full implementation
│   └── section-prompt.md        # Prompt template for section-by-section
│
├── instructions/                # Implementation instructions
│   ├── one-shot-instructions.md # All milestones combined
│   └── incremental/             # For milestone-by-milestone implementation
│       ├── 01-foundation.md
│       ├── 02-[first-section].md
│       ├── 03-[second-section].md
│       └── ...
│
├── design-system/               # Design tokens
│   ├── tokens.css
│   ├── tailwind-colors.md
│   └── fonts.md
│
├── data-model/                  # Data model
│   ├── README.md
│   ├── types.ts
│   └── sample-data.json
│
├── shell/                       # Shell components
│   ├── README.md
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── MainNav.tsx
│   │   ├── UserMenu.tsx
│   │   └── index.ts
│   └── screenshot.png (if exists)
│
└── sections/                    # Section components
    └── [section-id]/
        ├── README.md
        ├── tests.md               # Test-writing instructions for TDD
        ├── components/
        │   ├── [Component].tsx
        │   └── index.ts
        ├── types.ts
        ├── sample-data.json
        └── screenshot.png (if exists)
```

## Step 4: Generate product-overview.md

Create `product-plan/product-overview.md` with:
- Product summary from product-overview.md
- Ordered list of sections from roadmap
- Data model entities (if exists)
- Design system colors and typography
- Implementation sequence (milestones)

## Step 5: Generate Milestone Instructions

Each milestone instruction file should begin with a preamble explaining:
- What the user is receiving (UI designs, data model, specs, test instructions)
- What needs to be built (backend, auth, data fetching, business logic)
- Important guidelines (don't redesign components, wire up callbacks, implement empty states, use TDD)

### Foundation Milestone (01-foundation.md)
- Design tokens configuration
- Data model types
- Routing structure
- Application shell setup

### Section Milestones (02-[section-id].md, etc.)
- Overview of the section
- Key functionality bullets
- TDD workflow instructions
- Components to copy
- Data layer requirements
- Callbacks to wire up
- Empty states to implement
- Expected user flows
- Done criteria with checkboxes

## Step 6: Generate one-shot-instructions.md

Combine all milestone content into a single document with the preamble at the top, followed by all milestones in order.

## Step 7: Copy and Transform Components

### Shell Components
Copy from `src/shell/components/` to `product-plan/shell/components/`:
- Transform import paths from `@/...` to relative paths
- Remove Design OS-specific imports
- Ensure components are self-contained

### Section Components
For each section, copy from `src/sections/[section-id]/components/` to `product-plan/sections/[section-id]/components/`:
- Transform import paths
- Remove Design OS-specific imports
- Keep only exportable components (not preview wrappers)

## Step 8: Generate Section READMEs

For each section, create `product-plan/sections/[section-id]/README.md` with:
- Overview from spec.md
- User flows
- Design decisions
- Data entities used
- Visual reference (screenshot)
- Components provided
- Callback props table

## Step 9: Generate Section Test Instructions

For each section, create `product-plan/sections/[section-id]/tests.md` with:
- Framework-agnostic test-writing instructions
- User flow tests (success and failure paths)
- Empty state tests (primary, related records, filtered)
- Component interaction tests
- Edge cases
- Accessibility checks
- Sample test data

## Step 10: Generate Design System Files

Create:
- `tokens.css` — CSS custom properties for colors and fonts
- `tailwind-colors.md` — Tailwind configuration guide
- `fonts.md` — Google Fonts import instructions

## Step 11: Generate Prompt Files

### one-shot-prompt.md
Ready-to-use prompt for full implementation that:
- Lists files to read
- Prompts for clarifying questions (auth, user modeling, tech stack, business logic)
- Asks for additional notes

### section-prompt.md
Template for section-by-section implementation with:
- Section variable placeholders (SECTION_NAME, SECTION_ID, NN)
- Files to read
- Clarifying questions
- TDD workflow instructions

## Step 12: Generate README.md

Create `product-plan/README.md` with:
- What's included overview
- How to use (incremental vs one-shot)
- TDD approach explanation
- Tips for best results

## Step 13: Copy Screenshots

Copy any `.png` files from:
- `product/shell/` → `product-plan/shell/`
- `product/sections/[section-id]/` → `product-plan/sections/[section-id]/`

## Step 14: Create Zip File

Create a zip archive:
```bash
rm -f product-plan.zip
cd . && zip -r product-plan.zip product-plan/
```

## Step 15: Confirm Completion

Let the user know what was created:

"I've created the complete export package at `product-plan/` and `product-plan.zip`.

**What's Included:**

**Ready-to-Use Prompts:**
- `prompts/one-shot-prompt.md` — Prompt for full implementation
- `prompts/section-prompt.md` — Prompt template for section-by-section

**Instructions:**
- `product-overview.md` — Product summary (always provide with instructions)
- `instructions/one-shot-instructions.md` — All milestones combined
- `instructions/incremental/` — [N] milestone instructions (foundation, then sections)

**Design Assets:**
- `design-system/` — Colors, fonts, tokens
- `data-model/` — Entity types and sample data
- `shell/` — Application shell components
- `sections/` — [N] section component packages with test instructions

**Download:**

Restart your dev server and visit the Export page to download `product-plan.zip`.

**How to Use:**

1. Copy `product-plan/` to your implementation codebase
2. Open `prompts/one-shot-prompt.md` or `prompts/section-prompt.md`
3. Add any additional notes, then copy/paste into your coding agent
4. Answer the agent's clarifying questions about auth, data modeling, etc.
5. Let the agent implement based on the instructions

The components are props-based and portable — they accept data and callbacks, letting your implementation agent handle routing, data fetching, and state management however fits your stack."

## Important Notes

- Always transform import paths when copying components
- Include `product-overview.md` context with every implementation session
- Use the pre-written prompts — they prompt for important clarifying questions
- Screenshots provide visual reference for fidelity checking
- Sample data files are for testing before real APIs are built
- The export is self-contained — no dependencies on Design OS
- Components are portable — they work with any React setup
