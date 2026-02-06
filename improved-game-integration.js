// ===== ИНТЕГРАЦИЯ УЛУЧШЕННОЙ МЕХАНИКИ В ИГРУ =====

class ImprovedSalesGame extends ModernSalesGame {
    constructor() {
        super();
        
        // Новые системы
        this.typewriter = new TypewriterEffect();
        this.clientGenerator = new EnhancedClientGenerator();
        this.feedbackSystem = new InstantFeedbackSystem();
        this.tutorial = new TutorialSystem();
        
        // Инициализация
        this.feedbackSystem.init();
        
        // Проверяем туториал
        if (!localStorage.getItem('tutorialCompleted')) {
            setTimeout(() => {
                if (this.currentScreen === 'game') {
                    this.tutorial.start();
                }
            }, 2000);
        }
    }

    // ПЕРЕОПРЕДЕЛЯЕМ ГЕНЕРАЦИЮ КЛИЕНТА
    generateNewClient() {
        // Генерируем клиента с DISC профилем
        this.gameState.currentClient = this.clientGenerator.generate();
        this.gameState.selectedEquipment = [];
        
        // Показываем индикаторы
        this.showClientIndicators();
        
        // Показываем диалог с эффектом печати
        this.showEnhancedClientDialog();
        
        // Обновляем фон и персонажа
        this.updateLocationBackground();
        this.showClientCharacter();
    }

    showClientIndicators() {
        const client = this.gameState.currentClient;
        
        // DISC badge
        const discBadge = document.getElementById('discBadge');
        const discIcon = document.getElementById('discIcon');
        const discLabel = document.getElementById('discLabel');
        
        const discIcons = {
            D: '⚡',
            I: '🎭',
            S: '🛡️',
            C: '📊'
        };
        
        const discLabels = {
            D: 'Доминантный',
            I: 'Влиятельный',
            S: 'Стабильный',
            C: 'Сознательный'
        };
        
        discIcon.textContent = discIcons[client.discType];
        discLabel.textContent = discLabels[client.discType];
        discBadge.className = `disc-badge ${client.discType}`;
        discBadge.style.display = 'flex';
        
        // Patience indicator
        document.getElementById('patienceIndicator').style.display = 'flex';
        this.updatePatienceIndicator();
        
        // Trust bar
        document.getElementById('trustBar').style.display = 'flex';
        this.updateTrustBar();
    }

    updatePatienceIndicator() {
        const client = this.gameState.currentClient;
        const fill = document.getElementById('patienceFill');
        
        fill.style.width = client.currentPatience + '%';
        
        // Меняем цвет в зависимости от уровня
        fill.className = 'patience-fill';
        if (client.currentPatience > 70) {
            fill.classList.add('high');
        } else if (client.currentPatience > 40) {
            fill.classList.add('medium');
        } else {
            fill.classList.add('low');
        }
    }

    updateTrustBar() {
        const client = this.gameState.currentClient;
        const fill = document.getElementById('trustFill');
        const value = document.getElementById('trustValue');
        
        fill.style.width = client.trustLevel + '%';
        value.textContent = Math.round(client.trustLevel) + '%';
    }

    showEnhancedClientDialog() {
        const client = this.gameState.currentClient;
        const dialogBox = document.getElementById('dialogBox');
        
        // Обновляем аватар и имя
        document.getElementById('speakerAvatar').textContent = client.avatar;
        document.getElementById('speakerName').textContent = client.name;
        
        // Генерируем приветствие
        const greeting = this.clientGenerator.generateGreeting(client);
        
        // Показываем диалог с typewriter эффектом
        const dialogText = document.getElementById('dialogText');
        this.typewriter.type(dialogText, greeting, 30, () => {
            this.showDialogActions();
        });
        
        dialogBox.style.display = 'block';
        
        // Анимация персонажа
        const clientSprite = document.getElementById('clientSprite');
        clientSprite.classList.add('talking');
        setTimeout(() => {
            clientSprite.classList.remove('talking');
        }, 2000);
    }

