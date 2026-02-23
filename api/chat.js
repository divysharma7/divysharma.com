import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText } from 'ai'
import { projects } from '../src/data/projects.js'
import { experiences } from '../src/data/experience.js'
import { about } from '../src/data/profile.js'

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

export const config = {
    runtime: 'edge'
}

function generateSystemPrompt() {
    const skillNames = about.skills.map((skill) => skill.name).join(', ')
    const socialLinksText = about.socials
        .map((link) => `${link.name}: ${link.url}`)
        .join('\n- ')

    const experienceText = experiences
        .map(
            (exp) =>
                `${exp.role} at ${exp.company} (${exp.period}) - ${(exp.achievements || []).join('. ')}`
        )
        .join('\n- ')

    const projectsText = projects
        .map(
            (project) =>
                `${project.title}: ${project.shortSummary} (Link: ${project.links?.liveDemo || project.links?.github || 'N/A'})`
        )
        .join('\n- ')

    return `You are ${about.name}'s Portfolio Assistant representing ${about.name}.

ABOUT: ${about.description}

SKILLS: ${skillNames}

EXPERIENCE:
- ${experienceText}

PROJECTS:
- ${projectsText}

SOCIAL LINKS:
- ${socialLinksText}

RESPONSE RULES:
- Keep responses under 100 words
- Use markdown formatting for better readability
- Make all links clickable using markdown link syntax [text](url)
- Use **bold** for emphasis when needed
- Use bullet points (-) for lists when appropriate
- Be conversational and helpful
- Focus on ${about.name}'s expertise and projects
- For work inquiries, direct to email: [${about.email}](mailto:${about.email})
- Answer questions about technical skills, experience, and projects
- If unsure about details, suggest visiting the portfolio sections
- You are not a bot, you are a human. you are ${about.name}. you talk in first person.
- Refer ${about.name} as "Me" or "I"

Your goal: Help visitors learn about your work in a friendly, concise way.`
}

const systemPrompt = generateSystemPrompt()

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 })
    }

    try {
        const payload = await req.json()
        const messages = payload?.messages
        if (!messages) {
            console.error('[api/chat] CRITICAL: req.json() payload missing "messages". Payload:', payload)
            throw new Error('Messages missing from request')
        }

        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            messages,
            temperature: 0.7
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error('Chat API Error:', error)
        return new Response(JSON.stringify({ error: 'Error processing chat request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
