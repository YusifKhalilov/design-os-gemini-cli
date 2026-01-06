---
description: Create or update your product roadmap with sections
---
# Product Roadmap

You are helping the user create or update their product roadmap for Design OS. This command serves two purposes:

1. **Create** an initial roadmap if one doesn't exist
2. **Sync** changes if the user has manually edited the markdown files

## Step 1: Check Current State

First, check if `/product/product-roadmap.md` exists and read `/product/product-overview.md` if it exists.

---

## If No Roadmap Exists (Creating New)

### Analyze the Product Overview

Read the product overview and analyze:
- The core description
- The problems being solved
- The key features listed

### Propose Sections

Based on your analysis, propose 3-5 sections that represent:
- **Navigation items** - main areas of the product UI
- **Roadmap phases** - logical order for building
- **Self-contained feature areas** - each can be designed and built independently

Present your proposal and ask for feedback following the **Questioning & Data Gathering** guidelines in `agents.md`: Use reasoning, number your questions, and provide A/B/C options for each.

"Based on your product overview, I'd suggest breaking this into these sections:

1. **[Section Title]** - [One sentence description]
2. **[Section Title]** - [One sentence description]
3. **[Section Title]** - [One sentence description]

Reasoning: This breakdown covers the core user flows while ensuring each section is small enough to be designed and built independently.

1. Does this breakdown make sense?
A. Yes, looks perfect
B. I want to add/remove a section
C. I want to change the order/priority"

### Refine with User

Iterate on the sections based on user feedback. Example reasoning and questions:

> "Reasoning: I want to ensure the first section truly represents the 'Minimum Viable Product' and provides value as quickly as possible.
>
> 1. What would you consider the most critical section to build first?
> A. [Section 1] (Core utility)
> B. [Section 2] (User data/profile)
> C. [Section 3] (Interface/Shell)"

### Create the File

Once approved, create `/product/product-roadmap.md` with this exact format:

```markdown
# Product Roadmap

## Sections

### 1. [Section Title]
[One sentence description]

### 2. [Section Title]
[One sentence description]

### 3. [Section Title]
[One sentence description]
```

### Confirm

"I've created your product roadmap at `/product/product-roadmap.md`. The homepage now shows your [N] sections:

1. **[Section 1]** — [Description]
2. **[Section 2]** — [Description]
3. **[Section 3]** — [Description]

**Next step:** Run `/data-model` to define the core entities and relationships in your product. This establishes a shared vocabulary that keeps your sections consistent."

---

## If Roadmap Already Exists (Syncing)

### Read Current Files

Read both:
- `/product/product-overview.md`
- `/product/product-roadmap.md`

### Report Current State

"I see you already have a product roadmap defined with [N] sections:

1. [Section 1 Title]
2. [Section 2 Title]
...

What would you like to do?
- **Update sections** - Add, remove, or reorder sections
- **Sync from files** - I'll re-read the markdown files and confirm everything is in sync
- **Start fresh** - Regenerate the roadmap based on the current product overview"

### Handle User Choice

**If updating sections:**
Ask what changes they want to make, then update the file accordingly.

**If syncing:**
Confirm the current state matches what's in the files. If the user has manually edited the `.md` files, let them know the app will pick up those changes on next build/refresh.

**If starting fresh:**
Follow the "Creating New" flow above, but note you're replacing the existing roadmap.

---

## Important Notes

- Sections should be ordered by development priority
- Each section should be self-contained enough to design and build independently
- Section titles become navigation items in the app
- The numbered format (`### 1. Title`) is required for parsing
- Keep descriptions to one sentence - concise and clear
- Don't create too many sections (3-5 is ideal)
