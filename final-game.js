class ModernSalesGame {
    constructor() {
        this.player = {
            name: "Алексей Продажин",
            avatar: "👨💼",
            sales: 0,
            commission: 0,
            reputation: 50,
            level: 1
        };
        
        this.gameState = {
            currentDay: 1,
            maxDays: 30,
            target: 500000,
            difficulty: "normal",
            currentClient: null,
            selectedEquipment: [],
            gameModifiers: {
                discount: 1.0,
                priceModifier: 1.0,
                marginBonus: 1.0,
                salesBonus: 1.0
            }
        };
        
        this.currentScreen = 'loading';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startLoadingSequence();
    }
    
    setupEventListeners() {
        // Главное меню
        document.getElementById('startSingleGame')?.addEventListener('click', () => {
            this.showCharacterSetup();
        });
        
        // Настройка персонажа
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                this.player.avatar = option.dataset.avatar;
            });
        });
        
        document.querySelectorAll('.difficulty-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.difficulty-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                this.gameState.difficulty = option.dataset.difficulty;
                
                const targets = { easy: 300000, normal: 500000, hard: 800000 };
                this.gameState.target = targets[this.gameState.difficulty];
            });
        });
        
        document.getElementById('startGameBtn')?.addEventListener('click', () => {
            this.player.name = document.getElementById('playerNameInput').value || "Алексей Продажин";
            this.startGame();
        });
        
        // Игровые кнопки
        document.getElementById('nextClientBtn')?.addEventListener('click', () => {
            this.generateNewClient();
        });
        
        document.getElementById('openCatalogBtn')?.addEventListener('click', () => {
            this.openCatalog();
        });
        
        document.getElementById('skipDayBtn')?.addEventListener('click', () => {
            this.nextDay();
        });
        
        document.getElementById('closeCatalog')?.addEventListener('click', () => {
            this.closeCatalog();
        });
        
        document.getElementById('makeOfferBtn')?.addEventListener('click', () => {
            this.makeOffer();
        });
        
        document.getElementById('continueBtn')?.addEventListener('click', () => {
            this.hideDealResult();
        });
        
        document.getElementById('playAgainBtn')?.addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('backToMenuBtn')?.addEventListener('click', () => {
            this.showMainMenu();
        });
    }
    
    startLoadingSequence() {
        const loadingTexts = [
            "Загружаем каталог посуды...",
            "Собираем осколки битых бокалов...",
            "Клиент стоит в пробке...",
            "Закупщик набирает цифры номера...",
            "Проверяем качество сковородок...",
            "Считаем количество вилок в наборе...",
            "Официант роняет поднос...",
            "Повар ищет нужную кастрюлю...",
            "Менеджер пьет третий кофе за утро...",
            "Поставщик опаздывает на встречу...",
            "Калибруем весы для точности...",
            "Протираем витрину от отпечатков...",
            "Клиент читает отзывы в интернете...",
            "Бухгалтер считает прибыль...",
            "Грузчик ищет место для холодильника...",
            "Готово к работе!"
        ];
        
        let currentTextIndex = 0;
        let progress = 0;
        
        document.getElementById('loadingText').textContent = loadingTexts[currentTextIndex];
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 8 + 2;
            
            if (Math.random() < 0.3 && currentTextIndex < loadingTexts.length - 2) {
                currentTextIndex++;
                document.getElementById('loadingText').textContent = loadingTexts[currentTextIndex];
            }
            
            if (progress >= 100) {
                progress = 100;
                document.getElementById('loadingText').textContent = loadingTexts[loadingTexts.length - 1];
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                    this.showMainMenu();
                }, 1000);
            }
            
            document.getElementById('loadingProgress').style.width = progress + '%';
        }, 300);
    }
    
    showMainMenu() {
        this.hideAllScreens();
        document.getElementById('mainMenu').style.display = 'flex';
        this.currentScreen = 'menu';
    }
    
    showCharacterSetup() {
        this.hideAllScreens();
        document.getElementById('characterSetup').style.display = 'flex';
        this.currentScreen = 'setup';
    }
    
    startGame() {
        this.hideAllScreens();
        document.getElementById('gameScreen').style.display = 'block';
        this.currentScreen = 'game';
        
        this.updateUI();
        this.generateNewClient();
        this.checkRandomEvent();
    }
    
    hideAllScreens() {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('characterSetup').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
    }
    
    generateNewClient() {
        this.gameState.currentClient = generateRandomClient();
        this.gameState.selectedEquipment = [];
        
        this.showClientDialog();
        this.updateLocationBackground();
        this.showClientCharacter();
    }
    
    showClientDialog() {
        const client = this.gameState.currentClient;
        const dialogBox = document.getElementById('dialogBox');
        
        // Обновляем информацию о говорящем
        document.getElementById('speakerAvatar').textContent = client.avatar;
        document.getElementById('speakerName').textContent = client.name;
        
        // Генерируем диалог
        const greeting = this.generateClientGreeting(client);
        document.getElementById('dialogText').textContent = greeting;
        
        // Добавляем кнопки действий
        const actionsDiv = document.getElementById('dialogActions');
        actionsDiv.innerHTML = '';
        
        const showCatalogBtn = document.createElement('button');
        showCatalogBtn.className = 'dialog-action';
        showCatalogBtn.textContent = '📦 Показать каталог';
        showCatalogBtn.addEventListener('click', () => {
            this.hideDialog();
            this.openCatalog();
        });
        
        const askQuestionsBtn = document.createElement('button');
        askQuestionsBtn.className = 'dialog-action';
        askQuestionsBtn.textContent = '❓ Уточнить потребности';
        askQuestionsBtn.addEventListener('click', () => {
            this.showClientNeeds();
        });
        
        actionsDiv.appendChild(showCatalogBtn);
        actionsDiv.appendChild(askQuestionsBtn);
        
        dialogBox.style.display = 'block';
    }
    
    generateClientGreeting(client) {
        const categoryText = client.category === "постоянный" ? " (постоянный клиент)" : " (новый клиент)";
        
        const greetings = {
            cafe: `Здравствуйте! Я ${client.name}${categoryText}, открываю кафе. Нужно оборудование на ${this.formatMoney(client.budget)}.`,
            restaurant: `Добро пожаловать! ${client.name}${categoryText}, владелец ресторана. Ищу качественное оборудование, бюджет ${this.formatMoney(client.budget)}.`,
            hotel: `Приветствую! ${client.name}${categoryText} из отеля. Нам требуется профессиональное оборудование, готовы потратить ${this.formatMoney(client.budget)}.`,
            canteen: `Здравствуйте! ${client.name}${categoryText}, заведующий столовой. Нужно надежное оборудование, бюджет ограничен ${this.formatMoney(client.budget)}.`
        };
        
        return greetings[client.type] || `Здравствуйте! Меня зовут ${client.name}, ищу оборудование.`;
    }
    
    showClientNeeds() {
        const client = this.gameState.currentClient;
        const needsText = `Мне нужно: ${client.needs}. Я ${client.personality} покупатель, поэтому ${this.getPersonalityDescription(client.personality)}.`;
        
        document.getElementById('dialogText').textContent = needsText;
        
        const actionsDiv = document.getElementById('dialogActions');
        actionsDiv.innerHTML = '';
        
        const showCatalogBtn = document.createElement('button');
        showCatalogBtn.className = 'dialog-action';
        showCatalogBtn.textContent = '📦 Показать подходящее оборудование';
        showCatalogBtn.addEventListener('click', () => {
            this.hideDialog();
            this.openCatalog();
        });
        
        actionsDiv.appendChild(showCatalogBtn);
    }
    
    getPersonalityDescription(personality) {
        const descriptions = {
            экономный: "внимательно слежу за ценами",
            требовательный: "ожидаю только лучшее качество",
            спешащий: "хочу быстро принять решение",
            осторожный: "тщательно изучаю каждое предложение",
            щедрый: "готов платить за качество"
        };
        
        return descriptions[personality] || "имею свои предпочтения";
    }
    
    updateLocationBackground() {
        const client = this.gameState.currentClient;
        const locationBg = document.getElementById('locationBg');
        
        // Убираем все классы локаций
        locationBg.className = 'location-bg';
        
        // Добавляем класс в зависимости от типа клиента
        locationBg.classList.add(client.type);
    }
    
    showClientCharacter() {
        const client = this.gameState.currentClient;
        const clientChar = document.getElementById('clientChar');
        const clientSprite = document.getElementById('clientSprite');
        const clientName = document.getElementById('clientCharName');
        
        // Обновляем спрайт клиента
        clientSprite.style.background = this.getClientSprite(client);
        clientName.textContent = `${client.name} (${client.category})`;
        
        clientChar.style.display = 'block';
    }
    
    getClientSprite(client) {
        // Генерируем SVG спрайт в зависимости от типа клиента
        const sprites = {
            cafe: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><ellipse cx="100" cy="280" rx="30" ry="10" fill="%23333" opacity="0.3"/><rect x="85" y="200" width="30" height="80" fill="%23e67e22"/><rect x="75" y="150" width="50" height="60" fill="%23f39c12"/><circle cx="100" cy="120" r="25" fill="%23f4d1ae"/><rect x="90" y="100" width="20" height="15" fill="%23654321"/></svg>')`,
            restaurant: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><ellipse cx="100" cy="280" rx="30" ry="10" fill="%23333" opacity="0.3"/><rect x="85" y="200" width="30" height="80" fill="%232c3e50"/><rect x="75" y="150" width="50" height="60" fill="%23ffffff"/><circle cx="100" cy="120" r="25" fill="%23f4d1ae"/><rect x="90" y="100" width="20" height="15" fill="%23654321"/></svg>')`,
            hotel: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><ellipse cx="100" cy="280" rx="30" ry="10" fill="%23333" opacity="0.3"/><rect x="85" y="200" width="30" height="80" fill="%238e44ad"/><rect x="75" y="150" width="50" height="60" fill="%239b59b6"/><circle cx="100" cy="120" r="25" fill="%23f4d1ae"/><rect x="90" y="100" width="20" height="15" fill="%23654321"/></svg>')`,
            canteen: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><ellipse cx="100" cy="280" rx="30" ry="10" fill="%23333" opacity="0.3"/><rect x="85" y="200" width="30" height="80" fill="%2327ae60"/><rect x="75" y="150" width="50" height="60" fill="%232ecc71"/><circle cx="100" cy="120" r="25" fill="%23f4d1ae"/><rect x="90" y="100" width="20" height="15" fill="%23654321"/></svg>')`
        };
        
        return sprites[client.type] || sprites.cafe;
    }
    
    hideDialog() {
        document.getElementById('dialogBox').style.display = 'none';
    }
    
    openCatalog() {
        const catalog = document.getElementById('equipmentCatalog');
        this.displayEquipment();
        this.updateOfferSummary();
        catalog.style.display = 'block';
    }
    
    closeCatalog() {
        document.getElementById('equipmentCatalog').style.display = 'none';
    }
    
    displayEquipment() {
        const equipmentGrid = document.getElementById('equipmentGrid');
        equipmentGrid.innerHTML = '';
        
        const availableEquipment = getEquipmentForClient(this.gameState.currentClient.type);
        
        availableEquipment.forEach(item => {
            const equipmentDiv = document.createElement('div');
            equipmentDiv.className = 'equipment-item';
            equipmentDiv.dataset.id = item.id;
            
            equipmentDiv.innerHTML = `
                <div class="icon">${item.icon}</div>
                <div class="name">${item.name}</div>
                <div class="price">${this.formatMoney(this.calculatePrice(item.price))}</div>
            `;
            
            equipmentDiv.addEventListener('click', () => {
                this.toggleEquipment(item, equipmentDiv);
            });
            
            equipmentGrid.appendChild(equipmentDiv);
        });
    }
    
    toggleEquipment(item, element) {
        const index = this.gameState.selectedEquipment.findIndex(eq => eq.id === item.id);
        
        if (index > -1) {
            this.gameState.selectedEquipment.splice(index, 1);
            element.classList.remove('selected');
        } else {
            this.gameState.selectedEquipment.push(item);
            element.classList.add('selected');
        }
        
        this.updateOfferSummary();
    }
    
    calculatePrice(basePrice) {
        return Math.floor(basePrice * this.gameState.gameModifiers.discount * this.gameState.gameModifiers.priceModifier);
    }
    
    updateOfferSummary() {
        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {
            return sum + this.calculatePrice(item.price);
        }, 0);
        
        document.getElementById('totalPrice').textContent = this.formatMoney(totalPrice);
        document.getElementById('makeOfferBtn').disabled = this.gameState.selectedEquipment.length === 0;
    }
    
    makeOffer() {
        if (this.gameState.selectedEquipment.length === 0) return;
        
        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {
            return sum + this.calculatePrice(item.price);
        }, 0);
        
        const satisfaction = calculateClientSatisfaction(this.gameState.currentClient, this.gameState.selectedEquipment, totalPrice);
        const reaction = getClientReaction(satisfaction);
        
        this.closeCatalog();
        this.showDealResult(reaction, totalPrice, satisfaction);
    }
    
    showDealResult(reaction, totalPrice, satisfaction) {
        const dealResult = document.getElementById('dealResult');
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultText = document.getElementById('resultText');
        
        if (reaction.success) {
            const finalPrice = Math.floor(totalPrice * reaction.bonus * this.gameState.gameModifiers.salesBonus);
            const commission = Math.floor(finalPrice * 0.01); // 1% комиссия
            
            this.player.sales += finalPrice;
            this.player.commission += commission;
            this.player.reputation += Math.floor(satisfaction / 10);
            
            // Повышение уровня
            const newLevel = Math.floor(this.player.commission / 10000) + 1;
            if (newLevel > this.player.level) {
                this.player.level = newLevel;
            }
            
            resultIcon.textContent = '💰';
            resultTitle.textContent = 'Сделка заключена!';
            resultText.textContent = `${reaction.message}\n\nСумма сделки: ${this.formatMoney(finalPrice)}\nВаша комиссия: ${this.formatMoney(commission)}`;
        } else {
            resultIcon.textContent = '😞';
            resultTitle.textContent = 'Сделка сорвалась';
            resultText.textContent = reaction.message;
        }
        
        dealResult.style.display = 'block';
        this.updateUI();
    }
    
    hideDealResult() {
        document.getElementById('dealResult').style.display = 'none';
        document.getElementById('clientChar').style.display = 'none';
        this.hideDialog();
        
        // Небольшая задержка перед следующим клиентом
        setTimeout(() => {
            if (Math.random() < 0.3) {
                this.nextDay();
            }
        }, 1000);
    }
    
    nextDay() {
        this.gameState.currentDay++;
        
        if (this.gameState.currentDay > this.gameState.maxDays) {
            this.endGame();
            return;
        }
        
        this.checkRandomEvent();
        this.updateUI();
    }
    
    checkRandomEvent() {
        const event = getRandomEvent();
        if (event) {
            this.showEvent(event);
        }
    }
    
    showEvent(event) {
        const eventPopup = document.getElementById('eventPopup');
        document.getElementById('eventTitle').textContent = event.title;
        document.getElementById('eventDescription').textContent = event.description;
        
        const actionsDiv = document.getElementById('eventActions');
        actionsDiv.innerHTML = '';
        
        event.actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'event-action';
            button.textContent = action.text;
            button.addEventListener('click', () => {
                this.handleEventAction(event, action.effect);
            });
            actionsDiv.appendChild(button);
        });
        
        eventPopup.style.display = 'block';
    }
    
    handleEventAction(event, actionEffect) {
        const effect = applyEventEffect(event, actionEffect, this);
        
        // Применяем эффекты
        if (effect.discount) this.gameState.gameModifiers.discount = effect.discount;
        if (effect.priceModifier) this.gameState.gameModifiers.priceModifier = effect.priceModifier;
        if (effect.marginBonus) this.gameState.gameModifiers.marginBonus = effect.marginBonus;
        if (effect.salesBonus) this.gameState.gameModifiers.salesBonus = effect.salesBonus;
        
        if (effect.sales) {
            this.player.sales += effect.sales;
            this.player.commission += Math.floor(effect.sales * 0.01);
        }
        
        if (effect.reputation) {
            this.player.reputation += effect.reputation;
        }
        
        // Показываем результат события
        alert(effect.message);
        document.getElementById('eventPopup').style.display = 'none';
        this.updateUI();
    }
    
    updateUI() {
        // Обновляем HUD
        document.getElementById('playerNameDisplay').textContent = this.player.name;
        document.getElementById('playerLevelDisplay').textContent = `Менеджер Lv.${this.player.level}`;
        document.getElementById('reputationDisplay').textContent = this.player.reputation;
        document.getElementById('dayNumber').textContent = this.gameState.currentDay;
        document.getElementById('salesAmount').textContent = this.formatMoney(this.player.sales);
        document.getElementById('commissionAmount').textContent = this.formatMoney(this.player.commission);
        document.getElementById('targetAmount').textContent = this.formatMoney(this.gameState.target);
        
        // Обновляем аватар
        document.getElementById('playerAvatar').textContent = this.player.avatar;
        
        // Обновляем прогресс-бар
        const progress = Math.min((this.player.sales / this.gameState.target) * 100, 100);
        document.getElementById('progressFill').style.width = progress + '%';
    }
    
    endGame() {
        this.hideAllScreens();
        document.getElementById('gameOverScreen').style.display = 'flex';
        
        const planCompletion = Math.round((this.player.sales / this.gameState.target) * 100);
        
        document.getElementById('finalSales').textContent = this.formatMoney(this.player.sales);
        document.getElementById('planCompletion').textContent = planCompletion + '%';
        
        // Определяем достижение
        let achievement = '';
        if (planCompletion >= 150) {
            achievement = '🏆 Легенда продаж! Превышение плана на 50%+';
        } else if (planCompletion >= 120) {
            achievement = '🥇 Отличный результат! Превышение плана на 20%+';
        } else if (planCompletion >= 100) {
            achievement = '✅ План выполнен! Вы справились с задачей!';
        } else if (planCompletion >= 80) {
            achievement = '📈 Хороший результат! Почти достигли цели!';
        } else {
            achievement = '💪 Есть куда расти! Попробуйте еще раз!';
        }
        
        document.getElementById('achievement').textContent = achievement;
    }
    
    resetGame() {
        this.player = {
            name: "Алексей Продажин",
            avatar: "👨💼",
            sales: 0,
            commission: 0,
            reputation: 50,
            level: 1
        };
        
        this.gameState = {
            currentDay: 1,
            maxDays: 30,
            target: 500000,
            difficulty: "normal",
            currentClient: null,
            selectedEquipment: [],
            gameModifiers: {
                discount: 1.0,
                priceModifier: 1.0,
                marginBonus: 1.0,
                salesBonus: 1.0
            }
        };
        
        this.showCharacterSetup();
    }
    
    formatMoney(amount) {
        return new Intl.NumberFormat('ru-RU').format(amount);
    }
}

// Запуск игры
window.addEventListener('DOMContentLoaded', () => {
    new ModernSalesGame();
});