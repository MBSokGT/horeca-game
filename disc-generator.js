// Генератор 100 уникальных DISC-диалогов для HoReCa
class DiscDialogGenerator {
    constructor() {
        this.clientsDatabase = this.generateAllClients();
    }

    // Генерация всех 100 клиентов
    generateAllClients() {
        const clients = [];
        let id = 1;

        // D-тип клиенты (25 штук)
        const dClients = this.generateDTypeClients(25, id);
        clients.push(...dClients);
        id += 25;

        // I-тип клиенты (25 штук)
        const iClients = this.generateITypeClients(25, id);
        clients.push(...iClients);
        id += 25;

        // S-тип клиенты (25 штук)
        const sClients = this.generateSTypeClients(25, id);
        clients.push(...sClients);
        id += 25;

        // C-тип клиенты (25 штук)
        const cClients = this.generateCTypeClients(25, id);
        clients.push(...cClients);

        return clients;
    }

    // D-тип: Доминантные клиенты
    generateDTypeClients(count, startId) {
        const names = [
            "Максим Быстров", "Елена Решительная", "Виктор Напор", "Ольга Энергичная", "Андрей Властный",
            "Светлана Прямая", "Игорь Напористый", "Марина Требовательная", "Дмитрий Жесткий", "Анна Категоричная",
            "Сергей Директивный", "Татьяна Командная", "Алексей Авторитарный", "Наталья Волевая", "Павел Решающий",
            "Юлия Активная", "Роман Динамичный", "Екатерина Целеустремленная", "Владимир Настойчивый", "Ирина Деловая",
            "Михаил Результативный", "Оксана Эффективная", "Константин Продуктивный", "Валентина Практичная", "Артем Конкретный"
        ];

        const horecaTypes = ["ресторан", "бар", "кафе", "кейтеринг"];
        const scenarios = ["первый контакт", "повторная продажа", "решение конфликта"];
        
        const traits = [
            ["результат-ориентирован", "нетерпелив", "прямолинеен"],
            ["властный", "требовательный", "целеустремленный"],
            ["агрессивный", "напористый", "авторитарный"],
            ["энергичный", "динамичный", "активный"],
            ["директивный", "командный", "волевой"]
        ];

        const keySignals = [
            ["Времени мало", "К делу", "Быстро решаем"],
            ["Нужен результат", "Без проволочек", "Решаем сейчас"],
            ["Сколько стоит", "Когда привезете", "Решаем быстро"],
            ["Как в прошлый раз", "Быстро нужно", "Без изменений"],
            ["Конкретно", "По существу", "Время - деньги"]
        ];

        const redFlags = [
            ["Мне нужно быстро", "Без лишних слов", "Сколько стоит"],
            ["Мне нужен результат", "Хватит болтать", "Да или нет"],
            ["Время - деньги", "Без воды", "Конкретно"],
            ["Времени нет", "Срочно", "Как обычно"],
            ["К делу", "Суть вопроса", "Главное"]
        ];

        return this.generateClientsForType("D", names, horecaTypes, scenarios, traits, keySignals, redFlags, count, startId);
    }

