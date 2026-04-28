---
name: The Humanizer
description: >
  Review written content for AI-generated patterns and rewrite in authentic human voice.
  Auto-detects content type and scores authenticity across four dimensions. Trigger keywords:
  humanize, AI detection, rewrite, authentic voice, sounds like AI, robotic writing, human voice,
  natural writing, AI patterns, content review, tone check, voice check, de-AI, un-AI.
---

# The Humanizer

Detect AI-generated writing patterns. Score authenticity. Rewrite in a voice that
sounds like a specific human wrote it, not a language model.

This skill works on any written content: blog posts, LinkedIn posts, emails, Slack
messages, documentation, marketing copy, bios, tweets. It auto-detects the content
type and applies channel-specific rules.

## Changelog

| Version | Date       | Changes                                                    |
|---------|------------|------------------------------------------------------------|
| v2.1    | 2026-04-29 | Added Unity marker, expanded LinkedIn rules, added Slack   |
| v2.0    | 2026-03-15 | Rewrote scoring rubric, added rewrite pipeline             |
| v1.0    | 2026-01-10 | Initial release: 10 markers, basic scoring                 |

---

## Step 0: Auto-Detect Content Type

Before scoring or rewriting, identify what you're looking at:

| Type     | Signals                                                         |
|----------|-----------------------------------------------------------------|
| Blog     | 500+ words, headings, paragraphs, likely has a title            |
| LinkedIn | <3000 chars, line breaks between sentences, hashtags at end     |
| Email    | Greeting + body + sign-off, "Subject:" or forwarded headers     |
| Slack    | Short, casual, may include emoji, @mentions, thread context     |
| Docs     | Technical terms, step-by-step structure, code blocks, headings  |
| Copy     | Short, punchy, CTA-driven, landing page or ad format            |

The content type determines which patterns matter most and how aggressive the
rewrite should be. A blog post with em-dashes is a yellow flag. A Slack message
with em-dashes is a red one.

---

## AI Pattern Detection: 18 Markers

These are the specific patterns that signal AI-generated content. Each marker
has a severity level and a concrete example of what to flag.

### Marker 1: Sycophantic Openers (Severity: Critical)

**Pattern:** Starting with agreement, praise, or eagerness that no human would lead with.

**Examples to flag:**
- "I'd be happy to help you with that!"
- "Great question!"
- "That's a fantastic point."
- "Absolutely! Let me break that down for you."

**Human alternative:** Just start talking. If someone asks you a question in person,
you answer it. You don't preface with "What a wonderful question, I'm delighted
to respond."

### Marker 2: Hedge Phrases (Severity: Moderate)

**Pattern:** Qualifying statements with unnecessary softeners that add no information.

**Examples to flag:**
- "It's worth noting that..."
- "It's important to remember that..."
- "It should be noted that..."
- "Interestingly enough..."
- "One could argue that..."

**Human alternative:** State the thing directly. "It's worth noting that churn
increased 12%" becomes "Churn increased 12%."

### Marker 3: Forced Enthusiasm Openers (Severity: Critical)

**Pattern:** Starting paragraphs or posts with manufactured energy.

**Examples to flag:**
- "Let's dive in!"
- "Let's break it down."
- "Let's explore this together."
- "Let's unpack this."
- "Buckle up!"

**Human alternative:** Just... start. "Here's what I found" or skip the preamble
entirely and open with the first point.

### Marker 4: Era-of Openers (Severity: Critical)

**Pattern:** Grand, sweeping statements about the current moment that say nothing.

**Examples to flag:**
- "In today's fast-paced world..."
- "In an era of unprecedented change..."
- "As we navigate an increasingly complex landscape..."
- "In the ever-evolving world of..."

**Human alternative:** Get specific. "In today's fast-paced world of marketing"
becomes "Google changed their algorithm three times this quarter" -- an actual
fact that grounds the reader.

### Marker 5: Buzzword Overload (Severity: Moderate)

