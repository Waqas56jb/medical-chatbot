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

const FIELDS = ['name', 'email', 'phone', 'disease']

function getConversationStage(collected) {
  if (!collected.name) return 'needs_name'
  if (!collected.email) return 'needs_email'
  if (!collected.phone) return 'needs_phone'
  if (!collected.disease) return 'needs_concern'
  return 'ready_to_confirm'
}

function buildContext(collected, isSessionStart) {
  const parts = []

  if (isSessionStart) {
    parts.push(
      'The patient just opened the chat (session start). Send your Phase 1 welcome message. Do NOT ask for their name yet.'
    )
    return parts.join('\n')
  }

  const filled = FIELDS.filter((f) => collected[f])
  if (filled.length > 0) {
    parts.push(`Information already collected: ${JSON.stringify(collected)}`)
    parts.push(`Current stage: ${getConversationStage(collected)}`)
    parts.push('Acknowledge their last message before asking for the next missing field.')
  } else {
    parts.push('No patient details collected yet. Focus on understanding what they need before collecting personal info.')
  }

  return parts.join('\n')
}

function mergeCollected(parsed, existing) {
  const merged = { ...existing }
  for (const field of FIELDS) {
    const value = parsed.collected?.[field]
    if (value && typeof value === 'string' && value.trim()) {
      merged[field] = value.trim()
    }
  }
  return merged
}

export async function getChatResponse(message, history = [], existingCollected = {}) {
  const isSessionStart = message === '[session_start]'
  const userContent = isSessionStart
    ? '[session_start]'
    : message

  const contextNote = buildContext(existingCollected, isSessionStart)

  const messages = [
    { role: 'system', content: `${systemPrompt}\n\n---\n\n## Current session\n${contextNote}` },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userContent },
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

  const collected = mergeCollected(parsed, existingCollected)

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
