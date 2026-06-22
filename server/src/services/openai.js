import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import OpenAI from 'openai'
import { config } from '../config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const systemPrompt = fs.readFileSync(
  path.join(__dirname, '../prompts/system.md'),
  'utf-8'
)

const openai = new OpenAI({ apiKey: config.openai.apiKey })

export async function getChatResponse(message, history = [], existingCollected = {}) {
  const contextNote =
    Object.values(existingCollected).some(Boolean)
      ? `\n\nAlready collected so far: ${JSON.stringify(existingCollected)}`
      : ''

  const messages = [
    { role: 'system', content: systemPrompt + contextNote },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ]

  const completion = await openai.chat.completions.create({
    model: config.openai.model,
    temperature: config.openai.temperature,
    max_tokens: config.openai.maxTokens,
    response_format: { type: 'json_object' },
    messages,
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) throw new Error('Empty response from OpenAI')

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('Invalid JSON from OpenAI')
  }

  const collected = {
    name: parsed.collected?.name || existingCollected.name || null,
    email: parsed.collected?.email || existingCollected.email || null,
    phone: parsed.collected?.phone || existingCollected.phone || null,
    disease: parsed.collected?.disease || existingCollected.disease || null,
  }

  return {
    reply: parsed.message,
    collected,
    isComplete: Boolean(parsed.isComplete),
    quickReplies: formatQuickReplies(parsed.quickReplies),
  }
}

function formatQuickReplies(labels) {
  if (!Array.isArray(labels) || labels.length === 0) return undefined

  const emojis = ['📅', '🔍', '🩺', '💊', '✅', '📞', '🏥']

  return labels.slice(0, 4).map((label, i) => ({
    id: `qr-${i}`,
    emoji: emojis[i % emojis.length],
    label,
  }))
}
