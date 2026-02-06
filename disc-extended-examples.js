// Примеры расширенных диалогов для демонстрации возможностей DISC-генератора

const extendedDialogExamples = {
    // D-тип: Сложный конфликтный сценарий
    dominantConflict: {
        id: 101,
        name: "Владимир Жесткий",
        discType: "D",
        horecaType: "ресторан",
        scenario: "решение конфликта",
        traits: ["агрессивный", "требовательный", "нетерпеливый"],
        keySignals: ["Это неприемлемо", "Немедленно", "Ваша ответственность"],
        redFlags: ["Я требую", "Сейчас же", "Или я уйду"],
        dialog: [
            {
                clientMessage: "Это неприемлемо! Заказ опоздал на 3 дня, ресторан несет убытки! Что вы будете делать?",
                playerOptions: [
                    { text: "Компенсируем убытки сегодня", type: "optimal", points: 20 },
                    { text: "Разберемся в ситуации", type: "neutral", points: -5 },
                    { text: "Такое иногда случается", type: "bad", points: -25 }
                ]
            },
            {
                clientMessage: "Хорошо, но как это не повторится? Мне нужны гарантии!",
                playerOptions: [
                    { text: "Подпишем договор с штрафами", type: "optimal", points: 15 },
                    { text: "Будем контролировать сроки", type: "neutral", points: 0 },
                    { text: "Постараемся не опаздывать", type: "bad", points: -20 }
                ]
            },
            {
                clientMessage: "И что с текущим заказом? Когда будет доставка?",
                playerOptions: [
                    { text: "Завтра до 10 утра", type: "optimal", points: 15 },
                    { text: "В ближайшие дни", type: "neutral", points: -10 },
                    { text: "Как только освободится транспорт", type: "bad", points: -20 }
                ]
            }
        ]
    },

    // I-тип: Эмоциональный первый контакт
    influentialFirst: {
        id: 102,
        name: "Анастасия Вдохновенная",
        discType: "I",
        horecaType: "кафе",
        scenario: "первый контакт",
        traits: ["творческая", "эмоциональная", "общительная"],
        keySignals: ["Это должно быть волшебно", "Гости будут в восторге", "Расскажите историю"],
        redFlags: ["Все должны увидеть", "Это будет хит", "Инстаграм взорвется"],
        dialog: [
            {
                clientMessage: "Привет! Я открываю кафе мечты! Хочу, чтобы каждый гость чувствовал себя как в сказке! Что у вас есть волшебного?",
                playerOptions: [
                    { text: "Покажу дизайнерскую коллекцию!", type: "optimal", points: 20 },
                    { text: "У нас качественное оборудование", type: "neutral", points: 0 },
                    { text: "Вот наш стандартный каталог", type: "bad", points: -15 }
                ]
            },
            {
                clientMessage: "Ого! А что скажут мои подписчики в соцсетях? Это же должно быть фотогенично!",
                playerOptions: [
                    { text: "Это будет хит Инстаграма!", type: "optimal", points: 18 },
                    { text: "Выглядит привлекательно", type: "neutral", points: 5 },
                    { text: "Главное - функциональность", type: "bad", points: -12 }
                ]
            },
            {
                clientMessage: "А есть что-то уникальное? Чтобы только у меня было?",
                playerOptions: [
                    { text: "Эксклюзивная линейка под заказ", type: "optimal", points: 15 },
                    { text: "Можем персонализировать", type: "neutral", points: 8 },
                    { text: "У всех одинаковое оборудование", type: "bad", points: -18 }
                ]
            }
        ]
    },

    // S-тип: Осторожная повторная покупка
    steadyRepeat: {
        id: 103,
        name: "Елена Осмотрительная",
        discType: "S",
        horecaType: "ресторан",
        scenario: "повторная продажа",
        traits: ["консервативная", "осторожная", "лояльная"],
        keySignals: ["Как в прошлый раз", "Проверенное решение", "Не хочу экспериментов"],
        redFlags: ["А вдруг не подойдет", "Лучше подождать", "Нужно посоветоваться"],
        dialog: [
            {
                clientMessage: "Здравствуйте. Год назад покупали у вас посуду, все устроило. Нужно докупить, но боюсь, что изменилось качество...",
                playerOptions: [
                    { text: "Тот же поставщик, качество стабильное", type: "optimal", points: 18 },
                    { text: "Качество только улучшилось", type: "neutral", points: 5 },
                    { text: "Попробуйте новую линейку", type: "bad", points: -15 }
                ]
            },
            {
                clientMessage: "А цены не выросли? У нас ограниченный бюджет...",
                playerOptions: [
                    { text: "Для постоянных клиентов цена прежняя", type: "optimal", points: 16 },
                    { text: "Небольшое повышение на 3%", type: "neutral", points: 0 },
                    { text: "Рынок диктует новые цены", type: "bad", points: -12 }
                ]
            },
            {
                clientMessage: "Хорошо. А можно сначала взять небольшую партию на пробу?",
                playerOptions: [
                    { text: "Конечно, начнем с пробной партии", type: "optimal", points: 15 },
                    { text: "Лучше сразу весь объем", type: "neutral", points: -8 },
                    { text: "Минимальный заказ от 50 единиц", type: "bad", points: -15 }
                ]
            }
        ]
    },

    // C-тип: Детальный технический анализ
    conscientiousAnalysis: {
        id: 104,
        name: "Дмитрий Скрупулезный",
        discType: "C",
        horecaType: "кейтеринг",
        scenario: "первый контакт",
        traits: ["аналитичный", "дотошный", "систематичный"],
        keySignals: ["Нужна полная спецификация", "Какие сертификаты", "Сравню с конкурентами"],
        redFlags: ["Где технические данные", "Нужно все проверить", "Документы обязательны"],
        dialog: [
            {
                clientMessage: "Мне нужно мобильное кухонное оборудование для кейтеринга. Требую полную техническую документацию с характеристиками.",
                playerOptions: [
                    { text: "Вот полный техпакет с сертификатами", type: "optimal", points: 20 },
                    { text: "Пришлю документы на почту", type: "neutral", points: 8 },
                    { text: "Все есть на сайте", type: "bad", points: -15 }
                ]
            },
            {
                clientMessage: "Энергопотребление какое? Нужны точные цифры по каждому агрегату.",
                playerOptions: [
                    { text: "Вот таблица энергопотребления", type: "optimal", points: 18 },
                    { text: "Экономичное оборудование", type: "neutral", points: -5 },
                    { text: "Не критичный параметр", type: "bad", points: -20 }
                ]
            },
            {
                clientMessage: "А соответствие санитарным нормам? Какие документы подтверждают?",
                playerOptions: [
                    { text: "Все сертификаты СанПиН в комплекте", type: "optimal", points: 16 },
                    { text: "Соответствует всем нормам", type: "neutral", points: 0 },
                    { text: "Проблем не будет", type: "bad", points: -18 }
                ]
            },
            {
                clientMessage: "Гарантийные обязательства? Что конкретно покрывается гарантией?",
                playerOptions: [
                    { text: "Детальный договор гарантии", type: "optimal", points: 15 },
                    { text: "Стандартная гарантия 2 года", type: "neutral", points: 5 },
                    { text: "Гарантируем качество", type: "bad", points: -15 }
                ]
            }
        ]
    },

    // Смешанный сценарий: D+C (Требовательный аналитик)
    mixedDominantConscientious: {
        id: 105,
        name: "Александр Требовательный",
        discType: "D", // Основной тип, но с чертами C
        horecaType: "ресторан",
        scenario: "повторная продажа",
        traits: ["результат-ориентирован", "требовательный", "детальный"],
        keySignals: ["Быстро и качественно", "Нужны факты", "Время ограничено"],
        redFlags: ["Без воды, только факты", "Проверю каждую деталь", "Результат важнее всего"],
        dialog: [
            {
                clientMessage: "Нужно срочно заменить холодильное оборудование. Времени мало, но требования жесткие. Что предложите?",
                playerOptions: [
                    { text: "Топ-3 модели с техданными", type: "optimal", points: 20 },
                    { text: "Покажу весь каталог", type: "neutral", points: 0 },
                    { text: "Расскажите о потребностях", type: "bad", points: -15 }
                ]
            },
            {
                clientMessage: "Хорошо. Энергоэффективность какая? И сроки поставки?",
                playerOptions: [
                    { text: "Класс A++, поставка завтра", type: "optimal", points: 18 },
                    { text: "Экономичные, доставим быстро", type: "neutral", points: 5 },
                    { text: "Уточню у поставщика", type: "bad", points: -20 }
                ]
            }
        ]
    }
};