    // I-тип: Влиятельные клиенты
    generateITypeClients(count, startId) {
        const names = [
            "Анна Общительная", "Игорь Вдохновитель", "Алексей Душевный", "Светлана Позитивная", "Михаил Харизматичный",
            "Елена Эмоциональная", "Дмитрий Экспрессивный", "Ольга Социальная", "Сергей Коммуникативный", "Марина Открытая",
            "Павел Дружелюбный", "Татьяна Веселая", "Андрей Оптимистичный", "Наталья Жизнерадостная", "Роман Вдохновляющий",
            "Юлия Творческая", "Владимир Артистичный", "Ирина Импульсивная", "Константин Спонтанный", "Валентина Энтузиастка",
            "Артем Мотиватор", "Оксана Вдохновительница", "Максим Креативный", "Екатерина Инновационная", "Виктор Идейный"
        ];

        const horecaTypes = ["ресторан", "бар", "кафе", "кейтеринг"];
        const scenarios = ["первый контакт", "повторная продажа", "решение конфликта"];

        const traits = [
            ["разговорчивый", "эмоциональный", "социальный"],
            ["экспрессивный", "оптимистичный", "импульсивный"],
            ["харизматичный", "общительный", "вдохновляющий"],
            ["творческий", "артистичный", "спонтанный"],
            ["дружелюбный", "открытый", "коммуникативный"]
        ];

        const keySignals = [
            ["Как дела?", "Расскажите о себе", "Что думают люди"],
            ["Это же ужасно!", "Что люди подумают", "Нужно исправить"],
            ["Классно!", "Супер идея", "Гости оценят"],
            ["Ужас какой!", "Что делать?", "Помогите!"],
            ["Потрясающе!", "Восхитительно", "Все в восторге"]
        ];

        const redFlags = [
            ["Все говорят", "Модно сейчас", "Друзья советуют"],
            ["Все увидят", "Репутация пострадает", "Расскажу всем"],
            ["Все в восторге", "Модная штука", "Тренд сейчас"],
            ["Все пропало", "Катастрофа", "Что скажут люди"],
            ["Все обожают", "Хит сезона", "Популярно"]
        ];

        return this.generateClientsForType("I", names, horecaTypes, scenarios, traits, keySignals, redFlags, count, startId);
    }

    // S-тип: Стабильные клиенты
    generateSTypeClients(count, startId) {
        const names = [
            "Сергей Надежный", "Мария Спокойная", "Петр Стабильный", "Наталья Осторожная", "Андрей Терпеливый",
            "Елена Постоянная", "Дмитрий Консервативный", "Ольга Основательная", "Михаил Неторопливый", "Татьяна Методичная",
            "Алексей Размеренный", "Светлана Уравновешенная", "Игорь Последовательный", "Марина Систематичная", "Павел Планомерный",
            "Юлия Осмотрительная", "Роман Благоразумный", "Ирина Рассудительная", "Владимир Взвешенный", "Анна Обдуманная",
            "Константин Предусмотрительный", "Валентина Расчетливая", "Артем Продуманный", "Оксана Дальновидная", "Максим Предсказуемый"
        ];

        const horecaTypes = ["ресторан", "бар", "кафе", "кейтеринг"];
        const scenarios = ["первый контакт", "повторная продажа", "решение конфликта"];

        const traits = [
            ["осторожный", "стабильный", "консервативный"],
            ["терпеливый", "лояльный", "методичный"],
            ["постоянный", "надежный", "консервативный"],
            ["осмотрительный", "неторопливый", "основательный"],
            ["размеренный", "уравновешенный", "последовательный"]
        ];

        const keySignals = [
            ["Нужно подумать", "А гарантии есть?", "Не хочу рисковать"],
            ["Как обычно", "Все устраивает", "Не меняем"],
            ["Как всегда", "Привычное", "Проверенное"],
            ["Нужно подумать", "Посоветуюсь", "Не спешу"],
            ["Надежно?", "Проверено?", "Гарантированно?"]
        ];

        const redFlags = [
            ["Время есть", "Нужно обдумать", "А что если"],
            ["Зачем менять", "Привыкли к этому", "Работает же"],
            ["Зачем менять", "И так хорошо", "Привыкли"],
            ["Время терпит", "Обдумаю", "Может позже"],
            ["Не торопимся", "Подождем", "Посмотрим"]
        ];

        return this.generateClientsForType("S", names, horecaTypes, scenarios, traits, keySignals, redFlags, count, startId);
    }

