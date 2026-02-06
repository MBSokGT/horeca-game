const horecaTasks = [
    {
        question: "Какая оптимальная температура подачи красного вина?",
        answer: "16-18",
        points: 10
    },
    {
        question: "Сколько граммов кофе нужно для приготовления одной порции эспрессо?",
        answer: "7-9",
        points: 10
    },
    {
        question: "Как называется французский соус из яичных желтков и масла?",
        answer: "голландский",
        points: 15
    },
    {
        question: "Какое время экстракции для идеального эспрессо?",
        answer: "25-30",
        points: 10
    },
    {
        question: "Из какого региона происходит сыр Пармезан?",
        answer: "эмилия-романья",
        points: 15
    },
    {
        question: "Какая температура подачи шампанского?",
        answer: "6-8",
        points: 10
    },
    {
        question: "Как называется техника приготовления мяса в вакууме?",
        answer: "су-вид",
        points: 20
    },
    {
        question: "Сколько калорий в 100г авокадо?",
        answer: "160",
        points: 15
    },
    {
        question: "Какой основной ингредиент в соусе Песто?",
        answer: "базилик",
        points: 10
    },
    {
        question: "Температура подачи белого вина?",
        answer: "8-12",
        points: 10
    },
    {
        question: "Как называется японская техника нарезки рыбы?",
        answer: "сашими",
        points: 15
    },
    {
        question: "Основной ингредиент соуса Бешамель?",
        answer: "молоко",
        points: 10
    },
    {
        question: "Какая часть говядины используется для стейка Рибай?",
        answer: "реберная",
        points: 15
    },
    {
        question: "Температура хранения красной икры?",
        answer: "-2-0",
        points: 15
    },
    {
        question: "Как называется итальянская паста в форме бабочек?",
        answer: "фарфалле",
        points: 10
    }
];

function getRandomTask() {
    return horecaTasks[Math.floor(Math.random() * horecaTasks.length)];
}

function checkAnswer(userAnswer, correctAnswer) {
    const normalizedUser = userAnswer.toLowerCase().trim();
    const normalizedCorrect = correctAnswer.toLowerCase().trim();
    
    // Проверяем точное совпадение или частичное для числовых диапазонов
    if (normalizedUser === normalizedCorrect) {
        return true;
    }
    
    // Для числовых диапазонов проверяем, попадает ли ответ в диапазон
    if (normalizedCorrect.includes('-')) {
        const [min, max] = normalizedCorrect.split('-').map(Number);
        const userNum = Number(normalizedUser);
        if (!isNaN(userNum) && userNum >= min && userNum <= max) {
            return true;
        }
    }
    
    // Проверяем частичное совпадение для текстовых ответов
    return normalizedCorrect.includes(normalizedUser) || normalizedUser.includes(normalizedCorrect);
}
    {
        question: "Какая температура фритюрного масла для картофеля фри?",
        answer: "175-180",
        points: 10
    },
    {
        question: "Сколько минут варится яйцо всмятку?",
        answer: "3-4",
        points: 10
    },
    {
        question: "Основной ингредиент соуса Тартар?",
        answer: "майонез",
        points: 10
    },
    {
        question: "Какой сыр используется в салате Цезарь?",
        answer: "пармезан",
        points: 10
    },
    {
        question: "Температура подачи коньяка?",
        answer: "18-20",
        points: 15
    },
    {
        question: "Как называется нарезка овощей соломкой?",
        answer: "жульен",
        points: 15
    },
    {
        question: "Сколько грамм в стандартной порции пасты?",
        answer: "80-100",
        points: 10
    },
    {
        question: "Основа для соуса Карбонара?",
        answer: "яйца",
        points: 15
    },
    {
        question: "Температура подачи пива?",
        answer: "4-6",
        points: 10
    },
    {
        question: "Какое мясо используется в Beef Wellington?",
        answer: "говядина",
        points: 15
    },
    {
        question: "Сколько калорий в 100г риса?",
        answer: "130",
        points: 15
    },
    {
        question: "Основной ингредиент соуса Айоли?",
        answer: "чеснок",
        points: 10
    },
    {
        question: "Какая температура для стейка medium?",
        answer: "60-65",
        points: 15
    },
    {
        question: "Из какой страны происходит суши?",
        answer: "япония",
        points: 10
    },
    {
        question: "Сколько граммов сахара в стандартном эспрессо?",
        answer: "0",
        points: 10
    }
];