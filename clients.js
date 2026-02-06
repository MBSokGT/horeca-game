const clientTypes = {
    cafe: {
        name: "Кафе",
        avatar: "☕",
        budgetRange: [150000, 400000],
        needs: "Базовое оборудование для кафе"
    },
    restaurant: {
        name: "Ресторан",
        avatar: "🍽️",
        budgetRange: [500000, 1200000],
        needs: "Полное оснащение кухни и зала"
    },
    hotel: {
        name: "Отель",
        avatar: "🏨",
        budgetRange: [800000, 2000000],
        needs: "Оборудование для ресторана отеля"
    },
    canteen: {
        name: "Столовая",
        avatar: "🥘",
        budgetRange: [300000, 700000],
        needs: "Оборудование для массового питания"
    }
};

const clientNames = [
    "Анна Петрова", "Дмитрий Козлов", "Елена Смирнова", "Игорь Волков",
    "Мария Соколова", "Алексей Морозов", "Ольга Новикова", "Сергей Попов",
    "Татьяна Лебедева", "Владимир Орлов", "Наталья Киселева", "Андрей Макаров",
    "Светлана Федорова", "Михаил Романов", "Юлия Захарова", "Павел Григорьев"
];

function generateRandomClient() {
    const types = Object.keys(clientTypes);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const clientInfo = clientTypes[randomType];
    
    const name = clientNames[Math.floor(Math.random() * clientNames.length)];
    const budget = Math.floor(Math.random() * (clientInfo.budgetRange[1] - clientInfo.budgetRange[0])) + clientInfo.budgetRange[0];
    
    // Случайные модификаторы характера клиента
    const personalities = [
        { trait: "экономный", budgetMod: 0.8, demandMod: 1.2 },
        { trait: "требовательный", budgetMod: 1.1, demandMod: 0.7 },
        { trait: "спешащий", budgetMod: 1.0, demandMod: 0.9 },
        { trait: "осторожный", budgetMod: 0.9, demandMod: 1.1 },
        { trait: "щедрый", budgetMod: 1.3, demandMod: 0.8 }
    ];
    
    const personality = personalities[Math.floor(Math.random() * personalities.length)];
    const category = clientCategories[Math.floor(Math.random() * clientCategories.length)];
    const specificNeed = clientSpecificNeeds[Math.floor(Math.random() * clientSpecificNeeds.length)];
    
    // Для постоянных клиентов добавляем информацию о компании
    const company = category.type === "постоянный" ? 
        companyNames[Math.floor(Math.random() * companyNames.length)] : null;
    const purchases = category.type === "постоянный" ? 
        frequentPurchases[Math.floor(Math.random() * frequentPurchases.length)] : null;
    
    return {
        name: name,
        type: randomType,
        typeName: clientInfo.name,
        avatar: clientInfo.avatar,
        budget: Math.floor(budget * personality.budgetMod * category.modifier),
        originalBudget: budget,
        needs: clientInfo.needs,
        specificNeed: specificNeed,
        personality: personality.trait,
        category: category.type,
        categoryDescription: category.description,
        company: company,
        frequentPurchases: purchases,
        demandLevel: personality.demandMod,
        satisfaction: 50,
        surveyAnswers: {} // Для новых клиентов
    };
}

function calculateClientSatisfaction(client, selectedEquipment, totalPrice) {
    let satisfaction = client.satisfaction;
    
    // Проверяем соответствие бюджету
    if (totalPrice <= client.budget * 0.8) {
        satisfaction += 20; // клиент доволен экономией
    } else if (totalPrice > client.budget) {
        satisfaction -= 30; // превышение бюджета
    }
    
    // Проверяем количество оборудования
    const expectedItems = client.type === 'hotel' ? 8 : client.type === 'restaurant' ? 6 : 4;
    const itemDiff = Math.abs(selectedEquipment.length - expectedItems);
    satisfaction -= itemDiff * 5;
    
    // Модификатор личности
    satisfaction *= client.demandLevel;
    
    return Math.max(0, Math.min(100, satisfaction));
}

function getClientReaction(satisfaction) {
    if (satisfaction >= 80) {
        return {
            message: "Отличное предложение! Заключаем сделку!",
            success: true,
            bonus: 1.2
        };
    } else if (satisfaction >= 60) {
        return {
            message: "Хорошо, но можете сделать скидку 10%?",
            success: true,
            bonus: 0.9
        };
    } else if (satisfaction >= 40) {
        return {
            message: "Нужно подумать... Может, что-то другое?",
            success: false,
            bonus: 0
        };
    } else {
        return {
            message: "Это не то, что мне нужно. До свидания!",
            success: false,
            bonus: 0
        };
    }
}

