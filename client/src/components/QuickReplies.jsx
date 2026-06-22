export default function QuickReplies({ options, onSelect, disabled }) {
  if (!options?.length) return null

  return (
    <div className="quick-replies">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className="quick-replies__btn"
          onClick={() => onSelect(option.label)}
          disabled={disabled}
        >
          {option.emoji && <span className="quick-replies__emoji">{option.emoji}</span>}
          {option.label}
        </button>
      ))}
    </div>
  )
}
