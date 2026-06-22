import { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import WelcomeScreen from './WelcomeScreen'
import BotLogo from './BotLogo'
import '../styles/chat.css'

export default function ChatWindow({
  hasStarted,
  messages,
  isLoading,
  onStart,
  onSend,
  onClose,
}) {
  const bottomRef = useRef(null)

  useEffect(() => {
    if (hasStarted) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading, hasStarted])

  return (
    <div className="chat-widget">
      <ChatHeader onClose={onClose} />

      {!hasStarted ? (
        <WelcomeScreen onStart={onStart} />
      ) : (
        <>
          <div className="chat-window__messages" role="log" aria-live="polite">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onQuickReply={onSend}
                isLoading={isLoading}
              />
            ))}
            {isLoading && (
              <div className="chat-message chat-message--bot">
                <BotLogo size="xs" />
                <div className="chat-message__bubble chat-message__bubble--bot chat-message__bubble--typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-window__footer">
            <ChatInput onSend={onSend} disabled={isLoading} />
            <p className="chat-footer-brand">
              Powered by MDC Medical Care · AI Health Assistant available 24/7
            </p>
          </div>
        </>
      )}
    </div>
  )
}
