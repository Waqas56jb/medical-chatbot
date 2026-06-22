import { Router } from 'express'
import { getChatResponse } from '../services/openai.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { message, history = [], collected = {} } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' })
    }

    const result = await getChatResponse(message.trim(), history, collected)

    res.json({
      reply: result.reply,
      collected: result.collected,
      isComplete: result.isComplete,
      quickReplies: result.quickReplies,
    })
  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ error: 'Failed to get AI response' })
  }
})

export default router