// Функция для демонстрации расширенных диалогов
function demonstrateExtendedDialogs() {
    console.log("🎭 Демонстрация расширенных DISC-диалогов:");
    
    Object.entries(extendedDialogExamples).forEach(([key, client]) => {
        console.log(`\n--- ${client.name} (${client.discType}-тип) ---`);
        console.log(`Сценарий: ${client.scenario}`);
        console.log(`Заведение: ${client.horecaType}`);
        console.log(`Черты: ${client.traits.join(', ')}`);
        
        client.dialog.forEach((step, index) => {
            console.log(`\nШаг ${index + 1}:`);
            console.log(`👤 "${step.clientMessage}"`);
            console.log("Варианты ответа:");
            step.playerOptions.forEach((option, i) => {
                const emoji = option.type === 'optimal' ? '✅' : 
                             option.type === 'neutral' ? '⚠️' : '❌';
                console.log(`  ${emoji} "${option.text}" (${option.points} очков)`);
            });
        });
        
        console.log(`\n🔍 Ключевые сигналы: ${client.keySignals.join(', ')}`);
        console.log(`🚩 Красные флаги: ${client.redFlags.join(', ')}`);
    });
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { extendedDialogExamples, demonstrateExtendedDialogs };
}

// Для браузера
if (typeof window !== 'undefined') {
    window.extendedDialogExamples = extendedDialogExamples;
    window.demonstrateExtendedDialogs = demonstrateExtendedDialogs;
}