import type { LogEntry } from '../types'

interface Props {
  entries: LogEntry[]
}

export default function EventLog({ entries }: Props) {
  if (entries.length === 0) return null

  return (
    <div className="event-log">
      <div className="log-header">Последние события</div>
      <div className="log-entries">
        {entries.slice(0, 6).map((entry) => (
          <div key={entry.id} className={`log-entry ${entry.type}`}>
            <div className="log-dot" />
            <span className="log-turn">#{entry.turn}</span>
            <span>{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
