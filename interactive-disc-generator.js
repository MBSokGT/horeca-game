// Генератор интерактивных DISC-диалогов с реакциями клиентов
class InteractiveDiscGenerator {
    constructor() {
        this.clientsDatabase = this.generateInteractiveClients();
    }

    generateInteractiveClients() {
        const clients = [];
        let id = 1;

        // D-тип клиенты (25 штук)
        for (let i = 0; i < 25; i++) {
            clients.push(this.createDTypeClient(id++, i));
        }

        // I-тип клиенты (25 штук)
        for (let i = 0; i < 25; i++) {
            clients.push(this.createITypeClient(id++, i));
        }

        // S-тип клиенты (25 штук)
        for (let i = 0; i < 25; i++) {
            clients.push(this.createSTypeClient(id++, i));
        }

        // C-тип клиенты (25 штук)
        for (let i = 0; i < 25; i++) {
            clients.push(this.createCTypeClient(id++, i));
        }

        return clients;
    }

    createDTypeClient(id, variation) {
        const names = ["Максим Быстров", "Елена Решительная", "Виктор Напор", "Ольга Энергичная", "Андрей Властный"];
        const horecaTypes = ["ресторан", "бар", "кафе", "кейтеринг"];
        const scenarios = ["первый контакт", "повторная продажа", "решение конфликта"];

        return {
            id,
            name: names[variation % names.length],
            discType: "D",
            horecaType: horecaTypes[variation % horecaTypes.length],
            scenario: scenarios[variation % scenarios.length],
            traits: ["результат-ориентирован", "нетерпелив", "прямолинеен"],
            keySignals: ["Времени мало", "К делу", "Быстро решаем"],
            redFlags: ["Мне нужно быстро", "Без лишних слов", "Сколько стоит"],
            dialog: [
                {
                    clientMessage: "Времени мало. Нужно оборудование быстро. Что можете предложить?",
                    playerOptions: [
                        { 
                            text: "Покажу топ-3 решения", 
                            type: "optimal", 
                            points: 15,
                            clientResponse: "Отлично! Быстро и по делу. Показывайте."
                        },
                        { 
                            text: "Расскажите о потребностях", 
                            type: "neutral", 
                            points: 5,
                            clientResponse: "Хм, времени мало на расспросы. Давайте конкретнее."
                        },
                        { 
                            text: "Давайте знакомиться", 
                            type: "bad", 
                            points: -10,
                            clientResponse: "Серьезно? У меня нет времени на болтовню!"
                        }
                    ]
                },
                {
                    clientMessage: "Хорошо. Цена? Сроки поставки?",
                    playerOptions: [
                        { 
                            text: "500к, поставка 3 дня", 
                            type: "optimal", 
                            points: 15,
                            clientResponse: "Конкретно! Это то что нужно. Оформляем?"
                        },
                        { 
                            text: "Зависит от комплектации", 
                            type: "neutral", 
                            points: 0,
                            clientResponse: "Опять неопределенность... Давайте базовую цену."
                        },
                        { 
                            text: "Нужно все обсудить", 
                            type: "bad", 
                            points: -15,
                            clientResponse: "Обсуждать нечего! Цену и сроки - вот что важно!"
                        }
                    ]
                }
            ]
        };
    }

    createITypeClient(id, variation) {
        const names = ["Анна Общительная", "Игорь Вдохновитель", "Алексей Душевный", "Светлана Позитивная", "Михаил Харизматичный"];
        const horecaTypes = ["ресторан", "бар", "кафе", "кейтеринг"];
        const scenarios = ["первый контакт", "повторная продажа", "решение конфликта"];

        return {
            id,
            name: names[variation % names.length],
            discType: "I",
            horecaType: horecaTypes[variation % horecaTypes.length],
            scenario: scenarios[variation % scenarios.length],
            traits: ["разговорчивый", "эмоциональный", "социальный"],
            keySignals: ["Как дела?", "Расскажите о себе", "Что думают люди"],
            redFlags: ["Все говорят", "Модно сейчас", "Друзья советуют"],
            dialog: [
                {
                    clientMessage: "Привет! Как дела? Открываю кафе, друзья советуют у вас покупать. Что скажете?",
                    playerOptions: [
                        { 
                            text: "Отлично! Расскажу о нас", 
                            type: "optimal", 
                            points: 15,
                            clientResponse: "Супер! Я обожаю интересные истории!"
                        },
                        { 
                            text: "Какое оборудование нужно?", 
                            type: "neutral", 
                            points: 5,
                            clientResponse: "Ну... разное. А что люди обычно берут?"
                        },
                        { 
                            text: "Вот прайс-лист", 
                            type: "bad", 
                            points: -10,
                            clientResponse: "Ой, сразу цифры... А можно сначала познакомиться?"
                        }
                    ]
                },
                {
                    clientMessage: "Супер! А что клиенты говорят о качестве?",
                    playerOptions: [
                        { 
                            text: "Да! Покажу отзывы", 
                            type: "optimal", 
                            points: 15,
                            clientResponse: "Ого! Столько положительных! Это же мечта!"
                        },
                        { 
                            text: "Качество хорошее", 
                            type: "neutral", 
                            points: 5,
                            clientResponse: "Хорошее... А конкретнее? Что говорят?"
                        },
                        { 
                            text: "Гарантия 2 года", 
                            type: "bad", 
                            points: -5,
                            clientResponse: "Гарантия это хорошо, но мне важнее мнения людей."
                        }
                    ]
                }
            ]
        };
    }

