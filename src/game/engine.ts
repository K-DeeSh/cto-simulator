import { ALL_EVENTS } from '../data/events'
import type {
  ActionType,
  Difficulty,
  GameEvent,
  GameState,
  LogEntry,
  LogEntryType,
  MetricDelta,
  Metrics,
} from '../types'

const STARTING_METRICS: Record<Difficulty, Metrics> = {
  normal: {
    health: 80,
    morale: 75,
    techDebt: 20,
    money: 75,
    reputation: 80,
  },
  friday: {
    health: 55,
    morale: 50,
    techDebt: 55,
    money: 45,
    reputation: 60,
  },
}

// Passive per-turn recovery: represents baseline revenue and normal operations
const PASSIVE_RECOVERY: MetricDelta = {
  money: 3,
  health: 2,
  morale: 1,
  reputation: 1,
  techDebt: -1,
}

// Scale factor applied to all event effects — keeps events expressive
// without making the game impossible to beat
const EFFECT_SCALE = 0.45

function scaleDelta(delta: MetricDelta): MetricDelta {
  const s = (v: number | undefined) =>
    v !== undefined ? Math.round(v * EFFECT_SCALE) || (v > 0 ? 1 : v < 0 ? -1 : 0) : undefined
  return {
    health: s(delta.health),
    morale: s(delta.morale),
    techDebt: s(delta.techDebt),
    money: s(delta.money),
    reputation: s(delta.reputation),
  }
}

const MAX_TURNS: Record<Difficulty, number> = {
  normal: 50,
  friday: 40,
}

export function createInitialState(difficulty: Difficulty): GameState {
  return {
    phase: 'playing',
    difficulty,
    metrics: { ...STARTING_METRICS[difficulty] },
    turn: 1,
    maxTurns: MAX_TURNS[difficulty],
    currentEvent: drawEvent(new Set()),
    pendingConsequences: [],
    log: [],
    logIdCounter: 0,
    stats: {
      ignoreCount: 0,
      delegateCount: 0,
      minMorale: STARTING_METRICS[difficulty].morale,
      maxTechDebt: STARTING_METRICS[difficulty].techDebt,
      crisisIgnored: 0,
      totalMoneyLost: 0,
    },
    victory: false,
    gameoverReason: '',
    usedEventIds: new Set(),
  }
}

export function drawEvent(usedIds: Set<string>): GameEvent {
  const available = ALL_EVENTS.filter((e) => !usedIds.has(e.id))
  // Reset pool if exhausted
  const pool = available.length > 0 ? available : ALL_EVENTS
  return pool[Math.floor(Math.random() * pool.length)]
}

export function applyDelta(metrics: Metrics, delta: MetricDelta): Metrics {
  const updated = { ...metrics }
  if (delta.health !== undefined) updated.health = clamp(updated.health + delta.health)
  if (delta.morale !== undefined) updated.morale = clamp(updated.morale + delta.morale)
  if (delta.techDebt !== undefined) updated.techDebt = clamp(updated.techDebt + delta.techDebt)
  if (delta.money !== undefined) updated.money = clamp(updated.money + delta.money)
  if (delta.reputation !== undefined) updated.reputation = clamp(updated.reputation + delta.reputation)
  return updated
}

function clamp(val: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(val)))
}

function checkGameOver(metrics: Metrics): string | null {
  if (metrics.health <= 0) return 'Компания не пережила квартал. Прод лежит вечно.'
  if (metrics.morale <= 0) return 'Вся команда уволилась. Одновременно. Это рекорд.'
  if (metrics.money <= 0) return 'Деньги закончились. Карточка заблокирована.'
  if (metrics.reputation <= 0) return 'Репутация уничтожена. LinkedIn светится у всей команды.'
  if (metrics.techDebt >= 100) return 'Технический долг поглотил компанию. Рефакторинг невозможен.'
  return null
}

function makeLogEntry(
  idCounter: number,
  turn: number,
  message: string,
  type: LogEntryType,
): LogEntry {
  return { id: idCounter, turn, message, type }
}

function classifyDelta(delta: MetricDelta): LogEntryType {
  const badScore =
    (delta.health ?? 0) < 0
      ? Math.abs(delta.health!)
      : 0 +
        ((delta.morale ?? 0) < 0 ? Math.abs(delta.morale!) : 0) +
        ((delta.money ?? 0) < 0 ? Math.abs(delta.money!) : 0) +
        ((delta.reputation ?? 0) < 0 ? Math.abs(delta.reputation!) : 0) +
        (delta.techDebt ?? 0 > 0 ? (delta.techDebt ?? 0) : 0)

  const goodScore =
    (delta.health ?? 0) > 0
      ? delta.health!
      : 0 +
        ((delta.morale ?? 0) > 0 ? delta.morale! : 0) +
        ((delta.money ?? 0) > 0 ? delta.money! : 0) +
        ((delta.reputation ?? 0) > 0 ? delta.reputation! : 0) +
        (delta.techDebt ?? 0 < 0 ? Math.abs(delta.techDebt ?? 0) : 0)

  if (badScore > 20) return 'bad'
  if (badScore > 10) return 'warning'
  if (goodScore > 10) return 'good'
  return 'neutral'
}

