export const posts = [
    {
        slug: 'good-product-managers-bad-product-managers',
        title: 'Good product managers and bad product managers',
        excerpt: 'Habits I\'ve come to look for, based on conversations with senior PMs and VPs at ASBL and what I\'ve picked up from PM friends who read a lot.',
        content: `I haven't formed these views in a vacuum. Most of what follows comes from conversations with senior PMs and VPs at ASBL, from questions I've kept asking them over time, and from PM friends of mine who read more product books than I do. I'm writing it down here because I find myself coming back to the same distinctions when I think about what separates strong product managers from weaker ones.

---

## The product manager as owner

==The strongest product managers know the market, the product, the product line, and the competition well enough to operate from a solid base of knowledge and confidence.== The easiest way to describe the role is that the product manager is the CEO of the product. They take full responsibility for the product and measure their own success in terms of the product's success. They're responsible for right product, right time, and everything that entails.

![the PM owns it — full stop](https://media.giphy.com/media/CXaS0H28S2irlIkffL/giphy.gif)

Weaker product managers, in my experience, have a lot of excuses. Not enough funding. The engineering manager is difficult to work with. The competitor has ten times the headcount on the same problem. I'm overworked. I don't get enough direction. The senior PMs I've learned from don't make these kinds of excuses, and ==the CEO of a product shouldn't either.==

Ownership also shows up in how a PM handles problems before they surface. Strong PMs anticipate serious product flaws ahead of time and build real solutions for them. Weaker ones spend the day putting out fires. Strong PMs take written positions on important issues early: competitive silver bullets, tough architectural choices, tough product decisions, markets to attack or yield. Weaker PMs voice opinions verbally and then lament that "the powers that be" wouldn't let their idea happen. ==A prediction without an attempt at prevention doesn't add much value.==

---

## No excuses

![strong PMs don't make excuses](https://media.giphy.com/media/zhYw1CEgXtABJGDFDr/giphy.gif)

---

## What the job actually is

Strong product managers don't let their time get absorbed by the various teams that have to work together to deliver the product. They don't take all the meeting minutes, they don't project-manage the various functions, and they're not gophers for engineering. ==They manage the product team. They are not part of the product team in that sense.==

Engineering teams don't think of a strong product manager as a "marketing resource." The product manager is the counterpart of the engineering manager. They crisply define the target and the "what" (as opposed to the "how"), and they manage the delivery of the "what." Weaker product managers often feel best about themselves when they figure out "how." ==That's usually a sign they've drifted out of their own job and into someone else's.==

A related habit: strong product managers communicate to engineering crisply, both in writing and verbally. They don't give direction informally. They gather information informally, but direction gets written down.

---

## What to focus on

A strong product manager focuses the team on revenue and customers. A weaker one focuses the team on how many features competitors are shipping.

Strong PMs define products that are actually good and can be executed with a strong effort. Weaker ones define products that are good but can't be executed, or they let engineering build whatever they want — which usually means whichever problem is hardest and most intellectually interesting.

Strong PMs think in terms of delivering superior value to the market during inbound planning, and achieving market share and revenue goals during outbound. ==Weaker ones get confused about the differences among delivering value, matching competitive features, pricing, and ubiquity. They treat those as interchangeable levers when, in practice, they aren't.==

Strong PMs decompose problems into parts that can be worked on separately. Weaker ones combine everything into one problem, and as a result nothing moves.

---

## Written artifacts

![create the written artifact — it's how you scale](https://media.giphy.com/media/JotaEKZyfarygIkgn1/giphy.gif)

==Strong product managers create leveragable collateral: FAQs, presentations, white papers, internal one-pagers.== This is what lets them scale without becoming a bottleneck. Weaker product managers tend to complain that their day gets eaten answering questions for the sales team and they feel swamped. That's usually a symptom of not having invested in written artifacts in the first place.

---

## External communication

Strong PMs think carefully about the story they want told about the product when it reaches the outside world — press, analysts, customers, anyone writing about the space. Weaker PMs focus on being technically precise and covering every feature, which tends to produce a story that nobody remembers.

Strong PMs also ask questions of the people they're talking to. Weaker ones answer any question that comes their way, even when the question is based on a wrong premise. And ==strong PMs assume the people they're communicating with are smart, even if a specific technical distinction is unfamiliar to them.== Weaker PMs take a missed distinction as evidence the other person is dumb, and end up communicating at the wrong level.

---

## Defining your own success

Strong PMs err on the side of over-explaining things that might seem obvious, because clarity beats efficiency. Weaker ones don't explain the obvious, because they assume everyone already knows what they know. ==Strong PMs define their own job and their own measures of success. Weaker ones wait to be told what to do.==

---

## Discipline

Strong PMs send their status reports in on time every week, because they value discipline. Weaker ones forget, because they don't.

![consistency is everything](https://media.giphy.com/media/SElw9wE2GSvHXx9aiu/giphy.gif)

It's a small habit in isolation, but in my experience ==it tends to correlate with every other habit above.==`,
        tags: ['Product Management', 'Career', 'Leadership'],
        publishedAt: '2026-04-23T14:00:00Z',
    },
    {
        slug: 'how-to-build-great-products',
        title: 'How to build great products',
        excerpt: 'A three-bucket model for categorizing features, and the role of a product mission.',
        content: `Most startups fail because they don't ship a great product in a growing market before they run out of money. Assuming you've picked a good market, how do you go about building a great product?

Building great products is hard, and it's harder if you don't have a good model for analyzing products and features. Without a model, you're left with an endless stream of feature ideas and half-informed guesses. Some people can pull this off because they start out with strong product intuition. Most of us don't have that on day one.

I started out with terrible intuition, and didn't even know it. Over the past three years I looked at our user metrics every day, which created a feedback loop that slowly trained my judgment on what makes a good product. Eventually I got reasonably good at predicting the impact of any given feature, and I started thinking about a model that captures the essence of what I'd learned.

---

## The three bucket model

==The most important aspect of product management, in my experience, is categorizing features into three buckets: gamechangers, showstoppers, and distractions.== When I first started building products, all features looked roughly the same. Over time, I formed the three bucket model, and now my mind automatically slots every feature into one of these buckets.

![brain automatically organizing and categorizing](https://media.giphy.com/media/fl0B5TLMTYLPvNervP/giphy.gif)

Here is an example. Suppose you are building a new mobile phone. It has to be able to call people, or nobody will buy it since it wouldn't be much of a phone. But the reverse isn't true — having voice calls won't make anybody buy your phone, because every other phone already does that. So voice calls are a showstopper.

On the other hand, suppose your phone could project videos onto a surface. No other phone does that, so this feature could be a gamechanger that excites a lot of consumers. Alternatively, it's possible that most people won't care about it at all — in which case it's just a distraction.

This gives you three buckets for any given feature:

- **A gamechanger.** People will want to buy your product because of this feature.
- **A showstopper.** People won't buy your product if you're missing this feature, but adding it won't generate demand.
- **A distraction.** This feature will make no measurable impact on adoption.

==Successful products have one to three gamechanging features, dozens of features that neutralize showstoppers, and very few distractions.== Your job is to build an intuition about your space to tell these categories apart.

---

## Resource allocation

If you had infinite time, you could ignore these categories and blindly iterate until the product resonates. In practice, your time is finite. The longer you take to find a great product, the more likely you are to run out of cash, squander morale, or miss the market moving under your feet.

![wasting resources is a slow way to die](https://media.giphy.com/media/VwFieU2ZfsGjUFFrIm/giphy.gif)

Modeling product management in terms of the three categories lets you treat it as a resource allocation problem:

- If you put any effort into **distractions**, you're wasting resources.
- If you're doing more **showstopper** features than you absolutely need to, you're wasting resources. Lack of copy-pasting on the first iPhone might have been a showstopper for some, but Apple correctly determined that enough consumers would still buy the phone.
- If you put more effort into any given showstopper than the minimum you can get away with, you're wasting resources. The first iPhone had pretty bad voice quality, but it was good enough.
- If you're doing more than three **gamechanging** features, you're wasting resources. Few disruptive products are good at a dozen things.
- If you don't put enough creative energy into a gamechanging feature, ==you're wasting resources. A gamechanger that doesn't clearly stand out ends up being a distraction. In this category you can't go half way.==

---

## Craftsmanship

The trickiest part is learning how to tell the difference between the categories and knowing when a given category is full. Is a built-in phone projector a gamechanger or a distraction? If it's a gamechanger, is it big enough to attract sufficient demand, or do you need another one? These questions don't have generic answers — they depend entirely on your specific market.

==The best way to build this intuition is to talk to a lot of people.== Talk to potential users about what they think. Talk to people who tried to build a product in your space and failed. Talk to competitors about how they approach the problem. Talk to engineers in big companies, other entrepreneurs in adjacent spaces, investors, journalists, grad students, professors, and even the naysayers.

![talking to everyone you can find](https://media.giphy.com/media/3o6Zt1RpJPy4rRPySc/giphy.gif)

The best way to get a sense of taste in a given space is to inject yourself into the industry and talk to as many people as you can.

---

## Buyers, stakeholders, and pundits

The sooner you can learn about the history of the space, the state of the technology, the opinions of potential users, and the direction of your competition, the sooner you can form a coherent view.

But be careful. ==A feature is only a gamechanger if the person signing the proverbial check recognizes it as one.== Industry pundits can be extremely useful for understanding the state of your field, but they're rarely the ones to buy your product. If you design your product around their feedback, you'll find there is nobody to buy it in the end.

For complex business sales, pay attention to all the parties. Are certain users strong influencers on the decision-maker? If so, spending time on their requests might be worthwhile. If not, it might be a distraction.

==You can't design a great product unless you live, eat, and breathe like your users do.== You need to know exactly who your user is, what their problems are, how they perceive your product, and who helps them make buying decisions. Your intuition has to mirror how customers will perceive the product. Categorizing features is only useful if it's a good predictor of your actual users' response.

---

## Aggregate gamechangers

Some features aren't sufficiently impressive on their own but become gamechangers in aggregate. A unique icon set, a unique color scheme, and a unique family of phone cases might each be forgettable alone — but together they could form a design direction that's a genuine gamechanger.

Features that become gamechangers in aggregate are dangerous for three reasons: it becomes harder to tell what combination is and isn't a gamechanger; aggregate gamechangers are expensive (instead of a couple of good decisions, you have to make hundreds); and it becomes easier to convince yourself that just one more feature will strike the gamechanger.

If you have no choice but to resort to aggregate gamechangers, it probably means you're working in a relatively mature market. That should prompt some soul-searching — is it worth being in this market, or does it make more sense to find one where you can innovate more easily?

---

## Product mission

Suppose you've developed product intuition to apply the three bucket model. You can correctly categorize features. You're ahead of most product managers. But you're still not quite done:

- If you categorize features ad-hoc, it's easy to make mistakes and then construct a rationale to convince yourself you were right.
- While you're building the product, you'll have to be part of every single decision, because other people have no guidance.
- Your engineers will get frustrated — they'll feel you're pulling decisions out of thin air.
- You'll have to convince journalists, investors, hires, and customers. Convincing people is hard if you're making decisions ad-hoc.

A good way to get around these problems is to write down a product mission. Think of it as a function that accepts a given feature as an argument and returns one of the three categories. A good mission is concise, understandable, and repeatable.

Here is a product mission that worked surprisingly well for RethinkDB:

> **Database tools should be indistinguishable from magic**

> Surprise and amaze people with developer tools for building real-time, data-driven web applications they could only dream of building, and bring sheer joy and simplicity to the process of building great software.

![indistinguishable from magic](https://media.giphy.com/media/kcbaj12XEzGFs9b6lP/giphy.gif)

On the surface these two sentences don't say very much. But this mission has surprisingly high information density. It tells people they're building a database. It tells them the product is a developer tool first, which resolves the tension between developer and operations features. It explains what users should do with RethinkDB. It gives a sense of how far they'll go on certain features. ==It took three years to understand the product well enough to write this mission. If they'd had it on day one, it would probably have cut development time in half.==

When you're building a product, ==the mission should be one of the first things you work on.== If your mental model is good enough to write a product mission that resonates with everyone in your company, a lot of other decisions get easier.`,
        tags: ['Product Management', 'Strategy', 'Product Thinking'],
        publishedAt: '2026-04-23T12:00:00Z',
    },
    {
        slug: 'prd-structure-i-actually-use',
        title: '10 PRD tips I keep coming back to',
        excerpt: 'PRDs only work if your team actually reads them. Ten things I\'ve learned about writing ones that land.',
        content: `==A PRD is a requirements document that specifies scope, reason and desired output.== Nothing more, nothing less.

One word about agile: in a Scrum context, documentation is usually kept to a minimum and PRDs do not exist as such — but they're not disconnected either. I see a PRD as combining an Epic (which communicates the big picture) with the Epic's user stories.

---

## 1. Start with a story

Introduce the PRD with a story that explains the situation, problems and goals in a narrative form. ==This helps the reader empathize with the user and provides an initial intuition about why the feature outlined in the PRD is important.==

---

## 2. Introduce the big picture: What, Why, Who, How

- **What is it?** Summary of the most important functional and non-functional aspects and requirements.
- **Why do it?** Provide insights based on data as to why this PRD is necessary and urgent. If possible, provide both quantitative and qualitative angles. Include business and commercial needs. Include technical considerations that motivate this PRD.
- **Who is it for?** Outline what's the target user (or customer) group for the PRD. Briefly explain why those users and not others.
- **How is it done?** List system design and interface dependencies here. ==The goal is to educate the reader about the technical ecosystem — not to describe how the UX team should do their job, or how exactly development should implement it.==

---

## 3. Don't forget the market

Include your analysis of how key competitors are solving similar problems and weigh in on why their solution is good or not. ==Competitor analysis should be a calibration, not a justification.==

---

## 4. Split the PRD into digestible pieces

![splitting it up — one clean slice at a time](https://media.giphy.com/media/3oz8xX98JptX1h03rW/giphy.gif)

Depending on what software development methodology you are using, chances are high that you'll need to create user stories or similar artifacts later on. ==Make sure to make it easy to split the overall product requirements into individual pieces.==

---

## 5. Follow a consistent structure for each requirement

At this point the explanations should be very focused and specific, not as general as in the introduction. This general structure works well:

- **Requirement Intro**
- **Motivation & Problem Description**
- **Functional Requirements**
- **Non-functional Requirements**
- **Interaction Processes**
- **Interface, integration and technical considerations and constraints**
- **Acceptance Criteria**

---

## 6. Don't tell UX, UI, Dev and Testing teams how to do their job

Your focus should be on ==explaining the goals from user, customer and business perspective== and the resulting requirements. Don't bias into a direction just because you personally favor it. The "How is it done?" part in the intro is only to give the reader an idea of the technical ecosystem this PRD lives in.

---

## 7. Make sure acceptance criteria are water-tight

==In the best case, acceptance criteria should directly be used to construct test cases.== They should cover both functional and non-functional aspects. Each criterion should be specific and easy to validate.

---

## 8. Don't slack on non-functional requirements

Typical non-functional requirements are performance, security and scalability. But ==usability is also a non-functional requirement.== Make sure to line out how you want users to feel when using the product.

---

## 9. Draw a fence

As important as lining out what's included is describing what's out of scope. ==Argue why you leave certain features out of scope.== Otherwise you open yourself up to discussions about why a certain feature is not included or why you included requirements from business unit A but not business unit B.

---

## 10. Don't set deadlines

I realize that this might be controversial. But ==a PRD should be focused on the product and not the delivery timeline.== That doesn't mean that development team utilization or customer expectations don't influence the PRD. It's just that the PRD shouldn't dictate the "when".

---

![ship it](https://media.giphy.com/media/26xBEamXwaMSUbV72/giphy.gif)`,
        tags: ['Product Management', 'PRD', 'Documentation'],
        publishedAt: '2026-04-23T10:00:00Z',
    },
    {
        slug: 'prioritization-system-i-actually-use',
        title: 'How to prioritize a product backlog',
        excerpt: 'Methods I use for mature products, methods I use for new ones, and how to handle HiPPOs.',
        content: `Prioritizing product backlogs is a key responsibility of product managers. ==It's essential that the most important backlog items are done first, so customers, users and the business have the highest benefit.== There are a number of methods for how to prioritize a product backlog, which fit different situations.

I try to be as methodology agnostic as possible. Regardless of where on the Agile to Waterfall spectrum a product is being developed, maintaining a product backlog and prioritizing its items is essential. I structure this into two sections: prioritizing for mature products and prioritizing for new products.

---

## Prioritize for mature products

When prioritizing for mature products, I assume all features essential for the business are already delivered, there's a clear picture of business goals, and the development team is established. For this context, I prioritize by three scores.

### Backlog item scoring

The method: assign a score of 1 to 5 to each of **Importance to Business**, **Frequency of Use**, and **Ease of Development**. Add those numbers up. ==The backlog item with the highest overall score should be done first.==

![The Office — boom, that's literally the whole system](https://media.giphy.com/media/GVbFBI72z6Jl0DVyA2/giphy.gif)

With this method:

- Items scoring above 13 are quick wins — high impact, low cost. Do them now.
- Items scoring below 4 get removed or pushed back indefinitely.
- Everything in between gives you a reasonable, defensible sequence.

Sounds simple. But there are a few things to consider.

### Importance to Business

I rate this score depending on how much the backlog item's key KPI is in the current focus of the business. ==If a backlog item's KPI is user retention and the business goal is to increase user stickiness, high score. If the business is focused elsewhere, low score.==

Using this score, I force myself to think from the perspective of the business and not only from the user perspective. Urgency also plays in — if the business is spending heavily on customer service because of a high call-in rate, features aimed at lowering that rate score high regardless of size.

> In order for this score to be accurate, you need to have a good idea of how you want to measure the backlog item's impact. If you don't have that, find the key KPI first, then come back to prioritizing.

For large PRDs or Epics, I use "Importance to Business." For small user stories inside a larger Epic, I switch to "Importance to User" — because the business metric of stories within an Epic is usually the same, so that score won't discriminate. ==Don't mix the two scoring types in the same prioritization round.==

### Frequency of Use

Frequency of Use estimates the ratio of overall visitors to the number of visitors who interact with the feature. A score of 5 means all users (within the scope I define as "overall") will interact with it. A score of 1 means almost nobody will.

==The key is not limiting "overall visitors" too narrowly.== I usually count all visitors within the process or funnel the new features live in. For example, for a flight duration filter on flight list pages, I'd count all visitors inside the main sales funnel as "overall visitors" — including users who land on the order page and never see the filter. The filter's job is to affect overall funnel conversion.

### Ease of Development

Higher score means easier to build. ==This metric combines two factors: effort and risk.== Effort is the time required for architecture, implementation, integration, testing, and documentation. Risk is the potential for delays from uncertainties — complex third-party APIs, spotty documentation, things the team has never done before.

![when you ask engineering how long it'll take](https://media.giphy.com/media/l0Exk8EUzSLsrErEQ/giphy.gif)

To get a reasonable estimate, I involve the development team. I do it like this:

- Provide precise scope for backlog items likely to enter development within the next 2 months.
- Ask development for a high-level, preliminary analysis for everything after that. When in doubt, take the lower score.

In practice, I use Importance to Business × Frequency of Use to identify the top items, scope those properly, then iterate.

### What about HiPPOs?

HiPPO stands for "highest paid person's opinion" — situations where prioritization is driven top-down by senior management rather than by data.

![the HiPPO snapping half your backlog out of existence](https://media.giphy.com/media/iIFS20pNoCg1EEVodC/giphy.gif)

The downsides are real: it takes ownership away from the product team, it may harm the business by valuing opinion over data, and it discourages creativity. When I run into a HiPPO situation, I try:

1. **Understand the context.** There might be factors I'm not aware of. If so, I try to propose alternatives that fit better into the overall backlog.
2. **Argue using the scoring.** Put the HiPPO feature and the item it displaces through the same scoring. Show the totals side by side. Numbers vs. opinion is an easier fight than opinion vs. opinion.
3. **Quantify the fallout.** Make the cost of the trade-off visible: delayed items, impacted metrics, timeline shifts.

If none of that works: ==boil the requirement down to its absolute minimum, then extend from that minimum into something important, so the original HiPPO item is only a small part of a larger, more valuable backlog item.==

---

## Prioritizing for new products

I do not advise using the Importance to Business / Frequency of Use / Ease of Development method for new or immature products — importance and frequency might be very high for all backlog items at that stage. Here are more suitable approaches.

### The Walking Skeleton

The "walking skeleton" method views the product as a skeleton to which only the most essential parts are attached, so it can "walk." The backbone is the user journey. Everything else attaches to the relevant part of that journey. The result is a hierarchical story map — not linear — that communicates clearly which features are essential for each stage of the user journey.

==I like this approach because it puts the user into the center.== The risk is that if the user journey isn't constantly visible, it becomes a document living dead in someone's Dropbox rather than a living artifact.

### MoSCoW

"Must, Should, Could, Won't" — intuitive and simple regardless of background. The separation between Must and Should is hugely important early on: it forces the team to explore and agree on what the minimum viable product actually is.

The risk is ending up with mostly "Musts." If that happens, re-iterate through the user journey. If Musts still dominate, try a method with finer prioritization granularity, like the Walking Skeleton or Weighted Shortest Job First.

### Prioritization Matrix

A quick, intuitive method: for each backlog item, assign Development Cost and Risk (Low or High) and Customer Value (Low or High).

- High value, low cost → top of the list.
- Low value, high cost → remove.
- High value, high cost → higher priority than low value, low cost. If you're spending the time, spend it on what matters.

### Prioritization Poker

Useful for initial workshops, especially with stakeholders who won't be part of the day-to-day product team. Participants stand around the backlog. For each item, they silently vote 1–5, then reveal simultaneously. This accomplishes two things: it establishes consensus on the obvious winners and duds, and it generates focused discussion for items with a wide score range.

Not suitable if there is already an existing backlog, or if key stakeholders don't participate.

![sticky notes going up — prioritization poker in action](https://media.giphy.com/media/ntpDcLxm4N9GoxUE3N/giphy.gif)

---

## Conclusion

When deciding what kind of prioritization approach to use, the maturity of the product, the project stage, and the discussion context all need to be factored in. After that's clear, ==the method to choose needs to be a healthy mix of using hard metrics and being able to communicate the result in an intuitive, easy-to-understand way.==

==No prioritization, regardless of method, should be assumed to be 100% correct and immutable.== Rather, the method should structure discussion and decision-making, and encourage constructive, directed criticism.`,
        tags: ['Product Management', 'Prioritization', 'Growth'],
        publishedAt: '2026-04-22T10:00:00Z',
    }
]