    createSTypeClient(id, variation) {
        const names = ["Сергей Надежный", "Мария Спокойная", "Петр Стабильный", "Наталья Осторожная", "Андрей Терпеливый"];
        const horecaTypes = ["ресторан", "бар", "кафе", "кейтеринг"];
        const scenarios = ["первый контакт", "повторная продажа", "решение конфликта"];

        return {
            id,
            name: names[variation % names.length],
            discType: "S",
            horecaType: horecaTypes[variation % horecaTypes.length],
            scenario: scenarios[variation % scenarios.length],
            traits: ["осторожный", "стабильный", "консервативный"],
            keySignals: ["Нужно подумать", "А гарантии есть?", "Не хочу рисковать"],
            redFlags: ["Время есть", "Нужно обдумать", "А что если"],
            dialog: [
                {
                    clientMessage: "Добрый день. Ищу надежного поставщика. Как долго работаете?",
                    playerOptions: [
                        { 
                            text: "15 лет, стабильно работаем", 
                            type: "optimal", 
                            points: 15,
                            clientResponse: "Хорошо, это внушает доверие. А гарантии?"
                        },
                        { 
                            text: "Мы лидеры рынка", 
                            type: "neutral", 
                            points: 5,
                            clientResponse: "Лидеры... А стабильность как?"
                        },
                        { 
                            text: "Новая динамичная компания", 
                            type: "bad", 
                            points: -10,
                            clientResponse: "Новая? Хм, это рискованно..."
                        }
                    ]
                },
                {
                    clientMessage: "А гарантии какие? Не хочется проблем.",
                    playerOptions: [
                        { 
                            text: "3 года гарантии + сервис", 
                            type: "optimal", 
                            points: 15,
                            clientResponse: "Отлично! Это то что нужно для спокойствия."
                        },
                        { 
                            text: "Стандартная гарантия", 
                            type: "neutral", 
                            points: 0,
                            clientResponse: "А что включает стандартная?"
                        },
                        { 
                            text: "Редко ломается", 
                            type: "bad", 
                            points: -10,
                            clientResponse: "Редко не значит никогда. Мне нужны гарантии."
                        }
                    ]
                }
            ]
        };
    }

    createCTypeClient(id, variation) {
        const names = ["Дмитрий Аналитик", "Елена Точная", "Андрей Дотошный", "Татьяна Педантичная", "Михаил Скрупулезный"];
        const horecaTypes = ["ресторан", "бар", "кафе", "кейтеринг"];
        const scenarios = ["первый контакт", "повторная продажа", "решение конфликта"];

        return {
            id,
            name: names[variation % names.length],
            discType: "C",
            horecaType: horecaTypes[variation % horecaTypes.length],
            scenario: scenarios[variation % scenarios.length],
            traits: ["детальный", "аналитичный", "перфекционист"],
            keySignals: ["Какие характеристики?", "Нужны документы", "А сертификаты есть?"],
            redFlags: ["Нужны детали", "Документы покажите", "Сравню варианты"],
            dialog: [
                {
                    clientMessage: "Нужна подробная информация об оборудовании. Какие характеристики?",
                    playerOptions: [
                        { 
                            text: "Вот техспецификации", 
                            type: "optimal", 
                            points: 15,
                            clientResponse: "Отлично! Именно то что нужно. А энергопотребление?"
                        },
                        { 
                            text: "Отличное качество", 
                            type: "neutral", 
                            points: 0,
                            clientResponse: "Качество это хорошо, но мне нужны конкретные данные."
                        },
                        { 
                            text: "Лучшее на рынке", 
                            type: "bad", 
                            points: -10,
                            clientResponse: "Лучшее по каким параметрам? Нужны факты."
                        }
                    ]
                },
                {
                    clientMessage: "А энергопотребление? Есть сертификаты?",
                    playerOptions: [
                        { 
                            text: "Класс A++, вот документы", 
                            type: "optimal", 
                            points: 15,
                            clientResponse: "Превосходно! Документы в порядке. А гарантийные обязательства?"
                        },
                        { 
                            text: "Экономичное", 
                            type: "neutral", 
                            points: -5,
                            clientResponse: "Экономичное это сколько кВт/час?"
                        },
                        { 
                            text: "Не переживайте", 
                            type: "bad", 
                            points: -15,
                            clientResponse: "Как не переживать? Мне нужны точные цифры!"
                        }
                    ]
                }
            ]
        };
    }

    getRandomClient() {
        return this.clientsDatabase[Math.floor(Math.random() * this.clientsDatabase.length)];
    }

    getAllClients() {
        return this.clientsDatabase;
    }

    getStatistics() {
        const stats = {
            total: this.clientsDatabase.length,
            byType: {},
            byHorecaType: {},
            byScenario: {}
        };

        this.clientsDatabase.forEach(client => {
            stats.byType[client.discType] = (stats.byType[client.discType] || 0) + 1;
            stats.byHorecaType[client.horecaType] = (stats.byHorecaType[client.horecaType] || 0) + 1;
            stats.byScenario[client.scenario] = (stats.byScenario[client.scenario] || 0) + 1;
        });

        return stats;
    }
}

// Заменяем старый генератор
const discGenerator = new InteractiveDiscGenerator();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InteractiveDiscGenerator, discGenerator };
}

if (typeof window !== 'undefined') {
    window.discGenerator = discGenerator;
}