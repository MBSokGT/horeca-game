// Каталог оборудования ComplexBar
const complexBarEquipment = {
    bar: [
        { id: "cb_bar_001", name: "Шейкер Boston 2 части", price: 2500, icon: "🍸", category: "bar" },
        { id: "cb_bar_002", name: "Джиггер двойной 25/50 мл", price: 1800, icon: "📏", category: "bar" },
        { id: "cb_bar_003", name: "Стрейнер Hawthorne", price: 2200, icon: "⚡", category: "bar" },
        { id: "cb_bar_004", name: "Мадлер деревянный 25 см", price: 800, icon: "🥄", category: "bar" },
        { id: "cb_bar_005", name: "Барная ложка спиральная 40 см", price: 1500, icon: "🥄", category: "bar" },
        { id: "cb_bar_006", name: "Открывалка для бутылок Speed", price: 1200, icon: "🍾", category: "bar" },
        { id: "cb_bar_007", name: "Нож барный для цитрусов", price: 2800, icon: "🔪", category: "bar" },
        { id: "cb_bar_008", name: "Доска разделочная бамбук 30x20", price: 1600, icon: "📋", category: "bar" }
    ],
    thermal: [
        { id: "cb_therm_001", name: "Плита газовая 4 конфорки Kogast", price: 85000, icon: "🔥", category: "thermal" },
        { id: "cb_therm_002", name: "Духовка конвекционная Unox 6 GN", price: 285000, icon: "🔥", category: "thermal" },
        { id: "cb_therm_003", name: "Фритюрница электрическая 8л", price: 45000, icon: "🍟", category: "thermal" },
        { id: "cb_therm_004", name: "Гриль контактный Sirman", price: 65000, icon: "🥩", category: "thermal" },
        { id: "cb_therm_005", name: "Пароконвектомат Rational 6 GN", price: 320000, icon: "💨", category: "thermal" },
        { id: "cb_therm_006", name: "Плита индукционная настольная", price: 25000, icon: "⚡", category: "thermal" },
        { id: "cb_therm_007", name: "Сковорода WOK газовая", price: 55000, icon: "🍳", category: "thermal" }
    ],
    refrigeration: [
        { id: "cb_refrig_001", name: "Холодильник Polair 700л", price: 95000, icon: "❄️", category: "refrigeration" },
        { id: "cb_refrig_002", name: "Морозильник Polair -18°C", price: 110000, icon: "🧊", category: "refrigeration" },
        { id: "cb_refrig_003", name: "Витрина холодильная настольная", price: 45000, icon: "🧊", category: "refrigeration" },
        { id: "cb_refrig_004", name: "Льдогенератор Brema 50кг/сут", price: 125000, icon: "🧊", category: "refrigeration" },
        { id: "cb_refrig_005", name: "Шкаф шоковой заморозки", price: 180000, icon: "❄️", category: "refrigeration" },
        { id: "cb_refrig_006", name: "Стол холодильный 2 двери", price: 75000, icon: "🧊", category: "refrigeration" }
    ],
    mechanical: [
        { id: "cb_mech_001", name: "Миксер планетарный Dito Sama 20л", price: 145000, icon: "🌪️", category: "mechanical" },
        { id: "cb_mech_002", name: "Слайсер Sirman 300мм", price: 85000, icon: "🔪", category: "mechanical" },
        { id: "cb_mech_003", name: "Мясорубка Fimar 32/98", price: 95000, icon: "🥩", category: "mechanical" },
        { id: "cb_mech_004", name: "Овощерезка Robot Coupe CL50", price: 125000, icon: "🥕", category: "mechanical" },
        { id: "cb_mech_005", name: "Блендер погружной Robot Coupe", price: 35000, icon: "🌪️", category: "mechanical" },
        { id: "cb_mech_006", name: "Тестомес спиральный 50кг", price: 285000, icon: "🍞", category: "mechanical" }
    ],
    dishwashing: [
        { id: "cb_dish_001", name: "Посудомойка фронтальная Kromo", price: 185000, icon: "🧽", category: "dishwashing" },
        { id: "cb_dish_002", name: "Посудомойка купольная Kromo", price: 285000, icon: "🧽", category: "dishwashing" },
        { id: "cb_dish_003", name: "Мойка 2-секционная 1200x600", price: 25000, icon: "🚿", category: "dishwashing" },
        { id: "cb_dish_004", name: "Стол для грязной посуды", price: 18000, icon: "📦", category: "dishwashing" },
        { id: "cb_dish_005", name: "Стеллаж для чистой посуды", price: 15000, icon: "📚", category: "dishwashing" }
    ],
    neutral: [
        { id: "cb_neut_001", name: "Стол производственный 1200x600", price: 22000, icon: "📋", category: "neutral" },
        { id: "cb_neut_002", name: "Стеллаж 4 полки 1200x400", price: 18000, icon: "📚", category: "neutral" },
        { id: "cb_neut_003", name: "Зонт вытяжной островной 2000мм", price: 65000, icon: "🌪️", category: "neutral" },
        { id: "cb_neut_004", name: "Весы электронные до 15кг", price: 8500, icon: "⚖️", category: "neutral" },
        { id: "cb_neut_005", name: "Полка настенная 1000x300", price: 4500, icon: "📏", category: "neutral" },
        { id: "cb_neut_006", name: "Тележка сервировочная 3 яруса", price: 12000, icon: "🛒", category: "neutral" }
    ],
    pos: [
        { id: "cb_pos_001", name: "Касса Атол 90Ф", price: 25000, icon: "💳", category: "pos" },
        { id: "cb_pos_002", name: "Терминал эквайринга", price: 15000, icon: "💳", category: "pos" },
        { id: "cb_pos_003", name: "Сканер штрих-кода", price: 8500, icon: "📱", category: "pos" },
        { id: "cb_pos_004", name: "Принтер чеков 80мм", price: 12000, icon: "🖨️", category: "pos" },
        { id: "cb_pos_005", name: "Денежный ящик", price: 6500, icon: "💰", category: "pos" }
    ]
};

// Функция получения оборудования для клиента
function getEquipmentForClient(clientType) {
    const allEquipment = Object.values(complexBarEquipment).flat();
    
    // Возвращаем весь каталог, но можно фильтровать по типу клиента
    switch(clientType) {
        case 'cafe':
            return allEquipment.filter(item => 
                ['bar', 'thermal', 'refrigeration', 'mechanical', 'pos'].includes(item.category)
            );
        case 'restaurant':
            return allEquipment; // Ресторанам показываем все
        case 'hotel':
            return allEquipment; // Отелям тоже все
        case 'canteen':
            return allEquipment.filter(item => 
                ['thermal', 'refrigeration', 'mechanical', 'dishwashing', 'neutral'].includes(item.category)
            );
        default:
            return allEquipment;
    }
}