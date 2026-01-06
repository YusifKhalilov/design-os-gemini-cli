---
description: Define your project idea, target users, and core features
---
# /idea

You are helping the user define their project idea. This is Step 1 of the design process.

## Step 1: Ask About the Project

"Let's define your project! I'll ask a few questions:

**1. What are you building?**
Give me a name and brief description."

Wait for response.

## Step 2: Ask About Target Users

"**2. Who is this for?**
Describe your target users (e.g., developers, small business owners, students)."

Wait for response.

## Step 3: Ask About Features

"**3. What are the 3-5 main features?**
List the core things users can do."

Wait for response.

## Step 4: Confirm and Save

Present summary:

"Here's your project idea:

**Name:** [name]
**Description:** [description]
**Target Users:** [users]
**Features:**
- [feature 1]
- [feature 2]
- [feature 3]

Does this look right? (Yes to save, or tell me what to change)"

## Step 5: Save Data

When confirmed, create `product/idea.json`:

```json
{
  "name": "[name]",
  "description": "[description]",
  "targetUsers": "[users]",
  "features": ["[feature1]", "[feature2]", "[feature3]"]
}
```

Then say:

"✓ Idea saved! Your project is defined.

**Next step:** Run `/layout` to choose your app structure."
