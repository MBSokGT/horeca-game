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
        this.generateNewClient(); // Автоматически генерируем первого клиента
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
        
        const askManagerQuestionBtn = document.createElement('button');
        askManagerQuestionBtn.className = 'dialog-action';
        askManagerQuestionBtn.textContent = '🤔 Задать вопрос';
        askManagerQuestionBtn.addEventListener('click', () => {
            this.showManagerQuestions();
        });
        
        actionsDiv.appendChild(showCatalogBtn);
        actionsDiv.appendChild(askQuestionsBtn);
        actionsDiv.appendChild(askManagerQuestionBtn);
        
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
        const needsText = `Конкретно ${client.specificNeed}. Я ${client.personality} покупатель, поэтому ${this.getPersonalityDescription(client.personality)}.`;
        
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
    
    showManagerQuestions() {
        const client = this.gameState.currentClient;
        const question = managerQuestions[Math.floor(Math.random() * managerQuestions.length)];\n        \n        document.getElementById('dialogText').textContent = `Вы: \"${question}\"`;\n        \n        setTimeout(() => {\n            const responses = [\n                \"Хороший вопрос! Это важно для нас.\",\n                \"Да, это нужно учесть при выборе.\",\n                \"Спасибо, что уточнили этот момент.\",\n                \"Это поможет нам принять решение.\",\n                \"Отличный подход к делу!\"\n            ];\n            \n            const response = responses[Math.floor(Math.random() * responses.length)];\n            document.getElementById('dialogText').textContent = `${client.name}: \"${response}\"`;\n            \n            // Повышаем репутацию за хороший вопрос\n            this.player.reputation += 2;\n            \n            const actionsDiv = document.getElementById('dialogActions');\n            actionsDiv.innerHTML = '';\n            \n            const showCatalogBtn = document.createElement('button');\n            showCatalogBtn.className = 'dialog-action';\n            showCatalogBtn.textContent = '📦 Показать каталог';\n            showCatalogBtn.addEventListener('click', () => {\n                this.hideDialog();\n                this.openCatalog();\n            });\n            \n            actionsDiv.appendChild(showCatalogBtn);\n        }, 1500);\n    }\n    \n    getPersonalityDescription(personality) {\n        const descriptions = {\n            экономный: \"внимательно слежу за ценами\",\n            требовательный: \"ожидаю только лучшее качество\",\n            спешащий: \"хочу быстро принять решение\",\n            осторожный: \"тщательно изучаю каждое предложение\",\n            щедрый: \"готов платить за качество\"\n        };\n        \n        return descriptions[personality] || \"имею свои предпочтения\";\n    }\n    \n    updateLocationBackground() {\n        const client = this.gameState.currentClient;\n        const locationBg = document.getElementById('locationBg');\n        \n        // Убираем все классы локаций\n        locationBg.className = 'location-bg';\n        \n        // Добавляем класс в зависимости от типа клиента\n        locationBg.classList.add(client.type);\n    }\n    \n    showClientCharacter() {\n        const client = this.gameState.currentClient;\n        const clientChar = document.getElementById('clientChar');\n        const clientSprite = document.getElementById('clientSprite');\n        const clientName = document.getElementById('clientCharName');\n        \n        // Обновляем спрайт клиента\n        clientSprite.style.background = this.getClientSprite(client);\n        clientName.textContent = `${client.name} (${client.category})`;\n        \n        clientChar.style.display = 'block';\n    }\n    \n    getClientSprite(client) {\n        // Генерируем SVG спрайт в зависимости от типа клиента\n        const sprites = {\n            cafe: `url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 300\"><ellipse cx=\"100\" cy=\"280\" rx=\"30\" ry=\"10\" fill=\"%23333\" opacity=\"0.3\"/><rect x=\"85\" y=\"200\" width=\"30\" height=\"80\" fill=\"%23e67e22\"/><rect x=\"75\" y=\"150\" width=\"50\" height=\"60\" fill=\"%23f39c12\"/><circle cx=\"100\" cy=\"120\" r=\"25\" fill=\"%23f4d1ae\"/><rect x=\"90\" y=\"100\" width=\"20\" height=\"15\" fill=\"%23654321\"/></svg>')`,\n            restaurant: `url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 300\"><ellipse cx=\"100\" cy=\"280\" rx=\"30\" ry=\"10\" fill=\"%23333\" opacity=\"0.3\"/><rect x=\"85\" y=\"200\" width=\"30\" height=\"80\" fill=\"%232c3e50\"/><rect x=\"75\" y=\"150\" width=\"50\" height=\"60\" fill=\"%23ffffff\"/><circle cx=\"100\" cy=\"120\" r=\"25\" fill=\"%23f4d1ae\"/><rect x=\"90\" y=\"100\" width=\"20\" height=\"15\" fill=\"%23654321\"/></svg>')`,\n            hotel: `url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 300\"><ellipse cx=\"100\" cy=\"280\" rx=\"30\" ry=\"10\" fill=\"%23333\" opacity=\"0.3\"/><rect x=\"85\" y=\"200\" width=\"30\" height=\"80\" fill=\"%238e44ad\"/><rect x=\"75\" y=\"150\" width=\"50\" height=\"60\" fill=\"%239b59b6\"/><circle cx=\"100\" cy=\"120\" r=\"25\" fill=\"%23f4d1ae\"/><rect x=\"90\" y=\"100\" width=\"20\" height=\"15\" fill=\"%23654321\"/></svg>')`,\n            canteen: `url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 300\"><ellipse cx=\"100\" cy=\"280\" rx=\"30\" ry=\"10\" fill=\"%23333\" opacity=\"0.3\"/><rect x=\"85\" y=\"200\" width=\"30\" height=\"80\" fill=\"%2327ae60\"/><rect x=\"75\" y=\"150\" width=\"50\" height=\"60\" fill=\"%232ecc71\"/><circle cx=\"100\" cy=\"120\" r=\"25\" fill=\"%23f4d1ae\"/><rect x=\"90\" y=\"100\" width=\"20\" height=\"15\" fill=\"%23654321\"/></svg>')`\n        };\n        \n        return sprites[client.type] || sprites.cafe;\n    }\n    \n    hideDialog() {\n        document.getElementById('dialogBox').style.display = 'none';\n    }\n    \n    openCatalog() {\n        const catalog = document.getElementById('equipmentCatalog');\n        this.displayEquipment();\n        this.updateOfferSummary();\n        catalog.style.display = 'block';\n    }\n    \n    closeCatalog() {\n        document.getElementById('equipmentCatalog').style.display = 'none';\n    }\n    \n    displayEquipment() {\n        const equipmentGrid = document.getElementById('equipmentGrid');\n        equipmentGrid.innerHTML = '';\n        \n        const availableEquipment = getEquipmentForClient(this.gameState.currentClient.type);\n        \n        availableEquipment.forEach(item => {\n            const equipmentDiv = document.createElement('div');\n            equipmentDiv.className = 'equipment-item';\n            equipmentDiv.dataset.id = item.id;\n            \n            equipmentDiv.innerHTML = `\n                <div class=\"icon\">${item.icon}</div>\n                <div class=\"name\">${item.name}</div>\n                <div class=\"price\">${this.formatMoney(this.calculatePrice(item.price))}</div>\n            `;\n            \n            equipmentDiv.addEventListener('click', () => {\n                this.toggleEquipment(item, equipmentDiv);\n            });\n            \n            equipmentGrid.appendChild(equipmentDiv);\n        });\n    }\n    \n    toggleEquipment(item, element) {\n        const index = this.gameState.selectedEquipment.findIndex(eq => eq.id === item.id);\n        \n        if (index > -1) {\n            this.gameState.selectedEquipment.splice(index, 1);\n            element.classList.remove('selected');\n        } else {\n            this.gameState.selectedEquipment.push(item);\n            element.classList.add('selected');\n        }\n        \n        this.updateOfferSummary();\n    }\n    \n    calculatePrice(basePrice) {\n        return Math.floor(basePrice * this.gameState.gameModifiers.discount * this.gameState.gameModifiers.priceModifier);\n    }\n    \n    updateOfferSummary() {\n        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {\n            return sum + this.calculatePrice(item.price);\n        }, 0);\n        \n        document.getElementById('totalPrice').textContent = this.formatMoney(totalPrice);\n        document.getElementById('makeOfferBtn').disabled = this.gameState.selectedEquipment.length === 0;\n    }\n    \n    makeOffer() {\n        if (this.gameState.selectedEquipment.length === 0) return;\n        \n        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {\n            return sum + this.calculatePrice(item.price);\n        }, 0);\n        \n        const satisfaction = calculateClientSatisfaction(this.gameState.currentClient, this.gameState.selectedEquipment, totalPrice);\n        const reaction = getClientReaction(satisfaction);\n        \n        this.closeCatalog();\n        this.showDealResult(reaction, totalPrice, satisfaction);\n    }\n    \n    showDealResult(reaction, totalPrice, satisfaction) {\n        const dealResult = document.getElementById('dealResult');\n        const resultIcon = document.getElementById('resultIcon');\n        const resultTitle = document.getElementById('resultTitle');\n        const resultText = document.getElementById('resultText');\n        \n        if (reaction.success) {\n            const finalPrice = Math.floor(totalPrice * reaction.bonus * this.gameState.gameModifiers.salesBonus);\n            const earnings = Math.floor(finalPrice * 0.01); // 1% в бюджет\n            \n            this.player.sales += finalPrice;\n            this.player.totalEarnings += earnings;\n            this.player.reputation += Math.floor(satisfaction / 10);\n            \n            // Повышение уровня\n            const newLevel = this.calculateLevel(this.player.totalEarnings);\n            if (newLevel > this.player.level) {\n                this.player.level = newLevel;\n            }\n            \n            resultIcon.textContent = '💰';\n            resultTitle.textContent = 'Сделка заключена!';\n            resultText.textContent = `${reaction.message}\\n\\nСумма сделки: ${this.formatMoney(finalPrice)}\\nВаш доход: ${this.formatMoney(earnings)}`;\n        } else {\n            resultIcon.textContent = '😞';\n            resultTitle.textContent = 'Сделка сорвалась';\n            resultText.textContent = reaction.message;\n        }\n        \n        dealResult.style.display = 'block';\n        this.updateUI();\n    }\n    \n    calculateLevel(totalEarnings) {\n        for (let i = this.levelThresholds.length - 1; i >= 0; i--) {\n            if (totalEarnings >= this.levelThresholds[i]) {\n                return i + 1;\n            }\n        }\n        return 1;\n    }\n    \n    hideDealResult() {\n        document.getElementById('dealResult').style.display = 'none';\n        document.getElementById('clientChar').style.display = 'none';\n        this.hideDialog();\n        \n        // Небольшая задержка перед следующим клиентом\n        setTimeout(() => {\n            if (Math.random() < 0.3) {\n                this.nextDay();\n            }\n        }, 1000);\n    }\n    \n    nextDay() {\n        this.gameState.currentDay++;\n        \n        if (this.gameState.currentDay > this.gameState.maxDays) {\n            this.endGame();\n            return;\n        }\n        \n        this.checkRandomEvent();\n        this.updateUI();\n    }\n    \n    checkRandomEvent() {\n        const event = getRandomEvent();\n        if (event) {\n            this.showEvent(event);\n        }\n    }\n    \n    showEvent(event) {\n        const eventPopup = document.getElementById('eventPopup');\n        document.getElementById('eventTitle').textContent = event.title;\n        document.getElementById('eventDescription').textContent = event.description;\n        \n        const actionsDiv = document.getElementById('eventActions');\n        actionsDiv.innerHTML = '';\n        \n        event.actions.forEach(action => {\n            const button = document.createElement('button');\n            button.className = 'event-action';\n            button.textContent = action.text;\n            button.addEventListener('click', () => {\n                this.handleEventAction(event, action.effect);\n            });\n            actionsDiv.appendChild(button);\n        });\n        \n        eventPopup.style.display = 'block';\n    }\n    \n    handleEventAction(event, actionEffect) {\n        const effect = applyEventEffect(event, actionEffect, this);\n        \n        // Применяем эффекты\n        if (effect.discount) this.gameState.gameModifiers.discount = effect.discount;\n        if (effect.priceModifier) this.gameState.gameModifiers.priceModifier = effect.priceModifier;\n        if (effect.marginBonus) this.gameState.gameModifiers.marginBonus = effect.marginBonus;\n        if (effect.salesBonus) this.gameState.gameModifiers.salesBonus = effect.salesBonus;\n        \n        if (effect.sales) {\n            this.player.sales += effect.sales;\n            this.player.totalEarnings += Math.floor(effect.sales * 0.01);\n        }\n        \n        if (effect.reputation) {\n            this.player.reputation += effect.reputation;\n        }\n        \n        // Показываем результат события\n        alert(effect.message);\n        document.getElementById('eventPopup').style.display = 'none';\n        this.updateUI();\n    }\n    \n    updateUI() {\n        // Обновляем HUD\n        document.getElementById('playerNameDisplay').textContent = this.player.name;\n        document.getElementById('playerLevelDisplay').textContent = `Менеджер Lv.${this.player.level}`;\n        document.getElementById('reputationDisplay').textContent = this.player.reputation;\n        document.getElementById('dayNumber').textContent = this.gameState.currentDay;\n        document.getElementById('salesAmount').textContent = this.formatMoney(this.player.sales);\n        document.getElementById('targetAmount').textContent = this.formatMoney(this.gameState.target);\n        \n        // Обновляем аватар\n        document.getElementById('playerAvatar').textContent = this.player.avatar;\n        \n        // Обновляем прогресс-бар\n        const progress = Math.min((this.player.sales / this.gameState.target) * 100, 100);\n        document.getElementById('progressFill').style.width = progress + '%';\n    }\n    \n    endGame() {\n        this.hideAllScreens();\n        document.getElementById('gameOverScreen').style.display = 'flex';\n        \n        const planCompletion = Math.round((this.player.sales / this.gameState.target) * 100);\n        \n        document.getElementById('finalSales').textContent = this.formatMoney(this.player.sales);\n        document.getElementById('planCompletion').textContent = planCompletion + '%';\n        \n        // Определяем достижение\n        let achievement = '';\n        if (planCompletion >= 150) {\n            achievement = '🏆 Легенда продаж! Превышение плана на 50%+';\n        } else if (planCompletion >= 120) {\n            achievement = '🥇 Отличный результат! Превышение плана на 20%+';\n        } else if (planCompletion >= 100) {\n            achievement = '✅ План выполнен! Вы справились с задачей!';\n        } else if (planCompletion >= 80) {\n            achievement = '📈 Хороший результат! Почти достигли цели!';\n        } else {\n            achievement = '💪 Есть куда расти! Попробуйте еще раз!';\n        }\n        \n        document.getElementById('achievement').textContent = achievement;\n    }\n    \n    resetGame() {\n        this.player = {\n            name: \"Алексей Продажин\",\n            avatar: \"👨💼\",\n            sales: 0,\n            totalEarnings: 0,\n            reputation: 50,\n            level: 1\n        };\n        \n        this.gameState = {\n            currentDay: 1,\n            maxDays: 30,\n            target: 500000,\n            difficulty: \"normal\",\n            currentClient: null,\n            selectedEquipment: [],\n            gameModifiers: {\n                discount: 1.0,\n                priceModifier: 1.0,\n                marginBonus: 1.0,\n                salesBonus: 1.0\n            }\n        };\n        \n        this.showCharacterSetup();\n    }\n    \n    formatMoney(amount) {\n        return new Intl.NumberFormat('ru-RU').format(amount);\n    }\n}\n\n// Запуск игры\nwindow.addEventListener('DOMContentLoaded', () => {\n    new ModernSalesGame();\n});", "oldStr": ""}]
    
    showClientCard() {
        const client = this.gameState.currentClient;
        
        document.getElementById('clientFullName').textContent = client.name;
        document.getElementById('clientCompany').textContent = client.company;
        document.getElementById('clientPurchases').textContent = `Частые покупки: ${client.frequentPurchases}`;
        document.getElementById('clientAvatarLarge').textContent = client.avatar;
        document.getElementById('clientCategoryBadge').textContent = 'Постоянный клиент';
        
        document.getElementById('clientCard').style.display = 'flex';
        
        document.getElementById('startMeetingBtn').onclick = () => {
            document.getElementById('clientCard').style.display = 'none';
            this.startClientMeeting();
        };
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
        // Убираем выделение с других опций
        document.querySelectorAll('.question-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Выделяем выбранную опцию
        element.classList.add('selected');
        
        // Сохраняем ответ
        const questionKey = newClientQuestions[this.currentQuestionIndex].question;
        this.gameState.currentClient.surveyAnswers[questionKey] = value;
        
        // Переходим к следующему вопросу через небольшую задержку
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
        
        // Обновляем данные клиента на основе ответов
        this.processSurveyAnswers();
        
        // Показываем сообщение о завершении знакомства
        setTimeout(() => {
            this.startClientMeeting();
        }, 500);
    }
    
    processSurveyAnswers() {
        const answers = this.gameState.currentClient.surveyAnswers;
        
        // Корректируем бюджет на основе ответов
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
        
        // Корректируем характер на основе приоритетов
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