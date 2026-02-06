// Расширенные случайные события
const extendedEvents = [
    {
        id: 'supplier_discount',
        title: '🎉 Акция поставщика',
        description: 'Поставщик предлагает скидку 15% на все товары сегодня!',
        probability: 0.15,
        actions: [
            {
                text: 'Воспользоваться акцией',
                effect: { priceModifier: 0.85, message: 'Скидка 15% активирована на день!' }
            }
        ]
    },
    {
        id: 'competitor_problem',
        title: '📰 Проблемы конкурента',
        description: 'У главного конкурента проблемы с поставками. Клиенты ищут альтернативы.',
        probability: 0.1,
        actions: [
            {
                text: 'Активно привлекать клиентов',
                effect: { salesBonus: 1.3, message: 'Бонус к продажам +30% на день!' }
            }
        ]
    },
    {
        id: 'vip_client',
        title: '👑 VIP клиент',
        description: 'К вам обратился очень важный клиент с крупным заказом.',
        probability: 0.08,
        actions: [
            {
                text: 'Уделить особое внимание',
                effect: { marginBonus: 1.5, message: 'Комиссия увеличена в 1.5 раза!' }
            }
        ]
    },
    {
        id: 'training_course',
        title: '📚 Курсы повышения квалификации',
        description: 'Компания предлагает пройти курсы. Это улучшит навыки, но займет время.',
        probability: 0.12,
        actions: [
            {
                text: 'Пройти курсы',
                effect: { reputation: 10, message: 'Репутация +10! Навыки улучшены!' }
            },
            {
                text: 'Отказаться',
                effect: { message: 'Продолжаете работать как обычно.' }
            }
        ]
    },
    {
        id: 'equipment_shortage',
        title: '⚠️ Дефицит товара',
        description: 'Популярный товар закончился на складе. Цены на аналоги выросли.',
        probability: 0.1,
        actions: [
            {
                text: 'Предлагать аналоги',
                effect: { priceModifier: 1.2, message: 'Цены выросли на 20%' }
            }
        ]
    },
    {
        id: 'positive_review',
        title: '⭐ Отличный отзыв',
        description: 'Клиент оставил восторженный отзыв о вашей работе в интернете.',
        probability: 0.15,
        actions: [
            {
                text: 'Поблагодарить клиента',
                effect: { reputation: 5, message: 'Репутация +5! Новые клиенты узнают о вас.' }
            }
        ]
    }
];

function getRandomExtendedEvent() {
    const availableEvents = extendedEvents.filter(event => Math.random() < event.probability);
    if (availableEvents.length === 0) return null;
    
    return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}

// Обновляем основную функцию событий
function getRandomEvent() {
    // Сначала проверяем расширенные события
    const extendedEvent = getRandomExtendedEvent();
    if (extendedEvent) return extendedEvent;
    
    // Если нет расширенных, используем базовые
    if (Math.random() < 0.3) {
        const events = [
            {
                title: '☕ Кофе-брейк',
                description: 'Время для кофе! Восстанавливает энергию.',
                actions: [
                    {
                        text: 'Выпить кофе',
                        effect: { reputation: 2, message: 'Репутация +2' }
                    }
                ]
            },
            {
                title: '📞 Звонок от клиента',
                description: 'Довольный клиент рекомендует вас друзьям.',
                actions: [
                    {
                        text: 'Поблагодарить',
                        effect: { reputation: 3, message: 'Репутация +3' }
                    }
                ]
            }
        ];
        return events[Math.floor(Math.random() * events.length)];
    }
    return null;
}