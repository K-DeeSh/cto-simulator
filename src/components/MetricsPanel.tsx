import type { Metrics } from '../types'

interface MetricConfig {
  key: keyof Metrics
  label: string
  emoji: string
  inverted?: boolean // for techDebt: higher value = worse
}

const METRICS: MetricConfig[] = [
  { key: 'health',      label: 'Здоровье',   emoji: '🏢' },
  { key: 'morale',      label: 'Мораль',     emoji: '💪' },
  { key: 'techDebt',    label: 'Техдолг',    emoji: '🗑️', inverted: true },
  { key: 'money',       label: 'Бюджет',     emoji: '💰' },
  { key: 'reputation',  label: 'Репутация',  emoji: '⭐' },
]

function getValueClass(value: number, inverted: boolean): string {
  const effective = inverted ? (100 - value) : value
  if (effective <= 25) return 'danger'
  if (effective <= 45) return 'warn'
  return 'ok'
}

function getBarWidth(value: number, inverted: boolean): number {
  return inverted ? value : value  // always use raw value for the bar
}

interface Props {
  metrics: Metrics
  prevMetrics: Metrics | null
}

export default function MetricsPanel({ metrics, prevMetrics }: Props) {
  return (
    <div className="metrics-panel">
      {METRICS.map(({ key, label, emoji, inverted }) => {
        const value = metrics[key]
        const prevValue = prevMetrics ? prevMetrics[key] : value
        const changed = prevValue !== value
        const improved = inverted ? value < prevValue : value > prevValue
        const flashClass = changed ? (improved ? 'flash-good' : 'flash-bad') : ''
        const valueClass = getValueClass(value, !!inverted)
        const barWidth = getBarWidth(value, !!inverted)

        return (
          <div key={key} className={`metric-row ${flashClass}`}>
            <span className="metric-label">
              <span>{emoji}</span>
              {label}
            </span>
            <div className="metric-bar-outer">
              <div
                className={`metric-bar-inner ${key}`}
                style={{ width: `${barWidth}%` }}
              />
            </div>
            <span className={`metric-value ${valueClass}`}>
              {value}
            </span>
          </div>
        )
      })}
    </div>
  )
}
