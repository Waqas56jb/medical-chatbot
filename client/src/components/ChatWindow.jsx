import { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import '../styles/chat.css'

export default function ChatWindow({ messages, isLoading, onSend, onClear }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="chat-window">
      <ChatHeader onClear={onClear} />

      <div className="chat-window__messages" role="log" aria-live="polite">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="chat-message chat-message--bot">
            <div className="chat-message__avatar" aria-hidden="true">
              AI
            </div>
            <div className="chat-message__bubble chat-message__bubble--typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-window__footer">
        <p className="chat-disclaimer">
          Not a substitute for professional medical advice. In an emergency, call your local emergency number.
        </p>
        <ChatInput onSend={onSend} disabled={isLoading} />
      </div>
    </div>
  )
}