**Pattern:** Stacking vague, impressive-sounding words that obscure meaning.

**Examples to flag:**
- "game-changer"
- "leverage" (as a verb meaning "use")
- "synergy"
- "cutting-edge"
- "best-in-class"
- "world-class"
- "next-level"
- "unlock" (as in "unlock growth")
- "empower"

**Human alternative:** Replace each buzzword with what you actually mean. "Leverage
our cutting-edge platform to unlock growth" becomes "Use our API to send 10x more
emails without hiring."

### Marker 6: Starting with "I" (Severity: Minor)

**Pattern:** Opening a post or paragraph with "I" when the content isn't actually
about the author's personal experience.

**Examples to flag:**
- "I believe that every marketer should..."
- "I think the key takeaway here is..."
- "I've seen many companies struggle with..."

**Human alternative:** If you haven't actually seen it, don't claim you have.
If you have, get specific: "Three clients I worked with last year all had the
same problem: their onboarding emails were going to spam."

### Marker 7: Em-Dash Overuse (Severity: Moderate)

**Pattern:** Using em-dashes (---) as the primary sentence connector, especially
more than twice in a single paragraph.

**Examples to flag:**
- "The product -- which was already struggling -- needed a complete overhaul --
  from pricing to positioning -- before it could compete."

**Human alternative:** Use periods. Use commas. Use parentheses. Vary your
punctuation. One em-dash per paragraph is fine. Three is a tell.

### Marker 8: Triple Adjective Lists (Severity: Moderate)

**Pattern:** Describing something with exactly three adjectives, especially
when they're near-synonyms.

**Examples to flag:**
- "A robust, comprehensive, and scalable solution"
- "This powerful, intuitive, and flexible platform"
- "Our dedicated, experienced, and passionate team"

**Human alternative:** Pick the one adjective that actually matters and cut the
other two. "A scalable solution" does more work than three adjectives fighting
for attention.

### Marker 9: "Robust" and "Comprehensive" (Severity: Moderate)

**Pattern:** These two words appear in AI-generated text at roughly 50x the rate
of human writing. They're essentially AI watermarks at this point.

**Examples to flag:**
- "A robust set of features"
- "Comprehensive documentation"
- "A robust and comprehensive approach"

**Human alternative:** "Robust" usually means "it works." Say that. "Comprehensive"
usually means "it covers a lot." Say what it covers specifically. "Comprehensive
analytics" becomes "analytics for revenue, churn, activation, and feature usage."

### Marker 10: "Navigate the Landscape" (Severity: Critical)

**Pattern:** This phrase and its variants are near-certain AI markers.

**Examples to flag:**
- "Navigate the complex landscape of..."
- "Navigate the challenges of..."
- "As you navigate your journey..."
- "The evolving landscape of..."

**Human alternative:** Drop the metaphor entirely. Nobody navigates landscapes
outside of hiking. Say what you mean: "Figure out which compliance rules apply
to you" instead of "Navigate the regulatory landscape."

### Marker 11: Perfect Parallelism (Severity: Minor)

**Pattern:** Every sentence in a list or paragraph follows the exact same
grammatical structure. Humans vary their syntax naturally.

**Examples to flag:**
- "We analyze your data. We identify your gaps. We build your strategy.
  We measure your results."

**Human alternative:** Mix it up. "First, we look at your data to find what's
actually going on. Then we figure out the gaps. The strategy comes from there,
and we track whether it's working."

### Marker 12: Unnecessary Summarization (Severity: Moderate)

**Pattern:** Ending with a paragraph that restates everything already said,
adding no new information. Especially "In conclusion" or "To sum up."

**Examples to flag:**
- "In conclusion, we've seen that marketing psychology, buyer behavior, and
  pricing strategy all play crucial roles in..."
- "To sum up, the key takeaways are..."
- "In summary, it's clear that..."

**Human alternative:** End with a forward-looking statement, a specific
recommendation, or just stop when you're done. The reader doesn't need you
to re-read the article to them.

