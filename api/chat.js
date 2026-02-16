import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { projects } from '../src/data/projects.js'
import { experiences } from '../src/data/experience.js'
import { about } from '../src/data/profile.js'

// Configure OpenAI
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// Vercel Edge Runtime (optional, but faster)
// Vercel Serverless Function (Node.js)
// Removing edge runtime to support local file imports and standard modules

function generateSystemPrompt() {
    const skillNames = about.skills.map((skill) => skill.name).join(', ')
    const socialLinksText = about.socials
        .map((link) => `${link.name}: ${link.url}`)
        .join('\n- ')

    const experienceText = experiences
        .map(
            (exp) =>
                `${exp.role} at ${exp.company} (${exp.period}) - ${exp.achievements.join('. ')}`
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
        const { messages } = await req.json()

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages
            ],
            temperature: 0.7
        })

        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)

    } catch (error) {
        console.error('Chat API Error:', error)
        return new Response(JSON.stringify({ error: 'Error processing chat request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
