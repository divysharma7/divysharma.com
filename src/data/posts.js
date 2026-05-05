export const posts = [
    {
        slug: 'growth-vs-marketing-vs-product',
        title: 'Growth vs Marketing vs Product',
        excerpt: 'Marketing, growth, and product are three different jobs. They run on different time horizons, with different skill mixes, and with different definitions of what winning means.',
        heroImage: '/blog-heroes/growth-vs-marketing-vs-product.svg',
        heroAlt: 'Growth vs Marketing vs Product — Three jobs, one funnel',
        content: `![Marketing, Growth, and Product — where most companies get confused](/images/blog/hero-venn.svg)

There's a recurring confusion in tech companies about who owns what. Marketing thinks it owns growth. Product thinks marketing only does ads. Growth gets handed an acquisition target and is told to "drive signups." Everyone is busy, the numbers are moving, and somehow the company still isn't growing the way it should.

The root cause is that marketing, growth, and product are three different jobs. They run on different time horizons, with different skill mixes, and with different definitions of what "winning" means. When you blur them, you get teams that ship a lot and grow slowly.

I've spent the last two years inside a growth team at a real estate company. Before that I spent two years as a product designer, a year building my own startup, and six months learning to code. That sequence (design, then product, then growth) is roughly the order I learned to see why these three functions need to be separate, and why they need to be in the same room.

This essay is my attempt to write that down. Before I get to the marketing-vs-growth-vs-product distinctions, I want to lay out why the question matters more now than it did ten years ago. Four things have changed underneath all of this.

---

## Four shifts that changed how growth works

### 1. Access to data has become trivial

Today there are plenty of analytics tools. PostHog, Umami Analytics, and database-level tracking are all easy to set up. View events and click events get stored at session level and mapped against the users. That gives you signals through scroll depth, time spent, page views, and revisits. Most tracking tools like PostHog also have a data and analytics piece built in. Rewind 15 years and almost none of these tools existed. The ease of access to data has gone up; the cost has gone down.

### 2. Platforms reach billions, with growing integration depth

Google and Meta give you access to billions of users through Instagram, WhatsApp, Search, YouTube, and the rest. That has obvious value for lead gen. It also helps you activate, retain, and monetize customers over time. The number of these platforms is increasing at an accelerating rate, as are the ways companies can integrate with them to grow.

### 3. Scale and speed expectations keep rising

The scale tech companies are reaching today is beyond anything we've seen before, and the speed they get there is accelerating. With it comes higher expectations on how quickly your company and product should be growing.

### 4. Marketing is now a technology discipline

This is the shift that has changed the day-to-day of marketing the most. Setting up Google Tag Manager properly. Capturing gclid and fbclid (the click IDs Google and Meta attach to ad URLs) on every form fill. Passing those IDs back into the CRM so you can attribute a lead to the campaign that actually brought them in.

In my experience most teams still don't have this set up cleanly. Without clean attribution, retargeting is mostly guesswork, and the ad platforms are optimizing on signals you can't fully trust.

Once attribution is working, a lot of other things open up. Demand-generation campaigns at the top of the funnel can feed retargeting pools further down. Mid-funnel campaigns can be scoped against actual lead quality instead of click volume. The audiences you build in Meta or Google start matching the people who actually convert, because the data going back to the platforms is finally clean.

---

## How offline leads were invisible to our ad platforms

![Before and after: offline leads attribution architecture](/images/blog/offline-leads.svg)

### The black hole in our attribution

Real estate is a heavily offline business. A meaningful share of our leads come in through walk-ins, phone calls, and broker referrals, not through the website. For a long time, those leads were invisible to our ad platforms. Google's Conversions API and Meta's Pixel only saw the conversions that happened online. Everything that happened on a phone call or a broker handoff was a black hole.

The problem with that is the platforms optimize on the data you send them. If they only see online converters, they build lookalike audiences off online converters. If a meaningful share of your real customers come through offline, the platforms are systematically targeting the wrong half of the market. The ad budget is technically spending. It just isn't compounding the way it should.

### What we built

The ads team lead flagged it. I dug into the CRM data, measured how big the offline volume actually was, confirmed it was worth solving, and scoped it for engineering. What got built was a server-side integration: when a broker logged a walk-in or a phone lead in the CRM, the system fired a Conversions API event back to Google and a CAPI event to Meta with hashed identifiers, so the platforms could match the offline lead back to the original ad click.

Once it was live, the audiences the platforms started building were materially different from before. CPL improved. The lookalike pools started looking more like our actual customer base.

### The unglamorous part is the point

The other thing I've come to believe is that ops improvement mostly comes from looking at data and adjusting as it suggests, on something closer to a weekly rhythm than a quarterly one. A campaign underperforms. You find out why in the funnel breakdown. You adjust the creative or the audience or the landing page. You check it again a week later. Most of the work is unglamorous and looks like reading reports, fixing tracking, and rerunning queries when a number looks off.

That kind of work, where the ads team flags a tracking gap, a growth APM scopes it, and engineering builds it, doesn't make for good slides. But it's the difference between an ad budget that compounds and one that quietly leaks. In organizations where this kind of work stays stuck in an engineering ticket queue for three months, growth tends to stall. Which is part of why having these skills sit on the same team matters more now than it did five years ago.

---

## Growth vs Marketing

![Funnel ownership: traditional org vs growth team](/images/blog/funnel-comparison.svg)

Growth is typically described as the blending of marketing, product, and engineering. This is true, but first I think it's important to explain why.

### How marketing teams are actually built

Look at the classic funnel. Marketing organizations have typically focused on the first two layers, Awareness and Acquisition. This is apparent when you look at how marketing teams are structured and the goals they operate against. Marketing teams tend to focus on KPIs that align with the top two layers of the funnel: leads, signups, new users, downloads, and so on.

Marketing teams are optimized for pursuing those KPIs, with the majority of team members having marketing backgrounds in content, paid acquisition, copywriting, PR, and so on. What is *not* usually included is worth noting. Engineers, designers, PMs, and data scientists. Those roles tend to be in completely different silos.

Other teams within the organization usually own the rest of the funnel beyond Awareness and Acquisition. Product might own Activation and Retention. Sales may own Revenue. Every organization is structured differently, but the point is the same. The layers of the funnel are owned by completely separate teams.

### Why growth teams own the whole funnel

Contrast this to growth teams. They focus on the funnel as a whole, because their mission is about the growth rate of a metric that tells a more complete picture of the business. Daily Active Users. Monthly Active Subscribers. Revenue per cohort. Leads, registrations, and new users are one of many inputs to growth rate.

Growth rate can be affected by influencing any layer of the funnel, and the goal is to figure out how these layers interact with each other. The high-level goal is always growth rate, but at any given time a growth team could be focused on improving any layer of the funnel, because every layer feeds into it. Acquisition and Awareness is one subset of that work.

Influencing the middle and bottom of the funnel can be done in three ways. Product changes. Extending your product to other platforms. Paid acquisition (i.e. remarketing). To carry out this mission requires a very different type of team.

---

## Inside a 60-person growth team

![Org structure: growth, engineering, and product teams](/images/blog/org-structure.svg)

### What sits inside, what sits outside

The growth team I work on has roughly 60 people. Inside that team sits data science, design, copywriting, and performance marketing. Notice what is not in there as a separate organisation: the engineering team and the product team. Those sit elsewhere, under different leaders, with different roadmaps. Product alone is a 30-to-40-person team with its own designers and tech.

This is structurally different from how most marketing orgs are set up. In most companies data science lives in a central data org or inside product. Here it sits inside growth, because growth's questions are data questions. What's the conversion rate on this campaign? Which channel produces the highest-quality leads? Is this experiment statistically meaningful? You answer those questions faster when the analyst sits two desks away from the marketer.

### Engineering grads, not MBAs

Almost everyone on the team came up through engineering colleges, not business schools. That isn't deliberate gatekeeping. It's that the work itself rewards engineering-style thinking. The job is to debug a funnel like you'd debug a system, run experiments like you'd run unit tests, and ship with discipline.

That profile adapts to the work faster than the more traditional marketing or MBA profile, not because one type of person is better than the other, but because business school optimizes for a different skill set than this work needs. When the company tried hiring from MBA programs, the gap showed up most clearly in how people responded to messy, ambiguous business conditions. Engineers tended to treat ambiguity as a problem to debug. The other profile tended to treat it as a problem to escalate.

### The seam still shows up

Even with all of that, the seam between growth and the separate engineering and product teams shows up regularly. When growth needs something built, like a tracking integration, a lifecycle email pipeline, or a landing page change that needs backend work, we end up in the same queue everyone else is in. Product is competing for the same engineering bandwidth, and roadmap reconciliation between growth, product, and engineering happens at planning meetings where each team is fighting for priority.

That friction isn't a sign the structure is broken. It's the realistic ceiling of cross-functional work in any sufficiently large org. The structure I described still does better than the alternative, where engineering, design, and data sit completely separate from marketing. In that world, technology tasks to support marketing are deprioritized as a matter of routine, and marketing has to beg for a sliver of an engineer's time. That's a recipe for failure.

### Why this isn't just "good marketing"

Some would say this view of growth is just good marketing. Possibly. But the majority of marketing teams I've encountered are not structured this way and don't pursue these types of goals. Most marketing teams keep an eye on bottom-of-funnel performance, but ultimately they're built to focus most of their time on influencing the top of the funnel.

The growth team needs to be successful at blending product, engineering, marketing, and data skills into one tight-knit team. It's a lot. That's the point. It's why growth is the result of a team effort, not one heroic individual. It's also why great leaders of growth teams are still in low supply.

My path to learning growth was a happy accident. The mix of design, startup-building, and engineering exposure I picked up before joining a growth team is what lets me see how the pieces fit together now. My learning is very far from over.

---

## Growth vs Product

![Keystone metric: Facebook's clean signal vs real-world cluster](/images/blog/keystone-metric.svg)

Facebook's keystone metric, famously, was seven friends in ten days.

That single sentence drove the prioritization of an entire growth org for years. If a new user added seven friends within ten days of signing up, they were almost certain to stick. Everything the growth team did pointed at that one behavior, in that one window. Onboarding flows, friend suggestions, email prompts, push notifications. All of it aimed at the same target. Most products don't have anything that crisp, and that's usually the problem.

I open with Facebook because it's the cleanest illustration of the line I want to draw. Product was responsible for building a thing where adding seven friends produced real value. Growth was responsible for getting users to that moment fast enough that they'd feel it before they churned. Same company, same users, but two different jobs.

### Why this distinction is harder than the last one

This is the harder distinction to draw, because the work overlaps. Both teams ship product changes, look at user data, and think about retention. Both will argue, at various times, that they own activation. The differences become clear only when you look at what each team is actually accountable for.

The cleanest way I've come to think about it is this: **product is responsible for whether the thing is worth using. Growth is responsible for whether enough of the right people find out, get to value fast, and keep coming back.**

### What product owns

Product builds core value. That's the reason someone would use your thing in the first place. Call it the job to be done, or the aha moment framed as a feature or a flow. Without core value, growth is impossible. You can pour money into the top of the funnel forever and the bottom will keep leaking faster than you can fill it.

### What growth owns

Growth builds the system around that core value. The questions are about access and rhythm: how users find the front door, how fast they reach the aha moment, how often they come back to feel it again, and what the keystone is. The keystone is the one specific behavior, hit within a specific time window, that predicts a user is going to stick.

### Most products have a cluster, not a keystone

Most products don't have anything as clean as Facebook's seven-friends-in-ten-days. The team I work on doesn't. For a real estate buyer, the leading signals look more like a cluster than a single behavior: time spent on the site, the number of inbound contacts a user has made across channels (calls, WhatsApp messages, form fills), and whether the user has come back to the same ad multiple times.

We optimize for that cluster, not for a single behavior. Figuring out which signal in the cluster is actually causal, instead of just correlated with conversions, is the real work. It's harder than what Facebook had. It's also closer to the reality most growth teams operate in.

---

## Four axes that separate growth from product

![Four axes: Product vs Growth comparison](/images/blog/four-axes.svg)

In practice, the line between product and growth runs along four axes.

**Time horizon** is the first. Product decisions tend to be measured in months and quarters: feature launches, platform bets, architectural shifts. Growth decisions are measured in weeks and sometimes days, and look like onboarding tweaks, paid channel tests, lifecycle email iterations.

**The definition of success** is the second. Product asks whether this is the right thing to build. Growth asks whether, given what's built, the team is extracting all the value users are willing to pull through it.

**Default mode** is the third. Product builds. Growth measures, then decides what to build, then builds only the smallest version that tests the hypothesis.

**Scope of curiosity** is the fourth. Product is rightly obsessed with what the next version of the product should be. Growth is obsessed with the gap between the current product and how users actually experience it. The friction in the flows. The dropoffs in the funnel. The second sessions that never happen.

The two functions only work when they sit close together and respect each other's job. A product team that ignores growth signals will build features users don't adopt. A growth team that runs ahead of the product will optimize a flow nobody actually wants to be in, papering over a value problem with a funnel fix.

---

## When growth runs ahead of product: the failure mode

### The pattern I've seen most often

The failure mode I've seen most often is a growth team that's been handed a target ("get us to X signups") without authority over the product itself. They optimize the top of the funnel, signups go up, retention drops six months later, and everyone wonders what happened. The answer is usually that core value wasn't there in the first place, and growth was being asked to compensate for a product problem with marketing tactics.

### A smaller version from my own team

I'll give you a smaller, more recent version of this from my own team. We ran an experiment a while back: one ad budget, one landing page, three products on the same page. The hypothesis was that we could spend less and still capture demand across the portfolio.

The headline number worked. CPL dropped meaningfully. But the win was uneven. One of the three products absorbed most of the conversions. The other two underperformed what dedicated, single-product campaigns would have produced for them.

And we never quite closed the loop with a clean postmortem on whether the savings were actually worth the imbalance. The dashboard told us we won. The fuller picture, the one we never fully assembled, was murkier.

### The discipline isn't running fewer experiments

That's the texture of most growth work. Mixed outcomes, partial reads, decisions made before the full picture is in. The discipline isn't running fewer experiments. It's closing the loop on the ones you ran.

It's also the single biggest reason companies that look like they're growing on the dashboard turn out, a year later, not to have been growing at all.

---

*The test of whether your org has these functions sorted is simple. Ask three people on three different teams to define your North Star metric. If you get three different answers, you don't have a growth team. You have a marketing team, a product team, and a target.*`,
        tags: ['Growth', 'Marketing', 'Product Management'],
        publishedAt: '2026-04-26T12:00:00Z',
    },
    {
        slug: 'good-product-managers-bad-product-managers',
        title: 'Good product managers and bad product managers',
        excerpt: 'Habits I\'ve come to look for, based on conversations with senior PMs and VPs at ASBL and what I\'ve picked up from PM friends who read a lot.',
        heroImage: '/blog-heroes/good-and-bad-product-managers.svg',
        heroAlt: 'Good product managers and bad product managers — Good / Bad',
        content: `I haven't formed these views in a vacuum. Most of what follows comes from conversations with senior PMs and VPs at ASBL, from questions I've kept asking them over time, and from PM friends of mine who read more product books than I do. I'm writing it down here because I find myself coming back to the same distinctions when I think about what separates strong product managers from weaker ones.

---

## The product manager as owner

==The strongest product managers know the market, the product, the product line, and the competition well enough to operate from a solid base of knowledge and confidence.== The easiest way to describe the role is that the product manager is the CEO of the product. They take full responsibility for the product and measure their own success in terms of the product's success. They're responsible for right product, right time, and everything that entails.

![Strong PM vs Weak PM — the habits that separate them](/images/blog/pm-ownership.svg)

Weaker product managers, in my experience, have a lot of excuses. Not enough funding. The engineering manager is difficult to work with. The competitor has ten times the headcount on the same problem. I'm overworked. I don't get enough direction. The senior PMs I've learned from don't make these kinds of excuses, and ==the CEO of a product shouldn't either.==

Ownership also shows up in how a PM handles problems before they surface. Strong PMs anticipate serious product flaws ahead of time and build real solutions for them. Weaker ones spend the day putting out fires. Strong PMs take written positions on important issues early: competitive silver bullets, tough architectural choices, tough product decisions, markets to attack or yield. Weaker PMs voice opinions verbally and then lament that "the powers that be" wouldn't let their idea happen. ==A prediction without an attempt at prevention doesn't add much value.==

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

![Without artifacts you're a bottleneck — with them you scale](/images/blog/pm-artifacts.svg)

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

It's a small habit in isolation, but in my experience ==it tends to correlate with every other habit above.==`,
        tags: ['Product Management', 'Career', 'Leadership'],
        publishedAt: '2026-04-25T12:00:00Z',
    },
    {
        slug: 'how-to-build-great-products',
        title: 'How to build great products',
        excerpt: 'A three-bucket model for categorizing features, and the role of a product mission.',
        heroImage: '/blog-heroes/how-to-build-great-products.svg',
        heroAlt: 'How to build great products — Gamechanger, Showstopper, Distraction',
        content: `![The job is discrimination — which features are gamechangers?](/images/blog/products-hero.svg)

Most startups fail because they don't ship a great product in a growing market before they run out of money. Assuming you've picked a good market, how do you go about building a great product?

Building great products is hard, and it's harder if you don't have a good model for analyzing products and features. Without a model, you're left with an endless stream of feature ideas and half-informed guesses. Some people can pull this off because they start out with strong product intuition. Most of us don't have that on day one.

I started out with terrible intuition, and didn't even know it. Over the past three years I looked at our user metrics every day, which created a feedback loop that slowly trained my judgment on what makes a good product. Eventually I got reasonably good at predicting the impact of any given feature, and I started thinking about a model that captures the essence of what I'd learned.

---

## The three bucket model

==The most important aspect of product management, in my experience, is categorizing features into three buckets: gamechangers, showstoppers, and distractions.== When I first started building products, all features looked roughly the same. Over time, I formed the three bucket model, and now my mind automatically slots every feature into one of these buckets.

![Three buckets: gamechangers, showstoppers, distractions](/images/blog/products-buckets.svg)

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

![iPhone 2007: multi-touch gamechanger vs voice calls showstopper](/images/blog/products-iphone.svg)

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

The best way to get a sense of taste in a given space is to inject yourself into the industry and talk to as many people as you can.

---

## Buyers, stakeholders, and pundits

The sooner you can learn about the history of the space, the state of the technology, the opinions of potential users, and the direction of your competition, the sooner you can form a coherent view.

But be careful. ==A feature is only a gamechanger if the person signing the proverbial check recognizes it as one.== Industry pundits can be extremely useful for understanding the state of your field, but they're rarely the ones to buy your product. If you design your product around their feedback, you'll find there is nobody to buy it in the end.

For complex business sales, pay attention to all the parties. Are certain users strong influencers on the decision-maker? If so, spending time on their requests might be worthwhile. If not, it might be a distraction.

==You can't design a great product unless you live, eat, and breathe like your users do.== You need to know exactly who your user is, what their problems are, how they perceive your product, and who helps them make buying decisions. Your intuition has to mirror how customers will perceive the product. Categorizing features is only useful if it's a good predictor of your actual users' response.

---

## Aggregate gamechangers

![Forgettable alone, gamechanger together](/images/blog/products-aggregate.svg)

Some features aren't sufficiently impressive on their own but become gamechangers in aggregate. A unique icon set, a unique color scheme, and a unique family of phone cases might each be forgettable alone — but together they could form a design direction that's a genuine gamechanger.

Features that become gamechangers in aggregate are dangerous for three reasons: it becomes harder to tell what combination is and isn't a gamechanger; aggregate gamechangers are expensive (instead of a couple of good decisions, you have to make hundreds); and it becomes easier to convince yourself that just one more feature will strike the gamechanger.

If you have no choice but to resort to aggregate gamechangers, it probably means you're working in a relatively mature market. That should prompt some soul-searching — is it worth being in this market, or does it make more sense to find one where you can innovate more easily?

---

## Product mission

![The mission orients every feature decision](/images/blog/products-mission.svg)

Suppose you've developed product intuition to apply the three bucket model. You can correctly categorize features. You're ahead of most product managers. But you're still not quite done:

- If you categorize features ad-hoc, it's easy to make mistakes and then construct a rationale to convince yourself you were right.
- While you're building the product, you'll have to be part of every single decision, because other people have no guidance.
- Your engineers will get frustrated — they'll feel you're pulling decisions out of thin air.
- You'll have to convince journalists, investors, hires, and customers. Convincing people is hard if you're making decisions ad-hoc.

A good way to get around these problems is to write down a product mission. Think of it as a function that accepts a given feature as an argument and returns one of the three categories. A good mission is concise, understandable, and repeatable.

Here is a product mission that worked surprisingly well for RethinkDB:

> **Database tools should be indistinguishable from magic**

> Surprise and amaze people with developer tools for building real-time, data-driven web applications they could only dream of building, and bring sheer joy and simplicity to the process of building great software.

On the surface these two sentences don't say very much. But this mission has surprisingly high information density. It tells people they're building a database. It tells them the product is a developer tool first, which resolves the tension between developer and operations features. It explains what users should do with RethinkDB. It gives a sense of how far they'll go on certain features. ==It took three years to understand the product well enough to write this mission. If they'd had it on day one, it would probably have cut development time in half.==

When you're building a product, ==the mission should be one of the first things you work on.== If your mental model is good enough to write a product mission that resonates with everyone in your company, a lot of other decisions get easier.`,
        tags: ['Product Management', 'Strategy', 'Product Thinking'],
        publishedAt: '2026-04-24T12:00:00Z',
    },
    {
        slug: 'prd-structure-i-actually-use',
        title: '10 PRD tips I keep coming back to',
        excerpt: 'PRDs only work if your team actually reads them. Ten things I\'ve learned about writing ones that land.',
        heroImage: '/blog-heroes/prd-tips-i-keep-coming-back-to.svg',
        heroAlt: '10 PRD tips I keep coming back to',
        content: `![PRD sits at the intersection of Product, Engineering, and Design](/images/blog/prd-hero.svg)

A PRD is a requirements document that specifies scope, reason and desired output. Nothing more, nothing less.

One word about agile: in a Scrum context, documentation is usually kept to a minimum and PRDs do not exist as such — but they're not disconnected either. I see a PRD as combining an Epic (which communicates the big picture) with the Epic's user stories.

---

## 1. Start with a story

Introduce the PRD with a story that explains the situation, problems and goals in a narrative form. This helps the reader empathize with the user and provides an initial intuition about why the feature outlined in the PRD is important.

## 2. Introduce the big picture: What, Why, Who, How

![What, Why, Who, How — the four quadrants of a PRD intro](/images/blog/prd-quadrant.svg)

- **What is it?** Summary of the most important functional and non-functional aspects and requirements.
- **Why do it?** Provide insights based on data as to why this PRD is necessary and urgent. If possible, provide both quantitative and qualitative angles. Include business and commercial needs. Include technical considerations that motivate this PRD.
- **Who is it for?** Outline what's the target user (or customer) group for the PRD. Briefly explain why those users and not others.
- **How is it done?** List system design and interface dependencies here. The goal is to educate the reader about the technical ecosystem — not to describe how the UX team should do their job, or how exactly development should implement it.

## 3. Don't forget the market

Include your analysis of how key competitors are solving similar problems and weigh in on why their solution is good or not. Competitor analysis should be a calibration, not a justification.

## 4. Split the PRD into digestible pieces

Depending on what software development methodology you are using, chances are high that you'll need to create user stories or similar artifacts later on. Make sure to make it easy to split the overall product requirements into individual pieces.

## 5. Follow a consistent structure for each requirement

![Requirement structure: from intro through acceptance criteria](/images/blog/prd-structure.svg)

At this point the explanations should be very focused and specific, not as general as in the introduction. This general structure works well:

- Requirement Intro
- Motivation & Problem Description
- Functional Requirements
- Non-functional Requirements
- Interaction Processes
- Interface, integration and technical considerations and constraints
- Acceptance Criteria

## 6. Don't tell UX, UI, Dev and Testing teams how to do their job

![Stay in your lane — PM owns the what and why](/images/blog/prd-lanes.svg)

Your focus should be on explaining the goals from user, customer and business perspective and the resulting requirements. Don't bias into a direction just because you personally favor it. The "How is it done?" part in the intro is only to give the reader an idea of the technical ecosystem this PRD lives in.

## 7. Make sure acceptance criteria are water-tight

In the best case, acceptance criteria should directly be used to construct test cases. They should cover both functional and non-functional aspects. Each criterion should be specific and easy to validate.

## 8. Don't slack on non-functional requirements

![Non-functional requirements: performance, security, scalability — and usability](/images/blog/prd-nonfunctional.svg)

Typical non-functional requirements are performance, security and scalability. But usability is also a non-functional requirement. Make sure to line out how you want users to feel when using the product.

## 9. Draw a fence

![The scope fence: in scope vs out of scope with reasons](/images/blog/prd-fence.svg)

As important as lining out what's included is describing what's out of scope. Argue why you leave certain features out of scope. Otherwise you open yourself up to discussions about why a certain feature is not included or why you included requirements from business unit A but not business unit B.

## 10. Don't set deadlines

I realize that this might be controversial. But a PRD should be focused on the product and not the delivery timeline. That doesn't mean that development team utilization or customer expectations don't influence the PRD. It's just that the PRD shouldn't dictate the "when".`,
        tags: ['Product Management', 'PRD', 'Documentation'],
        publishedAt: '2026-04-23T12:00:00Z',
    },
    {
        slug: 'prioritization-system-i-actually-use',
        title: 'How to prioritize a product backlog',
        excerpt: 'Methods I use for mature products, methods I use for new ones, and how to handle HiPPOs.',
        heroImage: '/blog-heroes/how-to-prioritize-a-product-backlog.svg',
        heroAlt: 'How to prioritize a product backlog — and what to cut',
        content: `![Prioritizing a product backlog — pulling the high-value items up](/images/blog/backlog-hero.svg)

Prioritizing product backlogs is a key responsibility of product managers. ==It's essential that the most important backlog items are done first, so customers, users and the business have the highest benefit.== There are a number of methods for how to prioritize a product backlog, which fit different situations.

I try to be as methodology agnostic as possible. Regardless of where on the Agile to Waterfall spectrum a product is being developed, maintaining a product backlog and prioritizing its items is essential. I structure this into two sections: prioritizing for mature products and prioritizing for new products.

---

## Prioritize for mature products

When prioritizing for mature products, I assume all features essential for the business are already delivered, there's a clear picture of business goals, and the development team is established. For this context, I prioritize by three scores.

### Backlog item scoring

The method: assign a score of 1 to 5 to each of **Importance to Business**, **Frequency of Use**, and **Ease of Development**. Add those numbers up. ==The backlog item with the highest overall score should be done first.==

![Backlog item scoring: three axes, two example cards](/images/blog/backlog-scoring.svg)

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

To get a reasonable estimate, I involve the development team. I do it like this:

- Provide precise scope for backlog items likely to enter development within the next 2 months.
- Ask development for a high-level, preliminary analysis for everything after that. When in doubt, take the lower score.

In practice, I use Importance to Business × Frequency of Use to identify the top items, scope those properly, then iterate.

### What about HiPPOs?

HiPPO stands for "highest paid person's opinion" — situations where prioritization is driven top-down by senior management rather than by data.

![HiPPO: Highest Paid Person's Opinion — sitting on your backlog](/images/blog/backlog-hippo.svg)

The downsides are real: it takes ownership away from the product team, it may harm the business by valuing opinion over data, and it discourages creativity. When I run into a HiPPO situation, I try:

1. **Understand the context.** There might be factors I'm not aware of. If so, I try to propose alternatives that fit better into the overall backlog.
2. **Argue using the scoring.** Put the HiPPO feature and the item it displaces through the same scoring. Show the totals side by side. Numbers vs. opinion is an easier fight than opinion vs. opinion.
3. **Quantify the fallout.** Make the cost of the trade-off visible: delayed items, impacted metrics, timeline shifts.

If none of that works: ==boil the requirement down to its absolute minimum, then extend from that minimum into something important, so the original HiPPO item is only a small part of a larger, more valuable backlog item.==

---

## Prioritizing for new products

I do not advise using the Importance to Business / Frequency of Use / Ease of Development method for new or immature products — importance and frequency might be very high for all backlog items at that stage. Here are more suitable approaches.

### The Walking Skeleton

![Walking skeleton: spine is the user journey, ribs are features](/images/blog/backlog-skeleton.svg)

The "walking skeleton" method views the product as a skeleton to which only the most essential parts are attached, so it can "walk." The backbone is the user journey. Everything else attaches to the relevant part of that journey. The result is a hierarchical story map — not linear — that communicates clearly which features are essential for each stage of the user journey.

==I like this approach because it puts the user into the center.== The risk is that if the user journey isn't constantly visible, it becomes a document living dead in someone's Dropbox rather than a living artifact.

### MoSCoW

"Must, Should, Could, Won't" — intuitive and simple regardless of background. The separation between Must and Should is hugely important early on: it forces the team to explore and agree on what the minimum viable product actually is.

The risk is ending up with mostly "Musts." If that happens, re-iterate through the user journey. If Musts still dominate, try a method with finer prioritization granularity, like the Walking Skeleton or Weighted Shortest Job First.

### Prioritization Matrix

![Prioritization matrix: customer value vs development cost](/images/blog/backlog-matrix.svg)

A quick, intuitive method: for each backlog item, assign Development Cost and Risk (Low or High) and Customer Value (Low or High).

- High value, low cost → top of the list.
- Low value, high cost → remove.
- High value, high cost → higher priority than low value, low cost. If you're spending the time, spend it on what matters.

### Prioritization Poker

Useful for initial workshops, especially with stakeholders who won't be part of the day-to-day product team. Participants stand around the backlog. For each item, they silently vote 1–5, then reveal simultaneously. This accomplishes two things: it establishes consensus on the obvious winners and duds, and it generates focused discussion for items with a wide score range.

Not suitable if there is already an existing backlog, or if key stakeholders don't participate.

![Prioritization poker: reveal cards simultaneously, discuss the spread](/images/blog/backlog-poker.svg)

---

## Conclusion

When deciding what kind of prioritization approach to use, the maturity of the product, the project stage, and the discussion context all need to be factored in. After that's clear, ==the method to choose needs to be a healthy mix of using hard metrics and being able to communicate the result in an intuitive, easy-to-understand way.==

==No prioritization, regardless of method, should be assumed to be 100% correct and immutable.== Rather, the method should structure discussion and decision-making, and encourage constructive, directed criticism.`,
        tags: ['Product Management', 'Prioritization', 'Growth'],
        publishedAt: '2026-04-22T12:00:00Z',
    },
    {
        slug: 'things-i-believe',
        title: 'Things I Believe',
        excerpt: 'A running list of beliefs I keep coming back to — on work, leadership, curiosity, and treating people right.',
        heroImage: '/blog-heroes/things-i-believe.svg',
        heroAlt: 'Things I Believe — a personal credo',
        content: `## Learn

Learn from others.
Be humble.
Be curious.
Ask more questions.
Create the best problem-solving team.
Hardwork & discipline > talent.
Problem solving > titles.

---

## Ambition

Be world's India 1% from earning point of view.
Take ownership of your mistakes.
Do more experiments, and learn from them.

---

## Communication

Don't you ever have "ego" — it stops your thinking.
Communication is the job.
Clear writing is clear thinking.
Be that leader which everyone aspires to be.
Be the person taking notes, even if it's just for yourself.
Wrong expectations lead to sadness.
Team tip: anticipate objections before hitting send, then address them.

---

## Empathy

Always try to assume good intent.
Lead with empathy.
They might just be having a bad day.
Criticism is good feedback if you listen unemotionally.

---

## Leadership

Being helpful compounds.
Leadership means owning outcomes beyond the org chart.
Leaders have to do the work themselves and delegate.
You can write your own playbook.
Study what worked for others, then take your own path.

---

## Work

Work can also be your hobby.
This doesn't mean you can't have other hobbies.
Passion + boundaries > mythical "work-life balance."
Your best work comes from following your curiosity.
You could have built a prototype in v0 during the meeting.
Only ship things you're excited about yourself.

---

## People

Always treat your friends with respect and love.
Treat everyone respectfully — everyone comes with their issues.
Hire people you can learn from.
Hire people you would someday be happy working for.
Favorite interview question: "One book you read which you think can bring change in your life."`,
        tags: ['Career', 'Leadership', 'Product Management'],
        publishedAt: '2026-04-21T12:00:00Z',
    },
    {
        slug: 'stakeholder-review-format',
        title: 'How to run a stakeholder review that actually replaces your status meetings',
        excerpt: 'If your stakeholders are pulling you into 1:1s asking what your team is working on, your stakeholder review is broken. This is the format I use to fix that.',
        heroImage: '/blog-heroes/stakeholder-review-format.svg',
        heroAlt: 'Stakeholder reviews that work — meetings that earn their time',
        content: `![The three areas of a stakeholder review: health, discovery, delivery](/images/blog/review-three-areas.svg)

If your stakeholders are pulling you into 1:1s asking what your team is working on, your stakeholder review is broken, or you don't have one. This post is the format I use to fix that.

A stakeholder review is a single recurring meeting where you make three things visible to anyone in the org who cares: how the product is performing, what your team is discovering, and what your team is delivering. It replaces a dozen Slack pings and hallway questions per cycle. In Scrum it's called a Sprint Demo or Showcase, but the format works whether or not you run Scrum.

Stakeholders aren't on your team, so they don't know which stories you picked, why you picked them, or where they fit in the bigger picture. The review's job is to connect what you built back to the outcomes they care about.

The first stakeholder review I ran, our CTO asked me to set it up and I came in over-prepared. I spent a chunk of the meeting explaining that we'd missed most of our delivery deadlines and that's why the outcome was delayed. What I learned watching the room: business stakeholders weren't there to grade engineering. They wanted alignment. They wanted to know how we were going to improve activation. The meeting taught me what they actually cared about, which was the opposite of what I'd prepared.

---

## Who to invite

Anyone interested. Public meeting.

Make sure your whole team is in the room. Watching stakeholders react to their work, positively or critically, reminds your team that what they ship matters to people outside the squad.

---

## What this meeting is, and what it isn't

Use the review to show the results of your work. That's what stakeholders care about and where the meeting earns its time.

However, don't let the review become a forum for stakeholders to critique your team's planning, velocity, or working style. That's your team's job to manage internally. If a stakeholder pushes there, redirect: "Happy to talk about how we plan in a separate session. Today is about what we shipped and learned."

---

## Three things to review, in order

The review covers three areas. Spend roughly equal time on each.

### 1. Product health: the 2-3 KPIs you actually watch

If your team owns an existing product or surface, open with the metrics.

State the 2-3 KPIs you're tracking and their current values. Then connect each one to something the business cares about: revenue, retention, cost. Stakeholders don't need your full dashboard. They need to know which numbers you're betting on and why.

For each metric, be ready to answer four questions:

- What's the current value?
- How does it compare to last cycle, last month, last year?
- How does it compare to what you expected?
- What should we celebrate, and what should we be watching?

### 2. Discovery: what you learned about the problem

Discovery work is research and data. It's how you build conviction that the thing you're about to ship will actually move the metric you care about. Skipping this step costs your engineers months of effort on features that don't change anything.

For each opportunity you've explored, walk through three things:

- Who it's for, why we're building it, and what success looks like. Connect it back to your value proposition.
- How your hypothesis changed. What were you wrong about? What surprised you? What got stronger? What tests led you to believe you were right?
- The artefacts of the work. Proto-personas, story maps, UI sketches, prototypes, experiments. If you ran a limited rollout, share the data.

This section is where your team owns the quality of its planning and thinking. Show your reasoning.

### 3. Delivery: what you shipped, at the solution level

Now review the work you completed at the solution level, meaning the user-facing capability you're releasing, not the individual stories underneath. (If you use story jargon, this is roughly the epic.)

For each solution, cover:

- Who it's for and what outcome it targets. Remind everyone why you're building this.
- What the result actually looks like. Walk through the stories holistically. If something looks incomplete, explain why. Stakeholders often expect a finished portrait when you're showing them a sketch of the full canvas.
- What's left. How close is this to releasable? What did you learn during build that affects delivery?

If stakeholders gave feedback during discovery, this is the moment they say "yep, still looks good." If they didn't see it during discovery, expect more friction now, which is exactly why discovery reviews matter.

Be ready to write new stories on the spot for genuine gaps. Also be ready to push back. People unfamiliar with the work sometimes suggest things that sound good but don't serve the outcome you're targeting. Push back: "Good idea, but it doesn't serve the outcome we're targeting this cycle. Let's park it."

One thing to deliberately leave out: your team's velocity and whether you hit your sprint commitments. That belongs in your team's internal review, not here. Stakeholders don't need to grade your delivery process.

---

![Two figures aligned toward the same focal point — stakeholder alignment](/images/blog/review-alignment.svg)

## The principle behind all of this

Stakeholders form opinions about your roadmap whether you give them information or not. The only question is whether those opinions are shaped by your review or by the loudest voice in the last all-hands. If your stakeholders can't tell what changed since last cycle, the review failed, regardless of how the meeting felt in the room.`,
        tags: ['Product Management', 'Leadership'],
        publishedAt: '2026-05-05T12:00:00Z',
    }
]