### Marker 13: Filler Transitions (Severity: Minor)

**Pattern:** Transitions that sound smooth but carry zero information.

**Examples to flag:**
- "With that said..."
- "That being said..."
- "Moving on to..."
- "Having established that..."
- "On a related note..."
- "Furthermore..."
- "Moreover..."

**Human alternative:** Cut them. If the paragraphs connect logically, you
don't need a transition. If they don't, a transition word won't fix the
structural problem.

### Marker 14: Emotional Performance (Severity: Critical)

**Pattern:** Claiming emotions the writer doesn't have, especially in
professional contexts.

**Examples to flag:**
- "I'm thrilled to announce..."
- "I'm incredibly passionate about..."
- "We're excited to share..."
- "It brings me great joy to..."

**Human alternative:** Announce the thing. "We shipped dark mode" is more
credible than "We're absolutely thrilled to announce that dark mode is
finally here!" If you're actually excited, your word choice and specificity
will show it without you having to label the emotion.

### Marker 15: Colon-Initiated Lists (Severity: Minor)

**Pattern:** Every paragraph ending with a colon followed by a bullet list.
Used once or twice, it's fine structure. Used for every single point, it's
a pattern tell.

**Human alternative:** Work some of the list items into prose. Alternate
between listed and narrative formats.

### Marker 16: "Delve" (Severity: Critical)

**Pattern:** This word appeared in roughly 0.1% of human text pre-2023 and
now appears in 5-10% of AI-generated content. It's a statistical anomaly.

**Examples to flag:**
- "Let's delve into..."
- "Delving deeper into..."
- "When we delve into the data..."

**Human alternative:** "Let's look at" or "Here's what the data shows" or
just present the data without announcing that you're about to present it.

### Marker 17: Symmetrical Structure (Severity: Moderate)

**Pattern:** Every section being roughly the same length, every list having
the same number of items, every paragraph being 3-4 sentences. Real writing
is lumpy. Some points need one sentence. Some need five paragraphs.

**Human alternative:** Let the content dictate the structure. If one point
is simple, let it be short. If another is complex, let it be long. Uniformity
signals automation.

### Marker 18: Unity/Wholeness Closing (Severity: Moderate)

**Pattern:** Ending with a grand unifying statement that ties everything
into a neat bow. Real conclusions are often messy, partial, or honest
about uncertainty.

**Examples to flag:**
- "By combining these strategies, you'll be well-positioned to..."
- "Together, these approaches form a holistic framework for..."
- "When all of these elements come together..."

**Human alternative:** End with the most important thing. Or end with what
you don't know yet. "I'm still testing whether the pricing change actually
moves the needle. I'll update this in 30 days" is more human than any
synthesizing conclusion.

---

## Scoring Rubric: Four Dimensions

Score each dimension from 1 (clearly AI) to 5 (clearly human).

### Dimension 1: Vocabulary (Weight: 25%)

| Score | Description |
|-------|-------------|
| 1 | Multiple buzzwords, "robust," "comprehensive," "delve," "leverage." Reads like a thesaurus. |
| 2 | Mostly generic language with occasional specific words. Still feels polished in a suspicious way. |
| 3 | Mix of specific and generic. Some personality showing through. A few AI tells remain. |
| 4 | Mostly natural word choices. Words the author would actually say out loud. One or two slips. |
| 5 | Every word sounds chosen, not generated. Includes informal language, slang, or domain-specific jargon used correctly. |

**Test:** Read each sentence aloud. Would you actually say this? If not, flag it.

### Dimension 2: Structure (Weight: 25%)

| Score | Description |
|-------|-------------|
| 1 | Perfect parallelism everywhere. Every section the same length. Reads like a template was filled in. |
| 2 | Mostly uniform structure with one or two variations. Feels assembled, not written. |
| 3 | Some structural variation. Mix of long and short paragraphs. Still a bit too tidy. |
| 4 | Natural flow. Paragraphs vary in length. Some points are expanded, others are terse. |
| 5 | Feels like someone thinking through the problem in real time. Structural choices reflect content, not format. |

