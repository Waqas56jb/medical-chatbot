import { useCallback, useState } from 'react'
import { sendChatMessage } from '../services/api'

export const QUICK_REPLIES = [
  { id: 'appointment', emoji: '📅', label: 'Book Doctor Appointment' },
  { id: 'availability', emoji: '🔍', label: 'Check Doctor Availability' },
  { id: 'symptoms', emoji: '🩺', label: 'Symptom Check & Triage' },
  { id: 'faq', emoji: '💊', label: 'Patient FAQ & Insurance' },
]

const INITIAL_MESSAGE = {
  id: 'intro',
  role: 'assistant',
  content:
    'Hey! 👋 Welcome to MDC Medical Care — your personal health assistant is here! How can I help you today? 🏥',
  quickReplies: QUICK_REPLIES,
  timestamp: new Date().toISOString(),
}

export function useChat() {
  const [hasStarted, setHasStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [collected, setCollected] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const startConversation = useCallback(() => {
    setHasStarted(true)
    setMessages([INITIAL_MESSAGE])
    setCollected({})
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
            'Sorry, I\'m having trouble connecting right now. Please make sure the server is running and try again.',
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
