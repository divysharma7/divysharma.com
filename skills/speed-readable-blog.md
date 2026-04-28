---
name: Speed-Readable Blog
description: >
  Write and review blog posts optimized for speed-reading and web scanning. Two modes:
  Review (audit existing posts) and Writing (draft new posts from scratch). Trigger keywords:
  speed reading, scannable, blog review, blog audit, readability, web writing, skim-friendly,
  scannable structure, blog draft, writing workflow, listicle, tutorial structure, readability score,
  wall of text, buried lede, topic sentence, pre-publication checklist.
---

# Speed-Readable Blog

Most people don't read blog posts. They scan. They scroll. They look for the one
sentence that answers their question, and they leave. This skill optimizes for that
reality instead of fighting it.

Two modes:
1. **Review** -- Audit an existing post for scanning violations and score it.
2. **Writing** -- Draft a new post structured for speed-reading from the start.

## Changelog

| Version | Date       | Changes                                               |
|---------|------------|-------------------------------------------------------|
| v1.1    | 2026-04-29 | Added Structure Types, expanded pre-pub checklist      |
| v1.0    | 2026-02-20 | Initial release: 12 violations, scoring, workflow      |

---

## Mode 1: Review (Audit Existing Posts)

Feed me a blog post. I'll scan it for the 12 violation patterns below, score it,
and return a prioritized fix list.

### The 12 Violation Patterns

Each violation has a severity tier that affects scoring:
- **Critical** -- Fix before publishing. These actively drive readers away.
- **Moderate** -- Fix if you have time. These slow readers down.
- **Minor** -- Nice to fix. These reduce polish but don't break the experience.

---

#### Violation 1: Wall of Text

**Severity: Critical**

**Definition:** Any paragraph with more than 4 sentences or more than 80 words
without a visual break (heading, bullet list, image, code block, blockquote).

**Why it matters:** A wall of text is the single fastest way to lose a scanner.
The eye hits a dense block, can't find an entry point, and scrolls past it. On
mobile (60%+ of blog traffic), walls are even worse because 4 sentences fill the
entire screen.

**How to fix:**
- Break paragraphs at the thought boundary, not the sentence count. Each paragraph
  should contain exactly one idea.
- If a paragraph has 5+ sentences, at least two of those sentences are making the
  same point. Cut the weaker one.
- Insert a visual element (subheading, bullet list, image, blockquote) every 150-200
  words maximum.

**Example violation:**
> The importance of user research in product development cannot be overstated. When
> teams skip this crucial step, they often end up building features that nobody wants.
> This leads to wasted engineering time, frustrated stakeholders, and ultimately a
> product that fails to find market fit. User research doesn't have to be expensive
> or time-consuming. Even five customer interviews can reveal patterns that change
> your roadmap entirely. The key is to start early and iterate often, treating research
> as a continuous practice rather than a one-time activity.

**Fix:** Split at "User research doesn't have to be..." -- that's a new idea (research
is accessible) distinct from the first idea (skipping research is costly).

---

#### Violation 2: Buried Lede

**Severity: Critical**

**Definition:** The main point or key takeaway doesn't appear until after paragraph 3.
This includes blog posts that start with extensive backstory, context-setting, or
"let me explain why this matters" preamble.

**Why it matters:** Scanners decide whether to keep reading within the first 5 seconds.
If your main point is in paragraph 4, they'll never reach it. Journalism solved this
100 years ago with the inverted pyramid: lead with the conclusion.

**How to fix:**
- Write your main point as a single sentence. Put it in paragraph 1.
- If context is necessary, put it after the main point, not before.
- Use the "so what" test: read only your first paragraph. Does the reader know
  what they'll get from this post?

**Example violation:**
> In the world of software engineering, testing has always been a topic of debate.
> Some engineers favor unit tests, while others prefer integration tests. The
> discussion has evolved significantly over the past decade, with new frameworks
> and methodologies emerging regularly. Last year, our team decided to experiment
> with a different approach. We deleted 80% of our unit tests and replaced them
> with 50 integration tests. Our bug count dropped by 60%.

