import { useCallback, useState } from 'react'
import { sendChatMessage } from '../services/api'

export const QUICK_REPLIES = [
  { id: 'appointment', emoji: '📅', label: 'Book an appointment' },
  { id: 'availability', emoji: '🔍', label: 'Check doctor availability' },
  { id: 'hours', emoji: '🏥', label: 'Clinic hours & location' },
]

export function useChat() {
  const [hasStarted, setHasStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [collected, setCollected] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const startConversation = useCallback(async () => {
    setHasStarted(true)
    setMessages([])
    setCollected({})
    setIsLoading(true)

    try {
      const data = await sendChatMessage({
        message: '[session_start]',
        history: [],
        collected: {},
      })

      setCollected(data.collected || {})

      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          quickReplies: data.quickReplies || QUICK_REPLIES,
          timestamp: new Date().toISOString(),
        },
      ])
    } catch {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'Welcome to MDC Medical Care! I\'m Aria, your virtual care coordinator. I can help you book an appointment, check doctor availability, or answer questions about our clinic. How can I help you today?',
          quickReplies: QUICK_REPLIES,
          timestamp: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sendMessage = useCallback(
    async (content) => {
      const trimmed = content.trim()
      if (!trimmed) return

      const userMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) =>
        prev.map((m) => (m.quickReplies ? { ...m, quickReplies: undefined } : m))
      )
      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        const history = messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map((m) => ({ role: m.role, content: m.content }))

        const data = await sendChatMessage({
          message: trimmed,
          history,
          collected,
        })

        setCollected(data.collected || {})

        const botMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          quickReplies: data.quickReplies,
          timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, botMessage])
      } catch {
        const errorMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'I\'m sorry — I\'m having a little trouble connecting right now. Please make sure the server is running and try again in a moment.',
          quickReplies: QUICK_REPLIES,
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, collected]
  )

  const resetChat = useCallback(() => {
    setHasStarted(false)
    setMessages([])
    setCollected({})
    setIsLoading(false)
  }, [])

  return {
    hasStarted,
    messages,
    isLoading,
    collected,
    startConversation,
    sendMessage,
    resetChat,
  }
}