    // C-тип: Сознательные клиенты
    generateCTypeClients(count, startId) {
        const names = [
            "Дмитрий Аналитик", "Елена Точная", "Андрей Дотошный", "Татьяна Педантичная", "Михаил Скрупулезный",
            "Ольга Детальная", "Сергей Въедливый", "Марина Требовательная", "Павел Систематичный", "Наталья Методичная",
            "Алексей Тщательный", "Светлана Придирчивая", "Игорь Критичный", "Юлия Взыскательная", "Роман Строгий",
            "Ирина Принципиальная", "Владимир Дисциплинированный", "Анна Организованная", "Константин Структурированный", "Валентина Логичная",
            "Артем Рациональный", "Оксана Практичная", "Максим Объективный", "Екатерина Фактологичная", "Виктор Доказательный"
        ];

        const horecaTypes = ["ресторан", "бар", "кафе", "кейтеринг"];
        const scenarios = ["первый контакт", "повторная продажа", "решение конфликта"];

        const traits = [
            ["детальный", "аналитичный", "перфекционист"],
            ["скрупулезный", "требовательный", "систематичный"],
            ["дотошный", "въедливый", "систематичный"],
            ["педантичный", "дотошный", "требовательный"],
            ["тщательный", "методичный", "критичный"]
        ];

        const keySignals = [
            ["Какие характеристики?", "Нужны документы", "А сертификаты есть?"],
            ["Это неправильно", "По договору должно", "Нарушение условий"],
            ["А точно?", "Проверьте", "Документы есть?"],
            ["По списку", "Как договорились", "Точно так"],
            ["Докажите", "Подтвердите", "Обоснуйте"]
        ];

        const redFlags = [
            ["Нужны детали", "Документы покажите", "Сравню варианты"],
            ["Согласно пункту", "Это не соответствует", "Требую объяснений"],
            ["Нужны факты", "Докажите", "Сомневаюсь"],
            ["Строго по спецификации", "Без отклонений", "Как в договоре"],
            ["Где доказательства", "Нужны цифры", "Факты на стол"]
        ];

        return this.generateClientsForType("C", names, horecaTypes, scenarios, traits, keySignals, redFlags, count, startId);
    }

    // Универсальный генератор клиентов для типа
    generateClientsForType(discType, names, horecaTypes, scenarios, traits, keySignals, redFlags, count, startId) {
        const clients = [];
        
        for (let i = 0; i < count; i++) {
            const traitIndex = i % traits.length;
            const client = {
                id: startId + i,
                name: names[i % names.length],
                discType: discType,
                horecaType: horecaTypes[i % horecaTypes.length],
                scenario: scenarios[i % scenarios.length],
                traits: traits[traitIndex],
                keySignals: keySignals[traitIndex],
                redFlags: redFlags[traitIndex],
                dialog: this.generateDialogForType(discType, horecaTypes[i % horecaTypes.length], scenarios[i % scenarios.length], i)
            };
            clients.push(client);
        }
        
        return clients;
    }

    // Генерация диалогов для каждого типа
    generateDialogForType(discType, horecaType, scenario, variation) {
        switch (discType) {
            case "D":
                return this.generateDTypeDialog(horecaType, scenario, variation);
            case "I":
                return this.generateITypeDialog(horecaType, scenario, variation);
            case "S":
                return this.generateSTypeDialog(horecaType, scenario, variation);
            case "C":
                return this.generateCTypeDialog(horecaType, scenario, variation);
            default:
                return [];
        }
    }

    // D-тип диалоги
    generateDTypeDialog(horecaType, scenario, variation) {
        const dialogs = {
            "первый контакт": [
                [
                    {
                        clientMessage: "Времени мало. Нужно оборудование для " + horecaType + ". Что можете предложить?",
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
                    }
                ],
                [
                    {
                        clientMessage: "Нужно быстро решить вопрос с оборудованием. Сколько стоит?",
                        playerOptions: [
                            { text: "300к за базовый комплект", type: "optimal", points: 15 },
                            { text: "Какой бюджет планируете?", type: "neutral", points: 0 },
                            { text: "Сначала изучим потребности", type: "bad", points: -15 }
                        ]
                    }
                ]
            ],
            "повторная продажа": [
                [
                    {
                        clientMessage: "Прошлый заказ устроил. Нужно еще. Когда привезете?",
                        playerOptions: [
                            { text: "Завтра к 10 утра", type: "optimal", points: 15 },
                            { text: "В течение недели", type: "neutral", points: 0 },
                            { text: "Нужно уточнить склад", type: "bad", points: -10 }
                        ]
                    }
                ]
            ],
            "решение конфликта": [
                [
                    {
                        clientMessage: "Где мой заказ? Обещали вчера!",
                        playerOptions: [
                            { text: "Сейчас узнаю, перезвоню", type: "optimal", points: 10 },
                            { text: "Извините за задержку", type: "neutral", points: 0 },
                            { text: "Бывают форс-мажоры", type: "bad", points: -15 }
                        ]
                    }
                ]
            ]
        };

        const scenarioDialogs = dialogs[scenario] || dialogs["первый контакт"];
        return scenarioDialogs[variation % scenarioDialogs.length];
    }