export function processAction(state: GameState, action: ActionType): GameState {
  if (!state.currentEvent) return state

  const event = state.currentEvent
  const choice = action === 'ignore' ? event.ignore : event.delegate

  // Roll for risk
  const riskRolled =
    choice.riskChance !== undefined && Math.random() < choice.riskChance

  const rawEffects = riskRolled ? (choice.riskEffects ?? choice.effects) : choice.effects
  const appliedEffects = scaleDelta(rawEffects)
  const resultMessage = riskRolled
    ? (choice.riskMessage ?? choice.successMessage)
    : choice.successMessage

  let newMetrics = applyDelta(state.metrics, appliedEffects)

  // Passive per-turn recovery (business as usual)
  newMetrics = applyDelta(newMetrics, PASSIVE_RECOVERY)
  let logIdCounter = state.logIdCounter
  const newLog: LogEntry[] = []

  // Main result log entry
  const logType = classifyDelta(appliedEffects)
  newLog.push(makeLogEntry(logIdCounter++, state.turn, resultMessage, logType))

  // Micro comment (fun little quip)
  if (choice.microComment) {
    newLog.push(
      makeLogEntry(logIdCounter++, state.turn, `💬 ${choice.microComment}`, 'neutral'),
    )
  }

  // Pending consequences: check if any trigger this turn
  const remainingConsequences = []
  for (const pc of state.pendingConsequences) {
    if (pc.triggerTurn <= state.turn) {
      newMetrics = applyDelta(newMetrics, scaleDelta(pc.effects))
      const pcType = classifyDelta(pc.effects)
      newLog.push(makeLogEntry(logIdCounter++, state.turn, `⏰ ${pc.message}`, pcType))
    } else {
      remainingConsequences.push(pc)
    }
  }

  // Add new delayed effect if ignored
  const updatedPending = [...remainingConsequences]
  if (choice.delayedEffect) {
    updatedPending.push({
      triggerTurn: state.turn + choice.delayedEffect.delay,
      effects: choice.delayedEffect.effects,
      message: choice.delayedEffect.message,
    })
  }

  // Update stats
  const newStats = { ...state.stats }
  if (action === 'ignore') {
    newStats.ignoreCount++
    if (event.urgency === 'critical') newStats.crisisIgnored++
  } else {
    newStats.delegateCount++
  }
  if ((appliedEffects.money ?? 0) < 0) {
    newStats.totalMoneyLost += Math.abs(appliedEffects.money!)
  }
  newStats.minMorale = Math.min(newStats.minMorale, newMetrics.morale)
  newStats.maxTechDebt = Math.max(newStats.maxTechDebt, newMetrics.techDebt)

  // Check game over
  const gameoverReason = checkGameOver(newMetrics)
  if (gameoverReason) {
    return {
      ...state,
      metrics: newMetrics,
      turn: state.turn,
      pendingConsequences: updatedPending,
      log: [...newLog, ...state.log].slice(0, 20),
      logIdCounter,
      stats: newStats,
      phase: 'result',
      victory: false,
      gameoverReason,
      currentEvent: null,
      usedEventIds: state.usedEventIds,
    }
  }

  const nextTurn = state.turn + 1

  // Check victory
  if (nextTurn > state.maxTurns) {
    return {
      ...state,
      metrics: newMetrics,
      turn: state.turn,
      pendingConsequences: updatedPending,
      log: [...newLog, ...state.log].slice(0, 20),
      logIdCounter,
      stats: newStats,
      phase: 'result',
      victory: true,
      gameoverReason: '',
      currentEvent: null,
      usedEventIds: state.usedEventIds,
    }
  }

  const newUsedIds = new Set(state.usedEventIds)
  newUsedIds.add(event.id)
  const nextEvent = drawEvent(newUsedIds)

  return {
    ...state,
    metrics: newMetrics,
    turn: nextTurn,
    currentEvent: nextEvent,
    pendingConsequences: updatedPending,
    log: [...newLog, ...state.log].slice(0, 20),
    logIdCounter,
    stats: newStats,
    phase: 'playing',
    victory: false,
    gameoverReason: '',
    usedEventIds: newUsedIds,
  }
}
