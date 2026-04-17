export interface Metrics {
  health: number;      // Company Health 0-100, 100 = perfect
  morale: number;      // Team Morale 0-100, 100 = happy
  techDebt: number;    // Technical Debt 0-100, 100 = maximum debt (BAD)
  money: number;       // Budget 0-100, 100 = healthy
  reputation: number;  // Reputation 0-100, 100 = stellar
}

export type MetricKey = keyof Metrics;

// All deltas: positive = better EXCEPT techDebt (positive = more debt = worse)
export interface MetricDelta {
  health?: number;
  morale?: number;
  techDebt?: number;  // positive = debt increases (bad)
  money?: number;
  reputation?: number;
}

export interface DelayedEffect {
  delay: number;        // turns until triggered
  effects: MetricDelta;
  message: string;
}

export interface EventChoice {
  effects: MetricDelta;
  successMessage: string;
  riskChance?: number;       // 0-1 probability of alternative bad outcome
  riskEffects?: MetricDelta;
  riskMessage?: string;
  delayedEffect?: DelayedEffect;
  microComment?: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  ignore: EventChoice;
  delegate: EventChoice;
}

export interface PendingConsequence {
  triggerTurn: number;
  effects: MetricDelta;
  message: string;
}

export type LogEntryType = 'good' | 'bad' | 'neutral' | 'warning';

export interface LogEntry {
  id: number;
  turn: number;
  message: string;
  type: LogEntryType;
}

export interface GameStats {
  ignoreCount: number;
  delegateCount: number;
  minMorale: number;
  maxTechDebt: number;
  crisisIgnored: number;    // critical events ignored
  totalMoneyLost: number;
}

export type GamePhase = 'start' | 'playing' | 'result';
export type Difficulty = 'normal' | 'friday';
export type ActionType = 'ignore' | 'delegate';

export interface GameState {
  phase: GamePhase;
  difficulty: Difficulty;
  metrics: Metrics;
  turn: number;
  maxTurns: number;
  currentEvent: GameEvent | null;
  pendingConsequences: PendingConsequence[];
  log: LogEntry[];
  logIdCounter: number;
  stats: GameStats;
  victory: boolean;
  gameoverReason: string;
  usedEventIds: Set<string>;
}

export interface ArchetypeResult {
  name: string;
  emoji: string;
  description: string;
}

export interface HighScoreEntry {
  score: number;
  archetype: string;
  turn: number;
  difficulty: Difficulty;
  date: string;
}
