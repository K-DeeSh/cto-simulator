import type { GameEvent } from '../types'

const URGENCY_LABELS: Record<GameEvent['urgency'], string> = {
  low: 'Низкая',
  medium: 'Средняя',
  high: 'Высокая',
  critical: 'КРИТИЧНО',
}

interface Props {
  event: GameEvent
  hasPending: boolean
  cardKey: string  // changes to retrigger animation
}

export default function ProblemCard({ event, hasPending, cardKey }: Props) {
  return (
    <div className="problem-card" key={cardKey}>
      <div className="card-header">
        <h2 className="card-title">{event.title}</h2>
        <span className={`urgency-badge ${event.urgency}`}>
          {URGENCY_LABELS[event.urgency]}
        </span>
      </div>

      <p className="card-description">{event.description}</p>

      {hasPending && (
        <div className="pending-warning">
          ⏰ Есть отложенные последствия из прошлых решений
        </div>
      )}
    </div>
  )
}
