export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`chat-message ${isUser ? 'chat-message--user' : 'chat-message--bot'}`}>
      <div className="chat-message__avatar" aria-hidden="true">
        {isUser ? 'You' : 'AI'}
      </div>
      <div className="chat-message__bubble">
        <p>{message.content}</p>
      </div>
    </div>
  )
}
