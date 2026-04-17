import type { ArchetypeResult, GameStats, Metrics } from '../types'

export function calculateArchetype(
  stats: GameStats,
  metrics: Metrics,
  victory: boolean,
): ArchetypeResult {
  const total = stats.ignoreCount + stats.delegateCount || 1
  const ignoreRatio = stats.ignoreCount / total
  const delegateRatio = stats.delegateCount / total

  // Specific pattern checks (ordered by specificity)
  if (!victory && metrics.morale <= 0) {
    return {
      name: 'Разрушитель команд',
      emoji: '💀',
      description:
        'Команда ушла. Вся. Одновременно. Это своего рода достижение.',
    }
  }

  if (!victory && metrics.money <= 0) {
    return {
      name: 'Финансовый Гудини',
      emoji: '💸',
      description:
        'Деньги закончились быстрее, чем успели спросить "где бюджет на Q4?".',
    }
  }

  if (!victory && metrics.techDebt >= 95) {
    return {
      name: 'Коллекционер техдолга',
      emoji: '🗑️',
      description:
        'Технический долг сожрал компанию. Это надо было очень стараться.',
    }
  }

  if (!victory && metrics.reputation <= 0) {
    return {
      name: 'Менеджер репутационных катастроф',
      emoji: '🔥',
      description:
        'Репутация уничтожена. LinkedIn уже открыт у всех в команде.',
    }
  }

  if (!victory && metrics.health <= 0) {
    return {
      name: 'Тихий Оптимист',
      emoji: '😶',
      description:
        'Компания сгорела. Но вы до последнего думали, что само рассосётся.',
    }
  }

  // Victory archetypes
  if (victory && ignoreRatio > 0.65) {
    return {
      name: 'Мастер игнорирования',
      emoji: '🙈',
      description:
        'Вы довели компанию до конца квартала, просто не замечая проблем. Дзен-буддизм в менеджменте.',
    }
  }

  if (victory && delegateRatio > 0.75) {
    return {
      name: 'Архитектор делегирования',
      emoji: '🎯',
      description:
        'Вы делегировали всё, кроме делегирования. Команда всё сделала сама — и это нормально.',
    }
  }

  if (victory && metrics.techDebt >= 70) {
    return {
      name: 'Серфер на техдолге',
      emoji: '🏄',
      description:
        'Техдолг зашкаливал, но вы как-то удержались. Это уже не управление, это акробатика.',
    }
  }

  if (victory && metrics.morale <= 25) {
    return {
      name: 'Пожарный-CTO',
      emoji: '🚒',
      description:
        'Выжили, но команда смотрит на вас с тихой ненавистью. На следующий квартал нужен therapist.',
    }
  }

  if (
    victory &&
    metrics.health >= 60 &&
    metrics.morale >= 60 &&
    metrics.money >= 50 &&
    metrics.reputation >= 65
  ) {
    return {
      name: 'Мастер кризис-менеджмента',
      emoji: '🏆',
      description:
        'Квартал пройден с достоинством. Метрики в норме. Возможно, вы и правда хороший CTO.',
    }
  }

  if (victory && stats.crisisIgnored >= 3) {
    return {
      name: 'Тихий менеджер катастроф',
      emoji: '😐',
      description:
        'Игнорировали критические проблемы и выжили. Это либо гений, либо везение. Скорее второе.',
    }
  }

  if (victory && stats.maxTechDebt < 40) {
    return {
      name: 'Хранитель качества',
      emoji: '✨',
      description:
        'Технический долг под контролем. Это редкость. Вас боятся и уважают одновременно.',
    }
  }

  if (victory && stats.totalMoneyLost > 60) {
    return {
      name: 'Таблица-визионер',
      emoji: '📊',
      description:
        'Потратили много, но выжили. Финансы в шоке, но компания работает. Результат оправдывает средства?',
    }
  }

  // Default victory archetype
  return {
    name: 'Выживший',
    emoji: '🤸',
    description:
      'Квартал пройден. Как — вопрос философский. Главное, что пройден.',
  }
}

export function calculateScore(
  metrics: Metrics,
  turn: number,
  victory: boolean,
): number {
  const metricScore =
    metrics.health + metrics.morale + metrics.money + metrics.reputation
  const debtPenalty = metrics.techDebt
  const base = Math.max(0, metricScore - debtPenalty)
  const turnBonus = turn * 3
  const victoryBonus = victory ? 200 : 0
  return Math.round(base + turnBonus + victoryBonus)
}
