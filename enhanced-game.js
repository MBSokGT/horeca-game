class ModernSalesGame {
    constructor() {
        this.player = {
            name: "Алексей Продажин",
            avatar: "👨💼",
            sales: 0,
            totalEarnings: 0,
            reputation: 50,
            level: 1,
            totalDeals: 0,
            biggestDeal: 0,
            dealsToday: 0,
            bestSatisfaction: 0,
            achievements: [],
            skills: {}
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
            },
            currentSurveyQuestions: [],
            surveyFailures: 0
        };
        
        this.currentScreen = 'loading';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkAuth();
    }
    
    checkAuth() {
        this.startLoadingSequence();
    }
    
    showAuthScreen() {
        this.hideAllScreens();
        document.getElementById('authScreen').style.display = 'flex';
        this.currentScreen = 'auth';
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
            const currentUser = AuthSystem.getCurrentUser();
            if (currentUser && currentUser.name) {
                this.player.name = currentUser.name;
            } else {
                const nameInput = document.getElementById('playerNameInput');
                this.player.name = nameInput.value || nameInput.placeholder || "Алексей Продажин";
            }
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
        
        document.getElementById('achievementContinueBtn')?.addEventListener('click', () => {
            document.getElementById('achievementPopup').style.display = 'none';
        });
        
        document.getElementById('levelContinueBtn')?.addEventListener('click', () => {
            document.getElementById('levelUpPopup').style.display = 'none';
        });
        
        // Аутентификация
        document.getElementById('loginBtn')?.addEventListener('click', () => {
            this.handleLogin();
        });
        
        document.getElementById('registerBtn')?.addEventListener('click', () => {
            this.handleRegister();
        });
        
        document.getElementById('forgotPasswordBtn')?.addEventListener('click', () => {
            this.showRecoveryScreen();
        });
        
        document.getElementById('guestBtn')?.addEventListener('click', () => {
            this.startLoadingSequence();
        });
        
        document.getElementById('sendRecoveryBtn')?.addEventListener('click', () => {
            this.sendRecoveryCode();
        });
        
        document.getElementById('resetPasswordBtn')?.addEventListener('click', () => {
            this.resetPassword();
        });
        
        document.getElementById('backToLoginBtn')?.addEventListener('click', () => {
            this.showAuthScreen();
        });
        
        document.getElementById('showAuthBtn')?.addEventListener('click', () => {
            this.showAuthScreen();
        });
        
        document.getElementById('showMiniGames')?.addEventListener('click', () => {
            this.showMiniGamesMenu();
        });
        
        document.getElementById('backFromMiniGames')?.addEventListener('click', () => {
            this.showMainMenu();
        });
        
        // Навигация
        document.getElementById('hamburgerIcon')?.addEventListener('click', () => {
            this.toggleSideMenu();
        });
        
        document.getElementById('closeMenu')?.addEventListener('click', () => {
            this.closeSideMenu();
        });
        
        document.getElementById('menuHome')?.addEventListener('click', () => {
            this.closeSideMenu();
            this.showMainMenu();
        });
        
        document.getElementById('menuSettings')?.addEventListener('click', () => {
            this.showSettings();
        });
        
        document.getElementById('menuMiniGames')?.addEventListener('click', () => {
            this.closeSideMenu();
            this.showMiniGamesMenu();
        });
        
        document.getElementById('menuExit')?.addEventListener('click', () => {
            this.confirmExit();
        });
        
        // Настройки
        document.getElementById('closeSettings')?.addEventListener('click', () => {
            this.closeSettings();
        });
        
        document.getElementById('saveSettings')?.addEventListener('click', () => {
            this.saveSettings();
        });
        
        document.getElementById('resetSettings')?.addEventListener('click', () => {
            this.resetSettings();
        });
        
        // Слайдеры громкости
        document.getElementById('musicVolume')?.addEventListener('input', (e) => {
            document.getElementById('musicVolumeValue').textContent = e.target.value + '%';
        });
        
        document.getElementById('sfxVolume')?.addEventListener('input', (e) => {
            document.getElementById('sfxVolumeValue').textContent = e.target.value + '%';
        });
        
        document.getElementById('menuStats')?.addEventListener('click', () => {
            this.showDetailedAnalysis();
        });
        
        document.getElementById('closeAnalysis')?.addEventListener('click', () => {
            document.getElementById('detailedAnalysis').style.display = 'none';
        });
        
        document.getElementById('feedbackContinue')?.addEventListener('click', () => {
            document.getElementById('instantFeedback').style.display = 'none';
        });
        
        document.getElementById('startMeetingBtn')?.addEventListener('click', () => {
            document.getElementById('clientCard').style.display = 'none';
            this.startClientMeeting();
        });

        // Поиск в каталоге
        document.getElementById('equipmentSearch')?.addEventListener('input', (e) => {
            this.filterEquipment(e.target.value);
        });
        
        // Placeholder для имени
        document.getElementById('playerNameInput')?.addEventListener('focus', (e) => {
            if (!e.target.value) {
                e.target.placeholder = '';
            }
        });
        
        document.getElementById('playerNameInput')?.addEventListener('blur', (e) => {
            if (!e.target.value) {
                e.target.placeholder = 'Алексей Продажин';
            }
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
        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('recoveryScreen').style.display = 'none';
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('miniGamesMenu').style.display = 'none';
        document.getElementById('discGame').style.display = 'none';
        document.getElementById('characterSetup').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('clientCard').style.display = 'none';
        document.getElementById('clientSurvey').style.display = 'none';
    }
    
    generateNewClient() {
        this.gameState.currentClient = this.createAdvancedClient();
        this.gameState.selectedEquipment = [];
        
        if (this.gameState.currentClient.category === "постоянный") {
            this.showClientCard();
        } else {
            this.startClientSurvey();
        }
    }
    
    createAdvancedClient() {
        const baseClient = generateRandomClient();
        
        // Добавляем сложность клиента
        const difficultyModifiers = {
            easy: { budgetMod: 1.2, demandMod: 0.8, satisfactionBase: 60 },
            normal: { budgetMod: 1.0, demandMod: 1.0, satisfactionBase: 50 },
            hard: { budgetMod: 0.8, demandMod: 1.3, satisfactionBase: 40 }
        };
        
        const modifier = difficultyModifiers[this.gameState.difficulty];
        baseClient.budget = Math.floor(baseClient.budget * modifier.budgetMod);
        baseClient.satisfaction = modifier.satisfactionBase;
        baseClient.demandLevel = modifier.demandMod;
        
        // Добавляем специальные требования
        const specialRequirements = [
            "быстрая доставка",
            "рассрочка платежа",
            "гарантия 2 года",
            "бесплатная установка",
            "обучение персонала"
        ];
        
        if (Math.random() < 0.3) {
            baseClient.specialRequirement = specialRequirements[Math.floor(Math.random() * specialRequirements.length)];
        }
        
        return baseClient;
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
        this.gameState.surveyFailures = 0;
        
        document.getElementById('clientSurvey').style.display = 'flex';
        this.showIntroductionDialog();
    }

    showIntroductionDialog() {
        const question = managerIntroductionQuestions[this.currentQuestionIndex];
        const client = this.gameState.currentClient;
        
        const progress = ((this.currentQuestionIndex + 1) / managerIntroductionQuestions.length) * 100;
        document.getElementById('surveyProgress').style.width = progress + '%';
        document.getElementById('progressText').textContent = `Вопрос ${this.currentQuestionIndex + 1} из ${managerIntroductionQuestions.length}`;
        
        // Показываем вопрос менеджера как заголовок
        let managerText = question.managerSays.replace('{playerName}', this.player.name);
        document.getElementById('questionTitle').textContent = managerText;
        
        const optionsDiv = document.getElementById('questionOptions');
        optionsDiv.innerHTML = '';
        
        // Генерируем варианты ответов клиента
        question.clientResponses.forEach(responseTemplate => {
            const clientResponse = this.generateClientResponse({ clientResponses: [responseTemplate] }, client);
            
            const responseDiv = document.createElement('div');
            responseDiv.className = 'question-option client-response';
            responseDiv.textContent = clientResponse;
            responseDiv.onclick = () => {
                this.selectIntroductionOption(responseDiv);
            };
            optionsDiv.appendChild(responseDiv);
        });
    }

    generateClientResponse(question, client) {
        const responses = question.clientResponses;
        let response = responses[Math.floor(Math.random() * responses.length)];
        
        // Заменяем плейсхолдеры
        response = response.replace('{clientName}', client.name);
        response = response.replace('{businessType}', clientBusinessTypes[Math.floor(Math.random() * clientBusinessTypes.length)]);
        response = response.replace('{experience}', clientExperience[Math.floor(Math.random() * clientExperience.length)]);
        response = response.replace('{plans}', clientPlans[Math.floor(Math.random() * clientPlans.length)]);
        response = response.replace('{currentSituation}', clientCurrentSituation[Math.floor(Math.random() * clientCurrentSituation.length)]);
        response = response.replace('{specificNeed}', client.specificNeed);
        response = response.replace('{budget}', this.formatMoney(client.budget));
        response = response.replace('{priority}', clientPriorities[Math.floor(Math.random() * clientPriorities.length)]);
        response = response.replace('{additionalRequirement}', clientAdditionalRequirements[Math.floor(Math.random() * clientAdditionalRequirements.length)]);
        
        return response;
    }

    selectIntroductionOption(element) {
        element.classList.add('selected');
        
        setTimeout(() => {
            this.currentQuestionIndex++;
            
            if (this.currentQuestionIndex >= managerIntroductionQuestions.length) {
                this.completeIntroduction();
            } else {
                this.showIntroductionDialog();
            }
        }, 1500);
    }

    completeIntroduction() {
        document.getElementById('clientSurvey').style.display = 'none';
        
        setTimeout(() => {
            this.startClientMeeting();
        }, 500);
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
        
        this.dialogState = {
            phase: 'greeting',
            clientMood: this.calculateClientMood(client),
            topicsDiscussed: [],
            trustLevel: client.category === 'постоянный' ? 70 : 30
        };
        
        const greeting = this.generateContextualGreeting(client);
        this.showDialogWithOptions(greeting, this.getGreetingOptions());
        
        dialogBox.style.display = 'block';
    }
    
    calculateClientMood(client) {
        let mood = 50;
        if (client.personality === 'экономный') mood -= 10;
        if (client.personality === 'требовательный') mood -= 15;
        if (client.personality === 'спешащий') mood -= 5;
        if (client.category === 'постоянный') mood += 20;
        if (this.player.reputation > 70) mood += 10;
        return Math.max(20, Math.min(80, mood));
    }
    
    generateContextualGreeting(client) {
        const mood = this.dialogState.clientMood;
        const greetings = {
            positive: [
                `Привет! Я ${client.name} из "${client.company}". Слышал про вас - говорят, хорошие ребята! У нас ${client.typeName.toLowerCase()}, нужно ${client.specificNeed}.`,
                `Здорово! ${client.name}, рад встрече. Открываем ${client.typeName.toLowerCase()}, надеюсь поможете с оборудованием. Бюджет ${this.formatMoney(client.budget)}.`,
                `Приветствую! Друзья советовали к вам обратиться. Мне нужно ${client.specificNeed} для моего ${client.typeName.toLowerCase()}.`
            ],
            neutral: [
                `Здравствуйте. ${client.name} из "${client.company}". Ищу оборудование для ${client.typeName.toLowerCase()}. Посмотрим что предложите.`,
                `Добрый день. Я ${client.name}, владелец ${client.typeName.toLowerCase()}. Нужно ${client.specificNeed}, бюджет ${this.formatMoney(client.budget)}.`,
                `Здравствуйте. Время дорого, поэтому сразу к делу - нужно оборудование для ${client.typeName.toLowerCase()}.`
            ],
            negative: [
                `Здравствуйте. ${client.name}. Честно говоря, уже устал от менеджеров... Все обещают, а толку мало. У меня ${client.typeName.toLowerCase()}, нужно ${client.specificNeed}.`,
                `Добрый день. Надеюсь не будете время тратить впустую. Мне нужно конкретное оборудование, а не болтовня.`,
                `Здравствуйте. ${client.name}. Предупреждаю - я очень требовательный. Нужно ${client.specificNeed} и никаких компромиссов.`
            ]
        };
        
        const moodCategory = mood > 60 ? 'positive' : mood > 40 ? 'neutral' : 'negative';
        const selectedGreetings = greetings[moodCategory];
        return selectedGreetings[Math.floor(Math.random() * selectedGreetings.length)];
    }
    
    getGreetingOptions() {
        return [
            {
                text: 'Привет! Расскажите о вашем бизнесе',
                action: () => this.handleDialogChoice('business_questions'),
                effect: { trust: +8, mood: +5 }
            },
            {
                text: 'Добро пожаловать! Какое оборудование ищете?',
                action: () => this.handleDialogChoice('needs_discussion'),
                effect: { trust: +5, mood: +3 }
            },
            {
                text: 'Здравствуйте! Вот наш каталог',
                action: () => this.handleDialogChoice('direct_catalog'),
                effect: { trust: -3, mood: -5 }
            }
        ];
    }
    
    handleDialogChoice(choice) {
        const client = this.gameState.currentClient;
        
        switch(choice) {
            case 'professional_intro':
                this.dialogState.trustLevel += 5;
                this.dialogState.clientMood += 3;
                this.showDialogWithOptions(
                    `Отлично! Меня зовут ${this.player.name}, я менеджер компании "Барный Комплекс". Расскажите о ваших потребностях.`,
                    this.getNeedsDiscussionOptions()
                );
                break;
                
            case 'direct_catalog':
                this.dialogState.trustLevel -= 3;
                this.dialogState.clientMood -= 5;
                if (client.personality === 'спешащий') {
                    this.showDialogWithOptions(
                        'Хорошо, мне нравится деловой подход. Покажите, что у вас есть.',
                        this.getCatalogOptions()
                    );
                } else {
                    this.showDialogWithOptions(
                        'Хм, а не стоило бы сначала выяснить, что мне нужно?',
                        this.getRecoveryOptions()
                    );
                }
                break;
                
            case 'business_questions':
                this.dialogState.trustLevel += 8;
                this.dialogState.clientMood += 5;
                this.dialogState.topicsDiscussed.push('business');
                this.showBusinessQuestions();
                break;
                
            case 'needs_discussion':
                this.showNeedsDialog();
                break;
                
            case 'budget_discussion':
                this.showBudgetDialog();
                break;
                
            case 'business_advice':
                this.showBusinessAdvice();
                break;
                
            case 'show_catalog':
            case 'targeted_catalog':
                this.hideDialog();
                this.openCatalog();
                break;
                
            case 'proper_intro':
                this.dialogState.trustLevel += 3;
                this.dialogState.clientMood += 5;
                this.showDialogWithOptions(
                    `Конечно! Меня зовут ${this.player.name}. Я специализируюсь на оборудовании для ${client.typeName.toLowerCase()}. Расскажите о ваших задачах.`,
                    this.getNeedsDiscussionOptions()
                );
                break;
                
            case 'priority_needs':
                this.showPriorityNeedsDialog();
                break;
                
            case 'negotiate_price':
                this.startPriceNegotiation();
                break;
                
            case 'add_value':
                this.showValueAddition();
                break;
                
            case 'close_deal':
                this.attemptDealClose();
                break;
        }
    }
    
    showNeedsDialog() {
        const client = this.gameState.currentClient;
        const needsResponse = `Нам нужно ${client.specificNeed}. Бюджет примерно ${this.formatMoney(client.budget)}. ${this.getPersonalityHint(client)}`;
        
        this.showDialogWithOptions(
            needsResponse,
            [
                {
                    text: '💡 У меня есть идеальное решение',
                    action: () => this.handleDialogChoice('perfect_solution'),
                    effect: { trust: +5, mood: +3 }
                },
                {
                    text: '📋 Нужно уточнить детали',
                    action: () => this.handleDialogChoice('clarify_details'),
                    effect: { trust: +3, mood: +1 }
                },
                {
                    text: '📦 Покажу подходящие варианты',
                    action: () => this.handleDialogChoice('show_options'),
                    effect: { trust: +2, mood: +2 }
                }
            ]
        );
    }
    
    showBudgetDialog() {
        const client = this.gameState.currentClient;
        let budgetResponse;
        
        if (client.personality === 'экономный') {
            budgetResponse = `Бюджет ограничен - ${this.formatMoney(client.budget)}. Нужно максимум качества за минимальные деньги.`;
        } else if (client.personality === 'требовательный') {
            budgetResponse = `Готов потратить ${this.formatMoney(client.budget)}, но оборудование должно быть топового качества.`;
        } else {
            budgetResponse = `Планируем потратить около ${this.formatMoney(client.budget)}. Главное - чтобы все работало надежно.`;
        }
        
        this.showDialogWithOptions(
            budgetResponse,
            [
                {
                    text: '💰 Покажу варианты в вашем бюджете',
                    action: () => this.handleDialogChoice('budget_options'),
                    effect: { trust: +3, mood: +2 }
                },
                {
                    text: '⭐ Есть премиум-варианты с доплатой',
                    action: () => this.handleDialogChoice('premium_options'),
                    effect: { trust: -2, mood: -3 }
                },
                {
                    text: '🎯 Подберу оптимальное соотношение цена-качество',
                    action: () => this.handleDialogChoice('optimal_choice'),
                    effect: { trust: +5, mood: +4 }
                }
            ]
        );
    }
    
    showBusinessAdvice() {
        const client = this.gameState.currentClient;
        const advice = this.generateBusinessAdvice(client);
        
        this.dialogState.trustLevel += 10;
        this.dialogState.clientMood += 8;
        
        this.showDialogWithOptions(
            `${advice}\n\nТеперь покажу оборудование, которое поможет реализовать эти идеи.`,
            [
                {
                    text: '🤝 Отличные идеи! Покажите оборудование',
                    action: () => this.handleDialogChoice('enthusiastic_catalog'),
                    effect: { trust: +5, mood: +5 }
                },
                {
                    text: '🤔 Интересно, но сначала о ценах',
                    action: () => this.handleDialogChoice('price_first'),
                    effect: { trust: +2, mood: +1 }
                }
            ]
        );
    }
    
    generateBusinessAdvice(client) {
        const adviceMap = {
            cafe: [
                'Для кафе важна скорость обслуживания. Рекомендую автоматическую кофемашину и быстрые грили.',
                'В кафе ключевой фактор - атмосфера. Красивая барная стойка и качественная посуда создадут нужное впечатление.',
                'Для кафе стоит инвестировать в хорошую кофемашину - это ваш главный инструмент заработка.'
            ],
            restaurant: [
                'В ресторане качество блюд - приоритет. Профессиональные плиты и пароконвектоматы окупятся быстро.',
                'Для ресторана важна презентация. Качественная посуда и оборудование для подачи повысят средний чек.',
                'Рекомендую инвестировать в холодильное оборудование - свежесть продуктов критически важна.'
            ],
            hotel: [
                'В отеле важна надежность оборудования - поломки недопустимы. Выбирайте проверенные бренды.',
                'Для отеля стоит рассмотреть энергоэффективное оборудование - экономия на коммунальных услугах значительная.',
                'В отельном ресторане важна универсальность оборудования для разных форматов питания.'
            ],
            canteen: [
                'В столовой главное - производительность. Оборудование должно выдерживать большие объемы.',
                'Для столовой критична простота обслуживания - персонал должен легко работать с оборудованием.',
                'Рекомендую мармиты и тепловое оборудование для поддержания температуры готовых блюд.'
            ]
        };
        
        const typeAdvice = adviceMap[client.type] || adviceMap.cafe;
        return typeAdvice[Math.floor(Math.random() * typeAdvice.length)];
    }
    
    getPersonalityHint(client) {
        const hints = {
            'экономный': 'Важно уложиться в бюджет.',
            'требовательный': 'Качество должно быть на высоте.',
            'спешащий': 'Нужно решить быстро.',
            'осторожный': 'Хочу все тщательно обдумать.'
        };
        
        return hints[client.personality] || 'Надеюсь на ваш профессионализм.';
    }
    
    startPriceNegotiation() {
        const client = this.gameState.currentClient;
        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {
            return sum + (this.calculatePrice(item.price) * item.quantity);
        }, 0);
        
        const discountRequest = Math.floor(Math.random() * 15) + 5; // 5-20% скидка
        
        this.showDialogWithOptions(
            `Цена ${this.formatMoney(totalPrice)} немного выше бюджета. Можете сделать скидку ${discountRequest}%?`,
            [
                {
                    text: `✅ Согласен на ${discountRequest}% скидку`,
                    action: () => this.applyDiscount(discountRequest),
                    effect: { trust: +3, mood: +5 }
                },
                {
                    text: `🤝 Могу предложить ${Math.floor(discountRequest/2)}%`,
                    action: () => this.applyDiscount(Math.floor(discountRequest/2)),
                    effect: { trust: +1, mood: +2 }
                },
                {
                    text: '💎 Цена справедливая, но добавлю бонусы',
                    action: () => this.addBonuses(),
                    effect: { trust: +2, mood: +3 }
                }
            ]
        );
    }
    
    applyDiscount(discountPercent) {
        this.gameState.gameModifiers.discount = 1 - (discountPercent / 100);
        this.showDialogWithOptions(
            `Отлично! Применяю скидку ${discountPercent}%. Заключаем сделку?`,
            [
                {
                    text: '🤝 Да, заключаем сделку!',
                    action: () => this.completeDeal(),
                    effect: { trust: +5, mood: +5 }
                }
            ]
        );
    }
    
    addBonuses() {
        const bonuses = [
            'бесплатная доставка и установка',
            'расширенная гарантия на 2 года',
            'бесплатное обучение персонала',
            'техническая поддержка 24/7'
        ];
        
        const selectedBonus = bonuses[Math.floor(Math.random() * bonuses.length)];
        
        this.showDialogWithOptions(
            `В качестве бонуса предлагаю ${selectedBonus}. Согласны?`,
            [
                {
                    text: '🎁 Отличный бонус! Заключаем сделку',
                    action: () => this.completeDeal(),
                    effect: { trust: +3, mood: +4 }
                }
            ]
        );
    }
    
    showBusinessQuestions() {
        const client = this.gameState.currentClient;
        const managerQuestion = `Расскажите о вашем ${client.typeName.toLowerCase()}. Какая у вас концепция?`;
        const clientResponse = this.generateBusinessResponse(client);
        
        this.showDialogWithOptions(
            clientResponse,
            this.getBusinessFollowUpOptions()
        );
    }
    
    generateBusinessResponse(client) {
        const responses = {
            cafe: [
                'У нас уютное семейное кафе. Делаем акцент на домашней атмосфере и качественном кофе.',
                'Современное кафе с быстрым обслуживанием. Целевая аудитория - офисные работники.',
                'Кафе-кондитерская. Специализируемся на авторских десертах и премиум-кофе.'
            ],
            restaurant: [
                'Ресторан европейской кухни. Средний чек 2000-3000 рублей, работаем на обеды и ужины.',
                'Семейный ресторан с детской зоной. Упор на качественные продукты и домашнюю кухню.',
                'Ресторан высокой кухни. Работаем только на ужины, средний чек от 5000 рублей.'
            ],
            hotel: [
                'Отель категории 4 звезды. Ресторан работает для гостей и внешних посетителей.',
                'Бутик-отель в центре города. Ресторан - важная часть концепции премиум-сервиса.',
                'Загородный отель. Ресторан специализируется на местной кухне и эко-продуктах.'
            ],
            canteen: [
                'Столовая для офисного центра. Обслуживаем около 500 человек в день.',
                'Корпоративная столовая. Важны скорость обслуживания и разнообразие меню.',
                'Столовая при учебном заведении. Нужно качественное и недорогое питание.'
            ]
        };
        
        const typeResponses = responses[client.type] || responses.cafe;
        return typeResponses[Math.floor(Math.random() * typeResponses.length)];
    }
    
    getBusinessFollowUpOptions() {
        return [
            {
                text: 'Интересно! Расскажите о текущих потребностях',
                action: () => this.handleDialogChoice('needs_discussion'),
                effect: { trust: +5, mood: +3 }
            },
            {
                text: 'У меня есть идеи для вашего бизнеса',
                action: () => this.handleDialogChoice('business_advice'),
                effect: { trust: +10, mood: +8 }
            },
            {
                text: 'Покажу подходящее оборудование',
                action: () => this.handleDialogChoice('targeted_catalog'),
                effect: { trust: +3, mood: +2 }
            }
        ];
    }
    
    getNeedsDiscussionOptions() {
        return [
            {
                text: 'Какое оборудование вам нужно в первую очередь?',
                action: () => this.handleDialogChoice('priority_needs'),
                effect: { trust: +3, mood: +2 }
            },
            {
                text: 'Какой у вас бюджет на оборудование?',
                action: () => this.handleDialogChoice('budget_discussion'),
                effect: { trust: +2, mood: -1 }
            },
            {
                text: 'Покажу наш каталог',
                action: () => this.handleDialogChoice('show_catalog'),
                effect: { trust: 0, mood: 0 }
            }
        ];
    }
    
    getCatalogOptions() {
        return [
            {
                text: '📦 Открыть каталог оборудования',
                action: () => {
                    this.hideDialog();
                    this.openCatalog();
                },
                effect: { trust: 0, mood: 0 }
            },
            {
                text: '❓ Сначала уточнить потребности',
                action: () => this.handleDialogChoice('needs_discussion'),
                effect: { trust: +5, mood: +3 }
            }
        ];
    }
    
    getRecoveryOptions() {
        return [
            {
                text: '🤝 Извините, давайте знакомиться правильно',
                action: () => this.handleDialogChoice('proper_intro'),
                effect: { trust: +3, mood: +5 }
            },
            {
                text: '❓ Расскажите о ваших потребностях',
                action: () => this.handleDialogChoice('needs_discussion'),
                effect: { trust: +2, mood: +2 }
            }
        ];
    }
    
    showDialogWithOptions(text, options) {
        const dialogText = document.getElementById('dialogText');
        
        // Анимация печатания текста
        this.typewriterEffect(dialogText, text, () => {
            const actionsDiv = document.getElementById('dialogActions');
            actionsDiv.innerHTML = '';
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'dialog-action';
                button.textContent = option.text;
                button.addEventListener('click', () => {
                    // Показываем ответ менеджера
                    this.addManagerMessage(option.text);
                    
                    if (option.effect) {
                        this.dialogState.trustLevel += option.effect.trust || 0;
                        this.dialogState.clientMood += option.effect.mood || 0;
                    }
                    
                    // Генерируем и показываем реакцию клиента
                    setTimeout(() => {
                        const clientResponse = this.generateClientResponse(option);
                        this.addClientMessage(clientResponse);
                        
                        setTimeout(() => {
                            option.action();
                        }, 1500);
                    }, 1000);
                });
                actionsDiv.appendChild(button);
            });
        });
    }
    
    typewriterEffect(element, text, callback) {
        element.textContent = '';
        element.classList.remove('typing-complete');
        let i = 0;
        const speed = 30;
        
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                element.classList.add('typing-complete');
                if (callback) {
                    setTimeout(callback, 500);
                }
            }
        }
        
        typeChar();
    }
    
    addManagerMessage(text) {
        const dialogText = document.getElementById('dialogText');
        dialogText.innerHTML = `<div class="manager-message">👨💼 Вы: "${text}"</div>`;
    }
    
    addClientMessage(text) {
        const dialogText = document.getElementById('dialogText');
        const client = this.gameState.currentClient;
        dialogText.innerHTML += `<div class="client-message">${client.avatar} ${client.name}: "${text}"</div>`;
    }
    
    generateClientResponse(option) {
        const client = this.gameState.currentClient;
        const mood = this.dialogState.clientMood;
        
        // Реакции на основе типа ответа и настроения клиента
        const responses = {
            positive: {
                high: ["Отлично! Именно то что нужно!", "Прекрасно! Мне нравится ваш подход!", "Замечательно! Продолжайте!"],
                medium: ["Хорошо, это разумно.", "Да, звучит неплохо.", "Понятно, продолжим."],
                low: ["Ну ладно, посмотрим.", "Хм, может быть.", "Не уверен, но слушаю."]
            },
            neutral: {
                high: ["Понятно, а что еще?", "Хорошо, продолжайте.", "Да, слушаю вас."],
                medium: ["Ясно.", "Понял.", "Хорошо."],
                low: ["И что дальше?", "Это все?", "Продолжайте."]
            },
            negative: {
                high: ["Не совсем то что ожидал.", "Хм, это не очень подходит.", "Может что-то другое?"],
                medium: ["Не думаю что это подходит.", "Это не то что мне нужно.", "Нет, не подходит."],
                low: ["Это полная ерунда!", "Вы вообще слушали что я говорил?", "Время тратим впустую!"]
            }
        };
        
        // Определяем тип реакции на основе эффекта
        let reactionType = 'neutral';
        if (option.effect) {
            if ((option.effect.trust || 0) > 3 || (option.effect.mood || 0) > 3) {
                reactionType = 'positive';
            } else if ((option.effect.trust || 0) < -2 || (option.effect.mood || 0) < -2) {
                reactionType = 'negative';
            }
        }
        
        // Определяем уровень настроения
        let moodLevel = 'medium';
        if (mood > 60) moodLevel = 'high';
        else if (mood < 40) moodLevel = 'low';
        
        const responseOptions = responses[reactionType][moodLevel];
        return responseOptions[Math.floor(Math.random() * responseOptions.length)];
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

    filterEquipment(searchTerm) {
        const items = document.querySelectorAll('.equipment-item');
        const term = searchTerm.toLowerCase();
        
        items.forEach(item => {
            const name = item.querySelector('.name').textContent.toLowerCase();
            if (name.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    displayEquipment() {
        const equipmentGrid = document.getElementById('equipmentGrid');
        equipmentGrid.innerHTML = '';
        
        const availableEquipment = getEquipmentForClient(this.gameState.currentClient.type);
        
        availableEquipment.forEach(item => {
            const equipmentDiv = document.createElement('div');
            equipmentDiv.className = 'equipment-item';
            equipmentDiv.dataset.id = item.id;
            
            const selectedItem = this.gameState.selectedEquipment.find(eq => eq.id === item.id);
            const quantity = selectedItem ? selectedItem.quantity : 0;
            
            equipmentDiv.innerHTML = `
                <div class="icon">${item.icon}</div>
                <div class="name">${item.name}</div>
                <div class="price">${this.formatMoney(this.calculatePrice(item.price))}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="game.changeQuantity('${item.id}', -1)">-</button>
                    <span class="quantity-display">${quantity}</span>
                    <button class="quantity-btn" onclick="game.changeQuantity('${item.id}', 1)">+</button>
                </div>
            `;
            
            if (quantity > 0) {
                equipmentDiv.classList.add('selected');
            }
            
            equipmentDiv.addEventListener('click', (e) => {
                if (!e.target.classList.contains('quantity-btn')) {
                    this.toggleEquipment(item, equipmentDiv);
                }
            });
            
            equipmentGrid.appendChild(equipmentDiv);
        });
    }

    changeQuantity(itemId, change) {
        const availableEquipment = getEquipmentForClient(this.gameState.currentClient.type);
        const item = availableEquipment.find(eq => eq.id === itemId);
        if (!item) return;

        const existingIndex = this.gameState.selectedEquipment.findIndex(eq => eq.id === itemId);
        
        if (existingIndex > -1) {
            this.gameState.selectedEquipment[existingIndex].quantity += change;
            if (this.gameState.selectedEquipment[existingIndex].quantity <= 0) {
                this.gameState.selectedEquipment.splice(existingIndex, 1);
            }
        } else if (change > 0) {
            this.gameState.selectedEquipment.push({...item, quantity: 1});
        }

        this.displayEquipment();
        this.updateOfferSummary();
    }
    
    toggleEquipment(item, element) {
        const index = this.gameState.selectedEquipment.findIndex(eq => eq.id === item.id);
        
        if (index > -1) {
            this.gameState.selectedEquipment.splice(index, 1);
            element.classList.remove('selected');
        } else {
            this.gameState.selectedEquipment.push({...item, quantity: 1});
            element.classList.add('selected');
        }
        
        this.displayEquipment();
        this.updateOfferSummary();
    }
    
    calculatePrice(basePrice) {
        return Math.floor(basePrice * this.gameState.gameModifiers.discount * this.gameState.gameModifiers.priceModifier);
    }
    
    updateOfferSummary() {
        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {
            return sum + (this.calculatePrice(item.price) * item.quantity);
        }, 0);
        
        document.getElementById('totalPrice').textContent = this.formatMoney(totalPrice);
        document.getElementById('makeOfferBtn').disabled = this.gameState.selectedEquipment.length === 0;
    }
    
    makeOffer() {
        if (this.gameState.selectedEquipment.length === 0) return;
        
        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {
            return sum + (this.calculatePrice(item.price) * item.quantity);
        }, 0);
        
        // Проверяем, нужно ли задать вопрос о товаре
        if (Math.random() < 0.4 && this.gameState.selectedEquipment.length > 0) {
            this.askClientQuestion();
            return;
        }
        
        const satisfaction = this.calculateClientSatisfaction(this.gameState.currentClient, this.gameState.selectedEquipment, totalPrice);
        const reaction = this.getClientReaction(satisfaction);
        
        this.closeCatalog();
        this.showDealResult(reaction, totalPrice, satisfaction);
    }

    calculateClientSatisfaction(client, selectedEquipment, totalPrice) {
        let satisfaction = client.satisfaction || 50;
        
        // Проверяем соответствие бюджету
        const budgetRatio = totalPrice / client.budget;
        if (budgetRatio <= 0.8) {
            satisfaction += 25;
        } else if (budgetRatio <= 1.0) {
            satisfaction += 10;
        } else if (budgetRatio <= 1.2) {
            satisfaction -= 15;
        } else {
            satisfaction -= 35;
        }
        
        // Проверяем количество товаров
        const expectedItems = {
            'hotel': 8,
            'restaurant': 6, 
            'cafe': 4,
            'canteen': 5
        }[client.type] || 4;
        
        const itemDiff = Math.abs(selectedEquipment.length - expectedItems);
        satisfaction -= itemDiff * 8;
        
        // Проверяем соответствие потребностям
        const hasNeededCategory = selectedEquipment.some(item => 
            client.specificNeed && (
                client.specificNeed.toLowerCase().includes(item.category) ||
                client.specificNeed.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
            )
        );
        
        if (hasNeededCategory) {
            satisfaction += 20;
        } else {
            satisfaction -= 25;
        }
        
        // Модификатор личности
        const personalityModifiers = {
            'экономный': budgetRatio > 1.0 ? 0.6 : 1.3,
            'требовательный': selectedEquipment.length < expectedItems ? 0.7 : 1.2,
            'спешащий': 1.0,
            'осторожный': totalPrice > client.budget * 0.9 ? 0.8 : 1.1
        };
        
        satisfaction *= personalityModifiers[client.personality] || 1.0;
        
        // Бонус за репутацию менеджера
        const reputationBonus = Math.floor((this.player.reputation - 50) / 10) * 3;
        satisfaction += reputationBonus;
        
        return Math.max(0, Math.min(100, Math.floor(satisfaction)));
    }

    getClientReaction(satisfaction) {
        if (satisfaction >= 85) {
            return {
                message: "Превосходно! Именно то, что мне нужно! Заключаем сделку немедленно!",
                success: true,
                bonus: 1.3
            };
        } else if (satisfaction >= 70) {
            return {
                message: "Отличное предложение! Согласен на ваши условия.",
                success: true,
                bonus: 1.15
            };
        } else if (satisfaction >= 55) {
            return {
                message: "Хорошо, но можете сделать скидку 10%?",
                success: true,
                bonus: 0.9
            };
        } else if (satisfaction >= 40) {
            return {
                message: "Нужно подумать... Может, что-то другое предложите?",
                success: false,
                bonus: 0
            };
        } else if (satisfaction >= 25) {
            return {
                message: "Это слишком дорого для нас. Не подходит.",
                success: false,
                bonus: 0
            };
        } else {
            return {
                message: "Это совершенно не то, что мне нужно! До свидания!",
                success: false,
                bonus: 0
            };
        }
    }

    askClientQuestion() {
        const randomItem = this.gameState.selectedEquipment[Math.floor(Math.random() * this.gameState.selectedEquipment.length)];
        const questionTemplate = clientQuestions[Math.floor(Math.random() * clientQuestions.length)];
        const question = questionTemplate.replace('{name}', randomItem.name);
        
        document.getElementById('dialogText').textContent = question;
        
        const actionsDiv = document.getElementById('dialogActions');
        actionsDiv.innerHTML = '';
        
        // Определяем тип вопроса и варианты ответов
        const answerType = this.getAnswerType(question);
        const options = clientAnswerOptions[answerType] || clientAnswerOptions.features;
        
        options.forEach(answer => {
            const answerBtn = document.createElement('button');
            answerBtn.className = 'dialog-action';
            answerBtn.textContent = answer;
            answerBtn.addEventListener('click', () => {
                this.handleClientQuestionAnswer(answer);
            });
            actionsDiv.appendChild(answerBtn);
        });
        
        this.closeCatalog();
        document.getElementById('dialogBox').style.display = 'block';
    }

    getAnswerType(question) {
        if (question.includes('материал') || question.includes('фарфор') || question.includes('керамик')) return 'material';
        if (question.includes('объем') || question.includes('литр')) return 'volume';
        if (question.includes('мощность') || question.includes('Вт')) return 'power';
        if (question.includes('температур')) return 'temperature';
        if (question.includes('комплект') || question.includes('чашек')) return 'capacity';
        return 'features';
    }

    handleClientQuestionAnswer(answer) {
        const isGoodAnswer = Math.random() < 0.7; // 70% шанс правильного ответа
        
        if (isGoodAnswer) {
            document.getElementById('dialogText').textContent = "Отлично! Именно то, что мне нужно. Продолжим.";
            this.player.reputation += 2;
        } else {
            document.getElementById('dialogText').textContent = "Хм, не совсем то, что я ожидал. Но ладно, посмотрим дальше.";
            this.player.reputation -= 1;
        }
        
        const actionsDiv = document.getElementById('dialogActions');
        actionsDiv.innerHTML = '';
        
        const continueBtn = document.createElement('button');
        continueBtn.className = 'dialog-action';
        continueBtn.textContent = 'Продолжить';
        continueBtn.addEventListener('click', () => {
            this.hideDialog();
            this.completeDeal();
        });
        
        actionsDiv.appendChild(continueBtn);
    }

    completeDeal() {
        const totalPrice = this.gameState.selectedEquipment.reduce((sum, item) => {
            return sum + (this.calculatePrice(item.price) * item.quantity);
        }, 0);
        
        const satisfaction = calculateClientSatisfaction(this.gameState.currentClient, this.gameState.selectedEquipment, totalPrice);
        const reaction = getClientReaction(satisfaction);
        
        this.showDealResult(reaction, totalPrice, satisfaction);
    }
    
    showDealResult(reaction, totalPrice, satisfaction) {
        const dealResult = document.getElementById('dealResult');
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultText = document.getElementById('resultText');
        
        if (reaction.success) {
            const finalPrice = Math.floor(totalPrice * reaction.bonus * this.gameState.gameModifiers.salesBonus);
            const baseCommission = this.player.level >= 4 ? 0.015 : 0.01;
            const earnings = Math.floor(finalPrice * baseCommission * this.gameState.gameModifiers.marginBonus);
            
            this.player.sales += finalPrice;
            this.player.totalEarnings += earnings;
            this.player.totalDeals++;
            this.player.dealsToday++;
            this.player.biggestDeal = Math.max(this.player.biggestDeal, finalPrice);
            this.player.bestSatisfaction = Math.max(this.player.bestSatisfaction, satisfaction);
            
            // Бонус за высокую удовлетворенность
            let reputationGain = Math.floor(satisfaction / 15);
            if (satisfaction >= 85) reputationGain += 3;
            
            this.player.reputation = Math.min(100, this.player.reputation + reputationGain);
            
            const newLevel = this.calculateLevel(this.player.totalEarnings);
            if (newLevel > this.player.level) {
                this.player.level = newLevel;
            }
            
            resultIcon.textContent = satisfaction >= 85 ? '🎆' : '💰';
            resultTitle.textContent = satisfaction >= 85 ? 'Отличная сделка!' : 'Сделка заключена!';
            
            let resultMessage = `${reaction.message}\n\n`;
            resultMessage += `Сумма сделки: ${this.formatMoney(finalPrice)}\n`;
            resultMessage += `Ваш доход: ${this.formatMoney(earnings)}\n`;
            resultMessage += `Удовлетворенность: ${satisfaction}%\n`;
            resultMessage += `Репутация: +${reputationGain}`;
            
            resultText.textContent = resultMessage;
        } else {
            // Потеря репутации за неудачную сделку
            const reputationLoss = Math.floor((100 - satisfaction) / 20);
            this.player.reputation = Math.max(0, this.player.reputation - reputationLoss);
            
            resultIcon.textContent = '😞';
            resultTitle.textContent = 'Сделка сорвалась';
            resultText.textContent = `${reaction.message}\n\nУдовлетворенность: ${satisfaction}%\nРепутация: -${reputationLoss}`;
        }
        
        dealResult.style.display = 'block';
        this.updateUI();
        
        // Сохраняем прогресс для авторизованных пользователей
        if (AuthSystem.getCurrentUser()) {
            AuthSystem.saveGameData({
                player: this.player,
                gameState: this.gameState
            });
        }
        
        if (typeof checkAchievements !== 'undefined') {
            checkAchievements(this);
        }
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
        this.player.dealsToday = 0;
        
        if (this.gameState.currentDay > this.gameState.maxDays) {
            this.endGame();
            return;
        }
        
        // Сброс модификаторов каждый день
        this.gameState.gameModifiers = {
            discount: 1.0,
            priceModifier: 1.0,
            marginBonus: 1.0,
            salesBonus: 1.0
        };
        
        // Повышение уровня
        const newLevel = this.calculateLevel(this.player.totalEarnings);
        if (newLevel > this.player.level) {
            this.player.level = newLevel;
            this.showLevelUp(newLevel);
        }
        
        this.checkRandomEvent();
        this.updateUI();
    }
    
    showLevelUp(newLevel) {
        const levelBenefits = {
            2: "Открыт доступ к премиум клиентам!",
            3: "Получена скидка 5% на все товары!",
            4: "Увеличена комиссия до 1.5%!",
            5: "Открыт доступ к эксклюзивным товарам!"
        };
        
        alert(`Поздравляем! Вы достигли ${newLevel} уровня!\n${levelBenefits[newLevel] || 'Повышена репутация!'}`);
        
        // Применяем бонусы уровня
        if (newLevel >= 3) {
            this.gameState.gameModifiers.discount = 0.95;
        }
        if (newLevel >= 4) {
            this.gameState.gameModifiers.marginBonus = 1.5;
        }
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
            },
            currentSurveyQuestions: [],
            surveyFailures: 0
        };
        
        this.showCharacterSetup();
    }
    
    formatMoney(amount) {
        return new Intl.NumberFormat('ru-RU').format(amount);
    }
    
    // Методы аутентификации
    handleLogin() {
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        
        const result = AuthSystem.login(email, password);
        if (result.success) {
            const gameData = AuthSystem.loadGameData();
            if (gameData) {
                this.player = gameData.player;
                this.gameState = gameData.gameState;
            }
            this.startLoadingSequence();
        } else {
            alert(result.message);
        }
    }
    
    handleRegister() {
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        
        const result = AuthSystem.register(email, password, name);
        alert(result.message);
        
        if (result.success) {
            document.getElementById('authTitle').textContent = 'Вход в игру';
        }
    }
    
    showRecoveryScreen() {
        this.hideAllScreens();
        document.getElementById('recoveryScreen').style.display = 'flex';
    }
    
    sendRecoveryCode() {
        const email = document.getElementById('recoveryEmailInput').value;
        const result = AuthSystem.sendRecoveryCode(email);
        alert(result.message);
        
        if (result.success) {
            document.getElementById('recoveryCodeSection').style.display = 'block';
        }
    }
    
    resetPassword() {
        const email = document.getElementById('recoveryEmailInput').value;
        const code = document.getElementById('recoveryCodeInput').value;
        const newPassword = document.getElementById('newPasswordInput').value;
        
        const result = AuthSystem.resetPassword(email, code, newPassword);
        alert(result.message);
        
        if (result.success) {
            this.showAuthScreen();
        }
    }
    
    showMiniGamesMenu() {
        this.hideAllScreens();
        document.getElementById('miniGamesMenu').style.display = 'flex';
        this.currentScreen = 'minigames';
    }
    
    toggleSideMenu() {
        const sideMenu = document.getElementById('sideMenu');
        const hamburgerIcon = document.getElementById('hamburgerIcon');
        
        sideMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
    }
    
    closeSideMenu() {
        const sideMenu = document.getElementById('sideMenu');
        const hamburgerIcon = document.getElementById('hamburgerIcon');
        
        sideMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
    }
    
    showSettings() {
        this.closeSideMenu();
        document.getElementById('settingsMenu').style.display = 'flex';
    }
    
    closeSettings() {
        document.getElementById('settingsMenu').style.display = 'none';
    }
    
    saveSettings() {
        const settings = {
            musicVolume: document.getElementById('musicVolume').value,
            sfxVolume: document.getElementById('sfxVolume').value,
            graphicsQuality: document.getElementById('graphicsQuality').value,
            animations: document.getElementById('animations').checked,
            autosave: document.getElementById('autosave').checked,
            hints: document.getElementById('hints').checked,
            dialogSpeed: document.getElementById('dialogSpeed').value
        };
        
        localStorage.setItem('gameSettings', JSON.stringify(settings));
        alert('Настройки сохранены!');
        this.closeSettings();
    }
    
    resetSettings() {
        if (confirm('Сбросить все настройки к значениям по умолчанию?')) {
            document.getElementById('musicVolume').value = 50;
            document.getElementById('sfxVolume').value = 70;
            document.getElementById('graphicsQuality').value = 'medium';
            document.getElementById('animations').checked = true;
            document.getElementById('autosave').checked = true;
            document.getElementById('hints').checked = true;
            document.getElementById('dialogSpeed').value = 'normal';
            
            document.getElementById('musicVolumeValue').textContent = '50%';
            document.getElementById('sfxVolumeValue').textContent = '70%';
        }
    }
    
    confirmExit() {
        if (confirm('Вы уверены, что хотите выйти из игры?')) {
            this.closeSideMenu();
            this.showMainMenu();
        }
    }
    
    showDetailedAnalysis() {
        this.closeSideMenu();
        if (typeof feedbackSystem !== 'undefined') {
            const analysis = feedbackSystem.exportSessionData();
            this.displayAnalysis(analysis);
        }
        document.getElementById('detailedAnalysis').style.display = 'flex';
    }
    
    displayAnalysis(data) {
        const analysisBody = document.getElementById('analysisBody');
        const summary = data.summary;
        
        analysisBody.innerHTML = `
            <div class="feedback-section success">
                <div class="feedback-title">📊 Общая статистика</div>
                <div class="feedback-text">
                    Всего взаимодействий: ${data.totalInteractions}<br>
                    Успешность: ${summary.successRate}%<br>
                    Продолжительность сессии: ${Math.round(data.duration / 60000)} мин
                </div>
            </div>
            
            <div class="feedback-section">
                <div class="feedback-title">🎯 Производительность по DISC типам</div>
                <div class="disc-performance">
                    <div class="disc-stat ${this.getPerformanceClass(summary.strongestDiscType.accuracy)}">
                        <div class="disc-type">D</div>
                        <div class="disc-accuracy">85%</div>
                        <div class="disc-label">Доминантный</div>
                    </div>
                    <div class="disc-stat good">
                        <div class="disc-type">I</div>
                        <div class="disc-accuracy">72%</div>
                        <div class="disc-label">Влиятельный</div>
                    </div>
                    <div class="disc-stat needs-work">
                        <div class="disc-type">S</div>
                        <div class="disc-accuracy">58%</div>
                        <div class="disc-label">Стабильный</div>
                    </div>
                    <div class="disc-stat excellent">
                        <div class="disc-type">C</div>
                        <div class="disc-accuracy">91%</div>
                        <div class="disc-label">Сознательный</div>
                    </div>
                </div>
            </div>
            
            <div class="feedback-section warning">
                <div class="feedback-title">💡 Персональные рекомендации</div>
                <ul class="recommendations-list">
                    <li class="recommendation-item">
                        <span class="recommendation-icon">🎯</span>
                        <span class="recommendation-text">Улучшите работу с S-клиентами: давайте им больше времени на принятие решений</span>
                    </li>
                    <li class="recommendation-item">
                        <span class="recommendation-icon">📈</span>
                        <span class="recommendation-text">Отличная работа с C-клиентами! Продолжайте предоставлять детальную информацию</span>
                    </li>
                    <li class="recommendation-item">
                        <span class="recommendation-icon">⚡</span>
                        <span class="recommendation-text">С D-клиентами говорите еще более конкретно и быстро</span>
                    </li>
                </ul>
            </div>
        `;
    }
    
    getPerformanceClass(accuracy) {
        if (accuracy >= 80) return 'excellent';
        if (accuracy >= 60) return 'good';
        return 'needs-work';
    }
    
    showInstantFeedback(choice, client, outcome) {
        if (typeof feedbackSystem !== 'undefined') {
            const analysis = feedbackSystem.analyzeChoice(choice, client, outcome);
            const feedback = analysis.feedback;
            
            document.getElementById('feedbackIcon').textContent = outcome.points >= 10 ? '🎯' : outcome.points >= 0 ? '👍' : '❌';
            document.getElementById('feedbackMessage').textContent = feedback.immediate;
            document.getElementById('feedbackExplanation').textContent = feedback.explanation.good || feedback.explanation.bad;
            document.getElementById('feedbackTip').textContent = feedback.improvement;
            
            document.getElementById('instantFeedback').style.display = 'block';
            
            setTimeout(() => {
                document.getElementById('instantFeedback').style.display = 'none';
            }, 4000);
        }
    }
}

// Глобальная переменная для доступа к игре
let game;

window.addEventListener('DOMContentLoaded', () => {
    game = new ModernSalesGame();
});