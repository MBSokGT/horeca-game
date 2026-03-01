// ===== БАЗОВЫЙ КЛАСС ИГРЫ =====

class ModernSalesGame {
    constructor() {
        this.player = {
            name: "Алексей Продажин",
            avatar: "👨‍💼",
            sales: 0,
            reputation: 50,
            level: 1,
            experience: 0
        };

        this.gameState = {
            currentDay: 1,
            maxDays: 30,
            target: 500000,
            difficulty: 'normal',
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
        // Гамбургер меню
        document.getElementById('hamburgerIcon')?.addEventListener('click', () => {
            document.getElementById('sideMenu').classList.toggle('active');
        });

        document.getElementById('closeMenu')?.addEventListener('click', () => {
            document.getElementById('sideMenu').classList.remove('active');
        });

        // Главное меню
        document.getElementById('startSingleGame')?.addEventListener('click', () => {
            this.showCharacterSetup();
        });

        document.getElementById('showTutorial')?.addEventListener('click', () => {
            this.startGame();
            setTimeout(() => {
                if (this.tutorial) this.tutorial.start();
            }, 1000);
        });

        document.getElementById('showMiniGames')?.addEventListener('click', () => {
            this.showMiniGamesMenu();
        });

        document.getElementById('showAuthBtn')?.addEventListener('click', () => {
            document.getElementById('authScreen').style.display = 'flex';
        });

        // Создание персонажа
        document.getElementById('startGameBtn')?.addEventListener('click', () => {
            this.startGame();
        });

        // Выбор аватара
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        // Выбор сложности
        document.querySelectorAll('.difficulty-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.difficulty-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
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

        // Feedback
        document.getElementById('feedbackContinue')?.addEventListener('click', () => {
            document.getElementById('instantFeedback').style.display = 'none';
        });

        // Level up / Achievement
        document.getElementById('levelContinueBtn')?.addEventListener('click', () => {
            document.getElementById('levelUpPopup').style.display = 'none';
        });

        document.getElementById('achievementContinueBtn')?.addEventListener('click', () => {
            document.getElementById('achievementPopup').style.display = 'none';
        });

        // Боковое меню - пункты
        document.getElementById('menuHome')?.addEventListener('click', () => {
            document.getElementById('sideMenu').classList.remove('active');
            this.showMainMenu();
        });

        document.getElementById('menuSettings')?.addEventListener('click', () => {
            document.getElementById('sideMenu').classList.remove('active');
            document.getElementById('settingsMenu').style.display = 'flex';
        });

        document.getElementById('closeSettings')?.addEventListener('click', () => {
            document.getElementById('settingsMenu').style.display = 'none';
        });

        document.getElementById('saveSettings')?.addEventListener('click', () => {
            document.getElementById('settingsMenu').style.display = 'none';
        });

        document.getElementById('resetSettings')?.addEventListener('click', () => {
            const mv = document.getElementById('musicVolume');
            const sv = document.getElementById('sfxVolume');
            if (mv) { mv.value = 50; document.getElementById('musicVolumeValue').textContent = '50%'; }
            if (sv) { sv.value = 70; document.getElementById('sfxVolumeValue').textContent = '70%'; }
        });

        // Настройки - слайдеры
        document.getElementById('musicVolume')?.addEventListener('input', (e) => {
            document.getElementById('musicVolumeValue').textContent = e.target.value + '%';
        });

        document.getElementById('sfxVolume')?.addEventListener('input', (e) => {
            document.getElementById('sfxVolumeValue').textContent = e.target.value + '%';
        });

        document.getElementById('menuMiniGames')?.addEventListener('click', () => {
            document.getElementById('sideMenu').classList.remove('active');
            this.showMiniGamesMenu();
        });

        document.getElementById('menuExit')?.addEventListener('click', () => {
            document.getElementById('sideMenu').classList.remove('active');
            this.showMainMenu();
        });

        // Мини-игры
        document.getElementById('backFromMiniGames')?.addEventListener('click', () => {
            document.getElementById('miniGamesMenu').style.display = 'none';
            document.getElementById('mainMenu').style.display = 'flex';
        });

        // Поиск в каталоге
        document.getElementById('equipmentSearch')?.addEventListener('input', (e) => {
            this.filterEquipment(e.target.value);
        });

        // Закрыть анкету нового клиента (если будет нажата)
        document.getElementById('startMeetingBtn')?.addEventListener('click', () => {
            document.getElementById('clientCard').style.display = 'none';
            this.generateNewClient();
        });
    }

    startLoadingSequence() {
        const loadingTexts = [
            "Загрузка каталога оборудования...",
            "Подключение к базе клиентов...",
            "Инициализация системы продаж...",
            "Настройка игрового движка...",
            "Готово к работе!"
        ];

        let currentTextIdx = 0;
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 5 + 2;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => this.showMainMenu(), 500);
            }

            if (currentTextIdx < loadingTexts.length - 1 && progress > (currentTextIdx + 1) * 20) {
                currentTextIdx++;
                const el = document.getElementById('loadingText');
                if (el) el.textContent = loadingTexts[currentTextIdx];
            }

            const prog = document.getElementById('loadingProgress');
            if (prog) prog.style.width = progress + '%';
        }, 100);
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

    showMiniGamesMenu() {
        this.hideAllScreens();
        document.getElementById('miniGamesMenu').style.display = 'flex';
        this.currentScreen = 'minigames';
    }

    startGame() {
        // Читаем настройки персонажа
        const nameInput = document.getElementById('playerNameInput');
        if (nameInput && nameInput.value.trim()) {
            this.player.name = nameInput.value.trim();
        }

        const selectedAvatar = document.querySelector('.avatar-option.selected');
        if (selectedAvatar) {
            this.player.avatar = selectedAvatar.dataset.avatar;
        }

        const selectedDifficulty = document.querySelector('.difficulty-option.selected');
        if (selectedDifficulty) {
            const diff = selectedDifficulty.dataset.difficulty;
            this.gameState.difficulty = diff;
            const targets = { easy: 300000, normal: 500000, hard: 800000 };
            this.gameState.target = targets[diff] || 500000;
        }

        this.hideAllScreens();
        document.getElementById('gameScreen').style.display = 'block';
        this.currentScreen = 'game';

        this.updateUI();
        this.generateNewClient();
        // Небольшая пауза перед первым случайным событием
        setTimeout(() => this.checkRandomEvent(), 500);
    }

    hideAllScreens() {
        const ids = [
            'loadingScreen', 'mainMenu', 'characterSetup', 'gameScreen',
            'gameOverScreen', 'miniGamesMenu', 'discGame', 'authScreen',
            'recoveryScreen'
        ];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }

    generateNewClient() {
        // Базовая генерация — переопределяется в ImprovedSalesGame
        const types = ['cafe', 'restaurant', 'hotel', 'canteen'];
        const type = types[Math.floor(Math.random() * types.length)];
        const name = clientNames ? clientNames[Math.floor(Math.random() * clientNames.length)] : "Клиент";

        this.gameState.currentClient = {
            name: name,
            type: type,
            businessType: type,
            avatar: clientTypes[type]?.avatar || "👤",
            budget: Math.floor(Math.random() * 300000 + 200000),
            needs: clientTypes[type]?.needs || "Оборудование",
            personality: "дружелюбный",
            trustLevel: 50,
            currentPatience: 100,
            discType: 'I'
        };
        this.gameState.selectedEquipment = [];

        this.showClientDialog();
        this.updateLocationBackground();
        this.showClientCharacter();
    }

    showClientDialog() {
        const client = this.gameState.currentClient;
        const dialogBox = document.getElementById('dialogBox');
        if (!dialogBox) return;

        const speakerAvatar = document.getElementById('speakerAvatar');
        const speakerName = document.getElementById('speakerName');
        if (speakerAvatar) speakerAvatar.textContent = client.avatar;
        if (speakerName) speakerName.textContent = client.name;

        const greeting = this.generateClientGreeting(client);
        const dialogText = document.getElementById('dialogText');
        if (dialogText) dialogText.textContent = greeting;

        const actionsDiv = document.getElementById('dialogActions');
        if (actionsDiv) {
            actionsDiv.innerHTML = '';

            const btn1 = document.createElement('button');
            btn1.className = 'dialog-action';
            btn1.textContent = '📦 Показать каталог';
            btn1.addEventListener('click', () => { this.hideDialog(); this.openCatalog(); });

            const btn2 = document.createElement('button');
            btn2.className = 'dialog-action';
            btn2.textContent = '❓ Уточнить потребности';
            btn2.addEventListener('click', () => this.showClientNeeds());

            actionsDiv.appendChild(btn1);
            actionsDiv.appendChild(btn2);
        }

        dialogBox.style.display = 'block';
    }

    generateClientGreeting(client) {
        const type = client.businessType || client.type;
        const greetings = {
            cafe: `Здравствуйте! Я ${client.name}, открываю кафе. Нужно оборудование на ${this.formatMoney(client.budget)} рублей.`,
            restaurant: `Добро пожаловать! Я ${client.name}, владелец ресторана. Ищу качественное оборудование, бюджет ${this.formatMoney(client.budget)} рублей.`,
            hotel: `Приветствую! Я ${client.name} из отеля. Нам требуется профессиональное оборудование, готовы потратить ${this.formatMoney(client.budget)} рублей.`,
            canteen: `Здравствуйте! Я ${client.name}, заведующий столовой. Нужно надежное оборудование, бюджет ${this.formatMoney(client.budget)} рублей.`
        };
        return greetings[type] || `Здравствуйте! Меня зовут ${client.name}, ищу оборудование для бизнеса.`;
    }

    showClientNeeds() {
        const client = this.gameState.currentClient;
        const needsText = `Нам нужно: ${client.needs}. Хотели бы обсудить варианты.`;
        const dialogText = document.getElementById('dialogText');
        if (dialogText) dialogText.textContent = needsText;

        const actionsDiv = document.getElementById('dialogActions');
        if (actionsDiv) {
            actionsDiv.innerHTML = '';
            const btn = document.createElement('button');
            btn.className = 'dialog-action';
            btn.textContent = '📦 Показать подходящее оборудование';
            btn.addEventListener('click', () => { this.hideDialog(); this.openCatalog(); });
            actionsDiv.appendChild(btn);
        }
    }

    updateLocationBackground() {
        const client = this.gameState.currentClient;
        const locationBg = document.getElementById('locationBg');
        if (!locationBg) return;

        locationBg.className = 'location-bg';
        const type = client.businessType || client.type;
        if (type) locationBg.classList.add(type);
    }

    showClientCharacter() {
        const client = this.gameState.currentClient;
        const clientChar = document.getElementById('clientChar');
        const clientSprite = document.getElementById('clientSprite');
        const clientNameEl = document.getElementById('clientCharName');
        if (!clientChar) return;

        const type = client.businessType || client.type;
        if (clientSprite) clientSprite.style.background = this.getClientSprite(type);
        if (clientNameEl) clientNameEl.textContent = client.name;

        clientChar.style.display = 'block';
    }

    getClientSprite(type) {
        const colors = {
            cafe: '%23e67e22',
            restaurant: '%232c3e50',
            hotel: '%238e44ad',
            canteen: '%2327ae60'
        };
        const color = colors[type] || colors.cafe;
        return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><ellipse cx="100" cy="285" rx="35" ry="10" fill="%23000" opacity="0.2"/><rect x="82" y="195" width="36" height="90" fill="${color}"/><rect x="72" y="145" width="56" height="55" fill="${color}" opacity="0.9"/><circle cx="100" cy="118" r="28" fill="%23f5d5b0"/><rect x="88" y="98" width="24" height="18" fill="%235c3317"/><rect x="92" y="108" width="16" height="6" fill="%23f5d5b0"/><ellipse cx="100" cy="145" rx="28" ry="5" fill="${color}" opacity="0.5"/></svg>')`;
    }

    hideDialog() {
        const dialogBox = document.getElementById('dialogBox');
        if (dialogBox) dialogBox.style.display = 'none';
    }

    openCatalog() {
        const catalog = document.getElementById('equipmentCatalog');
        this.displayEquipment();
        this.updateOfferSummary();
        if (catalog) catalog.style.display = 'block';
    }

    closeCatalog() {
        const catalog = document.getElementById('equipmentCatalog');
        if (catalog) catalog.style.display = 'none';
    }

    displayEquipment() {
        const equipmentGrid = document.getElementById('equipmentGrid');
        if (!equipmentGrid) return;
        equipmentGrid.innerHTML = '';

        const client = this.gameState.currentClient;
        const type = client.businessType || client.type;
        const equipment = getEquipmentForClient(type);

        equipment.forEach(item => {
            const div = document.createElement('div');
            div.className = 'equipment-item';
            div.dataset.id = item.id;
            div.innerHTML = `
                <div class="icon">${item.icon}</div>
                <div class="name">${item.name}</div>
                <div class="price">${this.formatMoney(this.calculatePrice(item.price))} ₽</div>
            `;
            div.addEventListener('click', () => this.toggleEquipment(item, div));
            equipmentGrid.appendChild(div);
        });
    }

    filterEquipment(query) {
        document.querySelectorAll('.equipment-item').forEach(item => {
            const name = item.querySelector('.name')?.textContent?.toLowerCase() || '';
            item.style.display = name.includes(query.toLowerCase()) ? '' : 'none';
        });
    }

    toggleEquipment(item, element) {
        const idx = this.gameState.selectedEquipment.findIndex(eq => eq.id === item.id);
        if (idx > -1) {
            this.gameState.selectedEquipment.splice(idx, 1);
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
        const total = this.gameState.selectedEquipment.reduce((sum, item) => sum + this.calculatePrice(item.price), 0);
        const totalEl = document.getElementById('totalPrice');
        if (totalEl) totalEl.textContent = this.formatMoney(total) + ' ₽';
        const offerBtn = document.getElementById('makeOfferBtn');
        if (offerBtn) offerBtn.disabled = this.gameState.selectedEquipment.length === 0;
    }

    makeOffer() {
        if (this.gameState.selectedEquipment.length === 0) return;

        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => sum + this.calculatePrice(item.price), 0);
        const satisfaction = calculateClientSatisfaction(this.gameState.currentClient, this.gameState.selectedEquipment, totalPrice);
        const reaction = getClientReaction(satisfaction);

        this.closeCatalog();
        this.showDealResult(reaction, totalPrice);
    }

    showDealResult(reaction, totalPrice) {
        const dealResult = document.getElementById('dealResult');
        if (!dealResult) return;

        if (reaction.success) {
            const finalPrice = Math.floor(totalPrice * reaction.bonus * this.gameState.gameModifiers.salesBonus);
            this.player.sales += finalPrice;
            this.player.reputation = Math.min(100, this.player.reputation + 5);

            document.getElementById('resultIcon').textContent = '💰';
            document.getElementById('resultTitle').textContent = 'Сделка заключена!';
            document.getElementById('resultText').textContent =
                reaction.message + '\n\nСумма сделки: ' + this.formatMoney(finalPrice) + ' ₽';
        } else {
            document.getElementById('resultIcon').textContent = '😞';
            document.getElementById('resultTitle').textContent = 'Сделка сорвалась';
            document.getElementById('resultText').textContent = reaction.message;
        }

        dealResult.style.display = 'block';
        this.updateUI();
    }

    hideDealResult() {
        const dealResult = document.getElementById('dealResult');
        if (dealResult) dealResult.style.display = 'none';

        const clientChar = document.getElementById('clientChar');
        if (clientChar) clientChar.style.display = 'none';

        this.hideDialog();
        this.hideClientIndicators();
    }

    hideClientIndicators() {
        ['patienceIndicator', 'discBadge', 'trustBar'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }

    nextDay() {
        this.gameState.currentDay++;

        if (this.gameState.currentDay > this.gameState.maxDays) {
            this.endGame();
            return;
        }

        this.updateUI();
        this.checkRandomEvent();
        this.generateNewClient();
    }

    checkRandomEvent() {
        if (typeof getRandomEvent !== 'function') return;
        const event = getRandomEvent();
        if (event) this.showEvent(event);
    }

    showEvent(event) {
        const eventPopup = document.getElementById('eventPopup');
        if (!eventPopup) return;

        const iconEl = document.getElementById('eventIcon');
        const titleEl = document.getElementById('eventTitle');
        const descEl = document.getElementById('eventDescription');
        const actionsDiv = document.getElementById('eventActions');

        if (iconEl) iconEl.textContent = event.title.split(' ')[0] || '⚡';
        if (titleEl) titleEl.textContent = event.title;
        if (descEl) descEl.textContent = event.description;

        if (actionsDiv) {
            actionsDiv.innerHTML = '';
            event.actions.forEach(action => {
                const btn = document.createElement('button');
                btn.className = 'event-action';
                btn.textContent = action.text;
                btn.addEventListener('click', () => this.handleEventAction(event, action.effect));
                actionsDiv.appendChild(btn);
            });
        }

        eventPopup.style.display = 'block';
    }

    handleEventAction(event, actionEffect) {
        const eventPopup = document.getElementById('eventPopup');
        if (eventPopup) eventPopup.style.display = 'none';

        if (typeof applyEventEffect !== 'function') return;

        const effect = applyEventEffect(event, actionEffect, this);

        if (effect.discount) this.gameState.gameModifiers.discount = effect.discount;
        if (effect.priceModifier) this.gameState.gameModifiers.priceModifier = effect.priceModifier;
        if (effect.marginBonus) this.gameState.gameModifiers.marginBonus = effect.marginBonus;
        if (effect.salesBonus) this.gameState.gameModifiers.salesBonus = effect.salesBonus;
        if (effect.sales) this.player.sales = Math.max(0, this.player.sales + effect.sales);
        if (effect.reputation) this.player.reputation = Math.max(0, Math.min(100, this.player.reputation + effect.reputation));

        // Показываем результат без alert
        if (effect.message) {
            const dealResult = document.getElementById('dealResult');
            if (dealResult) {
                document.getElementById('resultIcon').textContent = '⚡';
                document.getElementById('resultTitle').textContent = 'Событие дня!';
                document.getElementById('resultText').textContent = effect.message;
                dealResult.style.display = 'block';
            }
        }

        this.updateUI();
    }

    updateUI() {
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        const setStyle = (id, prop, val) => { const el = document.getElementById(id); if (el) el.style[prop] = val; };

        set('dayNumber', this.gameState.currentDay);
        set('salesAmount', this.formatMoney(this.player.sales) + ' ₽');
        set('playerNameDisplay', this.player.name);
        set('playerLevelDisplay', `Менеджер Lv.${this.player.level}`);
        set('reputationDisplay', this.player.reputation);
        set('targetAmount', new Intl.NumberFormat('ru-RU').format(this.gameState.target));

        const playerAvatar = document.getElementById('playerAvatar');
        if (playerAvatar) playerAvatar.textContent = this.player.avatar;

        const progress = Math.min((this.player.sales / this.gameState.target) * 100, 100);
        setStyle('progressFill', 'width', progress + '%');
    }

    endGame() {
        this.hideAllScreens();
        const gameOverScreen = document.getElementById('gameOverScreen');
        if (gameOverScreen) gameOverScreen.style.display = 'flex';

        const planCompletion = Math.round((this.player.sales / this.gameState.target) * 100);
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

        set('finalSales', this.formatMoney(this.player.sales) + ' ₽');
        set('planCompletion', planCompletion + '%');

        let achievement = '';
        if (planCompletion >= 150) achievement = '🏆 Легенда продаж! Превышение плана на 50%+';
        else if (planCompletion >= 120) achievement = '🥇 Отличный результат! Превышение плана на 20%+';
        else if (planCompletion >= 100) achievement = '✅ План выполнен! Вы справились с задачей!';
        else if (planCompletion >= 80) achievement = '📈 Хороший результат! Почти достигли цели!';
        else achievement = '💪 Есть куда расти! Попробуйте ещё раз!';

        set('achievement', achievement);
    }

    resetGame() {
        this.player = {
            name: "Алексей Продажин",
            avatar: "👨‍💼",
            sales: 0,
            reputation: 50,
            level: 1,
            experience: 0
        };

        this.gameState = {
            currentDay: 1,
            maxDays: 30,
            target: 500000,
            difficulty: 'normal',
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
        return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(amount)));
    }
}
