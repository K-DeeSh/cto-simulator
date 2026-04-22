import { useEffect, useState } from 'react'
import type { HighScoreEntry } from '../types'
import { fetchLeaderboard, type LeaderboardEntry } from '../api'

interface Props {
  onStart: () => void
  highScores: HighScoreEntry[]
  login: string
}

export default function StartScreen({ onStart, highScores, login }: Props) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    fetchLeaderboard(10).then(setLeaderboard)
  }, [])

  return (
    <div className="screen start-screen">
      <div className="start-logo">👔</div>

      <div>
        <h1 className="start-title">
          CTO Simulator:<br />
          <span>Ignore Problems</span>
        </h1>
      </div>

      {login && (
        <p style={{ color: '#7c6af7', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
          Привет, <strong>{login}</strong>!
        </p>
      )}

      <p className="start-tagline">
        На вас валятся проблемы компании. Вы — CTO.
        Выживите до конца квартала, принимая сложные решения
        с непредсказуемыми последствиями.
      </p>

      <ul className="start-features">
        <li>🎯 50 ходов = 1 квартал выживания</li>
        <li>⏰ Отложенные последствия за игнор</li>
        <li>🎲 Случайные исходы — игра не детерминирована</li>
        <li>🏆 Итоговый CTO-архетип</li>
      </ul>

      <button className="start-btn" onClick={onStart}>
        Начать квартал →
      </button>

      {leaderboard.length > 0 && (
        <div className="highscores">
          <h3>🌐 Глобальный топ</h3>
          <div className="hs-list">
            {leaderboard.slice(0, 5).map((entry, i) => (
              <div key={i} className={`hs-row ${entry.login === login ? 'hs-row-me' : ''}`}>
                <span className="hs-rank">{i + 1}.</span>
                <span className="hs-score">{entry.score}</span>
                <span className="hs-name">{entry.login}{entry.archetype ? ` — ${entry.archetype}` : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {leaderboard.length === 0 && highScores.length > 0 && (
        <div className="highscores">
          <h3>Рекорды</h3>
          <div className="hs-list">
            {highScores.slice(0, 5).map((hs, i) => (
              <div key={i} className="hs-row">
                <span className="hs-rank">{i + 1}.</span>
                <span className="hs-score">{hs.score}</span>
                <span className="hs-name">{hs.archetype}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
