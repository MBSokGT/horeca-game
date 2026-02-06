const randomEvents = [
    {
        id: 1,
        title: "🎉 Акция от поставщика!",
        description: "Поставщик предлагает скидку 15% на все холодильное оборудование!",
        type: "discount",
        category: "kitchen",
        effect: 0.85,
        actions: [
            { text: "Воспользоваться акцией", effect: "apply" },
            { text: "Пропустить", effect: "skip" }
        ]
    },
    {
        id: 2,
        title: "⚡ Конкурент снизил цены!",
        description: "Ваш главный конкурент объявил скидки. Клиенты стали более требовательными к ценам.",
        type: "competition",
        effect: 0.9,
        actions: [
            { text: "Тоже снизить цены на 10%", effect: "match" },
            { text: "Делать ставку на качество", effect: "quality" }
        ]
    },
    {
        id: 3,
        title: "📱 Новый продукт в линейке!",
        description: "Появилось инновационное оборудование с повышенной маржинальностью!",
        type: "new_product",
        effect: 1.3,
        actions: [
            { text: "Добавить в каталог", effect: "add" },
            { text: "Подождать отзывов", effect: "wait" }
        ]
    },
    {
        id: 4,
        title: "🚚 Задержка поставки",
        description: "Поставка популярного оборудования задерживается на неделю.",
        type: "delay",
        effect: 0.8,
        actions: [
            { text: "Предложить аналог", effect: "substitute" },
            { text: "Дождаться поставки", effect: "wait" }
        ]
    },
    {
        id: 5,
        title: "⭐ Положительный отзыв!",
        description: "Довольный клиент оставил отличный отзыв и рекомендует вас друзьям!",
        type: "reputation",
        effect: 1.15,
        actions: [
            { text: "Использовать в рекламе", effect: "promote" },
            { text: "Поблагодарить клиента", effect: "thank" }
        ]
    },
    {
        id: 6,
        title: "💰 Крупный тендер",
        description: "Появилась возможность участвовать в тендере на оснащение сети ресторанов!",
        type: "tender",
        effect: 2.0,
        actions: [
            { text: "Участвовать (риск)", effect: "participate" },
            { text: "Пропустить", effect: "skip" }
        ]
    },
    {
        id: 7,
        title: "🔧 Проблемы с качеством",
        description: "У одного из поставщиков обнаружились проблемы с качеством продукции.",
        type: "quality_issue",
        effect: 0.7,
        actions: [
            { text: "Сменить поставщика", effect: "change" },
            { text: "Дать второй шанс", effect: "forgive" }
        ]
    },
    {
        id: 8,
        title: "📈 Рост спроса",
        description: "В городе открывается много новых заведений - спрос на оборудование растет!",
        type: "demand_growth",
        effect: 1.25,
        actions: [
            { text: "Поднять цены", effect: "increase_prices" },
            { text: "Сохранить цены", effect: "keep_prices" }
        ]
    }
];

function getRandomEvent() {
    // 30% шанс события каждый ход
    if (Math.random() < 0.3) {
        return randomEvents[Math.floor(Math.random() * randomEvents.length)];
    }
    return null;
}

function applyEventEffect(event, action, gameState) {
    let effect = { sales: 0, reputation: 0, message: "" };
    
    switch (event.type) {
        case "discount":
            if (action === "apply") {
                effect.message = "Вы получили скидку! Следующая сделка будет выгоднее.";
                effect.discount = event.effect;
            } else {
                effect.message = "Вы пропустили акцию.";
            }
            break;
            
        case "competition":
            if (action === "match") {
                effect.message = "Вы снизили цены. Клиенты довольны, но прибыль меньше.";
                effect.priceModifier = 0.9;
                effect.reputation = 10;
            } else {
                effect.message = "Вы делаете ставку на качество. Некоторые клиенты ценят это.";
                effect.reputation = 5;
            }
            break;
            
        case "new_product":
            if (action === "add") {
                effect.message = "Новый продукт добавлен! Повышенная маржинальность.";
                effect.marginBonus = event.effect;
            } else {
                effect.message = "Вы решили подождать отзывов.";
            }
            break;
            
        case "reputation":
            effect.message = "Ваша репутация улучшилась! Клиенты доверяют вам больше.";
            effect.reputation = 20;
            effect.salesBonus = event.effect;
            break;
            
        case "tender":
            if (action === "participate") {
                if (Math.random() < 0.6) {
                    effect.message = "Вы выиграли тендер! Огромная сделка!";
                    effect.sales = 500000;
                } else {
                    effect.message = "Тендер проигран. Потрачено время и ресурсы.";
                    effect.sales = -50000;
                }
            } else {
                effect.message = "Вы решили не рисковать.";
            }
            break;
            
        default:
            effect.message = "Событие обработано.";
    }
    
    return effect;
}