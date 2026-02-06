// База данных клиентов и диалогов для DISC игры
const discClientsDatabase = [
    // D-тип клиенты (Доминантные)
    {
        id: 1,
        name: "Максим Быстров",
        discType: "D",
        horecaType: "ресторан",
        scenario: "первый контакт",
        traits: ["результат-ориентирован", "нетерпелив", "прямолинеен"],
        keySignals: ["Времени мало", "К делу", "Быстро решаем"],
        redFlags: ["Мне нужно быстро", "Без лишних слов", "Сколько стоит"],
        dialog: [
            {
                clientMessage: "Времени мало. Нужно оборудование для ресторана. Что можете предложить?",
                playerOptions: [
                    { text: "Покажу топ-3 решения", type: "optimal", points: 15 },
                    { text: "Расскажите о потребностях", type: "neutral", points: 5 },
                    { text: "Давайте знакомиться", type: "bad", points: -10 }
                ]
            },
            {
                clientMessage: "Хорошо. Цена? Сроки поставки?",
                playerOptions: [
                    { text: "500к, поставка 3 дня", type: "optimal", points: 15 },
                    { text: "Зависит от комплектации", type: "neutral", points: 0 },
                    { text: "Нужно все обсудить", type: "bad", points: -15 }
                ]
            },
            {
                clientMessage: "Дорого. Есть дешевле?",
                playerOptions: [
                    { text: "Да, 350к базовый", type: "optimal", points: 10 },
                    { text: "Можем скидку 10%", type: "neutral", points: 5 },
                    { text: "Качество стоит денег", type: "bad", points: -10 }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Елена Решительная",
        discType: "D", 
        horecaType: "кейтеринг",
        scenario: "повторная продажа",
        traits: ["властная", "требовательная", "целеустремленная"],
        keySignals: ["Нужен результат", "Без проволочек", "Решаем сейчас"],
        redFlags: ["Мне нужен результат", "Хватит болтать", "Да или нет"],
        dialog: [
            {
                clientMessage: "Прошлый заказ устроил. Нужно еще 20 комплектов. Когда привезете?",
                playerOptions: [
                    { text: "Завтра к 10 утра", type: "optimal", points: 15 },
                    { text: "В течение недели", type: "neutral", points: 0 },
                    { text: "Нужно уточнить склад", type: "bad", points: -10 }
                ]
            },
            {
                clientMessage: "Отлично. Цена как в прошлый раз?",
                playerOptions: [
                    { text: "Да, без изменений", type: "optimal", points: 10 },
                    { text: "Небольшая корректировка", type: "neutral", points: -5 },
                    { text: "Нужно пересчитать", type: "bad", points: -15 }
                ]
            }
        ]
    },

    // I-тип клиенты (Влиятельные)
    {
        id: 3,
        name: "Анна Общительная",
        discType: "I",
        horecaType: "кафе",
        scenario: "первый контакт", 
        traits: ["разговорчивая", "эмоциональная", "социальная"],
        keySignals: ["Как дела?", "Расскажите о себе", "Что думают люди"],
        redFlags: ["Все говорят", "Модно сейчас", "Друзья советуют"],
        dialog: [
            {
                clientMessage: "Привет! Как дела? Открываю кафе, друзья советуют у вас покупать. Что скажете?",
                playerOptions: [
                    { text: "Отлично! Расскажу о нас", type: "optimal", points: 15 },
                    { text: "Какое оборудование нужно?", type: "neutral", points: 5 },
                    { text: "Вот прайс-лист", type: "bad", points: -10 }
                ]
            },
            {
                clientMessage: "Супер! А что клиенты говорят о качестве? Много положительных отзывов?",
                playerOptions: [
                    { text: "Да! Покажу отзывы", type: "optimal", points: 15 },
                    { text: "Качество хорошее", type: "neutral", points: 5 },
                    { text: "Гарантия 2 года", type: "bad", points: -5 }
                ]
            },
            {
                clientMessage: "Замечательно! А дизайн красивый? Гости будут восхищаться?",
                playerOptions: [
                    { text: "Конечно! Очень стильно", type: "optimal", points: 10 },
                    { text: "Функциональный дизайн", type: "neutral", points: 0 },
                    { text: "Главное - надежность", type: "bad", points: -10 }
                ]
            }
        ]
    },
    {
        id: 4,
        name: "Игорь Вдохновитель",
        discType: "I",
        horecaType: "бар",
        scenario: "решение конфликта",
        traits: ["экспрессивный", "оптимистичный", "импульсивный"],
        keySignals: ["Это же ужасно!", "Что люди подумают", "Нужно исправить"],
        redFlags: ["Все увидят", "Репутация пострадает", "Расскажу всем"],
        dialog: [
            {
                clientMessage: "Это катастрофа! Кофемашина сломалась в час пик! Что гости подумают?",
                playerOptions: [
                    { text: "Понимаю! Срочно решим", type: "optimal", points: 15 },
                    { text: "Вышлем мастера", type: "neutral", points: 5 },
                    { text: "По гарантии бесплатно", type: "bad", points: -5 }
                ]
            },
            {
                clientMessage: "Хорошо, но как объяснить гостям? Они же расстроятся!",
                playerOptions: [
                    { text: "Предложите альтернативу", type: "optimal", points: 10 },
                    { text: "Скажите про ремонт", type: "neutral", points: 0 },
                    { text: "Это технические неполадки", type: "bad", points: -10 }
                ]
            }
        ]
    },

    // S-тип клиенты (Стабильные)
    {
        id: 5,
        name: "Сергей Надежный",
        discType: "S",
        horecaType: "ресторан",
        scenario: "первый контакт",
        traits: ["осторожный", "стабильный", "консервативный"],
        keySignals: ["Нужно подумать", "А гарантии есть?", "Не хочу рисковать"],
        redFlags: ["Время есть", "Нужно обдумать", "А что если"],
        dialog: [
            {
                clientMessage: "Добрый день. Ищу надежного поставщика. Как долго работаете на рынке?",
                playerOptions: [
                    { text: "15 лет, стабильно работаем", type: "optimal", points: 15 },
                    { text: "Мы лидеры рынка", type: "neutral", points: 5 },
                    { text: "Новая динамичная компания", type: "bad", points: -10 }
                ]
            },
            {
                clientMessage: "Хорошо. А гарантии какие? Не хочется потом проблем.",
                playerOptions: [
                    { text: "3 года гарантии + сервис", type: "optimal", points: 15 },
                    { text: "Стандартная гарантия", type: "neutral", points: 0 },
                    { text: "Редко ломается", type: "bad", points: -10 }
                ]
            },
            {
                clientMessage: "А можно посмотреть, как работает у других? Есть примеры?",
                playerOptions: [
                    { text: "Конечно! Покажу объекты", type: "optimal", points: 10 },
                    { text: "Есть портфолио", type: "neutral", points: 5 },
                    { text: "Поверьте на слово", type: "bad", points: -15 }
                ]
            }
        ]
    },
    {
        id: 6,
        name: "Мария Спокойная",
        discType: "S",
        horecaType: "кафе",
        scenario: "повторная продажа",
        traits: ["терпеливая", "лояльная", "методичная"],
        keySignals: ["Как обычно", "Все устраивает", "Не меняем"],
        redFlags: ["Зачем менять", "Привыкли к этому", "Работает же"],
        dialog: [
            {
                clientMessage: "Здравствуйте. Нужно докупить посуду, как в прошлый раз. Все устраивает.",
                playerOptions: [
                    { text: "Отлично! Тот же комплект", type: "optimal", points: 15 },
                    { text: "Есть новинки получше", type: "neutral", points: -5 },
                    { text: "Рекомендую обновиться", type: "bad", points: -15 }
                ]
            },
            {
                clientMessage: "Хорошо. А цены не изменились? Не хочется сюрпризов.",
                playerOptions: [
                    { text: "Цены стабильные", type: "optimal", points: 10 },
                    { text: "Небольшой рост 5%", type: "neutral", points: 0 },
                    { text: "Рынок диктует цены", type: "bad", points: -10 }
                ]
            }
        ]
    },

    // C-тип клиенты (Сознательные)
    {
        id: 7,
        name: "Дмитрий Аналитик",
        discType: "C",
        horecaType: "ресторан",
        scenario: "первый контакт",
        traits: ["детальный", "аналитичный", "перфекционист"],
        keySignals: ["Какие характеристики?", "Нужны документы", "А сертификаты есть?"],
        redFlags: ["Нужны детали", "Документы покажите", "Сравню варианты"],
        dialog: [
            {
                clientMessage: "Здравствуйте. Нужна подробная информация о холодильном оборудовании. Какие характеристики?",
                playerOptions: [
                    { text: "Вот техспецификации", type: "optimal", points: 15 },
                    { text: "Отличное качество", type: "neutral", points: 0 },
                    { text: "Лучшее на рынке", type: "bad", points: -10 }
                ]
            },
            {
                clientMessage: "Спасибо. А энергопотребление какое? Есть сертификаты энергоэффективности?",
                playerOptions: [
                    { text: "Класс A++, вот документы", type: "optimal", points: 15 },
                    { text: "Экономичный", type: "neutral", points: -5 },
                    { text: "Не переживайте об этом", type: "bad", points: -15 }
                ]
            },
            {
                clientMessage: "Хорошо. А гарантийные обязательства? Что входит в сервис?",
                playerOptions: [
                    { text: "Вот договор сервиса", type: "optimal", points: 10 },
                    { text: "Полная гарантия", type: "neutral", points: 0 },
                    { text: "Все будет хорошо", type: "bad", points: -15 }
                ]
            }
        ]
    },
    {
        id: 8,
        name: "Елена Точная",
        discType: "C",
        horecaType: "кейтеринг",
        scenario: "решение конфликта",
        traits: ["скрупулезная", "требовательная", "систематичная"],
        keySignals: ["Это неправильно", "По договору должно", "Нарушение условий"],
        redFlags: ["Согласно пункту", "Это не соответствует", "Требую объяснений"],
        dialog: [
            {
                clientMessage: "Согласно договору поставка должна была быть 15 числа. Сегодня 18-е. Объясните задержку.",
                playerOptions: [
                    { text: "Проверю документооборот", type: "optimal", points: 15 },
                    { text: "Извините за задержку", type: "neutral", points: 0 },
                    { text: "Бывает, не критично", type: "bad", points: -20 }
                ]
            },
            {
                clientMessage: "В пункте 3.2 указано возмещение за каждый день просрочки. Как будете компенсировать?",
                playerOptions: [
                    { text: "Рассчитаем по договору", type: "optimal", points: 15 },
                    { text: "Сделаем скидку", type: "neutral", points: 5 },
                    { text: "Давайте договоримся", type: "bad", points: -10 }
                ]
            }
        ]
    }
];

// Дополнительные клиенты для разнообразия
const additionalDiscClients = [
    // D-тип
    {
        id: 9,
        name: "Виктор Напор",
        discType: "D",
        horecaType: "бар",
        scenario: "первый контакт",
        traits: ["агрессивный", "нетерпеливый", "авторитарный"],
        keySignals: ["Сколько стоит", "Когда привезете", "Решаем быстро"],
        redFlags: ["Время - деньги", "Без воды", "Конкретно"],
        dialog: [
            {
                clientMessage: "Нужны барные стулья. 20 штук. Сколько стоит? Когда привезете?",
                playerOptions: [
                    { text: "50к, завтра привезем", type: "optimal", points: 15 },
                    { text: "Покажу каталог", type: "neutral", points: -5 },
                    { text: "Расскажите о баре", type: "bad", points: -15 }
                ]
            }
        ]
    },
    {
        id: 10,
        name: "Ольга Энергичная",
        discType: "D",
        horecaType: "кафе",
        scenario: "повторная продажа",
        traits: ["энергичная", "требовательная", "прямая"],
        keySignals: ["Как в прошлый раз", "Быстро нужно", "Без изменений"],
        redFlags: ["Времени нет", "Срочно", "Как обычно"],
        dialog: [
            {
                clientMessage: "Нужно еще 10 столов, как покупали месяц назад. Срочно нужно.",
                playerOptions: [
                    { text: "Есть на складе, завтра", type: "optimal", points: 15 },
                    { text: "Уточню наличие", type: "neutral", points: -5 },
                    { text: "А может другую модель?", type: "bad", points: -15 }
                ]
            }
        ]
    },

    // I-тип
    {
        id: 11,
        name: "Алексей Душевный",
        discType: "I",
        horecaType: "ресторан",
        scenario: "первый контакт",
        traits: ["харизматичный", "общительный", "вдохновляющий"],
        keySignals: ["Классно!", "Супер идея", "Гости оценят"],
        redFlags: ["Все в восторге", "Модная штука", "Тренд сейчас"],
        dialog: [
            {
                clientMessage: "Привет! Открываю ресторан мечты! Хочу, чтобы все ахнули от красоты! Что посоветуете?",
                playerOptions: [
                    { text: "Покажу дизайнерские новинки", type: "optimal", points: 15 },
                    { text: "Есть стандартные решения", type: "neutral", points: 0 },
                    { text: "Вот прайс-лист", type: "bad", points: -10 }
                ]
            }
        ]
    },
    {
        id: 12,
        name: "Светлана Позитивная",
        discType: "I",
        horecaType: "кафе",
        scenario: "решение конфликта",
        traits: ["эмоциональная", "экспрессивная", "импульсивная"],
        keySignals: ["Ужас какой!", "Что делать?", "Помогите!"],
        redFlags: ["Все пропало", "Катастрофа", "Что скажут люди"],
        dialog: [
            {
                clientMessage: "Ой, ужас! Духовка дымит! Гости в панике! Что делать?",
                playerOptions: [
                    { text: "Не паникуйте! Сейчас решим", type: "optimal", points: 15 },
                    { text: "Вызовем мастера", type: "neutral", points: 5 },
                    { text: "Это гарантийный случай", type: "bad", points: -10 }
                ]
            }
        ]
    },

    // S-тип
    {
        id: 13,
        name: "Петр Стабильный",
        discType: "S",
        horecaType: "ресторан",
        scenario: "повторная продажа",
        traits: ["постоянный", "надежный", "консервативный"],
        keySignals: ["Как всегда", "Привычное", "Проверенное"],
        redFlags: ["Зачем менять", "И так хорошо", "Привыкли"],
        dialog: [
            {
                clientMessage: "Здравствуйте. Нужно заменить старые тарелки на такие же. Привыкли к ним.",
                playerOptions: [
                    { text: "Конечно, тот же артикул", type: "optimal", points: 15 },
                    { text: "Есть улучшенная версия", type: "neutral", points: -5 },
                    { text: "Рекомендую новую линейку", type: "bad", points: -15 }
                ]
            }
        ]
    },
    {
        id: 14,
        name: "Наталья Осторожная",
        discType: "S",
        horecaType: "кафе",
        scenario: "первый контакт",
        traits: ["осмотрительная", "неторопливая", "основательная"],
        keySignals: ["Нужно подумать", "Посоветуюсь", "Не спешу"],
        redFlags: ["Время терпит", "Обдумаю", "Может позже"],
        dialog: [
            {
                clientMessage: "Думаю о покупке кофемашины. Но не спешу, нужно все взвесить. Что скажете?",
                playerOptions: [
                    { text: "Правильно! Покажу варианты", type: "optimal", points: 15 },
                    { text: "Акция только сегодня!", type: "neutral", points: -10 },
                    { text: "Решайте быстрее", type: "bad", points: -20 }
                ]
            }
        ]
    },

    // C-тип
    {
        id: 15,
        name: "Андрей Дотошный",
        discType: "C",
        horecaType: "бар",
        scenario: "первый контакт",
        traits: ["дотошный", "въедливый", "систематичный"],
        keySignals: ["А точно?", "Проверьте", "Документы есть?"],
        redFlags: ["Нужны факты", "Докажите", "Сомневаюсь"],
        dialog: [
            {
                clientMessage: "Мне нужна точная информация о барном оборудовании. Какие технические характеристики?",
                playerOptions: [
                    { text: "Вот полная спецификация", type: "optimal", points: 15 },
                    { text: "Хорошее оборудование", type: "neutral", points: -5 },
                    { text: "Поверьте, качественное", type: "bad", points: -15 }
                ]
            }
        ]
    },
    {
        id: 16,
        name: "Татьяна Педантичная",
        discType: "C",
        horecaType: "ресторан",
        scenario: "повторная продажа",
        traits: ["педантичная", "дотошная", "требовательная"],
        keySignals: ["По списку", "Как договорились", "Точно так"],
        redFlags: ["Строго по спецификации", "Без отклонений", "Как в договоре"],
        dialog: [
            {
                clientMessage: "Нужно заказать по списку, который отправляла. Строго по спецификации, без замен.",
                playerOptions: [
                    { text: "Да, точно по списку", type: "optimal", points: 15 },
                    { text: "Есть аналоги лучше", type: "neutral", points: -10 },
                    { text: "Можем заменить на похожее", type: "bad", points: -20 }
                ]
            }
        ]
    }
];

// Объединяем все базы клиентов
const allDiscClients = [...discClientsDatabase, ...additionalDiscClients];

// Экспорт для использования в игре
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allDiscClients };
}