const clientCategories = [
    { type: "новый", modifier: 1.0, description: "первый раз покупает" },
    { type: "постоянный", modifier: 1.2, description: "уже покупал у нас" }
];
const clientSpecificNeeds = [
    "мне нужны дешевые тарелки",
    "мне нужны вилки и ложки, важна быстрая доставка",
    "ищу качественные кастрюли из нержавейки",
    "нужны бокалы для вина, не более 500₽ за штуку",
    "требуются профессиональные ножи для повара",
    "ищу холодильное оборудование с гарантией",
    "нужны сковороды с антипригарным покрытием",
    "требуется кофемашина до 150,000₽",
    "ищу посудомоечную машину для большого объема",
    "нужны столовые приборы на 100 персон",
    "требуется плита на 6 конфорок",
    "ищу весы с точностью до грамма",
    "нужны разделочные доски из дерева",
    "требуются миксеры планетарного типа",
    "ищу фритюрницу с двумя корзинами"
];

const managerIntroductionQuestions = [
    {
        managerSays: "Привет! Меня зовут {playerName}. Работаю в 'Барном Комплексе'. А вас как зовут?",
        clientResponses: [
            "Привет! {clientName}. Рад познакомиться!",
            "Здорово! {clientName}, я тут заведение открываю.",
            "{clientName}. Слышал про вашу компанию - говорят, хорошие ребята."
        ]
    },
    {
        managerSays: "Круто! Расскажите, что у вас за бизнес? Чем занимаетесь?",
        clientResponses: [
            "Да вот, {businessType} делаю. Уже {experience}, но всё равно волнуюсь.",
            "У меня {businessType}. Хочу {plans}, знаете ли.",
            "Ну, {businessType} у нас. Сейчас {currentSituation}, вот и думаю..."
        ]
    },
    {
        managerSays: "Понятно! А что сейчас нужно? С чем помочь можем?",
        clientResponses: [
            "Да вот {specificNeed} нужно. Бюджет у меня {budget}, не больше.",
            "Ищу {specificNeed}. Главное чтобы {priority}, а то уже достали поставщики.",
            "Мне бы {specificNeed}. Готов потратить {budget}, но чтоб толку было."
        ]
    },
    {
        managerSays: "Ясно. А что для вас самое важное при выборе? На что смотрите в первую очередь?",
        clientResponses: [
            "Для меня {priority} - это святое. И чтоб {additionalRequirement} было.",
            "Знаете, главное - {priority}. Ну и {additionalRequirement} не помешает.",
            "Я всегда за {priority}. А еще обязательно {additionalRequirement}."
        ]
    },
    {
        managerSays: "Отлично! Думаю, найдем что-то подходящее. Покажу наш каталог?",
        clientResponses: [
            "Давайте! Интересно посмотреть, что у вас есть.",
            "Конечно! Надеюсь, найдется что-то стоящее.",
            "Показывайте! Время дорого, но посмотрим."
        ]
    }
];

const clientBusinessTypes = [
    "кафешку открываю", "ресторанчик делаю", "бар хочу запустить", "столовую веду", "пиццерию планирую", "суши-бар открываю", 
    "кофейню мутим", "бистро такое", "паб хочу", "фастфуд точку"
];

const clientExperience = [
    "пару лет уже", "только начинаю", "лет пять работаю", "вообще новичок",
    "давно в теме", "расширяюсь потихоньку", "всё меняю тут"
];

const clientPlans = [
    "побольше народу привлечь", "оборудование обновить", "сервис улучшить",
    "больше столиков поставить", "меню расширить"
];

const clientCurrentSituation = [
    "кухню переделываю", "зал расширяю", "концепцию меняю", 
    "к открытию готовлюсь", "всё модернизирую"
];

const clientPriorities = [
    "качество чтоб было", "надежность важна", "цена нормальная",
    "быстро привезли", "гарантия хорошая", "толково объяснили"
];

const clientAdditionalRequirements = [
    "гарантия", "сервис", "обучение персонала", 
    "рассрочка", "быстрая доставка", "установка"
];

const clientQuestions = [
    "Тарелка {name} что вы предложили из фарфора или керамики?",
    "Кастрюля {name} - какой объем у этой модели?",
    "Сковорода {name} - есть ли антипригарное покрытие?",
    "Нож {name} - из какой стали изготовлен?",
    "Холодильник {name} - какая температура охлаждения?",
    "Плита {name} - сколько конфорок?",
    "Миксер {name} - какая мощность двигателя?",
    "Весы {name} - какая точность измерения?",
    "Кофемашина {name} - сколько чашек в час может приготовить?",
    "Посудомойка {name} - сколько комплектов посуды помещается?",
    "Фритюрница {name} - какой объем масла требуется?",
    "Блендер {name} - есть ли функция измельчения льда?",
    "Духовка {name} - до какой температуры нагревается?",
    "Мойка {name} - из какого материала изготовлена?",
    "Стол {name} - какая максимальная нагрузка?"
];