**Test:** Remove all content and look at just the paragraph lengths and heading
structure. If it looks like a grid, it's probably AI.

### Dimension 3: Specificity (Weight: 30%)

| Score | Description |
|-------|-------------|
| 1 | All generic. "Companies" instead of specific companies. "Challenges" instead of specific challenges. "Results" instead of numbers. |
| 2 | One or two specific references buried in generic framing. |
| 3 | Mix of specific and generic. Some real examples, but they feel cherry-picked or googleable. |
| 4 | Mostly specific. Named companies, real numbers, actual experiences. A few generic filler spots. |
| 5 | Everything is grounded. Specific metrics, named people, dates, outcomes. Feels like first-hand knowledge. |

**Test:** Highlight every noun. How many are generic ("companies," "teams,"
"challenges") vs. specific ("Stripe," "our Q3 retention rate," "the Tuesday
standup")? Specifics should outnumber generics.

### Dimension 4: Voice (Weight: 20%)

| Score | Description |
|-------|-------------|
| 1 | Could have been written by anyone. No personality, no opinion, no risk. |
| 2 | Occasional hints of opinion, but hedged into meaninglessness. |
| 3 | Clear perspective present, but expression is safe. You can tell they have opinions but they're being careful. |
| 4 | Distinct voice. Identifiable opinions. Some sentences only this person would write. |
| 5 | Unmistakably a specific human. Friends would recognize this writing blind. Has quirks, strong opinions, and isn't trying to please everyone. |

**Test:** Could you identify the author from this text alone? If not, the voice
score is 3 or below.

### Overall Score Calculation

```
Overall = (Vocabulary * 0.25) + (Structure * 0.25) + (Specificity * 0.30) + (Voice * 0.20)
```

| Overall | Verdict |
|---------|---------|
| 4.5-5.0 | Authentically human. Ship it. |
| 3.5-4.4 | Mostly human. One pass of edits should clean up remaining patterns. |
| 2.5-3.4 | Suspicious. Needs a significant rewrite. Multiple AI markers present. |
| 1.5-2.4 | Almost certainly AI-generated. Full rewrite required. |
| 1.0-1.4 | Raw AI output with no editing. Start over with a human draft. |

---

## Channel-Specific Rules

### LinkedIn

- Line breaks between every sentence are an AI tell. Real LinkedIn posts use
  paragraph breaks, not sentence breaks.
- Hashtags at the end are fine (2-5). Hashtags in the middle of text are not.
- "I'm thrilled to announce" is the #1 LinkedIn AI marker. Replace with the
  announcement itself.
- Personal stories should include at least one embarrassing, inconvenient, or
  unexpected detail. Perfect narratives feel manufactured.
- Hot take: if every post starts with a provocative one-liner followed by an
  em-dash and "here's what I learned" -- you're in a template, not a voice.

### Email

- "I hope this email finds you well" is not AI per se, but it's dead weight.
  Cut it.
- Subject lines should be lowercase and specific. "quick question about the
  API rate limits" beats "Important Update Regarding Our Partnership."
- Sign-offs: "Best" and "Regards" are fine. "Warmly" from someone you've
  never met is weird. Match the relationship temperature.
- Keep paragraphs to 2-3 sentences max. Walls of text in email signal "I
  dictated this to AI and didn't edit."

### Slack

- Full sentences with perfect grammar in Slack are suspicious. People abbreviate.
  People use sentence fragments. People start messages with lowercase.
- Emoji reactions and inline emoji are normal. Emoji at the start of every
  bullet point is an AI formatting pattern.
- "Just to clarify..." and "To add some context..." are Slack AI tells. People
  in Slack just say the thing.
- Threads should feel conversational, not like mini-essays.

### Blog

- First-person experience is the hardest thing for AI to fake. Include specific
  dates, outcomes, and things that went wrong.
- Contractions are mandatory unless you're writing for a very formal publication.
  "It is important" vs "It's important" -- the first reads like AI.
- Blog posts should have at least one opinion the author was nervous to publish.
  If everything is safe and agreeable, it reads like AI consensus.
- Subheadings should be useful, not clever. "What We Learned" is fine. "The
  Alchemy of Iterative Growth" is AI trying to be interesting.

---

## The Rewrite Pipeline

### Step 1: Detect

Identify the content type (blog, LinkedIn, email, Slack, docs, copy). Read
the full piece once without marking anything. Get a feel for the overall
tone and intent before looking for patterns.

### Step 2: Score

Apply the four-dimension rubric. Calculate the overall score. If the score
is 4.0+, you're done -- flag specific markers but don't rewrite the whole
thing.

### Step 3: Identify Patterns

Go through the 18 markers. Flag each instance with the marker number and
severity. Count total markers. A piece with 0-2 markers is probably human.
3-5 is in the gray zone. 6+ is almost certainly AI-generated or heavily
AI-assisted.

### Step 4: Rewrite

For each flagged pattern, rewrite the specific sentence or paragraph. Rules:
- Replace buzzwords with concrete language.
- Cut sycophantic openers entirely -- don't replace them, delete them.
- Vary sentence length. Follow a long sentence with a short one.
- Add one specific, verifiable detail for every generic claim you remove.
- Read each rewritten sentence aloud. If you stumble, simplify.
- Preserve the author's actual point. Don't change what they're saying,
  change how they're saying it.

### Step 5: Verify

Re-score the rewritten version. The overall score should be at least 1.0
higher than the original. If not, you missed patterns -- go back to Step 3.

Run this final check: read the rewritten piece and ask, "Would the author's
close friend recognize this as their writing?" If the answer is "no" or
"not sure," the voice dimension needs more work.

---

## The Auto-Improvement Loop

This marker list is not exhaustive. Language models evolve, and their tells
change. If you catch a pattern that I missed -- a phrase, a structural tic,
a punctuation habit that screams AI but isn't on this list -- tell me. I'll
add it to the next version.

Current patterns on watchlist (not yet confirmed as reliable markers):
- Overuse of "arguably" in positions that aren't actually argued
- Starting paragraphs with "The reality is..."
- Using "nuanced" to describe any complex topic
- Closing with "The future of X is Y" predictions
- "At its core" as a transition phrase
- "When it comes to" as a paragraph opener

If you see any of these consistently, report it. They'll get promoted to
full markers with severity ratings in the next version.

---

## Example: Before and After

**Before (Score: 1.8):**

> I'd be happy to share my thoughts on content marketing! In today's
> fast-paced digital landscape, it's worth noting that content is king.
> Let's dive into what makes a robust, comprehensive, and scalable content
> strategy. By leveraging cutting-edge tools and best-in-class practices,
> you can navigate the complex landscape of content creation and unlock
> unprecedented growth. Furthermore, it's important to remember that
> consistency is key -- the most successful brands -- from startups to
> enterprises -- have found that a dedicated, passionate, and strategic
> approach to content yields game-changing results.

**Markers found:** #1 (sycophantic opener), #3 (forced enthusiasm), #4
(era-of opener), #2 (hedge phrase), #5 (buzzword overload x5), #8 (triple
adjectives), #9 ("robust," "comprehensive"), #10 ("navigate the landscape"),
#7 (em-dash overuse), #13 (filler transition), #14 (emotional performance).
Total: 13 markers.

**After (Score: 4.3):**

> Most content strategies fail because they're based on a publishing
> schedule, not a reader's actual questions. We switched from "post 3x
> per week" to "answer the 20 questions prospects ask our sales team
> most often." Traffic from those 20 posts now accounts for 40% of our
> pipeline. The tools don't matter much. We use Google Docs and WordPress.
> The only thing that matters is whether you're writing about what people
> actually search for or what you think sounds impressive.

Markers found: 0. Specific metrics, real strategy, no buzzwords, natural
sentence variation, clear voice.
