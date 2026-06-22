import BotLogo from './BotLogo'

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-screen__hero">
        <BotLogo size="lg" />
        <h2 className="welcome-screen__title">Welcome to MDC Medical Care</h2>
        <p className="welcome-screen__desc">
          I&apos;m your personal health assistant. Together, we&apos;ll book appointments,
          check doctor availability, and answer your medical questions.
        </p>
      </div>

      <button type="button" className="welcome-screen__cta" onClick={onStart}>
        <span className="welcome-screen__cta-icon" aria-hidden="true">
          ✦
        </span>
        START CONVERSATION
      </button>

      <p className="chat-footer-brand">
        Powered by MDC Medical Care · AI Health Assistant available 24/7
      </p>
    </div>
  )
}
