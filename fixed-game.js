class ModernSalesGame {
    constructor() {
        this.player = {
            name: "Алексей Продажин",
            avatar: "👨💼",
            sales: 0,
            totalEarnings: 0,
            reputation: 50,
            level: 1
        };
        
        this.levelThresholds = [0, 10000, 30000, 80000, 180000, 350000, 600000, 1000000];
        
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
        document.getElementById('startSingleGame')?.addEventListener('click', () => {
            this.showCharacterSetup();
        });
        
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
        
        document.getElementById('startMeetingBtn')?.addEventListener('click', () => {
            document.getElementById('clientCard').style.display = 'none';
            this.startClientMeeting();
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
    }
    
    hideAllScreens() {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('characterSetup').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('clientCard').style.display = 'none';
        document.getElementById('clientSurvey').style.display = 'none';
    }
    
    generateNewClient() {
        this.gameState.currentClient = generateRandomClient();
        this.gameState.selectedEquipment = [];
        
        if (this.gameState.currentClient.category === "постоянный") {
            this.showClientCard();
        } else {
            this.startClientSurvey();
        }
    }
    
    showClientCard() {
        const client = this.gameState.currentClient;
        
        document.getElementById('clientFullName').textContent = client.name;
        document.getElementById('clientCompany').textContent = client.company;
        document.getElementById('clientPurchases').textContent = `Частые покупки: ${client.frequentPurchases}`;
        document.getElementById('clientAvatarLarge').textContent = client.avatar;
        document.getElementById('clientCategoryBadge').textContent = 'Постоянный клиент';
        
        document.getElementById('clientCard').style.display = 'flex';
    }
    
    startClientSurvey() {
        this.currentQuestionIndex = 0;
        this.gameState.currentClient.surveyAnswers = {};
        
        document.getElementById('clientSurvey').style.display = 'flex';
        this.showSurveyQuestion();
    }
    
    showSurveyQuestion() {
        const question = newClientQuestions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / newClientQuestions.length) * 100;
        
        document.getElementById('surveyProgress').style.width = progress + '%';
        document.getElementById('progressText').textContent = `Вопрос ${this.currentQuestionIndex + 1} из ${newClientQuestions.length}`;
        document.getElementById('questionTitle').textContent = question.question;
        
        const optionsDiv = document.getElementById('questionOptions');
        optionsDiv.innerHTML = '';
        
        question.options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'question-option';
            optionDiv.textContent = option.text;
            optionDiv.onclick = () => {
                this.selectSurveyOption(option.value, optionDiv);
            };
            optionsDiv.appendChild(optionDiv);
        });
    }
    
    selectSurveyOption(value, element) {
        document.querySelectorAll('.question-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        element.classList.add('selected');
        
        const questionKey = newClientQuestions[this.currentQuestionIndex].question;
        this.gameState.currentClient.surveyAnswers[questionKey] = value;
        
        setTimeout(() => {
            this.currentQuestionIndex++;
            
            if (this.currentQuestionIndex >= newClientQuestions.length) {
                this.completeSurvey();
            } else {
                this.showSurveyQuestion();
            }
        }, 800);
    }
    
    completeSurvey() {
        document.getElementById('clientSurvey').style.display = 'none';
        this.processSurveyAnswers();
        
        setTimeout(() => {
            this.startClientMeeting();
        }, 500);
    }
    
    processSurveyAnswers() {
        const answers = this.gameState.currentClient.surveyAnswers;
        
        if (answers['Какой у вас примерный бюджет на оборудование?']) {
            const budgetAnswer = answers['Какой у вас примерный бюджет на оборудование?'];
            const budgetModifiers = {
                'low': 0.7,
                'medium': 1.0,
                'high': 1.4,
                'premium': 2.0
            };
            
            if (budgetModifiers[budgetAnswer]) {
                this.gameState.currentClient.budget = Math.floor(
                    this.gameState.currentClient.originalBudget * budgetModifiers[budgetAnswer]
                );
            }
        }
        
        if (answers['Что для вас наиболее важно при выборе оборудования?']) {
            const priorityAnswer = answers['Что для вас наиболее важно при выборе оборудования?'];
            const personalityMap = {
                'price': 'экономный',
                'quality': 'требовательный',
                'speed': 'спешащий',
                'service': 'осторожный'
            };
            
            if (personalityMap[priorityAnswer]) {
                this.gameState.currentClient.personality = personalityMap[priorityAnswer];
            }
        }
    }
    
    startClientMeeting() {
        this.showClientDialog();
        this.updateLocationBackground();
        this.showClientCharacter();
    }
    
    showClientDialog() {
        const client = this.gameState.currentClient;
        const dialogBox = document.getElementById('dialogBox');
        
        document.getElementById('speakerAvatar').textContent = client.avatar;
        document.getElementById('speakerName').textContent = client.name;
        
        const greeting = this.generateClientGreeting(client);
        document.getElementById('dialogText').textContent = greeting;
        
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
        const needsText = `Конкретно ${client.specificNeed}. Я ${client.personality} покупатель.`;
        
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
    
    updateLocationBackground() {
        const client = this.gameState.currentClient;
        const locationBg = document.getElementById('locationBg');
        
        locationBg.className = 'location-bg';
        locationBg.classList.add(client.type);
    }
    
    showClientCharacter() {
        const client = this.gameState.currentClient;
        const clientChar = document.getElementById('clientChar');
        const clientSprite = document.getElementById('clientSprite');
        const clientName = document.getElementById('clientCharName');
        
        clientName.textContent = `${client.name} (${client.category})`;
        clientChar.style.display = 'block';
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
            const earnings = Math.floor(finalPrice * 0.01);
            
            this.player.sales += finalPrice;
            this.player.totalEarnings += earnings;
            this.player.reputation += Math.floor(satisfaction / 10);
            
            const newLevel = this.calculateLevel(this.player.totalEarnings);
            if (newLevel > this.player.level) {
                this.player.level = newLevel;
            }
            
            resultIcon.textContent = '💰';
            resultTitle.textContent = 'Сделка заключена!';
            resultText.textContent = `${reaction.message}\n\nСумма сделки: ${this.formatMoney(finalPrice)}\nВаш доход: ${this.formatMoney(earnings)}`;
        } else {
            resultIcon.textContent = '😞';
            resultTitle.textContent = 'Сделка сорвалась';
            resultText.textContent = reaction.message;
        }
        
        dealResult.style.display = 'block';
        this.updateUI();
    }
    
    calculateLevel(totalEarnings) {
        for (let i = this.levelThresholds.length - 1; i >= 0; i--) {
            if (totalEarnings >= this.levelThresholds[i]) {
                return i + 1;
            }
        }
        return 1;
    }
    
    hideDealResult() {
        document.getElementById('dealResult').style.display = 'none';
        document.getElementById('clientChar').style.display = 'none';
        this.hideDialog();
        
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
        
        if (effect.discount) this.gameState.gameModifiers.discount = effect.discount;
        if (effect.priceModifier) this.gameState.gameModifiers.priceModifier = effect.priceModifier;
        if (effect.marginBonus) this.gameState.gameModifiers.marginBonus = effect.marginBonus;
        if (effect.salesBonus) this.gameState.gameModifiers.salesBonus = effect.salesBonus;
        
        if (effect.sales) {
            this.player.sales += effect.sales;
            this.player.totalEarnings += Math.floor(effect.sales * 0.01);
        }
        
        if (effect.reputation) {
            this.player.reputation += effect.reputation;
        }
        
        alert(effect.message);
        document.getElementById('eventPopup').style.display = 'none';
        this.updateUI();
    }
    
    updateUI() {
        document.getElementById('playerNameDisplay').textContent = this.player.name;
        document.getElementById('playerLevelDisplay').textContent = `Менеджер Lv.${this.player.level}`;
        document.getElementById('reputationDisplay').textContent = this.player.reputation;
        document.getElementById('dayNumber').textContent = this.gameState.currentDay;
        document.getElementById('salesAmount').textContent = this.formatMoney(this.player.sales);
        document.getElementById('targetAmount').textContent = this.formatMoney(this.gameState.target);
        
        document.getElementById('playerAvatar').textContent = this.player.avatar;
        
        const progress = Math.min((this.player.sales / this.gameState.target) * 100, 100);
        document.getElementById('progressFill').style.width = progress + '%';
    }
    
    endGame() {
        this.hideAllScreens();
        document.getElementById('gameOverScreen').style.display = 'flex';
        
        const planCompletion = Math.round((this.player.sales / this.gameState.target) * 100);
        
        document.getElementById('finalSales').textContent = this.formatMoney(this.player.sales);
        document.getElementById('planCompletion').textContent = planCompletion + '%';
        
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
            totalEarnings: 0,
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

window.addEventListener('DOMContentLoaded', () => {
    new ModernSalesGame();
});