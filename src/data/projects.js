export const projects = [
    {
        slug: 'growth-experiment-platform',
        title: 'Growth Experimentation Platform',
        shortSummary: 'Built an internal platform to run and analyze A/B tests at scale.',
        role: 'Product Engineer',
        context: 'At a high-growth B2B SaaS company, we needed a way to rapidly iterate on pricing and onboarding flows.',
        problem: 'Experiments were taking 2 weeks to set up and required engineering deploys, slowing down our learning loop.',
        constraints: 'Limited engineering resources, strict data privacy requirements.',
        approach: [
            'Conducted user interviews with PMs and marketers to understand pain points.',
            'Designed a config-driven architecture to allow non-technical users to launch tests.',
            'Built the frontend using Vue 3 and a serverless backend for feature flagging.'
        ],
        outcome: 'Reduced experiment setup time from 2 weeks to 2 hours. Ran 15 experiments in Q3, resulting in a 12% lift in activation.',
        whatNext: 'I would add automated statistical significance calculation and integration with Slack for result notifications.',
        tags: ['Growth', 'Internal Tools', 'Vue 3', 'Full Stack'],
        relatedBlogSlugs: ['building-experimentation-culture'],
        relatedBookIds: ['trustworthy-online-controlled-experiments'],
        links: {
            github: 'https://github.com/divysharma/experiment-platform',
            liveDemo: 'https://demo.experiment-platform.com'
        }
    },
    {
        slug: 'mobile-onboarding-redesign',
        title: 'Mobile Onboarding Redesign',
        shortSummary: 'Redesigned the mobile onboarding flow to improve retention.',
        role: 'Product Manager',
        context: 'The mobile app had a 60% drop-off rate during the first session.',
        problem: 'Users were overwhelmed by the number of steps and permissions requests upfront.',
        constraints: 'Legacy codebase, tight deadline before marketing push.',
        approach: [
            'Analyzed funnel data to identify drop-off points.',
            'Implemented "gradual engagement" - asking for permissions only when needed.',
            'Simplified the UI to focus on one action per screen.'
        ],
        outcome: 'Increased Day 1 retention by 15% and completion rate by 20%.',
        whatNext: 'Personalize the onboarding path based on user intent (collected via a welcome survey).',
        tags: ['Mobile', 'UX', 'Retention', 'Growth'],
        relatedBlogSlugs: ['psychology-of-onboarding'],
        relatedBookIds: ['hooked'],
        links: {
            liveDemo: 'https://app.example.com'
        }
    },
    {
        slug: 'portfolio-v5',
        title: 'Portfolio v5',
        shortSummary: 'My personal portfolio website (this site!).',
        role: 'Designer & Developer',
        context: 'I needed a place to showcase my work that reflected my growth as a PM.',
        problem: 'My old site was static and hard to update. It didn\'t tell a story.',
        constraints: 'Self-imposed: Must score 100 on Lighthouse, no analytics trackers.',
        approach: [
            'Defined clear user personas (recruiters, peers).',
            'Chose a modern stack (Vue 3, Vite) for performance.',
            'Implemented a content-first architecture.'
        ],
        outcome: 'Launched with a perfect lighthouse score. Received 3 interview offers in the first week.',
        whatNext: 'Add a "Guestbook" feature and more interactive visualizations of my reading habits.',
        tags: ['Frontend', 'Design', 'SEO', 'Performance'],
        relatedBlogSlugs: [],
        relatedBookIds: [],
        links: {
            github: 'https://github.com/divysharma/divysharma.com'
        }
    }
]
