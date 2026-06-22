import { useCallback, useState } from 'react'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hello! I\'m your medical assistant. Ask me general health questions and I\'ll do my best to help. For emergencies, please contact local emergency services immediately.',
  timestamp: new Date().toISOString(),
}

export function useChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (content) => {
    const trimmed = content.trim()
    if (!trimmed) return

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Frontend-only placeholder — replace with api.sendChatMessage() when backend is ready
    await new Promise((resolve) => setTimeout(resolve, 600))

    const botMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        'This is a frontend-only setup. Connect the backend API in `src/services/api.js` to get real responses.',
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, botMessage])
    setIsLoading(false)
  }, [])

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE])
  }, [])

  return { messages, isLoading, sendMessage, clearChat }
}