    // I-тип диалоги
    generateITypeDialog(horecaType, scenario, variation) {
        const dialogs = {
            "первый контакт": [
                [
                    {
                        clientMessage: "Привет! Как дела? Открываю " + horecaType + ", друзья советуют у вас покупать. Что скажете?",
                        playerOptions: [
                            { text: "Отлично! Расскажу о нас", type: "optimal", points: 15 },
                            { text: "Какое оборудование нужно?", type: "neutral", points: 5 },
                            { text: "Вот прайс-лист", type: "bad", points: -10 }
                        ]
                    },
                    {
                        clientMessage: "Супер! А что клиенты говорят о качестве?",
                        playerOptions: [
                            { text: "Да! Покажу отзывы", type: "optimal", points: 15 },
                            { text: "Качество хорошее", type: "neutral", points: 5 },
                            { text: "Гарантия 2 года", type: "bad", points: -5 }
                        ]
                    }
                ],
                [
                    {
                        clientMessage: "Классно! Хочу, чтобы гости ахнули от красоты! Что посоветуете?",
                        playerOptions: [
                            { text: "Покажу дизайнерские новинки", type: "optimal", points: 15 },
                            { text: "Есть стандартные решения", type: "neutral", points: 0 },
                            { text: "Вот каталог", type: "bad", points: -10 }
                        ]
                    }
                ]
            ],
            "решение конфликта": [
                [
                    {
                        clientMessage: "Это катастрофа! Оборудование сломалось! Что гости подумают?",
                        playerOptions: [
                            { text: "Понимаю! Срочно решим", type: "optimal", points: 15 },
                            { text: "Вышлем мастера", type: "neutral", points: 5 },
                            { text: "По гарантии бесплатно", type: "bad", points: -5 }
                        ]
                    }
                ]
            ]
        };

        const scenarioDialogs = dialogs[scenario] || dialogs["первый контакт"];
        return scenarioDialogs[variation % scenarioDialogs.length];
    }

    // S-тип диалоги
    generateSTypeDialog(horecaType, scenario, variation) {
        const dialogs = {
            "первый контакт": [
                [
                    {
                        clientMessage: "Добрый день. Ищу надежного поставщика. Как долго работаете?",
                        playerOptions: [
                            { text: "15 лет, стабильно работаем", type: "optimal", points: 15 },
                            { text: "Мы лидеры рынка", type: "neutral", points: 5 },
                            { text: "Новая динамичная компания", type: "bad", points: -10 }
                        ]
                    },
                    {
                        clientMessage: "А гарантии какие? Не хочется проблем.",
                        playerOptions: [
                            { text: "3 года гарантии + сервис", type: "optimal", points: 15 },
                            { text: "Стандартная гарантия", type: "neutral", points: 0 },
                            { text: "Редко ломается", type: "bad", points: -10 }
                        ]
                    }
                ],
                [
                    {
                        clientMessage: "Думаю о покупке оборудования. Но не спешу, нужно взвесить.",
                        playerOptions: [
                            { text: "Правильно! Покажу варианты", type: "optimal", points: 15 },
                            { text: "Акция только сегодня!", type: "neutral", points: -10 },
                            { text: "Решайте быстрее", type: "bad", points: -20 }
                        ]
                    }
                ]
            ],
            "повторная продажа": [
                [
                    {
                        clientMessage: "Нужно докупить, как в прошлый раз. Все устраивает.",
                        playerOptions: [
                            { text: "Отлично! Тот же комплект", type: "optimal", points: 15 },
                            { text: "Есть новинки получше", type: "neutral", points: -5 },
                            { text: "Рекомендую обновиться", type: "bad", points: -15 }
                        ]
                    }
                ]
            ]
        };

        const scenarioDialogs = dialogs[scenario] || dialogs["первый контакт"];
        return scenarioDialogs[variation % scenarioDialogs.length];
    }

