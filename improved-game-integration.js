// ===== УЛУЧШЕННАЯ ИГРА: РАСШИРЯЕТ ModernSalesGame =====

class ImprovedSalesGame extends ModernSalesGame {
    constructor() {
        super();

        // Подключаем улучшенные системы
        this.typewriter = new TypewriterEffect();
        this.clientGenerator = new EnhancedClientGenerator();
        this.feedbackSystem = new InstantFeedbackSystem();
        this.tutorial = new TutorialSystem();

        this.feedbackSystem.init();
    }

    // ─── ГЕНЕРАЦИЯ КЛИЕНТА ────────────────────────────────────────────────────

    generateNewClient() {
        const client = this.clientGenerator.generate();
        // Алиас для совместимости с базовым кодом
        client.type = client.businessType;
        this.gameState.currentClient = client;
        this.gameState.selectedEquipment = [];

        this.showClientIndicators();
        this.showEnhancedClientDialog();
        this.updateLocationBackground();
        this.showClientCharacter();
    }

    // ─── ИНДИКАТОРЫ КЛИЕНТА ───────────────────────────────────────────────────

    showClientIndicators() {
        const client = this.gameState.currentClient;

        const discIcons  = { D: '⚡', I: '🎭', S: '🛡️', C: '📊' };
        const discLabels = { D: 'Доминантный', I: 'Влиятельный', S: 'Стабильный', C: 'Сознательный' };

        const badge = document.getElementById('discBadge');
        const icon  = document.getElementById('discIcon');
        const label = document.getElementById('discLabel');

        if (icon)  icon.textContent  = discIcons[client.discType]  || '?';
        if (label) label.textContent = discLabels[client.discType] || '';
        if (badge) {
            badge.className = `disc-badge ${client.discType}`;
            badge.style.display = 'flex';
        }

        const patience = document.getElementById('patienceIndicator');
        if (patience) patience.style.display = 'flex';
        this.updatePatienceIndicator();

        const trust = document.getElementById('trustBar');
        if (trust) trust.style.display = 'flex';
        this.updateTrustBar();
    }

    updatePatienceIndicator() {
        const client = this.gameState.currentClient;
        if (!client) return;

        const fill = document.getElementById('patienceFill');
        if (!fill) return;

        fill.style.width = Math.max(0, client.currentPatience) + '%';
        fill.className = 'patience-fill';
        if (client.currentPatience > 70)      fill.classList.add('high');
        else if (client.currentPatience > 40) fill.classList.add('medium');
        else                                   fill.classList.add('low');
    }

    updateTrustBar() {
        const client = this.gameState.currentClient;
        if (!client) return;

        const fill  = document.getElementById('trustFill');
        const value = document.getElementById('trustValue');
        if (fill)  fill.style.width   = Math.max(0, client.trustLevel) + '%';
        if (value) value.textContent  = Math.round(client.trustLevel) + '%';
    }

    // ─── ДИАЛОГ ───────────────────────────────────────────────────────────────

    showEnhancedClientDialog() {
        const client = this.gameState.currentClient;
        const dialogBox = document.getElementById('dialogBox');
        if (!dialogBox) return;

        const speakerAvatar = document.getElementById('speakerAvatar');
        const speakerName   = document.getElementById('speakerName');
        if (speakerAvatar) speakerAvatar.textContent = client.avatar;
        if (speakerName)   speakerName.textContent   = client.name;

        const greeting   = this.clientGenerator.generateGreeting(client);
        const dialogText = document.getElementById('dialogText');

        if (dialogText) {
            this.typewriter.type(dialogText, greeting, 22, () => this.showDialogActions());
        }

        dialogBox.style.display = 'block';

        // Анимация «говорения»
        const sprite = document.getElementById('clientSprite');
        if (sprite) {
            sprite.classList.add('talking');
            setTimeout(() => sprite.classList.remove('talking'), 2500);
        }
    }

