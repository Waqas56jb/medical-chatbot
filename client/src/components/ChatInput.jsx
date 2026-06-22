import { useState } from 'react'

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || disabled) return
    onSend(input)
    setInput('')
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        className="chat-input__field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
        placeholder="Describe your symptoms or ask a health question..."
        rows={1}
        disabled={disabled}
        aria-label="Message input"
      />
      <button type="submit" className="chat-input__send" disabled={disabled || !input.trim()}>
        Send
      </button>
    </form>
  )
}