**Fix:** Open with: "We deleted 80% of our unit tests, replaced them with 50
integration tests, and our bug count dropped 60%. Here's why that worked."

---

#### Violation 3: Missing Topic Sentence

**Severity: Moderate**

**Definition:** A paragraph or section where the first sentence doesn't tell the
reader what the paragraph is about. The reader has to read the entire paragraph
to understand its purpose.

**Why it matters:** Scanners read first sentences. If the first sentence doesn't
signal what follows, the scanner skips the entire paragraph -- even if the content
is valuable.

**How to fix:**
- Every paragraph's first sentence should work as a standalone summary of that
  paragraph.
- Test: read only the first sentence of each paragraph in sequence. You should
  get the gist of the entire post from just those sentences.

---

#### Violation 4: Weak Transitions

**Severity: Minor**

**Definition:** Sections or paragraphs that don't connect to each other. The reader
finishes one section and has no idea why the next one follows.

**Why it matters:** Weak transitions force the reader to build the logical connection
themselves. Most won't bother. They'll assume the post is disorganized and leave.

**How to fix:**
- Each section should either answer a question raised by the previous section or
  present a logical next step.
- If you can't explain why section B follows section A, one of them is in the
  wrong place.
- Transitional sentences at the end of sections ("This works well for small
  teams. But what happens at scale?") create momentum.

---

#### Violation 5: No Visual Breaks for 300+ Words

**Severity: Critical**

**Definition:** A stretch of 300 or more consecutive words without any visual
element: no subheading, no bullet list, no image, no blockquote, no code block,
no horizontal rule.

**Why it matters:** 300 words at standard line length is roughly 3-4 full screen
heights on mobile. A reader scrolling through that much unbroken text will lose
their place, lose their patience, or both.

**How to fix:**
- Audit word count between visual elements. Maximum 250 words between breaks.
- When adding a visual break, make it functional -- a subheading that tells the
  reader what's coming, or a bullet list that makes a complex point scannable.
- Don't add decorative breaks (random images, unnecessary horizontal rules) just
  to meet the count.

---

#### Violation 6: Passive Voice Clusters

**Severity: Moderate**

**Definition:** Three or more passive voice constructions within a single
paragraph or within 200 words of each other.

**Why it matters:** One passive sentence is fine. A cluster of them makes the
writing feel bureaucratic and evasive. It also makes sentences longer, which
hurts scanning.

**Examples to flag:**
- "The decision was made to deprecate the API."
- "It was determined that the feature should be removed."
- "The results were analyzed and a report was generated."

**Fix:** "We deprecated the API." "We removed the feature." "We analyzed the
results and wrote a report." Active voice is shorter, clearer, and attributes
responsibility.

---

#### Violation 7: Jargon Without Definition

**Severity: Moderate**

**Definition:** Domain-specific terms used without definition or context,
especially in the first 500 words where the reader is still deciding whether
this post is for them.

**Why it matters:** Jargon is fine when writing for experts. But if your post
targets a mixed audience (which most blog posts do), undefined jargon in the
opening signals "this isn't for you" to everyone who doesn't already know the term.

**How to fix:**
- First use of a jargon term: define it in plain language, parenthetically or
  in the next sentence.
- If the post uses 5+ jargon terms, consider adding a one-line glossary at the
  top or linking to definitions.
- Test: could someone one level below your target audience understand the first
  three paragraphs?

---

#### Violation 8: Missing "So What"

**Severity: Critical**

**Definition:** Presenting information, data, or observations without explaining
why the reader should care. Stating facts without implications.

**Why it matters:** "Our API handles 10,000 requests per second" means nothing
to a reader who doesn't know whether that's good, bad, or average. Every fact
needs a "so what" -- a sentence that explains the implication for the reader.

**How to fix:**
- After every data point or factual claim, add one sentence answering: "What
  does this mean for the person reading this?"
- "Our API handles 10,000 req/s" becomes "Our API handles 10,000 req/s -- enough
  to support your app through a Product Hunt launch without adding infrastructure."

---

#### Violation 9: Orphan Sections

**Severity: Minor**

**Definition:** A section (headed by an H2 or H3) that contains fewer than 2
sentences or fewer than 40 words.

**Why it matters:** Orphan sections make the post feel rushed or incomplete.
If a section only needs one sentence, it either doesn't deserve its own
heading (fold it into the previous section) or it needs more development.

**How to fix:**
- If the section is genuinely that short, merge it with an adjacent section.
- If the point deserves its own section, expand it: add an example, a specific
  metric, or a "why this matters" sentence.

---

#### Violation 10: Click-Bait Title Mismatch

**Severity: Critical**

**Definition:** The title promises something the body doesn't deliver. This
includes numerical mismatches ("7 Ways to..." but only 5 listed), hyperbolic
titles ("The Ultimate Guide") that are 800-word posts, and promise/delivery gaps.

**Why it matters:** Title mismatch destroys trust and generates angry exits
(high bounce rate + low return visitors). The reader felt tricked.

**How to fix:**
- Write the title last, after you know what the post actually covers.
- If the title says "7 Ways," count them. If it says "Complete Guide," it
  better be 3,000+ words.
- Prefer specific, honest titles. "How We Reduced Churn by 23% in 6 Weeks"
  beats "The Ultimate Guide to Reducing Churn."

---

#### Violation 11: No Scannable Structure

**Severity: Critical**

**Definition:** A post that lacks structural hierarchy. No subheadings, no
numbered lists, no bold key phrases, no blockquotes. Just paragraph after
paragraph of running text.

**Why it matters:** Structure is the skeleton of scannability. Without it,
the reader has no entry points. They can't jump to the section that matters
to them. They can't tell at a glance whether this post covers their question.

**How to fix:**
- Add an H2 for every major section (aim for one per 300-400 words).
- Bold the key phrase in important paragraphs so scanners catch it.
- Use numbered lists for sequential steps, bullet lists for parallel items.
- Consider a TL;DR or table of contents at the top for posts over 1,500 words.

---

#### Violation 12: Missing Conclusion or CTA

**Severity: Moderate**

**Definition:** The post ends abruptly after the last content section with
no wrap-up, no next step, and no call-to-action. The reader finishes and
thinks "...okay, now what?"

**Why it matters:** The end of a post is the second-highest-attention
moment (after the title). A missing conclusion wastes that attention.
A missing CTA wastes the traffic.

**How to fix:**
- End with one of: a specific recommendation, a question to prompt comments,
  a link to a related post, or a CTA (newsletter signup, product trial, etc).
- Keep the conclusion to 2-4 sentences. Don't re-summarize the entire post.
- The CTA should be relevant to the content. A post about API design should
  link to your API documentation, not your generic newsletter.

---

### Scoring System

Count violations per 500 words of content.

| Violations per 500 words | Grade | Verdict |
|--------------------------|-------|---------|
| 0                        | A+    | Publish. This is well-optimized for scanning. |
| 1 (minor only)           | A     | Publish. Polish if you have time. |
| 1-2 (moderate)           | B     | Publishable, but fix the moderate issues first. |
| 1 (critical)             | C     | Do not publish until the critical issue is fixed. |
| 2+ (critical)            | D     | Significant rewrite needed. Multiple scanning barriers. |
| 3+ (critical)            | F     | Start the structure over. The post is fighting its reader. |

**Severity weighting:**
- Each critical violation = 3 points
- Each moderate violation = 2 points
- Each minor violation = 1 point

**Total violation score per 500 words:**
- 0-2 points: A tier
- 3-5 points: B tier
- 6-9 points: C tier
- 10-14 points: D tier
- 15+ points: F tier

---

## Mode 2: Writing (Draft New Posts)

Use this workflow to draft a blog post that's scannable from the start, instead
of writing a wall and then retrofitting structure.

### The Writing Workflow

#### Step 1: Headline

Write 5-10 candidate headlines before writing a single word of the post. The
headline determines the contract with the reader -- what you promise to deliver.

**Rules for headlines:**
- Specific beats clever. "How We Cut Page Load Time from 4.2s to 0.8s" beats
  "The Need for Speed: A Deep Dive into Web Performance."
- Numbers signal scannability. "5 Mistakes" is more inviting than "Common Mistakes."
- Front-load the value word. "Reduce churn by fixing onboarding" not "Why fixing
  onboarding can help you reduce churn."
- Max 70 characters for SEO display. Max 10 words for instant comprehension.

#### Step 2: Outline

Write the subheadings before writing any body text. The subheadings alone should
tell the story of the post.

**Test:** Read your subheadings in order, ignoring all body text. Does a reader
understand the main arc? If not, restructure before writing.

**Outline format:**
```
H1: [Headline]
H2: [Main point / lede -- what the reader gets]
H2: [Context or background -- why this matters now]
H2: [First major section]
  H3: [Sub-point]
  H3: [Sub-point]
H2: [Second major section]
  H3: [Sub-point]
H2: [Third major section]
H2: [Conclusion / CTA]
```

#### Step 3: Topic Sentences

Write the first sentence of every paragraph before filling in the rest. These
topic sentences are the scanning layer -- the skeleton that speed-readers will
actually see.

**Rule:** If someone reads only the topic sentences, they should get 80% of the
post's value. The body text provides depth, examples, and evidence for those
who slow down.

#### Step 4: Expand

Fill in each paragraph, working section by section. For each paragraph:
- 2-4 sentences max.
- One idea per paragraph.
- Include at least one specific detail: a number, a name, a date, an outcome.
- If a paragraph doesn't contain a specific detail, it probably doesn't need
  to exist.

#### Step 5: Trim

Cut 20-30% of what you wrote. This is not optional.

**What to cut:**
- Sentences that repeat the point of the previous sentence in different words.
- Adjectives that don't add information ("very," "really," "incredibly," "quite").
- Setup sentences ("Before we get into that, let me explain why this matters").
- Entire paragraphs that are interesting but don't serve the headline's promise.

**Trim test:** Remove the sentence. Re-read the paragraph. If the meaning is
unchanged, the sentence was dead weight.

---

### Structure Types

Different posts need different structures. Pick the one that matches your
content before writing.

#### Listicle

**Use when:** You have 5-15 parallel items of roughly equal weight.

**Structure:**
- Title includes the number.
- Brief intro (2-3 sentences max) establishing why these items matter.
- Each item gets its own H2 or H3.
- Items follow a consistent mini-format: name, 1-2 sentence explanation,
  concrete example.
- No ranking unless explicitly stated in the title.

**Example:** "9 Onboarding Emails That Actually Get Opened"

**Watch out for:** Making every item the same length. If item 3 is your strongest
point, let it be the longest. If item 7 is simple, let it be two sentences.

#### Argument

**Use when:** You're making a specific claim and supporting it with evidence.

**Structure:**
- Open with the claim (paragraph 1, sentence 1).
- Present 2-4 supporting points, each with evidence.
- Address the strongest counterargument. Do not strawman it.
- Return to the claim with a "so what" for the reader.

**Example:** "Unit Tests Are Overrated (Here's What We Do Instead)"

**Watch out for:** Burying the claim in caveats. State it boldly first, then
qualify later. The hedging can come in paragraph 3, not paragraph 1.

#### Tutorial

**Use when:** Teaching the reader how to do something step by step.

**Structure:**
- Title describes the outcome: "How to Set Up CI/CD for a Next.js App on Vercel."
- Prerequisites section (what the reader needs before starting).
- Numbered steps, each as an H2 or H3.
- Each step: what to do, how to do it, what the result should look like.
- Include code blocks, screenshots, or terminal output where relevant.
- Troubleshooting section at the end for common errors.

**Example:** "How to Deploy a PostgreSQL Database on Fly.io in 10 Minutes"

**Watch out for:** Skipping steps that feel obvious to you but aren't obvious to
the reader. If you can't test the tutorial on a fresh machine and get the same
result, steps are missing.

#### Story

**Use when:** A personal or company experience that illustrates a lesson.

**Structure:**
- Open with the most interesting moment (not the beginning of the chronology).
- Provide just enough context to understand the stakes.
- Tell the story with specific details: dates, numbers, names, dialogue.
- Extract the lesson explicitly -- don't make the reader guess the moral.
- End with what you'd do differently or what happened next.

**Example:** "We Lost Our Biggest Customer and It Was the Best Thing That Happened"

**Watch out for:** Making yourself the hero. The best stories have a moment of
failure, confusion, or luck. Perfect narratives feel fake.

#### Comparison

**Use when:** Evaluating two or more options side by side.

**Structure:**
- State who this comparison is for in paragraph 1 (use case, team size, budget).
- Include a comparison table early (within the first 500 words).
- Dedicate equal depth to each option.
- State your recommendation clearly. "It depends" is not a conclusion.
- Disclose conflicts of interest if any.

**Example:** "Vercel vs. Netlify for a Vue.js Portfolio Site: What I Picked and Why"

**Watch out for:** False balance. If one option is clearly better for the stated
use case, say so. Readers see through artificially balanced comparisons.

---

## Pre-Publication Checklist

Run through these 8 items before hitting publish. If any item fails, fix it.

### 1. Title-Content Alignment

Read only the title and the conclusion. Does the conclusion deliver what the
title promised? If you have to squint to see the connection, the title or the
content needs to change.

**Pass/Fail.** No partial credit.

### 2. Lede Test

Read only the first two paragraphs. Do you know (a) what the post is about,
(b) who it's for, and (c) what you'll learn? If any of the three are missing,
the lede is buried.

**Pass/Fail.**

### 3. Scan Test

Scroll through the post reading only subheadings and bold text. Can you
reconstruct the main argument from just those elements?

**Pass/Fail.**

### 4. Mobile Preview

Open the post on a phone (or resize your browser to 375px wide). Check for:
- Paragraphs that fill more than one full screen.
- Code blocks that require horizontal scrolling.
- Images that are illegible at mobile width.

**Pass/Fail.**

### 5. Visual Break Cadence

No stretch of 300+ words without a visual element (heading, list, image,
blockquote, code block).

**Pass/Fail.**

### 6. Specificity Audit

Highlight every claim that includes a number, name, or date. Count them.
Target: at least one specific detail per 200 words. A 1,500-word post
needs at least 7 specific claims.

**Score: [count] / [target]. Pass if >= 80% of target.**

### 7. CTA Check

Does the post end with a clear next step for the reader? This can be:
- A link to a related post
- A newsletter signup
- A product trial
- A question to prompt comments
- A recommendation to try something

**Pass/Fail.**

### 8. Read-Aloud Test

Read the first and last paragraphs aloud. If you stumble on any sentence,
it's too long or too complex. Simplify until you can read it smoothly at
conversation speed.

**Pass/Fail.**

### Checklist Summary

| # | Item                    | Result     |
|---|-------------------------|------------|
| 1 | Title-Content Alignment | Pass/Fail  |
| 2 | Lede Test               | Pass/Fail  |
| 3 | Scan Test               | Pass/Fail  |
| 4 | Mobile Preview          | Pass/Fail  |
| 5 | Visual Break Cadence    | Pass/Fail  |
| 6 | Specificity Audit       | __ / __    |
| 7 | CTA Check               | Pass/Fail  |
| 8 | Read-Aloud Test         | Pass/Fail  |

**Publishing threshold:** All Pass/Fail items must pass. Specificity Audit
must hit 80%+. If any item fails, fix it before publishing. No exceptions.

---

## Usage Notes

- These rules optimize for scanning and comprehension speed. They don't apply
  to literary essays, fiction, academic papers, or long-form journalism where
  the reader has already committed to reading every word.
- The 4-sentence paragraph limit is a guideline for web content. Print has
  different rules because the medium is different.
- Not every post needs every structural element. A 500-word post doesn't need
  a table of contents. A 3,000-word post does.
- Speed-readability and depth are not enemies. A well-structured 3,000-word
  post is more readable than a poorly structured 800-word post. Structure is
  the variable, not length.
