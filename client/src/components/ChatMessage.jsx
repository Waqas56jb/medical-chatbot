import BotLogo from './BotLogo'
import QuickReplies from './QuickReplies'

export default function ChatMessage({ message, onQuickReply, isLoading }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="chat-message chat-message--user">
        <div className="chat-message__bubble chat-message__bubble--user">
          <p>{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-message chat-message--bot">
      <BotLogo size="xs" />
      <div className="chat-message__content">
        <div className="chat-message__bubble chat-message__bubble--bot">
          <p>{message.content}</p>
        </div>
        <QuickReplies
          options={message.quickReplies}
          onSelect={onQuickReply}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
