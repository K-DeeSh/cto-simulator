import type { GameState, HighScoreEntry } from '../types'
import { calculateArchetype, calculateScore } from '../game/archetypes'

interface Props {
  state: GameState
  onRestart: () => void
  onMenu: () => void
  isNewRecord: boolean
}

function metricColor(value: number, inverted = false): string {
  const eff = inverted ? 100 - value : value
  if (eff <= 25) return '#ff4757'
  if (eff <= 45) return '#ffa502'
  return '#2ed573'
}

export function buildHighScoreEntry(state: GameState): HighScoreEntry {
  const archetype = calculateArchetype(state.stats, state.metrics, state.victory)
  const score = calculateScore(state.metrics, state.turn, state.victory)
  return {
    score,
    archetype: archetype.name,
    turn: state.turn,
    difficulty: state.difficulty,
    date: new Date().toLocaleDateString('ru-RU'),
  }
}

export default function EndScreen({ state, onRestart, onMenu, isNewRecord }: Props) {
  const { metrics, victory, gameoverReason, turn, maxTurns, stats } = state
  const archetype = calculateArchetype(stats, metrics, victory)
  const score = calculateScore(metrics, turn, victory)

  return (
    <div className="screen result-screen">
      {/* Banner */}
      <div className={`result-banner ${victory ? 'victory' : 'defeat'}`}>
        <div className="result-icon">{victory ? '🎉' : '💥'}</div>
        <h1 className="result-title">
          {victory ? 'Квартал пройден!' : 'Игра окончена'}
        </h1>
        <p className="result-subtitle">
          {victory
            ? `Вы продержались все ${maxTurns} ходов. Это уже достижение.`
            : gameoverReason}
        </p>
      </div>

      {/* Archetype */}
      <div className="archetype-card">
        <div className="archetype-label">Ваш CTO-архетип</div>
        <div className="archetype-emoji">{archetype.emoji}</div>
        <div className="archetype-name">{archetype.name}</div>
        <div className="archetype-desc">{archetype.description}</div>
      </div>

      {/* Score */}
      <div className="result-score">
        <div className="score-label">Итоговый счёт</div>
        <div className="score-value">{score}</div>
        {isNewRecord && (
          <div className="score-new-record">🏆 Новый рекорд!</div>
        )}
      </div>

      {/* Final metrics */}
      <div className="result-metrics">
        <h3>Финальное состояние компании</h3>
        <div className="result-metric-grid">
          {[
            { label: '🏢 Здоровье',  value: metrics.health,     inv: false },
            { label: '💪 Мораль',    value: metrics.morale,     inv: false },
            { label: '🗑️ Техдолг',   value: metrics.techDebt,   inv: true  },
            { label: '💰 Бюджет',    value: metrics.money,      inv: false },
            { label: '⭐ Репутация', value: metrics.reputation,  inv: false },
            { label: '📊 Ходов',     value: turn,               inv: false },
          ].map(({ label, value, inv }) => (
            <div key={label} className="result-metric-item">
              <span className="rmi-label">{label}</span>
              <span
                className="rmi-value"
                style={{ color: label === '📊 Ходов' ? '#8a8eaa' : metricColor(value, inv) }}
              >
                {value}{label !== '📊 Ходов' ? '' : `/${maxTurns}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="result-metrics">
        <h3>Статистика решений</h3>
        <div className="result-metric-grid">
          <div className="result-metric-item">
            <span className="rmi-label">🙈 Проигнорировано</span>
            <span className="rmi-value" style={{ color: '#ff6b7a' }}>{stats.ignoreCount}</span>
          </div>
          <div className="result-metric-item">
            <span className="rmi-label">📋 Делегировано</span>
            <span className="rmi-value" style={{ color: '#a396ff' }}>{stats.delegateCount}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="result-actions">
        <button className="restart-btn" onClick={onRestart}>
          Ещё раз →
        </button>
        <button className="menu-btn" onClick={onMenu}>
          В главное меню
        </button>
      </div>
    </div>
  )
}
