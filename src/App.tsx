import { useState } from 'react'
import EndScreen, { buildHighScoreEntry } from './components/EndScreen'
import GameScreen from './components/GameScreen'
import StartScreen from './components/StartScreen'
import { createInitialState, processAction } from './game/engine'
import type { ActionType, GameState, HighScoreEntry } from './types'

const HS_KEY = 'cto-sim-highscores'

function loadHighScores(): HighScoreEntry[] {
  try {
    const raw = localStorage.getItem(HS_KEY)
    return raw ? (JSON.parse(raw) as HighScoreEntry[]) : []
  } catch {
    return []
  }
}

function saveHighScore(entry: HighScoreEntry): { scores: HighScoreEntry[]; isNew: boolean } {
  const scores = loadHighScores()
  scores.push(entry)
  scores.sort((a, b) => b.score - a.score)
  const trimmed = scores.slice(0, 10)
  try {
    localStorage.setItem(HS_KEY, JSON.stringify(trimmed))
  } catch {
    // storage unavailable
  }
  const isNew = trimmed[0].score === entry.score && trimmed.filter(s => s.score === entry.score).length === 1
  return { scores: trimmed, isNew }
}

type AppPhase = 'menu' | 'playing' | 'result'

export default function App() {
  const [appPhase, setAppPhase] = useState<AppPhase>('menu')
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [highScores, setHighScores] = useState<HighScoreEntry[]>(loadHighScores)
  const [isNewRecord, setIsNewRecord] = useState(false)

  function handleStart() {
    setGameState(createInitialState('normal'))
    setAppPhase('playing')
  }

  function handleAction(action: ActionType) {
    if (!gameState) return
    const nextState = processAction(gameState, action)
    setGameState(nextState)
    if (nextState.phase === 'result') {
      const entry = buildHighScoreEntry(nextState)
      const { scores, isNew } = saveHighScore(entry)
      setHighScores(scores)
      setIsNewRecord(isNew)
      setAppPhase('result')
    }
  }

  function handleRestart() {
    setIsNewRecord(false)
    setGameState(createInitialState('normal'))
    setAppPhase('playing')
  }

  function handleMenu() {
    setIsNewRecord(false)
    setGameState(null)
    setAppPhase('menu')
  }

  if (appPhase === 'menu') {
    return <StartScreen onStart={() => handleStart()} highScores={highScores} />
  }

  if (appPhase === 'playing' && gameState) {
    return <GameScreen state={gameState} onAction={handleAction} />
  }

  if (appPhase === 'result' && gameState) {
    return (
      <EndScreen
        state={gameState}
        onRestart={() => handleRestart()}
        onMenu={handleMenu}
        isNewRecord={isNewRecord}
      />
    )
  }

  return null
}
