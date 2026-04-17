import { useEffect, useRef, useState } from 'react'
import type { ActionType, GameState, Metrics } from '../types'
import ActionButtons from './ActionButtons'
import EventLog from './EventLog'
import MetricsPanel from './MetricsPanel'
import ProblemCard from './ProblemCard'

interface Props {
  state: GameState
  onAction: (action: ActionType) => void
}

export default function GameScreen({ state, onAction }: Props) {
  const { metrics, turn, maxTurns, currentEvent, log, pendingConsequences } = state
  const [prevMetrics, setPrevMetrics] = useState<Metrics | null>(null)
  const [cardKey, setCardKey] = useState(0)
  const [actionLocked, setActionLocked] = useState(false)
  const prevTurnRef = useRef(turn)

  // Track previous metrics for flash animation
  useEffect(() => {
    if (turn !== prevTurnRef.current) {
      prevTurnRef.current = turn
      setCardKey((k) => k + 1)
      setActionLocked(false)
    }
  }, [turn])

  useEffect(() => {
    if (prevTurnRef.current === turn) {
      setPrevMetrics(null)
    }
  }, [metrics, turn])

  function handleAction(action: ActionType) {
    if (actionLocked) return
    setActionLocked(true)
    setPrevMetrics({ ...metrics })
    onAction(action)
  }

  const progress = ((turn - 1) / maxTurns) * 100
  const hasPending = pendingConsequences.length > 0

  if (!currentEvent) return null

  return (
    <div className="game-screen">
      {/* Header */}
      <header className="game-header">
        <span className="game-title">CTO Simulator</span>
        <div className="turn-info">
          <span className="turn-text">
            Ход <strong>{turn}</strong> / {maxTurns}
          </span>
          <div className="progress-bar-outer">
            <div
              className="progress-bar-inner"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Metrics */}
      <MetricsPanel metrics={metrics} prevMetrics={prevMetrics} />

      {/* Problem Card */}
      <div className="card-area">
        <ProblemCard
          event={currentEvent}
          hasPending={hasPending}
          cardKey={String(cardKey)}
        />
      </div>

      {/* Actions */}
      <ActionButtons onAction={handleAction} disabled={actionLocked} />

      {/* Log */}
      <EventLog entries={log} />
    </div>
  )
}
