import type { GameEvent } from '../types'

export const ALL_EVENTS: GameEvent[] = [

  // ── 🏭 ОПЕРАЦИОНКА / СКЛАДЫ ──────────────────────────────────────────────

  {
    id: 'wms_future_dates',
    title: 'WMS создаёт отгрузки с датами в будущем',
    description: 'Складская система начала проставлять даты отгрузок на 2–3 дня вперёд. Часть грузов формально ещё "не отправлена".',
    urgency: 'high',
    ignore: {
      effects: { health: -15, reputation: -10 },
      successMessage: 'Даты съехали дальше. Операционка работает на костылях.',
      riskChance: 0.45,
      riskEffects: { money: -15, reputation: -15 },
      riskMessage: 'Клиенты заметили расхождения в статусах. Начались претензии.',
      microComment: 'Время — относительная категория.',
      delayedEffect: {
        delay: 4,
        effects: { money: -15, reputation: -10 },
        message: 'Расхождения в датах дошли до финансового закрытия. Акты пересчитываются.',
      },
    },
    delegate: {
      effects: { money: -5, techDebt: 10 },
      successMessage: 'Хотфикс выкатили. WMS считает даты правильно.',
      riskChance: 0.25,
      riskEffects: { health: -10, techDebt: 5 },
      riskMessage: 'Фикс поломал смежный процесс приёмки. Разбираемся дальше.',
      microComment: 'Время — это данные. Данные — это деньги.',
    },
  },

  {
    id: 'sc_no_app',
    title: '20% отгрузок на СЦ без АПП',
    description: 'На сортировочном центре каждая пятая отгрузка уходит без акта приёма-передачи. Логи молчат.',
    urgency: 'high',
    ignore: {
      effects: { health: -10, reputation: -15 },
      successMessage: 'Операции продолжились. Потери пока не посчитаны.',
      delayedEffect: {
        delay: 3,
        effects: { money: -20, reputation: -10 },
        message: 'Клиенты подали претензии по грузам без АПП. Компенсации.',
      },
      microComment: 'АПП — это просто бумажка. Наверное.',
    },
    delegate: {
      effects: { money: -10, morale: -5 },
      successMessage: 'Нашли причину: сбой в очереди событий. Починили.',
      microComment: 'Документооборот — фундамент логистики.',
    },
  },

  {
    id: 'stock_approximate',
    title: 'Остатки на складе "примерно верные"',
    description: 'После ночной инвентаризации выяснилось: расхождение по остаткам до 5%. Система говорит "всё ок".',
    urgency: 'medium',
    ignore: {
      effects: { techDebt: 15, money: -5 },
      successMessage: 'Работаем с погрешностью. Все привыкли.',
      riskChance: 0.4,
      riskEffects: { money: -20, reputation: -10 },
      riskMessage: 'Клиенту отгрузили товар, которого не было. Скандал.',
      microComment: '"Примерно" — не термин из финансовой отчётности.',
    },
    delegate: {
      effects: { morale: -10, money: -10, techDebt: -5 },
      successMessage: 'Нашли баг в агрегации остатков. Данные выровняли.',
      microComment: 'Точность данных — это деньги клиентов.',
    },
  },

  {
    id: 'receiving_queue',
    title: 'Очередь на приёмке выросла в 3 раза',
    description: 'За ночь очередь на приёмке увеличилась кратно. Машины стоят, водители злятся. Причина неизвестна.',
    urgency: 'high',
    ignore: {
      effects: { health: -15, morale: -5 },
      successMessage: 'К вечеру очередь рассосалась. Никто не понял почему.',
      riskChance: 0.4,
      riskEffects: { reputation: -15, money: -10 },
      riskMessage: 'Партнёры написали официальную претензию по простою транспорта.',
      microComment: 'Пробки бывают не только на дорогах.',
    },
    delegate: {
      effects: { money: -10, health: -5 },
      successMessage: 'Нашли: зависла очередь задач в WMS. Перезапустили.',
      microComment: 'Мониторинг очередей — не менее важен, чем мониторинг сервисов.',
    },
  },

  {
    id: 'impossible_routes',
    title: 'СЦ: система предлагает невозможные маршруты',
    description: 'Алгоритм маршрутизации начал строить маршруты через закрытые КПП и несуществующие адреса.',
    urgency: 'high',
    ignore: {
      effects: { health: -20, reputation: -10 },
      successMessage: 'Операторы вручную правят маршруты. Производительность упала.',
      riskChance: 0.35,
      riskEffects: { health: -15, money: -10 },
      riskMessage: 'Курьер поехал по фантомному маршруту. Доставка сорвана.',
      microComment: 'Карта — это не территория. Особенно если карта кривая.',
    },
    delegate: {
      effects: { money: -10, techDebt: 5 },
      successMessage: 'Обновили геобазу и правила маршрутизации. Работает.',
      microComment: 'Геоданные стареют быстрее, чем кажется.',
    },
  },

  {
    id: 'boxes_lost',
    title: 'На складе теряются коробки без трекинга',
    description: 'За последние сутки 12 коробок "исчезли" между приёмкой и отгрузкой. В системе их нет.',
    urgency: 'critical',
    ignore: {
      effects: { reputation: -20, health: -10 },
      successMessage: 'Коробки нашли физически. Данных о них нет до сих пор.',
      riskChance: 0.5,
      riskEffects: { money: -20, reputation: -15 },
      riskMessage: 'Клиенты подали претензии. Компенсации и репутационные потери.',
      microComment: 'Физика и система — два разных мира.',
      delayedEffect: {
        delay: 4,
        effects: { money: -15, reputation: -10 },
        message: 'Повторная волна потерь. Проблема системная, не случайная.',
      },
    },
    delegate: {
      effects: { money: -10, techDebt: -5 },
      successMessage: 'Нашли: сканер на одном конвейере писал в неправильный топик LogBroker.',
      microComment: 'Трекинг — не опция, это основа логистики.',
    },
  },

  {
    id: 'manual_mode',
    title: 'Половина операций ушла в ручной режим',
    description: 'После утреннего обновления операторы перешли на ручное управление: система "глючит".',
    urgency: 'critical',
    ignore: {
      effects: { health: -20, morale: -10 },
      successMessage: 'Ручной режим держится. Люди устали, но справляются.',
      riskChance: 0.45,
      riskEffects: { health: -15, reputation: -10 },
      riskMessage: 'Ручные ошибки накопились. Несколько отгрузок ушло не туда.',
      microComment: 'Ручной режим — это не fallback, это катастрофа.',
    },
    delegate: {
      effects: { money: -15, morale: -10 },
      successMessage: 'Откатили обновление. Система вернулась в норму.',
      riskChance: 0.3,
      riskEffects: { health: -10, techDebt: 10 },
      riskMessage: 'Откат поломал схему данных. Ещё час разбираемся.',
      microComment: 'Rollback — иногда единственный правильный ответ.',
    },
  },

  {
    id: 'scanners_blind',
    title: 'Сканеры периодически "не видят" товар',
    description: 'Ручные сканеры штрихкодов на трёх складах дают ошибку чтения примерно в 15% случаев. Причина не ясна.',
    urgency: 'medium',
    ignore: {
      effects: { health: -10, techDebt: 15 },
      successMessage: 'Операторы сканируют дважды. Производительность просела.',
      riskChance: 0.35,
      riskEffects: { health: -10, reputation: -10 },
      riskMessage: 'Ошибки чтения привели к пересортице в трёх заказах.',
      microComment: 'Железо тоже имеет право на баги.',
    },
    delegate: {
      effects: { money: -10, techDebt: -5 },
      successMessage: 'Проблема в прошивке сканеров. Обновили. Работает.',
      microComment: 'Hardware bugs — отдельный класс боли.',
    },
  },

  // ── 🚛 ДОСТАВКА / КУРЬЕРЫ ────────────────────────────────────────────────

  {
    id: 'couriers_no_routes',
    title: 'Курьеры не видят маршруты в приложении',
    description: 'С 7 утра курьеры звонят в поддержку: приложение показывает пустой список заказов. Смена началась.',
    urgency: 'critical',
    ignore: {
      effects: { health: -25, reputation: -15 },
      successMessage: 'Курьеры разобрались по старым спискам. Доставки опоздали.',
      riskChance: 0.5,
      riskEffects: { health: -15, money: -15 },
      riskMessage: 'Треть смены сорвана. Клиенты ждут, курьеры стоят.',
      microComment: 'Приложение курьера — это его рабочее место.',
    },
    delegate: {
      effects: { money: -10, health: -5 },
      successMessage: 'Перезапустили воркер раздачи заданий. Маршруты появились.',
      riskChance: 0.2,
      riskEffects: { health: -10, morale: -5 },
      riskMessage: 'Часть маршрутов задублировалась. Потеряли ещё 40 минут.',
      microComment: 'Утренний инцидент — самый дорогой.',
    },
  },

  {
    id: 'circular_routes',
    title: 'Алгоритм строит круговые маршруты',
    description: 'Маршрутизатор начал строить маршруты, где курьер возвращается в одну точку дважды. Время доставки выросло.',
    urgency: 'high',
    ignore: {
      effects: { money: -15, morale: -10 },
      successMessage: 'Курьеры сами оптимизируют маршруты. Дорого и медленно.',
      riskChance: 0.35,
      riskEffects: { reputation: -15, money: -10 },
      riskMessage: 'Клиенты стали получать заказы с опозданием на 2+ часа.',
      microComment: 'TSP — нерешённая задача. И это видно.',
    },
    delegate: {
      effects: { techDebt: 10, money: -10 },
      successMessage: 'Нашли регрессию в алгоритме. Откатили версию матрицы расстояний.',
      riskChance: 0.25,
      riskEffects: { health: -15, techDebt: 5 },
      riskMessage: 'Старая версия не совместима с новыми зонами доставки.',
      microComment: 'Оптимизация маршрутов — это не просто сортировка.',
    },
  },

  {
    id: 'delivery_time_40',
    title: 'Время доставки выросло на 40%',
    description: 'За последние двое суток среднее время доставки выросло с 3 до 4.2 часа. Дашборд в Monium красный. Причина неизвестна.',
    urgency: 'high',
    ignore: {
      effects: { reputation: -20, money: -10 },
      successMessage: 'Само не прошло. Клиенты начали уходить к конкурентам.',
      delayedEffect: {
        delay: 4,
        effects: { reputation: -15, money: -15 },
        message: 'Несколько крупных клиентов запросили SLA-отчёт. Данные неудобные.',
      },
      microComment: 'Метрики — это не просто цифры.',
    },
    delegate: {
      effects: { money: -15, health: -5 },
      successMessage: 'Нашли: новый батчинг задач создавал искусственные задержки.',
      microComment: 'Профилирование спасло бы это раньше.',
    },
  },

  {
    id: 'couriers_cancel_shifts',
    title: 'Курьеры массово отменяют смены',
    description: 'За ночь 30% курьеров отменили завтрашние смены. Приложение работает, но люди уходят.',
    urgency: 'high',
    ignore: {
      effects: { health: -20, morale: -15 },
      successMessage: 'Перераспределили нагрузку. Кое-как закрыли смены.',
      riskChance: 0.4,
      riskEffects: { reputation: -15, health: -10 },
      riskMessage: 'Не смогли закрыть зоны. Часть доставок не состоялась.',
      microComment: 'Люди тоже имеют право на плохой день.',
    },
    delegate: {
      effects: { money: -15, morale: 5 },
      successMessage: 'Выяснили причину: баг в расчёте выплат. Пересчитали. Курьеры вернулись.',
      riskChance: 0.25,
      riskEffects: { morale: -10, money: -10 },
      riskMessage: 'Бонус выплатили, но часть курьеров всё равно ушла.',
      microComment: 'Доверие — хрупкая штука.',
    },
  },

  {
    id: 'orders_stuck_transit',
    title: 'Заказы зависли в статусе "в пути"',
    description: 'Около 200 заказов несколько дней висят в статусе "в пути". Физически они уже доставлены.',
    urgency: 'medium',
    ignore: {
      effects: { reputation: -15, health: -10 },
      successMessage: 'Статусы висят. Клиенты пишут в поддержку каждый час.',
      riskChance: 0.35,
      riskEffects: { money: -10, reputation: -10 },
      riskMessage: 'Несколько клиентов оформили возврат из-за "незавершённых" заказов.',
      microComment: 'Статус заказа — это обещание клиенту.',
    },
    delegate: {
      effects: { money: -5, techDebt: -5 },
      successMessage: 'Событие "доставлено" не доходило до статусного сервиса. Починили.',
      microComment: 'Конечный автомат должен быть конечным.',
    },
  },

  {
    id: 'eta_broken',
    title: 'Новый релиз сломал расчёт ETA',
    description: 'После вчерашнего деплоя приложение показывает клиентам ETA +12 часов к реальному. "Маленький рефакторинг".',
    urgency: 'high',
    ignore: {
      effects: { reputation: -15, health: -10 },
      successMessage: 'Клиенты думают, что доставка завтра. Некоторые отменили заказ.',
      riskChance: 0.4,
      riskEffects: { money: -10, reputation: -10 },
      riskMessage: 'Волна отмен заказов из-за "невозможных" дат доставки.',
      microComment: 'ETA — это обещание. Не математика.',
    },
    delegate: {
      effects: { morale: -5, techDebt: 5 },
      successMessage: 'Нашли: timezone offset применялся дважды. Откат + фикс.',
      microComment: 'Временны́е зоны — кладбище для разработчиков.',
    },
  },

  {
    id: 'partner_delays',
    title: 'Партнёр по магистралям задерживает рейсы',
    description: 'Магистральный партнёр задерживает рейсы на 3–6 часов и не присылает уведомлений через API.',
    urgency: 'medium',
    ignore: {
      effects: { reputation: -10, health: -5 },
      successMessage: 'Рейсы в итоге пришли. Клиенты всё равно недовольны.',
      microComment: 'Зависимость от партнёров — встроенный риск.',
    },
    delegate: {
      effects: { money: -10, reputation: 5 },
      successMessage: 'Настроили fallback-уведомления через другой канал. Клиенты в курсе.',
      riskChance: 0.3,
      riskEffects: { reputation: -10, money: -5 },
      riskMessage: 'Партнёр не даёт доступ к нужным данным. Временное решение кривое.',
      microComment: 'SLA партнёра — не твой SLA клиенту.',
    },
  },

  {
    id: 'courier_ghost_delivery',
    title: 'Курьер был, но заказа нет',
    description: 'Клиенты жалуются: курьер отметил доставку как "выполнено", но ничего не привёз. Несколько случаев за день.',
    urgency: 'high',
    ignore: {
      effects: { reputation: -20 },
      successMessage: 'Поддержка отработала претензии вручную. Дорого и медленно.',
      riskChance: 0.45,
      riskEffects: { money: -15, reputation: -15 },
      riskMessage: 'Клиенты написали в соцсети. Медиа подхватили.',
      microComment: 'Доверие — не метрика. Пока не потеряешь.',
    },
    delegate: {
      effects: { money: -10, reputation: -5, techDebt: -5 },
      successMessage: 'Добавили обязательное фото при закрытии доставки.',
      microComment: 'Верификация на последней миле — не паранойя.',
    },
  },

  // ── 🔌 ИНТЕГРАЦИИ / ВНЕШНИЕ СИСТЕМЫ ─────────────────────────────────────

  {
    id: 'ozon_500',
    title: 'Интеграция с Ozon возвращает 500',
    description: 'С утра интеграция с Ozon бьёт пятисотками. Заказы не принимаются. Дежурный не отвечает.',
    urgency: 'critical',
    ignore: {
      effects: { health: -20, reputation: -20, money: -15 },
      successMessage: 'Ozon сам починил что-то на своей стороне. Потери зафиксированы.',
      riskChance: 0.5,
      riskEffects: { money: -20, reputation: -15 },
      riskMessage: 'Ozon заблокировал интеграцию из-за аномалий. Разбирались сутки.',
      microComment: 'Внешние зависимости — это чужие решения твоих проблем.',
    },
    delegate: {
      effects: { money: -10, health: -5 },
      successMessage: 'Проблема на стороне Ozon. Включили очередь LogBroker с retry. Заказы дошли.',
      microComment: 'Retry + dead letter queue — джентльменский набор.',
    },
  },

  {
    id: 'wb_api_changed',
    title: 'API Wildberries изменился без предупреждения',
    description: 'WB обновил контракт без changelog. Наш адаптер ломается на новых полях.',
    urgency: 'high',
    ignore: {
      effects: { health: -15, reputation: -15, money: -10 },
      successMessage: 'Заказы теряются тихо. Партнёр начинает задавать вопросы.',
      delayedEffect: {
        delay: 3,
        effects: { money: -15, reputation: -10 },
        message: 'WB выставил штраф за несоответствие статусов по SLA.',
      },
      microComment: 'Changelog — это вежливость, которой не существует.',
    },
    delegate: {
      effects: { morale: -10, money: -10 },
      successMessage: 'Адаптер обновлён. Контракт зафиксирован в тестах.',
      microComment: 'Contract testing спас бы это раньше.',
    },
  },

  {
    id: 'payment_no_confirm',
    title: 'Платёжная система не подтверждает статусы',
    description: 'Платёжный шлюз принимает деньги, но не присылает callback. Заказы висят в "ожидании оплаты".',
    urgency: 'high',
    ignore: {
      effects: { money: -20, reputation: -15 },
      successMessage: 'Callbackи пришли с задержкой 4 часа. Заказы обработаны.',
      riskChance: 0.4,
      riskEffects: { money: -15, health: -10 },
      riskMessage: 'Часть заказов отменена автоматически. Деньги у клиентов зависли.',
      microComment: 'Деньги должны подтверждаться.',
    },
    delegate: {
      effects: { money: -10, techDebt: 5 },
      successMessage: 'Добавили polling как fallback. Статусы восстановлены.',
      microComment: 'Webhook + polling = надёжность.',
    },
  },

  {
    id: 'partner_json_schema',
    title: 'Партнёр шлёт другую схему JSON',
    description: 'Новый логистический партнёр прислал документацию, но в реальности структура данных другая.',
    urgency: 'medium',
    ignore: {
      effects: { health: -10, techDebt: 15 },
      successMessage: 'Парсер падает тихо. Часть данных теряется.',
      riskChance: 0.35,
      riskEffects: { health: -10, money: -10 },
      riskMessage: 'Накопили 300+ ошибок парсинга. Ручная разгребалка.',
      microComment: 'Документация и реальность — параллельные вселенные.',
    },
    delegate: {
      effects: { morale: -5, money: -5, techDebt: -5 },
      successMessage: 'Написали адаптер с валидацией схемы. Алерт на расхождения.',
      microComment: 'Schema validation — обязателен на всех границах систем.',
    },
  },

  {
    id: 'lms_lag',
    title: 'Синхронизация с LMS отстаёт на 2 часа',
    description: 'Данные о статусах заказов в LMS партнёра запаздывают на 2 часа. Операторы работают со старыми данными.',
    urgency: 'medium',
    ignore: {
      effects: { health: -10, reputation: -5 },
      successMessage: 'Работают со старыми данными. Иногда принимают неверные решения.',
      delayedEffect: {
        delay: 3,
        effects: { health: -15, money: -10 },
        message: 'Опоздание данных привело к двойной отгрузке 40 заказов.',
      },
      microComment: 'Eventual consistency бывает слишком eventual.',
    },
    delegate: {
      effects: { money: -5, techDebt: -5 },
      successMessage: 'Перешли на webhook-нотификации вместо поллинга. Лаг исчез.',
      microComment: 'Push лучше pull. Почти всегда.',
    },
  },

  {
    id: 'cdc_losing_events',
    title: 'CDC в YT начал терять события',
    description: 'CDC из базы в YT через LogBroker пропускает события: часть изменений не попадает в аналитику.',
    urgency: 'high',
    ignore: {
      effects: { techDebt: 20, health: -10 },
      successMessage: 'Аналитика живёт с дырами. Решения принимаются по неполным данным.',
      delayedEffect: {
        delay: 5,
        effects: { money: -20, reputation: -10 },
        message: 'Финансовый отчёт за период оказался неполным. Пересчёт.',
      },
      microComment: 'Потерянные события — это потерянная история.',
    },
    delegate: {
      effects: { morale: -10, money: -10, techDebt: -10 },
      successMessage: 'Нашли: переполнение буфера LogBroker. Увеличили retention, добавили алерт в Monium.',
      microComment: 'Backpressure в LogBroker нужно мониторить.',
    },
  },

  {
    id: 'geocoder_null',
    title: 'Геокодер иногда возвращает "ничего"',
    description: 'Внешний геокодер на 2–3% запросов возвращает пустой результат. Адреса не определяются.',
    urgency: 'medium',
    ignore: {
      effects: { health: -10, reputation: -5 },
      successMessage: 'Операторы руками правят адреса. Медленно, но работает.',
      microComment: 'null — это тоже ответ. Просто неудобный.',
    },
    delegate: {
      effects: { money: -5, techDebt: -5 },
      successMessage: 'Добавили fallback на резервный геокодер. Покрытие выросло.',
      riskChance: 0.25,
      riskEffects: { techDebt: 10, money: -5 },
      riskMessage: 'Резервный геокодер тоже иногда молчит. Нужен третий.',
      microComment: 'Fallback — это тоже система.',
    },
  },

  {
    id: 'billing_duplicates',
    title: 'Интеграция с биллингом дублирует операции',
    description: 'При сетевых ретраях биллинг создаёт задвоенные операции. Идемпотентности нет.',
    urgency: 'high',
    ignore: {
      effects: { money: -20, reputation: -15 },
      successMessage: 'Клиенты начали замечать двойные списания.',
      riskChance: 0.45,
      riskEffects: { money: -15, reputation: -15 },
      riskMessage: 'Несколько клиентов подали претензии. Ручной разбор.',
      microComment: 'Идемпотентность — это не опция.',
    },
    delegate: {
      effects: { money: -10, techDebt: -10 },
      successMessage: 'Добавили idempotency key. Дубли исчезли.',
      microComment: 'Сеть ненадёжна. Это аксиома.',
    },
  },

  // ── 💸 ФИНАНСЫ / БИЛЛИНГ ─────────────────────────────────────────────────

  {
    id: 'act_discrepancies',
    title: 'Акты закрытия месяца с расхождениями',
    description: 'Финансовый отдел нашёл расхождение в актах на 2.3 млн рублей. "Это ваши данные".',
    urgency: 'high',
    ignore: {
      effects: { reputation: -15, money: -10 },
      successMessage: 'Подписали как есть. Разберёмся потом.',
      delayedEffect: {
        delay: 4,
        effects: { money: -25, reputation: -10 },
        message: 'Налоговая нашла расхождения в актах. Штраф и пересдача.',
      },
      microComment: '"Потом" — самое дорогое слово в бизнесе.',
    },
    delegate: {
      effects: { morale: -10, money: -10 },
      successMessage: 'Нашли источник расхождений: дублирование при ретрае. Исправили.',
      microComment: 'Финансовые данные не прощают багов.',
    },
  },

  {
    id: 'billing_double_charge',
    title: 'Биллинг задвоил списания клиентам',
    description: 'После вчерашнего деплоя часть клиентов получила двойные списания. Поддержка получает шквал звонков.',
    urgency: 'critical',
    ignore: {
      effects: { reputation: -25, money: -20 },
      successMessage: 'Клиенты сами разберутся. Или не разберутся.',
      riskChance: 0.6,
      riskEffects: { reputation: -20, money: -15 },
      riskMessage: 'Скандал в соцсетях. Медиа написали о двойных списаниях.',
      microComment: 'Чужие деньги — самое чувствительное место.',
    },
    delegate: {
      effects: { money: -15, reputation: -10 },
      successMessage: 'Задвоения остановили, клиентам вернули деньги и извинились.',
      microComment: 'Быстрый возврат дороже медленного объяснения.',
    },
  },

  {
    id: 'tariffs_urgent',
    title: 'Финансы: пересчитать тарифы срочно сегодня',
    description: 'CFO хочет пересчитать тарифную сетку для 500 клиентов "к сегодняшнему совещанию".',
    urgency: 'medium',
    ignore: {
      effects: { reputation: -10 },
      successMessage: 'CFO провёл совещание с данными за прошлый квартал.',
      microComment: 'Иногда "срочно" значит "позже".',
    },
    delegate: {
      effects: { morale: -10, money: -5 },
      successMessage: 'Команда прогнала пересчёт. CFO доволен.',
      riskChance: 0.3,
      riskEffects: { money: -10, reputation: -10 },
      riskMessage: 'В пересчёте нашли ошибку. Часть тарифов применились не так.',
      microComment: 'Срочно и правильно — редкое сочетание.',
    },
  },

  {
    id: 'netting_mismatch',
    title: 'Неттинги не сошлись',
    description: 'Взаимозачёты с партнёрами не сошлись на 800 тысяч рублей. Риск налоговых последствий.',
    urgency: 'high',
    ignore: {
      effects: { money: -20 },
      successMessage: 'Подписали протокол разногласий. Пока ждём.',
      delayedEffect: {
        delay: 5,
        effects: { money: -30, reputation: -15 },
        message: 'ФНС запросила пояснения по расхождениям в неттингах. Штраф.',
      },
      microComment: 'Регуляторный риск — это не абстракция.',
    },
    delegate: {
      effects: { money: -15, morale: -5 },
      successMessage: 'Нашли баг в расчёте курсовых разниц. Данные выровняли.',
      microComment: 'Финансовые системы — не место для экспериментов.',
    },
  },

  {
    id: 'revenue_missing',
    title: 'Часть заказов не попала в выручку',
    description: 'Финансовый аналитик заметил: 3% заказов за прошлый месяц не отразились в расчёте выручки.',
    urgency: 'high',
    ignore: {
      effects: { money: -20 },
      successMessage: 'Расхождение списали на погрешность. Рискованно.',
      riskChance: 0.45,
      riskEffects: { money: -20, reputation: -10 },
      riskMessage: 'Аудиторы нашли то же расхождение. Пересдача отчётности.',
      microComment: 'Выручка — это не примерные цифры.',
    },
    delegate: {
      effects: { morale: -10, money: -5 },
      successMessage: 'Нашли: race condition при финализации заказа. Починили.',
      microComment: 'Финансовые события должны быть атомарными.',
    },
  },

  {
    id: 'invoices_with_errors',
    title: 'Счета ушли клиентам с ошибками',
    description: 'Ежемесячная рассылка счетов прошла с неверными суммами у 80 клиентов.',
    urgency: 'high',
    ignore: {
      effects: { reputation: -20, money: -10 },
      successMessage: 'Клиенты сами написали. Ручная корректировка.',
      riskChance: 0.35,
      riskEffects: { reputation: -15, money: -10 },
      riskMessage: 'Несколько крупных клиентов заморозили оплаты до разбирательства.',
      microComment: 'Счёт — это контракт. Ошибка в контракте — это конфликт.',
    },
    delegate: {
      effects: { money: -10, reputation: -5 },
      successMessage: 'Отозвали счета, отправили корректные с извинениями.',
      riskChance: 0.2,
      riskEffects: { reputation: -10 },
      riskMessage: 'Часть клиентов уже оплатила неверный счёт. Возвраты.',
      microComment: 'Скорость исправления важнее скорости отправки.',
    },
  },

  {
    id: 'balance_inconsistent',
    title: 'Balance: данные "неконсистентны"',
    description: 'Система баланса клиентов сообщает о внутренних расхождениях. Конкретики нет — просто флаг.',
    urgency: 'medium',
    ignore: {
      effects: { techDebt: 15, money: -5 },
      successMessage: 'Флаг игнорируется. Где-то копится проблема.',
      riskChance: 0.4,
      riskEffects: { money: -15, reputation: -10 },
      riskMessage: 'Расхождение вскрылось при сверке. Ручная работа на несколько дней.',
      microComment: 'Предупреждение — это не ошибка. Пока.',
    },
    delegate: {
      effects: { morale: -5, money: -10, techDebt: -10 },
      successMessage: 'Нашли: транзакция без компенсации при ошибке. Починили.',
      microComment: 'Saga pattern решает именно эти проблемы.',
    },
  },

  {
    id: 'bank_waiting',
    title: 'Банк ждёт данные, которых нет',
    description: 'Банк запросил выгрузку транзакций за квартал в формате, которого у нас нет.',
    urgency: 'high',
    ignore: {
      effects: { money: -20, reputation: -15 },
      successMessage: 'Банк прислал официальное требование. Хуже, чем было.',
      microComment: 'Регулятор не принимает "мы не сделали формат".',
    },
    delegate: {
      effects: { morale: -10, money: -10 },
      successMessage: 'Выгрузку сделали за ночь. Банк принял.',
      riskChance: 0.25,
      riskEffects: { money: -10, reputation: -5 },
      riskMessage: 'Данные прошли, но с техническими замечаниями. Исправление.',
      microComment: 'Банковский формат — отдельная профессия.',
    },
  },

  // ── 🧑‍💻 КОМАНДА / ОРГ ───────────────────────────────────────────────────

  {
    id: 'tl_wants_to_quit',
    title: 'Ключевой TL хочет уволиться',
    description: 'TL сервиса маршрутизации пришёл с разговором: "Я выгорел. Скорее всего ухожу".',
    urgency: 'high',
    ignore: {
      effects: { morale: -15, techDebt: 15 },
      successMessage: 'TL ещё не ушёл. Но настроение понятно.',
      riskChance: 0.5,
      riskEffects: { health: -20, morale: -10 },
      riskMessage: 'TL написал заявление. Весь контекст сервиса — в его голове.',
      microComment: 'Незаменимых нет. Пока они не уходят.',
      delayedEffect: {
        delay: 5,
        effects: { techDebt: 10, health: -10 },
        message: 'Никто не знает, как работает алгоритм диспетчеризации — TL ушёл.',
      },
    },
    delegate: {
      effects: { money: -15, morale: -5 },
      successMessage: 'Провели честный разговор. Скоуп пересмотрели, нагрузку снизили.',
      riskChance: 0.3,
      riskEffects: { money: -10, morale: -5 },
      riskMessage: 'Ретеншн-пакет не помог. TL ушёл, но хотя бы знания передал.',
      microComment: 'Удерживают условиями, а не деньгами.',
    },
  },

  {
    id: 'adjacent_team_ignores',
    title: 'Смежная команда игнорирует договорённости',
    description: 'Платформенная команда уже третий спринт не выполняет договорённости по SLA внутреннего API.',
    urgency: 'medium',
    ignore: {
      effects: { health: -10, morale: -5 },
      successMessage: 'Работаем с тем, что есть. Команда злится, но молчит.',
      microComment: 'Молчание — это не согласие.',
    },
    delegate: {
      effects: { reputation: -5, morale: -5 },
      successMessage: 'Провели эскалацию. Договорённости зафиксированы письменно.',
      microComment: 'Письменные договорённости работают лучше устных.',
    },
  },

  {
    id: 'rewrite_proposal',
    title: 'Разработчики предлагают переписать всё',
    description: 'Команда предлагает полный rewrite диспетчерской системы. "3 месяца и всё будет хорошо".',
    urgency: 'low',
    ignore: {
      effects: { morale: -5, techDebt: 5 },
      successMessage: 'Идея утихла сама. Текущая система продолжает разрушаться.',
      microComment: 'Second system syndrome — реальный диагноз.',
    },
    delegate: {
      effects: { money: -15, morale: 5 },
      successMessage: 'Rewrite начат. Команда мотивирована. Пока.',
      riskChance: 0.5,
      riskEffects: { techDebt: 20, morale: -15, money: -10 },
      riskMessage: 'Rewrite на 60% застрял. Теперь два сервиса в полурабочем состоянии.',
      microComment: 'Поддерживать два кода параллельно — двойная боль.',
    },
  },

  {
    id: 'qa_tests_wrong',
    title: 'QA: автотесты не отражают реальность',
    description: 'QA-инженер показал: 40% сценариев в автотестах не соответствуют реальному поведению системы.',
    urgency: 'medium',
    ignore: {
      effects: { techDebt: 15, health: -5 },
      successMessage: 'Зелёные тесты продолжают врать. Баги в проде находят клиенты.',
      riskChance: 0.35,
      riskEffects: { health: -10, reputation: -10 },
      riskMessage: 'Крупный инцидент пропустили из-за "прошедших" тестов.',
      microComment: 'Тест, который не ловит баги, хуже чем отсутствие теста.',
    },
    delegate: {
      effects: { morale: -5, money: -10, techDebt: -10 },
      successMessage: 'Переписали критические сценарии. Покрытие стало честным.',
      microComment: 'Тесты — это документация, которая исполняется.',
    },
  },

  {
    id: 'product_no_estimate',
    title: 'Продукт требует фичу без оценки',
    description: 'Продакт-менеджер хочет "быстрый" трекинг для B2B-клиентов к следующей неделе. Без обсуждения скоупа.',
    urgency: 'medium',
    ignore: {
      effects: { morale: -10, reputation: -5 },
      successMessage: 'Продакт обиделся. Сделали "как смогли".',
      microComment: '"Быстро" без скоупа — это дорого.',
    },
    delegate: {
      effects: { morale: -10, techDebt: 10 },
      successMessage: 'Сделали минимальный scope. Продакт доволен наполовину.',
      riskChance: 0.35,
      riskEffects: { health: -15, techDebt: 5 },
      riskMessage: 'Быстрая реализация сломала смежный флоу трекинга.',
      microComment: 'MVP без оценки — это технический долг в рассрочку.',
    },
  },

  {
    id: 'new_manager_micromanages',
    title: 'Новый руководитель микроменеджит команду',
    description: 'Новый менеджер в команде трекинга начал требовать почасовые статусы от разработчиков.',
    urgency: 'medium',
    ignore: {
      effects: { morale: -15 },
      successMessage: 'Команда терпит. Производительность падает.',
      riskChance: 0.35,
      riskEffects: { morale: -10, health: -5 },
      riskMessage: 'Двое разработчиков попросились в другую команду.',
      microComment: 'Контроль убивает самостоятельность.',
    },
    delegate: {
      effects: { reputation: -5, morale: -5 },
      successMessage: 'Провели разговор. Подход скорректирован.',
      microComment: 'Обратная связь — это тоже управленческий навык.',
    },
  },

  {
    id: 'team_burnout',
    title: 'Команда жалуется на выгорание',
    description: 'На ретро три человека сказали, что работают "на износ" уже второй месяц подряд.',
    urgency: 'high',
    ignore: {
      effects: { morale: -20 },
      successMessage: 'Люди держатся. Пока.',
      riskChance: 0.45,
      riskEffects: { morale: -10, health: -10 },
      riskMessage: 'Один разработчик взял больничный. Другой нашёл новое место.',
      microComment: 'Люди не серверы — не масштабируются до бесконечности.',
      delayedEffect: {
        delay: 4,
        effects: { morale: -15, health: -5 },
        message: 'Выгорание стало системным. Несколько увольнений.',
      },
    },
    delegate: {
      effects: { money: -10, morale: 5 },
      successMessage: 'Разгрузили бэклог. Ввели no-meeting day. Атмосфера улучшилась.',
      riskChance: 0.2,
      riskEffects: { morale: -10 },
      riskMessage: 'Меры помогли частично. Один человек всё равно ушёл.',
      microComment: 'Забота о команде — не мягкое, а стратегическое.',
    },
  },

  {
    id: 'no_owner',
    title: 'Никто не хочет брать ответственность за сервис',
    description: 'Сервис расчёта стоимости доставки "ничей": никто не знает, кто owner и кто должен поддерживать.',
    urgency: 'medium',
    ignore: {
      effects: { techDebt: 15, health: -5 },
      successMessage: 'Сервис продолжает жить без хозяина. Это опасно.',
      riskChance: 0.3,
      riskEffects: { health: -15, techDebt: 10 },
      riskMessage: 'Сервис упал. Некому чинить — ищут виноватых.',
      microComment: 'Бесхозный сервис — это тикающая бомба.',
    },
    delegate: {
      effects: { morale: -5, money: -5, techDebt: -5 },
      successMessage: 'Назначили владельца, провели передачу знаний.',
      microComment: 'Service ownership — основа надёжности.',
    },
  },

  // ── 🧠 АРХИТЕКТУРА / ТЕХДОЛГ ─────────────────────────────────────────────

  {
    id: 'legacy_critical',
    title: 'Legacy-сервис внезапно стал критическим',
    description: 'Выяснилось: старый сервис расчёта зон доставки, который "скоро выпилят", обрабатывает 60% трафика.',
    urgency: 'high',
    ignore: {
      effects: { techDebt: 20, health: -10 },
      successMessage: 'Сервис работает. Все боятся его трогать.',
      delayedEffect: {
        delay: 5,
        effects: { health: -25, techDebt: 10 },
        message: 'Legacy-сервис упал под нагрузкой пиковых продаж.',
      },
      microComment: 'Если работает — не трогай. Пока не упало.',
    },
    delegate: {
      effects: { money: -15, techDebt: -10 },
      successMessage: 'Задокументировали, выделили ресурсы на миграцию.',
      microComment: 'Легаси не исчезает — им управляют.',
    },
  },

  {
    id: 'new_service_peak',
    title: 'Новый сервис не выдерживает пиковую нагрузку',
    description: 'Сервис уведомлений о доставке лег под нагрузкой в 10x. Его только что выкатили.',
    urgency: 'high',
    ignore: {
      effects: { health: -20, reputation: -10 },
      successMessage: 'Нагрузка спала сама. В следующий пик будет хуже.',
      riskChance: 0.4,
      riskEffects: { health: -15, reputation: -10 },
      riskMessage: 'Сервис лёг снова. Клиенты не получают уведомления о доставке.',
      microComment: 'Load testing в prod — дорогой способ учиться.',
    },
    delegate: {
      effects: { money: -10, morale: -5 },
      successMessage: 'Настроили автоскейлинг и rate limiting. Выдержало.',
      riskChance: 0.25,
      riskEffects: { health: -10, money: -5 },
      riskMessage: 'Автоскейлинг съел бюджет быстрее, чем ожидалось.',
      microComment: 'Scalability надо планировать, а не реагировать.',
    },
  },

  {
    id: 'tvmtool_oom',
    title: 'tvmtool падает по OOM',
    description: 'tvmtool на нескольких инстансах начал падать с Out of Memory. Авторизация сервисов нестабильна.',
    urgency: 'high',
    ignore: {
      effects: { health: -15 },
      successMessage: 'Рестарт по watchdog. Временно держится.',
      riskChance: 0.5,
      riskEffects: { health: -20, reputation: -10 },
      riskMessage: 'tvmtool упал в пиковое время. Авторизация недоступна.',
      microComment: 'Memory leak — всегда хуже, чем кажется.',
    },
    delegate: {
      effects: { morale: -5, money: -5, techDebt: -5 },
      successMessage: 'Нашли утечку памяти в конфиге кэша. Исправили.',
      microComment: 'OOM — диагноз с чётким лечением.',
    },
  },

  {
    id: 'postgres_load',
    title: 'Postgres не справляется с нагрузкой',
    description: 'Основная БД трекинга начала деградировать под нагрузкой. Query latency x5. Дисковый I/O в красной зоне.',
    urgency: 'high',
    ignore: {
      effects: { health: -20, techDebt: 10 },
      successMessage: 'Пока держится. Завтра может быть хуже.',
      riskChance: 0.45,
      riskEffects: { health: -20, reputation: -15 },
      riskMessage: 'Postgres лёг под нагрузкой пика доставок. Сервис недоступен.',
      microComment: 'Вертикальное масштабирование не бесконечно.',
    },
    delegate: {
      effects: { money: -15, techDebt: -5 },
      successMessage: 'Добавили read-реплики и оптимизировали тяжёлые запросы.',
      riskChance: 0.3,
      riskEffects: { health: -15, money: -10 },
      riskMessage: 'Миграция реплик вызвала lag replication. Потеряли часть событий.',
      microComment: 'БД под нагрузкой — операция на открытом сердце.',
    },
  },

  {
    id: 'ydb_migration_stuck',
    title: 'Миграция в YDB зависла на полпути',
    description: 'Миграция таблиц истории заказов в YDB остановилась на 43%. Старые данные недоступны.',
    urgency: 'high',
    ignore: {
      effects: { techDebt: 20, health: -10 },
      successMessage: 'Работаем без части истории. Аналитика страдает.',
      riskChance: 0.35,
      riskEffects: { techDebt: 15, health: -10 },
      riskMessage: 'Откатить уже нельзя, закончить тоже. Данные в подвешенном состоянии.',
      microComment: 'Миграция без rollback plan — это ставка на удачу.',
    },
    delegate: {
      effects: { money: -10, morale: -10 },
      successMessage: 'Дописали инструмент дозаливки. Миграция завершена.',
      riskChance: 0.3,
      riskEffects: { techDebt: 15, health: -10 },
      riskMessage: 'Дозаливка создала дубли. Дедупликация заняла ещё 2 дня.',
      microComment: 'Идемпотентные миграции — не роскошь.',
    },
  },

  {
    id: 'missing_field',
    title: 'Сервис зависит от поля, которого больше нет',
    description: 'При рефакторинге убрали поле из схемы. Три сервиса молча его читают и молча получают null.',
    urgency: 'medium',
    ignore: {
      effects: { health: -10, techDebt: 15 },
      successMessage: 'Пока не взорвалось. Где-то тихо ломается логика.',
      riskChance: 0.4,
      riskEffects: { health: -15, reputation: -5 },
      riskMessage: 'Один из сервисов начал считать доставку бесплатной. Клиенты рады.',
      microComment: 'Тихие ошибки хуже громких.',
    },
    delegate: {
      effects: { morale: -5, money: -5, techDebt: -10 },
      successMessage: 'Ввели contract testing между сервисами. Поле восстановлено.',
      microComment: 'Каждая API-граница — это контракт.',
    },
  },

  {
    id: 'rollback_breaks_more',
    title: 'Rollback ломает прод сильнее, чем баг',
    description: 'В проде баг с расчётом тарифов. Дежурный начал rollback — и прод стало ещё хуже.',
    urgency: 'critical',
    ignore: {
      effects: { health: -25, reputation: -15 },
      successMessage: 'Откатили откат. Пытаемся форвардным фиксом.',
      riskChance: 0.4,
      riskEffects: { health: -15, reputation: -10 },
      riskMessage: 'Третья попытка — только хуже. Прод лежит уже 2 часа.',
      microComment: 'Иногда вперёд — единственный путь.',
    },
    delegate: {
      effects: { money: -10, health: -10 },
      successMessage: 'Написали hotfix, обошли конфликт схем. Работает.',
      riskChance: 0.3,
      riskEffects: { health: -15, techDebt: 10 },
      riskMessage: 'Hotfix закрыл баг, но создал новый. Разбираемся дальше.',
      microComment: 'Хотфикс в проде — хирургия без наркоза.',
    },
  },

  {
    id: 'nobody_understands',
    title: 'Никто не понимает, как это работает',
    description: 'Сервис расчёта стоимости хранения на складе — никто не знает его логику. Автор уволился в 2022.',
    urgency: 'medium',
    ignore: {
      effects: { techDebt: 20 },
      successMessage: 'Работает как работало. Трогать страшно.',
      delayedEffect: {
        delay: 4,
        effects: { health: -15, morale: -5 },
        message: 'Потребовалось изменить логику хранения — никто не знает с чего начать.',
      },
      microComment: 'Чёрный ящик хорош, пока не надо открыть.',
    },
    delegate: {
      effects: { money: -10, morale: -5, techDebt: -10 },
      successMessage: 'Провели reverse engineering, задокументировали логику.',
      microComment: 'Документация — это страховка от потери знаний.',
    },
  },

  // ── 🔥 ИНЦИДЕНТЫ ─────────────────────────────────────────────────────────

  {
    id: 'prod_down_metrics_green',
    title: 'Прод лежит, но метрики зелёные',
    description: 'Клиенты не могут оформить заказы. Monium показывает всё зелёным. Алерты молчат.',
    urgency: 'critical',
    ignore: {
      effects: { health: -25, reputation: -20 },
      successMessage: 'Само починилось. Метрики так и не покраснели.',
      riskChance: 0.55,
      riskEffects: { health: -15, reputation: -15, money: -10 },
      riskMessage: 'Простой длился 3 часа. Метрики молчали всё время.',
      microComment: 'Зелёный дашборд Monium — не гарантия работоспособности.',
    },
    delegate: {
      effects: { morale: -10, money: -5 },
      successMessage: 'Нашли: healthcheck проверял не тот endpoint. Починили.',
      microComment: 'Мониторь то, что реально важно пользователю.',
    },
  },

  {
    id: 'errors_grow_silent',
    title: 'Ошибки 500 растут, алерты молчат',
    description: 'Error rate API трекинга медленно ползёт вверх с 0.1% до 8% за последний час. Алерт не пришёл.',
    urgency: 'critical',
    ignore: {
      effects: { health: -20, reputation: -15 },
      successMessage: 'Само стабилизировалось. Причина неизвестна.',
      riskChance: 0.5,
      riskEffects: { health: -15, reputation: -10 },
      riskMessage: 'Error rate дошёл до 25%. Клиенты в панике.',
      microComment: 'Постепенная деградация опаснее мгновенного падения.',
    },
    delegate: {
      effects: { money: -5, techDebt: -5 },
      successMessage: 'Нашли и починили. Добавили alerting на rate of change.',
      microComment: 'Алерт на скорость изменения — важнее алерта на порог.',
    },
  },

  {
    id: 'logs_no_sense',
    title: 'Логи есть, но смысла в них нет',
    description: 'Инцидент идёт уже час. Логи есть, но они без контекста: нет request_id, нет трейсов.',
    urgency: 'medium',
    ignore: {
      effects: { health: -10, techDebt: 10 },
      successMessage: 'Инцидент закрыли на ощупь. Следующий будет таким же.',
      riskChance: 0.3,
      riskEffects: { health: -10, morale: -5 },
      riskMessage: 'Потеряли ещё 2 часа на следующем инциденте из-за тех же логов.',
      microComment: 'Лог без контекста — это шум.',
    },
    delegate: {
      effects: { morale: -10, money: -5, techDebt: -5 },
      successMessage: 'Добавили structured logging с trace_id. Следующий инцидент займёт 15 минут.',
      microComment: 'Observability — это инвестиция в спокойный сон.',
    },
  },

  {
    id: 'fix_made_worse',
    title: 'После фикса стало хуже',
    description: 'Задеплоили хотфикс бага с ETA. Теперь кроме ETA ломается ещё и расчёт зон.',
    urgency: 'high',
    ignore: {
      effects: { health: -20, morale: -10 },
      successMessage: 'Пытаемся жить с двумя багами одновременно.',
      riskChance: 0.4,
      riskEffects: { health: -15, reputation: -10 },
      riskMessage: 'Клиенты заметили оба бага. Поддержка захлёбывается.',
      microComment: 'Hotfix без тестов — это лотерея.',
    },
    delegate: {
      effects: { morale: -10, money: -5 },
      successMessage: 'Откатили хотфикс, написали нормальный фикс с тестами.',
      riskChance: 0.2,
      riskEffects: { health: -10, techDebt: 5 },
      riskMessage: 'Правильный фикс тоже задел что-то. Но уже мелкое.',
      microComment: 'Медленно и правильно — часто быстрее, чем быстро и криво.',
    },
  },

  {
    id: 'incident_closed_users_complain',
    title: 'Инцидент закрыли, клиенты всё ещё жалуются',
    description: 'По внутренним метрикам инцидент закрыт. Но в поддержку продолжают поступать жалобы.',
    urgency: 'high',
    ignore: {
      effects: { reputation: -20 },
      successMessage: 'Жалобы сами утихли через день. Клиентов сдержанно успокоили.',
      riskChance: 0.4,
      riskEffects: { reputation: -15, money: -10 },
      riskMessage: 'Несколько B2B-клиентов запросили SLA-отчёт и компенсации.',
      microComment: 'Метрика инцидента — это не ощущение клиента.',
    },
    delegate: {
      effects: { money: -5, reputation: -5 },
      successMessage: 'Дополнительная проверка выявила оставшиеся артефакты. Дочистили.',
      riskChance: 0.2,
      riskEffects: { reputation: -10 },
      riskMessage: 'Нашли ещё один класс затронутых клиентов.',
      microComment: 'Инцидент закрыт тогда, когда закрыт клиентский опыт.',
    },
  },

  {
    id: 'one_region_broken',
    title: 'Всё работает, кроме одного региона',
    description: 'Всё в норме, кроме Новосибирска: там доставки не создаются. Регион — топ-3 по объёму.',
    urgency: 'medium',
    ignore: {
      effects: { reputation: -10, health: -5 },
      successMessage: 'Новосибирск работает на ручном режиме. Клиенты злятся.',
      microComment: 'Регион — это не "маленькая проблема".',
    },
    delegate: {
      effects: { morale: -5, money: -5 },
      successMessage: 'Нашли: отдельный конфиг для региона с опечаткой. Исправили.',
      microComment: 'Regional configs — всегда подозреваемый номер один.',
    },
  },

  {
    id: 'only_at_night',
    title: 'Система падает только ночью',
    description: 'Три ночи подряд в 3:00–4:00 деградирует сервис диспетчеризации. Днём всё ок.',
    urgency: 'medium',
    ignore: {
      effects: { health: -10 },
      successMessage: 'Ночные смены справляются. Утром всё хорошо.',
      delayedEffect: {
        delay: 3,
        effects: { health: -20, morale: -10 },
        message: 'Ночные падения участились. Дежурный выгорает.',
      },
      microComment: 'Ночные инциденты имеют свою особую красоту.',
    },
    delegate: {
      effects: { morale: -10, money: -10, techDebt: -5 },
      successMessage: 'Нашли: cron-задача перестройки кэша перегружала БД. Перенесли на 5:00.',
      microComment: 'Ночные cron-задачи — отдельная экосистема.',
    },
  },

  {
    id: 'unreproducible_bug',
    title: 'Нельзя воспроизвести баг, но он есть',
    description: 'Клиент присылает скриншоты бага в расчёте стоимости. Воспроизвести не удаётся уже 3 дня.',
    urgency: 'medium',
    ignore: {
      effects: { health: -5, techDebt: 10 },
      successMessage: 'Клиент перестал писать. Баг, вероятно, исчез сам.',
      riskChance: 0.35,
      riskEffects: { reputation: -15, money: -10 },
      riskMessage: 'Клиент нашёл баг у конкурентов тоже. Написал в Telegram-канал.',
      microComment: '"Не воспроизводится" не значит "не существует".',
    },
    delegate: {
      effects: { morale: -10, money: -5 },
      successMessage: 'Добавили детальный логгинг, воспроизвели через неделю. Исправили.',
      microComment: 'Трудновоспроизводимые баги — самые интересные.',
    },
  },

  // ── 📊 ПРОДУКТ / БИЗНЕС ──────────────────────────────────────────────────

  {
    id: 'cost_per_order',
    title: 'Снизить cost per order на 20%',
    description: 'Операционный директор хочет снизить CPO на 20% без изменения процессов. "Это задача IT".',
    urgency: 'medium',
    ignore: {
      effects: { reputation: -10, money: -5 },
      successMessage: 'CPO не снизился. На следующем квартале снова поставят цель.',
      microComment: 'Оптимизация без данных — это интуиция, а не стратегия.',
    },
    delegate: {
      effects: { morale: -10, money: -10 },
      successMessage: 'Нашли 3 узких места. Оптимизировали алгоритм кластеризации заказов.',
      riskChance: 0.35,
      riskEffects: { techDebt: 15, health: -5 },
      riskMessage: 'Оптимизация снизила CPO на 8%, но ухудшила точность ETA.',
      microComment: 'Оптимизация одной метрики часто портит другую.',
    },
  },

  {
    id: 'new_market_2months',
    title: 'Новый рынок через 2 месяца',
    description: 'Бизнес договорился о выходе в Казахстан. Запуск через 2 месяца. IT узнаёт сейчас.',
    urgency: 'high',
    ignore: {
      effects: { reputation: -15, money: -10 },
      successMessage: 'Запуск провалился. Локализации, валюты, адреса — ничего не готово.',
      riskChance: 0.5,
      riskEffects: { reputation: -15, health: -10 },
      riskMessage: 'Партнёр в Казахстане расторг соглашение из-за неготовности.',
      microComment: 'IT не телепорт. Географию надо планировать.',
    },
    delegate: {
      effects: { money: -20, morale: -15, techDebt: 15 },
      successMessage: 'Запустились с минимальным скоупом. Работает, но криво.',
      riskChance: 0.3,
      riskEffects: { health: -10, reputation: -10 },
      riskMessage: 'Запустились, но валютный расчёт ломался первые две недели.',
      microComment: 'MVP для нового рынка — это не прод, это эксперимент.',
    },
  },

  {
    id: 'sla_not_holding',
    title: 'Клиенты хотят SLA, который вы не держите',
    description: 'Крупный B2B-клиент просит SLA 99.9% по доставке в день. Текущий показатель — 97.2%.',
    urgency: 'high',
    ignore: {
      effects: { reputation: -20, money: -10 },
      successMessage: 'Клиент подписал договор с оговорками. Время работает против вас.',
      riskChance: 0.4,
      riskEffects: { money: -20, reputation: -10 },
      riskMessage: 'SLA нарушен в первый же месяц. Штрафные санкции.',
      microComment: 'Обещать то, что не можешь — дорого.',
    },
    delegate: {
      effects: { money: -15, reputation: 5 },
      successMessage: 'Честно обозначили реальный SLA. Клиент оценил прозрачность.',
      riskChance: 0.3,
      riskEffects: { reputation: -10, money: -5 },
      riskMessage: 'Клиент не согласился с реальными цифрами. Пошёл к конкурентам.',
      microComment: 'Честный SLA лучше красивого.',
    },
  },

  {
    id: 'competitors_cheaper',
    title: 'Конкуренты быстрее и дешевле',
    description: 'СДЭК выкатил обновлённый тариф и real-time трекинг. Несколько клиентов прислали сравнение.',
    urgency: 'medium',
    ignore: {
      effects: { reputation: -10 },
      successMessage: 'Часть клиентов ушла. Остальные пока остались.',
      riskChance: 0.35,
      riskEffects: { reputation: -10, money: -15 },
      riskMessage: 'Три крупных клиента мигрировали к конкурентам.',
      microComment: 'Конкуренция — лучший продакт-менеджер.',
    },
    delegate: {
      effects: { money: -15, morale: -5, reputation: 5 },
      successMessage: 'Запустили roadmap-ответ. Клиенты увидели движение.',
      microComment: 'На конкурентов реагируют клиенты, не технологии.',
    },
  },

  {
    id: 'like_amazon',
    title: '"Нужно сделать как у Amazon"',
    description: 'CEO вернулся с конференции и хочет "такой же предсказуемый трекинг, как у Amazon". К Q3.',
    urgency: 'low',
    ignore: {
      effects: { reputation: -5 },
      successMessage: 'CEO нашёл новую идею. Про Amazon забыл.',
      microComment: 'Бенчмарк на Amazon — это отдельный вид спорта.',
    },
    delegate: {
      effects: { money: -20, techDebt: 20, morale: -10 },
      successMessage: 'Сделали ML-предсказание ETA. Работает в 70% случаев.',
      riskChance: 0.4,
      riskEffects: { techDebt: 10, reputation: -5 },
      riskMessage: 'ML-модель предсказывает плохо на новых маршрутах. Репутационный риск.',
      microComment: 'Amazon строил это 10 лет. У вас — квартал.',
    },
  },

  {
    id: 'marketing_sold_nonexistent',
    title: 'Маркетинг продал фичу, которой нет',
    description: 'Маркетинг анонсировал "мгновенное подтверждение доставки" на сайте. Такой фичи нет.',
    urgency: 'high',
    ignore: {
      effects: { reputation: -20, money: -10 },
      successMessage: 'Клиенты пишут в поддержку. "Где мгновенное подтверждение?"',
      riskChance: 0.4,
      riskEffects: { reputation: -15, morale: -10 },
      riskMessage: 'Публикация в Telegram-каналах: "обещали — не сделали".',
      microComment: 'Маркетинг и IT должны говорить до публикации.',
    },
    delegate: {
      effects: { money: -10, morale: -15, techDebt: 15 },
      successMessage: 'Сделали базовую версию за спринт. Анонс не провалился полностью.',
      riskChance: 0.35,
      riskEffects: { reputation: -15, techDebt: 5 },
      riskMessage: 'Быстрая реализация работала нестабильно. Хуже, чем ничего.',
      microComment: 'Feature flag позволяет анонсировать честно.',
    },
  },

  {
    id: 'partner_custom_integration',
    title: 'Партнёр требует кастомную интеграцию',
    description: 'Новый крупный партнёр готов подписать контракт, но только если под него будет кастомный API.',
    urgency: 'medium',
    ignore: {
      effects: { reputation: -10, money: -10 },
      successMessage: 'Партнёр ушёл к тем, кто согласился сделать интеграцию.',
      microComment: 'Каждый кастомный клиент — это особый путь.',
    },
    delegate: {
      effects: { money: -15, morale: -10, techDebt: 10 },
      successMessage: 'Интеграция сделана. Партнёр подписал контракт.',
      riskChance: 0.35,
      riskEffects: { techDebt: 10, morale: -5 },
      riskMessage: 'Партнёр уже хочет расширение кастомного API. Бесконечно.',
      microComment: 'Кастомная интеграция — начало долгих отношений.',
    },
  },

  {
    id: 'ai_in_everything',
    title: '"AI во всём" к концу квартала',
    description: 'Руководство хочет "внедрить AI" в логистику к квартальному review. Конкретики — ноль.',
    urgency: 'medium',
    ignore: {
      effects: { reputation: -5 },
      successMessage: 'Квартальный review прошёл без AI. Руководство расстроено.',
      microComment: 'AI без задачи — это просто слово.',
    },
    delegate: {
      effects: { money: -20, techDebt: 15, morale: -10 },
      successMessage: 'Запустили ML-предсказание задержек. Звучит как AI — работает как эвристика.',
      riskChance: 0.35,
      riskEffects: { techDebt: 10, reputation: -5 },
      riskMessage: 'Модель обучена на плохих данных. Предсказания хуже среднего.',
      microComment: 'AI — это данные + задача + инженерия. Не хайп.',
    },
  },

]
