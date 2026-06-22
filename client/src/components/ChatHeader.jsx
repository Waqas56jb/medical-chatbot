export default function ChatHeader({ onClear }) {
  return (
    <header className="chat-header">
      <div className="chat-header__brand">
        <span className="chat-header__icon" aria-hidden="true">
          +
        </span>
        <div>
          <h1 className="chat-header__title">Medical Chatbot</h1>
          <p className="chat-header__subtitle">General health information assistant</p>
        </div>
      </div>
      <button type="button" className="chat-header__clear" onClick={onClear}>
        New chat
      </button>
    </header>
  )
}