const clientAnswerOptions = {
    material: ["из нержавеющей стали", "из керамики", "из фарфора", "из пластика", "из дерева"],
    volume: ["2 литра", "5 литров", "10 литров", "20 литров", "50 литров"],
    power: ["500 Вт", "1000 Вт", "1500 Вт", "2000 Вт", "3000 Вт"],
    temperature: ["+2°C до +8°C", "-18°C до -24°C", "до 250°C", "до 300°C", "до 500°C"],
    capacity: ["2-4 комплекта", "6-8 комплектов", "10-12 комплектов", "14-16 комплектов"],
    features: ["да, есть", "нет, отсутствует", "опционально", "в зависимости от модели"]
};
const newClientQuestions = [
    {
        question: "Какой тип заведения вы планируете открыть?",
        options: [
            { text: "Кафе или кофейня", value: "cafe" },
            { text: "Ресторан", value: "restaurant" },
            { text: "Отель с рестораном", value: "hotel" },
            { text: "Столовая или кантин", value: "canteen" }
        ]
    },
    {
        question: "Какой у вас примерный бюджет на оборудование?",
        options: [
            { text: "До 300,000₽", value: "low" },
            { text: "300,000₽ - 700,000₽", value: "medium" },
            { text: "700,000₽ - 1,500,000₽", value: "high" },
            { text: "Свыше 1,500,000₽", value: "premium" }
        ]
    },
    {
        question: "Что для вас наиболее важно при выборе оборудования?",
        options: [
            { text: "Низкая цена", value: "price" },
            { text: "Высокое качество", value: "quality" },
            { text: "Быстрая доставка", value: "speed" },
            { text: "Гарантия и сервис", value: "service" }
        ]
    },
    {
        question: "Планируете ли вы расширение в будущем?",
        options: [
            { text: "Да, в ближайший год", value: "soon" },
            { text: "Возможно, через 2-3 года", value: "later" },
            { text: "Пока не планирую", value: "no" },
            { text: "Затрудняюсь ответить", value: "unknown" }
        ]
    },
    {
        question: "Какой опыт работы в сфере HoReCa у вас есть?",
        options: [
            { text: "Это мой первый бизнес", value: "beginner" },
            { text: "Есть небольшой опыт", value: "some" },
            { text: "Большой опыт в отрасли", value: "experienced" },
            { text: "Профессионал с многолетним стажем", value: "expert" }
        ]
    }
];

const randomSurveyQuestions = [
    {
        question: "Какое количество посадочных мест планируется?",
        options: [
            { text: "До 20 мест", value: "small", correct: true },
            { text: "20-50 мест", value: "medium", correct: true },
            { text: "50-100 мест", value: "large", correct: true },
            { text: "Свыше 100 мест", value: "huge", correct: false }
        ]
    },
    {
        question: "Какой тип кухни вы планируете?",
        options: [
            { text: "Европейская", value: "european", correct: true },
            { text: "Азиатская", value: "asian", correct: true },
            { text: "Русская", value: "russian", correct: true },
            { text: "Молекулярная гастрономия", value: "molecular", correct: false }
        ]
    },
    {
        question: "Какой средний чек планируется?",
        options: [
            { text: "До 500₽", value: "budget", correct: true },
            { text: "500-1500₽", value: "mid", correct: true },
            { text: "1500-3000₽", value: "premium", correct: true },
            { text: "Свыше 5000₽", value: "luxury", correct: false }
        ]
    },
    {
        question: "Какое количество сотрудников будет работать?",
        options: [
            { text: "2-5 человек", value: "small_team", correct: true },
            { text: "5-15 человек", value: "medium_team", correct: true },
            { text: "15-30 человек", value: "large_team", correct: true },
            { text: "Свыше 50 человек", value: "huge_team", correct: false }
        ]
    },
    {
        question: "Какой режим работы планируется?",
        options: [
            { text: "Только днем", value: "day_only", correct: true },
            { text: "Днем и вечером", value: "day_evening", correct: true },
            { text: "24/7", value: "round_clock", correct: true },
            { text: "Только по праздникам", value: "holidays_only", correct: false }
        ]
    }
];

const companyNames = [
    "ООО 'Вкусная еда'", "ИП Гастроном", "Ресторанная группа 'Премиум'",
    "Кафе-сеть 'Уютное место'", "Отель 'Гранд'", "Столовая 'Домашняя кухня'",
    "Ресторан 'Итальянский дворик'", "Кофейня 'Бодрое утро'", "Бистро 'Быстро и вкусно'",
    "Пиццерия 'Мама Мия'", "Суши-бар 'Токио'", "Стейк-хаус 'Мясной рай'"
];

const frequentPurchases = [
    "Посуда, кухонные принадлежности",
    "Холодильное оборудование, витрины",
    "Кофемашины, барное оборудование",
    "Плиты, духовки, жарочные поверхности",
    "Посудомоечные машины, мойки",
    "Мебель для кухни и зала",
    "Весы, кассовое оборудование",
    "Столовые приборы, текстиль"
];