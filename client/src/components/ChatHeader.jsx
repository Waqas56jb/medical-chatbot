import BotLogo from './BotLogo'

export default function ChatHeader({ onClose }) {
  return (
    <header className="chat-header">
      <div className="chat-header__brand">
        <div className="chat-header__avatar-wrap">
          <BotLogo size="sm" />
          <span className="chat-header__online" aria-label="Online" />
        </div>
        <div className="chat-header__text">
          <h1 className="chat-header__title">MDC Medical Care</h1>
          <p className="chat-header__subtitle">ASSISTANT • ONLINE</p>
        </div>
      </div>
      <div className="chat-header__actions">
        <span className="chat-header__private">PRIVATE</span>
        <button
          type="button"
          className="chat-header__close"
          onClick={onClose}
          aria-label="Close chat"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
