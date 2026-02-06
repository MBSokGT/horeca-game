const equipment = {
    kitchen: [
        { id: 1, name: "Плита газовая 4-конф", icon: "🔥", price: 45000, category: "kitchen" },
        { id: 2, name: "Холодильник проф", icon: "❄️", price: 85000, category: "kitchen" },
        { id: 3, name: "Фритюрница", icon: "🍟", price: 35000, category: "kitchen" },
        { id: 4, name: "Пароконвектомат", icon: "♨️", price: 120000, category: "kitchen" },
        { id: 5, name: "Мясорубка проф", icon: "🥩", price: 25000, category: "kitchen" },
        { id: 6, name: "Миксер планетарный", icon: "🥄", price: 55000, category: "kitchen" },
        { id: 7, name: "Слайсер", icon: "🔪", price: 30000, category: "kitchen" },
        { id: 8, name: "Посудомойка проф", icon: "🧽", price: 95000, category: "kitchen" }
    ],
    
    bar: [
        { id: 9, name: "Кофемашина эспрессо", icon: "☕", price: 180000, category: "bar" },
        { id: 10, name: "Блендер барный", icon: "🥤", price: 15000, category: "bar" },
        { id: 11, name: "Льдогенератор", icon: "🧊", price: 65000, category: "bar" },
        { id: 12, name: "Холодильник барный", icon: "🍺", price: 45000, category: "bar" },
        { id: 13, name: "Соковыжималка", icon: "🍊", price: 25000, category: "bar" }
    ],
    
    service: [
        { id: 14, name: "Касса POS", icon: "💳", price: 35000, category: "service" },
        { id: 15, name: "Принтер чеков", icon: "🖨️", price: 8000, category: "service" },
        { id: 16, name: "Весы торговые", icon: "⚖️", price: 12000, category: "service" },
        { id: 17, name: "Сканер штрих-кода", icon: "📱", price: 5000, category: "service" }
    ],
    
    furniture: [
        { id: 18, name: "Стол рабочий нерж", icon: "🪑", price: 18000, category: "furniture" },
        { id: 19, name: "Стеллаж кухонный", icon: "📚", price: 12000, category: "furniture" },
        { id: 20, name: "Мойка 2-секц нерж", icon: "🚿", price: 22000, category: "furniture" },
        { id: 21, name: "Шкаф холодильный", icon: "🗄️", price: 75000, category: "furniture" }
    ]
};

const equipmentByType = {
    cafe: ["kitchen", "bar", "service"],
    restaurant: ["kitchen", "bar", "service", "furniture"],
    hotel: ["kitchen", "bar", "service", "furniture"],
    canteen: ["kitchen", "service", "furniture"]
};

function getEquipmentForClient(clientType) {
    const categories = equipmentByType[clientType] || ["kitchen", "service"];
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