    // C-тип диалоги
    generateCTypeDialog(horecaType, scenario, variation) {
        const dialogs = {
            "первый контакт": [
                [
                    {
                        clientMessage: "Нужна подробная информация об оборудовании. Какие характеристики?",
                        playerOptions: [
                            { text: "Вот техспецификации", type: "optimal", points: 15 },
                            { text: "Отличное качество", type: "neutral", points: 0 },
                            { text: "Лучшее на рынке", type: "bad", points: -10 }
                        ]
                    },
                    {
                        clientMessage: "А энергопотребление? Есть сертификаты?",
                        playerOptions: [
                            { text: "Класс A++, вот документы", type: "optimal", points: 15 },
                            { text: "Экономичное", type: "neutral", points: -5 },
                            { text: "Не переживайте", type: "bad", points: -15 }
                        ]
                    }
                ],
                [
                    {
                        clientMessage: "Мне нужна точная информация. Какие технические параметры?",
                        playerOptions: [
                            { text: "Вот полная спецификация", type: "optimal", points: 15 },
                            { text: "Хорошее оборудование", type: "neutral", points: -5 },
                            { text: "Поверьте, качественное", type: "bad", points: -15 }
                        ]
                    }
                ]
            ],
            "решение конфликта": [
                [
                    {
                        clientMessage: "По договору поставка должна была быть 15 числа. Сегодня 18-е. Объясните.",
                        playerOptions: [
                            { text: "Проверю документооборот", type: "optimal", points: 15 },
                            { text: "Извините за задержку", type: "neutral", points: 0 },
                            { text: "Бывает, не критично", type: "bad", points: -20 }
                        ]
                    }
                ]
            ]
        };

        const scenarioDialogs = dialogs[scenario] || dialogs["первый контакт"];
        return scenarioDialogs[variation % scenarioDialogs.length];
    }

    // Получить случайного клиента
    getRandomClient() {
        return this.clientsDatabase[Math.floor(Math.random() * this.clientsDatabase.length)];
    }

    // Получить клиента по ID
    getClientById(id) {
        return this.clientsDatabase.find(client => client.id === id);
    }

    // Получить клиентов по типу DISC
    getClientsByType(discType) {
        return this.clientsDatabase.filter(client => client.discType === discType);
    }

    // Получить всех клиентов
    getAllClients() {
        return this.clientsDatabase;
    }

    // Статистика по базе
    getStatistics() {
        const stats = {
            total: this.clientsDatabase.length,
            byType: {},
            byHorecaType: {},
            byScenario: {}
        };

        this.clientsDatabase.forEach(client => {
            // По DISC типу
            stats.byType[client.discType] = (stats.byType[client.discType] || 0) + 1;
            
            // По типу заведения
            stats.byHorecaType[client.horecaType] = (stats.byHorecaType[client.horecaType] || 0) + 1;
            
            // По сценарию
            stats.byScenario[client.scenario] = (stats.byScenario[client.scenario] || 0) + 1;
        });

        return stats;
    }
}

// Создаем глобальный экземпляр генератора
const discGenerator = new DiscDialogGenerator();

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DiscDialogGenerator, discGenerator };
}

// Для использования в браузере
if (typeof window !== 'undefined') {
    window.discGenerator = discGenerator;
}