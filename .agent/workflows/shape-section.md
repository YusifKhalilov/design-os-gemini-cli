---
description: Define the specification for a section of your product
---
# Shape Section

You are helping the user define the specification for a section of their product. This is a conversational process to establish the scope of functionality, user flows, and UI requirements.

## Step 1: Check Prerequisites

First, verify that `/product/product-roadmap.md` exists. If it doesn't:

"I don't see a product roadmap defined yet. Please run `/product-roadmap` first to define your product sections, then come back to shape individual sections."

Stop here if the roadmap doesn't exist.

## Step 2: Identify the Target Section

Read `/product/product-roadmap.md` to get the list of available sections.

If there's only one section, auto-select it. If there are multiple sections, follow the **Questioning & Data Gathering** guidelines:

"Which section would you like to define the specification for?

Reasoning: We need to focus on one section at a time to ensure high-quality design and detailed requirements.

1. Please select a section:
A. [Section 1 Title]
B. [Section 2 Title]
C. [Section 3 Title]"

## Step 3: Gather Initial Input

"Let's define the scope and requirements for **[Section Title]**.

Reasoning: Understanding your initial vision helps me tailor the following questions to the most relevant features of this section.

1. How would you like to start?
A. I'll share my raw notes/ideas first
B. Guide me with a structured set of questions
C. Start with a standard template for this type of section"

## Step 4: Ask Clarifying Questions

Use the AskUserQuestion tool following the **Questioning & Data Gathering** guidelines. Example reasoning and questions:

> "Reasoning: To design an effective interface, I need to know the primary actions users will perform and what information is most critical for them to see first.
>
> 1. What are the main user actions/tasks in this section?
> A. Creating and managing content (CRUD)
> B. Viewing data dashboards and analytics
> C. Interactive workflows and step-by-step processes
>
> 2. What UI patterns do you envision?
> A. Card-based grid for visual overview
> B. Detailed data tables for dense information
> C. Split-view with list and details"

Ask questions one or two at a time.

## Step 5: Ask About Shell Configuration

"Reasoning: Some sections like landing pages or modal-only views might need to be standalone, while most core app features should live inside the shell for navigation.

1. Should this section's screen designs be displayed inside the app shell?
A. Inside app shell (Default for most features)
B. Standalone (Public pages, landing pages, or embeds)
C. Let's decide later based on the design"

## Step 6: Present Draft and Refine

Once you have enough information, present a draft specification:

"Based on our discussion, here's the specification for **[Section Title]**:

**Overview:**
[2-3 sentence summary of what this section does]

**User Flows:**
- [Flow 1]
- [Flow 2]
- [Flow 3]

**UI Requirements:**
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

**Display:** [Inside app shell / Standalone]

Does this capture everything? Would you like to adjust anything?"

Iterate until the user is satisfied. Don't add features that weren't discussed. Don't leave out features that were discussed.

## Step 7: Create the Spec File

Once the user approves, create the file at `product/sections/[section-id]/spec.md` with this exact format:

```markdown
# [Section Title] Specification

## Overview
[The finalized 2-3 sentence description]

## User Flows
- [Flow 1]
- [Flow 2]
- [Flow 3]
[Add all flows discussed]

## UI Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]
[Add all requirements discussed]

## Configuration
- shell: [true/false]
```

**Important:**
- Set `shell: true` if the section should display inside the app shell (this is the default)
- Set `shell: false` if the section should display as a standalone page without the shell

The section-id is the slug version of the section title (lowercase, hyphens instead of spaces).

## Step 8: Confirm and Next Steps

Let the user know:

"I've created the specification at `product/sections/[section-id]/spec.md`.

You can review the spec on the section page. When you're ready, run `/sample-data` to create sample data for this section."

## Important Notes

- Be conversational and helpful, not robotic
- Ask follow-up questions when answers are vague
- Focus on UX and UI - don't discuss backend, database, or API details
- Keep the spec concise - only include what was discussed, no bloat
- The format must match exactly for the app to parse it correctly
