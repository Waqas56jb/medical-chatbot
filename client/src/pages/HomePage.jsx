import ChatWindow from '../components/ChatWindow'
import { useChat } from '../hooks/useChat'

export default function HomePage() {
  const { hasStarted, messages, isLoading, startConversation, sendMessage, resetChat } =
    useChat()

  return (
    <main className="home-page">
      <ChatWindow
        hasStarted={hasStarted}
        messages={messages}
        isLoading={isLoading}
        onStart={startConversation}
        onSend={sendMessage}
        onClose={resetChat}
      />
    </main>
  )
}