    showDialogActions() {
        const actionsDiv = document.getElementById('dialogActions');
        actionsDiv.innerHTML = '';
        
        const actions = [
            {
                text: '🤔 Уточнить потребности (открытый вопрос)',
                type: 'open',
                handler: () => this.askOpenQuestion()
            },
            {
                text: '📦 Показать каталог',
                type: 'catalog',
                handler: () => this.quickOpenCatalog()
            },
            {
                text: '💰 Уточнить бюджет (закрытый вопрос)',
                type: 'closed',
                handler: () => this.askClosedQuestion()
            }
        ];
        
        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'dialog-action';
            btn.textContent = action.text;
            btn.addEventListener('click', action.handler);
            actionsDiv.appendChild(btn);
        });
    }

    askOpenQuestion() {
        const client = this.gameState.currentClient;
        
        // Даем обратную связь
        this.showQuestionFeedback('open');
        
        // Клиент отвечает
        const responses = {
            cafe: `Ну, у меня будет небольшое кафе, человек на 30-40. Основной упор на кофе и десерты. Хочу создать уютную атмосферу для постоянных гостей.`,
            restaurant: `Мы открываем ресторан средиземноморской кухни. Примерно 80 посадочных мест. Нужно качественное оборудование для кухни и красивая сервировка для зала.`,
            hotel: `Это отель на 50 номеров, ресторан будет работать и для постояльцев, и для внешних гостей. Нужен full-cycle от кухни до сервировки.`,
            canteen: `Корпоративная столовая на 200 человек. Массовое приготовление, быстрая раздача. Главное - надежность и производительность.`
        };
        
        const response = responses[client.businessType];
        
        // Обновляем trust и patience
        client.trustLevel += 10;
        client.currentPatience -= 5;
        this.updateTrustBar();
        this.updatePatienceIndicator();
        
        // Показываем ответ с typewriter
        setTimeout(() => {
            const dialogText = document.getElementById('dialogText');
            this.typewriter.type(dialogText, response, 25, () => {
                this.showDialogActions();
            });
        }, 1000);
    }

    askClosedQuestion() {
        const client = this.gameState.currentClient;
        
        // Даем обратную связь
        this.showQuestionFeedback('closed');
        
        const response = `Да, примерно ${this.formatMoney(client.budget)}.`;
        
        // Обновляем trust и patience
        client.trustLevel -= 5;
        client.currentPatience -= 10;
        this.updateTrustBar();
        this.updatePatienceIndicator();
        
        setTimeout(() => {
            const dialogText = document.getElementById('dialogText');
            this.typewriter.type(dialogText, response, 25, () => {
                this.showDialogActions();
            });
        }, 1000);
    }

    showQuestionFeedback(questionType) {
        const client = this.gameState.currentClient;
        
        const feedback = {
            open: {
                D: { type: 'poor', message: 'Внимание!', explanation: 'Доминантный клиент ценит краткость. Открытые вопросы могут его утомить.', tip: 'С D-типом лучше задавать конкретные вопросы и быстро переходить к делу' },
                I: { type: 'excellent', message: 'Отлично!', explanation: 'Влиятельный клиент рад возможности рассказать о своих планах!', tip: null },
                S: { type: 'good', message: 'Хорошо!', explanation: 'Стабильный клиент ценит, когда о нем заботятся и слушают.', tip: null },
                C: { type: 'neutral', message: 'Приемлемо', explanation: 'Сознательный клиент хочет деталей, но предпочитает факты эмоциям.', tip: 'Добавьте конкретики: "Какие характеристики важны?"' }
            },
            closed: {
                D: { type: 'good', message: 'Хорошо!', explanation: 'Доминантный клиент любит четкие вопросы.', tip: null },
                I: { type: 'poor', message: 'Скучно', explanation: 'Влиятельному клиенту такие вопросы кажутся сухими.', tip: 'Проявите интерес к его идеям и планам' },
                S: { type: 'neutral', message: 'Нормально', explanation: 'Стабильный клиент ответит, но не раскроется.', tip: null },
                C: { type: 'neutral', message: 'Так себе', explanation: 'Сознательному клиенту нужна конкретика.', tip: 'Спросите о технических требованиях' }
            }
        };
        
        const fb = feedback[questionType][client.discType];
        this.feedbackSystem.show(fb.type, fb.message, fb.explanation, fb.tip);
        
        // Автоматически скрываем через 3 секунды
        setTimeout(() => {
            this.feedbackSystem.hide();
        }, 3000);
    }

    quickOpenCatalog() {
        this.hideDialog();
        this.openCatalog();
        
        // Бонус за действие
        const client = this.gameState.currentClient;
        client.currentPatience += 10;
        this.updatePatienceIndicator();
    }

    // ПЕРЕОПРЕДЕЛЯЕМ ОТКРЫТИЕ КАТАЛОГА
    openCatalog() {
        const catalog = document.getElementById('equipmentCatalog');
        this.displayEnhancedEquipment();
        this.updateOfferSummary();
        catalog.style.display = 'block';
    }

    displayEnhancedEquipment() {
        const equipmentGrid = document.getElementById('equipmentGrid');
        equipmentGrid.innerHTML = '';
        
        const client = this.gameState.currentClient;
        const availableEquipment = getEquipmentForClient(client.businessType);
        
        // Сортируем по релевантности (если бюджет клиента известен)
        const sortedEquipment = availableEquipment.sort((a, b) => {
            const aMatch = this.calculateEquipmentMatch(a, client);
            const bMatch = this.calculateEquipmentMatch(b, client);
            return bMatch - aMatch;
        });
        
        sortedEquipment.forEach(item => {
            const matchScore = this.calculateEquipmentMatch(item, client);
            
            const equipmentDiv = document.createElement('div');
            equipmentDiv.className = 'equipment-item';
            equipmentDiv.dataset.id = item.id;
            
            // Добавляем класс матчинга
            if (matchScore > 70) {
                equipmentDiv.classList.add('high-match');
            } else if (matchScore > 40) {
                equipmentDiv.classList.add('medium-match');
            } else {
                equipmentDiv.classList.add('low-match');
            }
            
            equipmentDiv.innerHTML = `
                <div class="icon">${item.icon}</div>
                <div class="name">${item.name}</div>
                <div class="price">${this.formatMoney(this.calculatePrice(item.price))}</div>
                ${matchScore > 60 ? `<div class="match-badge ${matchScore > 80 ? 'high' : 'medium'}">${Math.round(matchScore)}%</div>` : ''}
            `;
            
            equipmentDiv.addEventListener('click', () => {
                this.toggleEquipment(item, equipmentDiv);
            });
            
            equipmentGrid.appendChild(equipmentDiv);
        });
    }

    calculateEquipmentMatch(item, client) {
        let score = 50; // Базовый скор
        
        // Соответствие бюджету
        const priceRatio = item.price / client.budget;
        if (priceRatio <= 0.2) score += 20;
        else if (priceRatio <= 0.4) score += 15;
        else if (priceRatio <= 0.6) score += 10;
        else if (priceRatio > 1.0) score -= 30;
        
        // Соответствие типу бизнеса
        if (item.category && item.category.includes(client.businessType)) {
            score += 30;
        }
        
        return Math.max(0, Math.min(100, score));
    }

    // ПЕРЕОПРЕДЕЛЯЕМ РЕЗУЛЬТАТ СДЕЛКИ
    makeOffer() {
        if (this.gameState.selectedEquipment.length === 0) return;
        
        const client = this.gameState.currentClient;
        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {
            return sum + this.calculatePrice(item.price);
        }, 0);
        
        // Расширенный расчет удовлетворенности
        let satisfaction = 50;
        
        // Бюджет
        if (totalPrice <= client.budget * 0.7) satisfaction += 20;
        else if (totalPrice <= client.budget) satisfaction += 10;
        else if (totalPrice <= client.budget * 1.2) satisfaction -= 10;
        else satisfaction -= 30;
        
        // Trust влияет на решение
        satisfaction += (client.trustLevel - 50) / 2;
        
        // Patience влияет
        if (client.currentPatience < 20) satisfaction -= 20;
        
        // DISC модификаторы
        const discMods = {
            D: totalPrice < client.budget ? 10 : -10, // D любит экономить время
            I: this.gameState.selectedEquipment.length > 5 ? 10 : -5, // I любит выбор
            S: client.trustLevel > 60 ? 15 : -10, // S полагается на доверие
            C: this.gameState.selectedEquipment.length <= 4 ? 10 : -5 // C любит точность
        };
        
        satisfaction += discMods[client.discType];
        satisfaction = Math.max(0, Math.min(100, satisfaction));
        
        const reaction = getClientReaction(satisfaction);
        
        this.closeCatalog();
        this.hideClientIndicators();
        this.showDealResult(reaction, totalPrice);
    }

    hideClientIndicators() {
        document.getElementById('patienceIndicator').style.display = 'none';
        document.getElementById('discBadge').style.display = 'none';
        document.getElementById('trustBar').style.display = 'none';
    }
}

// ЗАМЕНА ГЛОБАЛЬНОЙ ПЕРЕМЕННОЙ
window.addEventListener('DOMContentLoaded', () => {
    window.game = new ImprovedSalesGame();
});
