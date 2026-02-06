const equipment = {
    // Барное оборудование
    bar: [
        { id: 1, name: "Кофемашина Nuova Simonelli", icon: "☕", price: 285000, category: "bar" },
        { id: 2, name: "Блендер Hamilton Beach", icon: "🥤", price: 18500, category: "bar" },
        { id: 3, name: "Льдогенератор Brema CB 249", icon: "🧊", price: 89000, category: "bar" },
        { id: 4, name: "Холодильник барный Polair", icon: "🍺", price: 52000, category: "bar" },
        { id: 5, name: "Соковыжималка Santos", icon: "🍊", price: 34000, category: "bar" },
        { id: 6, name: "Кофемолка Mazzer", icon: "☕", price: 67000, category: "bar" },
        { id: 7, name: "Миксер для коктейлей", icon: "🍸", price: 15000, category: "bar" }
    ],
    
    // Тепловое оборудование
    thermal: [
        { id: 8, name: "Плита газовая Kogast PS-T47", icon: "🔥", price: 78000, category: "thermal" },
        { id: 9, name: "Фритюрница Fimar FE-8", icon: "🍟", price: 45000, category: "thermal" },
        { id: 10, name: "Пароконвектомат Unox", icon: "♨️", price: 185000, category: "thermal" },
        { id: 11, name: "Гриль лавовый Kogast", icon: "🥩", price: 95000, category: "thermal" },
        { id: 12, name: "Сковорода опрокидывающаяся", icon: "🍳", price: 125000, category: "thermal" },
        { id: 13, name: "Мармит первых блюд", icon: "🍲", price: 38000, category: "thermal" },
        { id: 14, name: "Плита индукционная Bartscher", icon: "⚡", price: 56000, category: "thermal" }
    ],
    
    // Холодильное оборудование
    refrigeration: [
        { id: 15, name: "Холодильный шкаф Polair", icon: "❄️", price: 98000, category: "refrigeration" },
        { id: 16, name: "Морозильный ларь Italfrost", icon: "🧊", price: 67000, category: "refrigeration" },
        { id: 17, name: "Витрина холодильная Carboma", icon: "🥶", price: 145000, category: "refrigeration" },
        { id: 18, name: "Стол холодильный Polair", icon: "🧊", price: 89000, category: "refrigeration" },
        { id: 19, name: "Камера шоковой заморозки", icon: "❄️", price: 285000, category: "refrigeration" },
        { id: 20, name: "Льдогенератор Brema", icon: "🧊", price: 125000, category: "refrigeration" }
    ],
    
    // Механическое оборудование
    mechanical: [
        { id: 21, name: "Мясорубка Fimar 32/RS", icon: "🥩", price: 45000, category: "mechanical" },
        { id: 22, name: "Миксер планетарный Fimar", icon: "🥄", price: 78000, category: "mechanical" },
        { id: 23, name: "Слайсер Sirman Palladio", icon: "🔪", price: 42000, category: "mechanical" },
        { id: 24, name: "Овощерезка Robot Coupe", icon: "🥕", price: 89000, category: "mechanical" },
        { id: 25, name: "Тестомес спиральный", icon: "🍞", price: 156000, category: "mechanical" },
        { id: 26, name: "Картофелечистка Fimar", icon: "🥔", price: 67000, category: "mechanical" }
    ],
    
    // Посудомоечное оборудование
    dishwashing: [
        { id: 27, name: "Посудомойка фронтальная Kromo", icon: "🧽", price: 185000, category: "dishwashing" },
        { id: 28, name: "Посудомойка купольная Silanos", icon: "🧼", price: 245000, category: "dishwashing" },
        { id: 29, name: "Стол для грязной посуды", icon: "🍽️", price: 28000, category: "dishwashing" },
        { id: 30, name: "Мойка 2-секционная", icon: "🚿", price: 35000, category: "dishwashing" }
    ],
    
    // Нейтральное оборудование
    neutral: [
        { id: 31, name: "Стол рабочий нержавеющий", icon: "🪑", price: 25000, category: "neutral" },
        { id: 32, name: "Стеллаж кухонный 4 полки", icon: "📚", price: 18000, category: "neutral" },
        { id: 33, name: "Зонт вытяжной островной", icon: "💨", price: 45000, category: "neutral" },
        { id: 34, name: "Шкаф для хлеба", icon: "🍞", price: 32000, category: "neutral" },
        { id: 35, name: "Разделочная доска полиэтилен", icon: "🔪", price: 2500, category: "neutral" }
    ],
    
    // Кассовое оборудование
    pos: [
        { id: 36, name: "Касса POS Атол", icon: "💳", price: 45000, category: "pos" },
        { id: 37, name: "Принтер чеков Атол", icon: "🖨️", price: 12000, category: "pos" },
        { id: 38, name: "Весы торговые CAS", icon: "⚖️", price: 18000, category: "pos" },
        { id: 39, name: "Сканер штрих-кода", icon: "📱", price: 8500, category: "pos" },
        { id: 40, name: "Денежный ящик", icon: "💰", price: 6500, category: "pos" }
    ]
};

const equipmentByType = {
    cafe: ["bar", "thermal", "neutral", "pos"],
    restaurant: ["thermal", "refrigeration", "mechanical", "dishwashing", "neutral", "pos"],
    hotel: ["bar", "thermal", "refrigeration", "mechanical", "dishwashing", "neutral", "pos"],
    canteen: ["thermal", "refrigeration", "mechanical", "dishwashing", "neutral", "pos"]
};

function getEquipmentForClient(clientType) {
    const categories = equipmentByType[clientType] || ["thermal", "neutral", "pos"];
    let availableEquipment = [];
    
    categories.forEach(category => {
        if (equipment[category]) {
            availableEquipment = availableEquipment.concat(equipment[category]);
        }
    });
    
    // Возвращаем случайные 6-8 позиций
    const shuffled = availableEquipment.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 6);
}