    showDialogActions() {
        const actionsDiv = document.getElementById('dialogActions');
        if (!actionsDiv) return;
        actionsDiv.innerHTML = '';

        const client = this.gameState.currentClient;

        // Базовые действия
        const baseActions = [
            { text: '🤔 Уточнить потребности (открытый вопрос)', handler: () => this.askOpenQuestion() },
            { text: '📦 Открыть каталог оборудования',           handler: () => this.quickOpenCatalog() },
            { text: '💰 Уточнить бюджет (закрытый вопрос)',       handler: () => this.askClosedQuestion() }
        ];

        // DISC-специфичное действие
        const discActions = {
            D: { text: '🎯 Перейти к лучшему решению сразу',        handler: () => this.quickOpenCatalog() },
            I: { text: '✨ Рассказать об инновационных решениях',    handler: () => this.askOpenQuestion() },
            S: { text: '🛡️ Рассказать о гарантии и надёжности',    handler: () => this.askReliabilityQuestion() },
            C: { text: '📊 Предоставить технические характеристики', handler: () => this.askTechnicalQuestion() }
        };

        const discAction = discActions[client.discType];
        if (discAction) baseActions.push(discAction);

        baseActions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'dialog-action';
            btn.textContent = action.text;
            btn.addEventListener('click', action.handler);
            actionsDiv.appendChild(btn);
        });
    }

    // ─── ВОПРОСЫ МЕНЕДЖЕРА ────────────────────────────────────────────────────

    askOpenQuestion() {
        const client = this.gameState.currentClient;
        this.showQuestionFeedback('open');

        const responses = {
            cafe:       `У нас будет уютное кафе на ${20 + Math.floor(Math.random() * 30)} мест. Акцент на кофе и выпечку. Хотим создать атмосферное место для постоянных гостей.`,
            restaurant: `Открываем ресторан с кухней фьюжн, около 80 посадочных мест. Нужно качественное оборудование и красивая сервировка для зала.`,
            hotel:      `Отель на ${30 + Math.floor(Math.random() * 40)} номеров. Ресторан будет обслуживать и постояльцев, и внешних гостей — нужен полный комплект.`,
            canteen:    `Корпоративная столовая на ${100 + Math.floor(Math.random() * 100)} человек. Главное — производительность и надёжность оборудования.`
        };

        const response = responses[client.businessType] || responses.cafe;

        client.trustLevel     = Math.min(100, client.trustLevel + 10);
        client.currentPatience = Math.max(0,  client.currentPatience - 5);
        this.updateTrustBar();
        this.updatePatienceIndicator();

        this._clientReply(response);
    }

    askClosedQuestion() {
        const client = this.gameState.currentClient;
        this.showQuestionFeedback('closed');

        const response = `Бюджет у нас ${this.formatMoney(client.budget)} рублей, не больше.`;

        client.trustLevel      = Math.max(0,  client.trustLevel - 5);
        client.currentPatience = Math.max(0,  client.currentPatience - 10);
        this.updateTrustBar();
        this.updatePatienceIndicator();

        this._clientReply(response);
    }

    askReliabilityQuestion() {
        const client = this.gameState.currentClient;
        this.showQuestionFeedback(client.discType === 'S' ? 'open' : 'neutral');

        const response = `Надёжность очень важна! Хотим минимум 2 года гарантии и сервисное обслуживание поблизости.`;

        const bonus = client.discType === 'S' ? 15 : 5;
        client.trustLevel      = Math.min(100, client.trustLevel + bonus);
        client.currentPatience = Math.max(0,  client.currentPatience - 3);
        this.updateTrustBar();
        this.updatePatienceIndicator();

        this._clientReply(response);
    }

    askTechnicalQuestion() {
        const client = this.gameState.currentClient;
        this.showQuestionFeedback(client.discType === 'C' ? 'open' : 'neutral');

        const response = `Да, нужны точные характеристики: мощность, объём, материалы изготовления и соответствие санитарным нормам.`;

        const bonus = client.discType === 'C' ? 15 : 3;
        client.trustLevel      = Math.min(100, client.trustLevel + bonus);
        client.currentPatience = Math.max(0,  client.currentPatience - 3);
        this.updateTrustBar();
        this.updatePatienceIndicator();

        this._clientReply(response);
    }

    _clientReply(text) {
        setTimeout(() => {
            const dialogText = document.getElementById('dialogText');
            if (dialogText) {
                this.typewriter.type(dialogText, text, 22, () => this.showDialogActions());
            }
        }, 700);
    }

    // ─── ОБРАТНАЯ СВЯЗЬ ───────────────────────────────────────────────────────

    showQuestionFeedback(questionType) {
        const client = this.gameState.currentClient;

        const feedbackMap = {
            open: {
                D: { type: 'poor',     message: 'Внимание!',     explanation: 'Доминантный клиент ценит краткость. Побыстрее к делу!',        tip: 'С D-типом: задайте конкретный вопрос и сразу открывайте каталог' },
                I: { type: 'excellent',message: 'Отлично!',      explanation: 'Влиятельный клиент рад возможности рассказать о планах!',       tip: null },
                S: { type: 'good',     message: 'Хорошо!',       explanation: 'Стабильный клиент ценит внимание и заботу.',                   tip: null },
                C: { type: 'neutral',  message: 'Приемлемо',     explanation: 'Сознательный клиент хочет фактов, а не общих слов.',            tip: 'Спросите о конкретных технических требованиях' }
            },
            closed: {
                D: { type: 'good',     message: 'Хорошо!',       explanation: 'Доминантный клиент любит чёткие вопросы.',                     tip: null },
                I: { type: 'poor',     message: 'Скучновато',    explanation: 'Влиятельному клиенту такие вопросы кажутся сухими.',            tip: 'Проявите интерес к его идеям и планам!' },
                S: { type: 'neutral',  message: 'Нормально',     explanation: 'Стабильный клиент ответит, но не раскроется.',                 tip: null },
                C: { type: 'neutral',  message: 'Так себе',      explanation: 'Сознательному нужна техническая конкретика.',                  tip: null }
            },
            neutral: {
                D: { type: 'neutral',  message: 'Нормально',     explanation: 'Приемлемый подход для этого типа клиента.',                    tip: null },
                I: { type: 'neutral',  message: 'Нормально',     explanation: 'Приемлемый подход для этого типа клиента.',                    tip: null },
                S: { type: 'good',     message: 'Хорошо!',       explanation: 'Правильный подход — стабильный клиент оценит надёжность.',      tip: null },
                C: { type: 'good',     message: 'Хорошо!',       explanation: 'Сознательный клиент оценит внимание к деталям.',               tip: null }
            }
        };

        const fb = (feedbackMap[questionType] || feedbackMap.neutral)[client.discType];
        if (fb) {
            this.feedbackSystem.show(fb.type, fb.message, fb.explanation, fb.tip);
            setTimeout(() => this.feedbackSystem.hide(), 3500);
        }
    }

    // ─── КАТАЛОГ ─────────────────────────────────────────────────────────────

    quickOpenCatalog() {
        this.hideDialog();
        const client = this.gameState.currentClient;
        if (client) {
            client.currentPatience = Math.min(100, client.currentPatience + 10);
            this.updatePatienceIndicator();
        }
        this.openCatalog();
    }

    openCatalog() {
        const catalog = document.getElementById('equipmentCatalog');
        this.displayEnhancedEquipment();
        this.updateOfferSummary();
        if (catalog) catalog.style.display = 'block';
    }

    displayEnhancedEquipment() {
        const grid = document.getElementById('equipmentGrid');
        if (!grid) return;
        grid.innerHTML = '';

        const client = this.gameState.currentClient;
        const type   = client.businessType || client.type;
        const items  = getEquipmentForClient(type);

        // Сортируем по релевантности
        const sorted = [...items].sort((a, b) =>
            this.calcMatch(b, client) - this.calcMatch(a, client)
        );

        sorted.forEach(item => {
            const score = this.calcMatch(item, client);
            const div   = document.createElement('div');
            div.className   = 'equipment-item';
            div.dataset.id  = item.id;

            if (score > 70)      div.classList.add('high-match');
            else if (score > 40) div.classList.add('medium-match');
            else                 div.classList.add('low-match');

            const badge = score > 60
                ? `<div class="match-badge ${score > 80 ? 'high' : 'medium'}">${Math.round(score)}%</div>`
                : '';

            div.innerHTML = `
                <div class="icon">${item.icon}</div>
                <div class="name">${item.name}</div>
                <div class="price">${this.formatMoney(this.calculatePrice(item.price))} ₽</div>
                ${badge}
            `;

            div.addEventListener('click', () => this.toggleEquipment(item, div));
            grid.appendChild(div);
        });
    }

    calcMatch(item, client) {
        let score = 50;
        const ratio = item.price / client.budget;

        if      (ratio <= 0.15) score += 15;
        else if (ratio <= 0.30) score += 20;
        else if (ratio <= 0.50) score += 15;
        else if (ratio <= 0.80) score += 8;
        else if (ratio > 1.0)   score -= 30;

        const type = client.businessType || client.type;
        if (item.category && item.category.includes(type)) score += 20;

        return Math.max(0, Math.min(100, score));
    }

    // ─── ПРЕДЛОЖЕНИЕ И РЕЗУЛЬТАТ ─────────────────────────────────────────────

    makeOffer() {
        if (this.gameState.selectedEquipment.length === 0) return;

        const client     = this.gameState.currentClient;
        const totalPrice = this.gameState.selectedEquipment.reduce(
            (sum, item) => sum + this.calculatePrice(item.price), 0
        );

        // Расчёт удовлетворённости с учётом DISC-механик
        let satisfaction = 50;

        if      (totalPrice <= client.budget * 0.7)  satisfaction += 20;
        else if (totalPrice <= client.budget)         satisfaction += 10;
        else if (totalPrice <= client.budget * 1.2)  satisfaction -= 10;
        else                                          satisfaction -= 30;

        satisfaction += (client.trustLevel - 50) / 2;

        if      (client.currentPatience < 20) satisfaction -= 20;
        else if (client.currentPatience > 70) satisfaction += 5;

        const discMods = {
            D: totalPrice < client.budget ? 10 : -10,
            I: this.gameState.selectedEquipment.length >= 4 ? 10 : -5,
            S: client.trustLevel > 60 ? 15 : -10,
            C: this.gameState.selectedEquipment.length <= 5 ? 10 : -5
        };
        satisfaction += discMods[client.discType] || 0;
        satisfaction  = Math.max(0, Math.min(100, satisfaction));

        const reaction = getClientReaction(satisfaction);

        this.closeCatalog();
        this.hideClientIndicators();
        this.showDealResult(reaction, totalPrice);
    }
}

// ─── ЗАПУСК ИГРЫ ─────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    window.game = new ImprovedSalesGame();
});
