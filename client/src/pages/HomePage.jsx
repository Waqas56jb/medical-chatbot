import ChatWindow from '../components/ChatWindow'
import { useChat } from '../hooks/useChat'

export default function HomePage() {
  const { messages, isLoading, sendMessage, clearChat } = useChat()

  return (
    <main className="home-page">
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        onSend={sendMessage}
        onClear={clearChat}
      />
    </main>
  )
}
