import type { ActionType } from '../types'

interface Props {
  onAction: (action: ActionType) => void
  disabled: boolean
}

export default function ActionButtons({ onAction, disabled }: Props) {
  return (
    <div className="action-buttons">
      <button
        className="action-btn ignore"
        onClick={() => onAction('ignore')}
        disabled={disabled}
        aria-label="Игнорировать проблему"
      >
        <span className="btn-emoji">🙈</span>
        <span className="btn-label">Игнорировать</span>
      </button>

      <button
        className="action-btn delegate"
        onClick={() => onAction('delegate')}
        disabled={disabled}
        aria-label="Делегировать проблему"
      >
        <span className="btn-emoji">📋</span>
        <span className="btn-label">Делегировать</span>
      </button>
    </div>
  )
}
