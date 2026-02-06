// ===== УЛУЧШЕННАЯ МЕХАНИКА ИГРЫ =====

// 1. СИСТЕМА TYPEWRITER ЭФФЕКТА ДЛЯ ДИАЛОГОВ
class TypewriterEffect {
    constructor() {
        this.isTyping = false;
        this.currentInterval = null;
    }

    type(element, text, speed = 30, callback = null) {
        if (this.isTyping) {
            this.stop();
        }

        this.isTyping = true;
        element.textContent = '';
        let charIndex = 0;

        this.currentInterval = setInterval(() => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                
                // Звуковой эффект печати (опционально)
                this.playTypeSound();
            } else {
                this.stop();
                if (callback) callback();
            }
        }, speed);
    }

    stop() {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = null;
        }
        this.isTyping = false;
    }

    playTypeSound() {
        // Заглушка для звука печати
        // Позже добавите реальный аудио-файл
    }

    skipToEnd(element, fullText) {
        this.stop();
        element.textContent = fullText;
    }
}

// 2. УЛУЧШЕННАЯ ГЕНЕРАЦИЯ КЛИЕНТОВ С DISC
class EnhancedClientGenerator {
    constructor() {
        this.discProfiles = {
            D: { // Доминантный
                traits: ['прямолинейный', 'целеустремленный', 'требовательный'],
                greetingStyle: 'краткий и деловой',
                budgetModifier: 1.2,
                patienceLevel: 0.3, // Быстро теряет терпение
                decisionSpeed: 'fast',
                keywords: ['быстро', 'результат', 'эффективность', 'сразу к делу']
            },
            I: { // Влиятельный
                traits: ['общительный', 'оптимистичный', 'эмоциональный'],
                greetingStyle: 'дружелюбный и развернутый',
                budgetModifier: 1.1,
                patienceLevel: 0.7,
                decisionSpeed: 'medium',
                keywords: ['интересно', 'круто', 'команда', 'впечатление']
            },
            S: { // Стабильный
                traits: ['терпеливый', 'надежный', 'осторожный'],
                greetingStyle: 'вежливый и сдержанный',
                budgetModifier: 0.9,
                patienceLevel: 0.9,
                decisionSpeed: 'slow',
                keywords: ['надежность', 'стабильность', 'проверенный', 'гарантия']
            },
            C: { // Сознательный
                traits: ['аналитичный', 'детальный', 'перфекционист'],
                greetingStyle: 'формальный с деталями',
                budgetModifier: 1.0,
                patienceLevel: 0.5,
                decisionSpeed: 'slow',
                keywords: ['характеристики', 'данные', 'спецификация', 'точность']
            }
        };
    }

    generate() {
        const types = ['cafe', 'restaurant', 'hotel', 'canteen'];
        const discTypes = ['D', 'I', 'S', 'C'];
        
        const businessType = types[Math.floor(Math.random() * types.length)];
        const discType = discTypes[Math.floor(Math.random() * discTypes.length)];
        const profile = this.discProfiles[discType];
        
        const baseInfo = clientTypes[businessType];
        const name = clientNames[Math.floor(Math.random() * clientNames.length)];
        
        const baseBudget = Math.floor(
            Math.random() * (baseInfo.budgetRange[1] - baseInfo.budgetRange[0]) + 
            baseInfo.budgetRange[0]
        );
        
        const budget = Math.floor(baseBudget * profile.budgetModifier);
        
        return {
            name,
            businessType,
            avatar: baseInfo.avatar,
            budget,
            needs: baseInfo.needs,
            
            // DISC профиль
            discType,
            discProfile: profile,
            traits: profile.traits[Math.floor(Math.random() * profile.traits.length)],
            patienceLevel: profile.patienceLevel,
            currentPatience: 100,
            
            // Динамические параметры
            satisfaction: 50,
            trustLevel: 50,
            questionsAsked: 0,
            maxQuestions: discType === 'D' ? 3 : discType === 'I' ? 5 : 7,
            
            // Предпочтения
            priorities: this.generatePriorities(discType),
            dealBreakers: this.generateDealBreakers(discType)
        };
    }

    generatePriorities(discType) {
        const priorityMap = {
            D: ['скорость поставки', 'эффективность', 'результат'],
            I: ['уникальность', 'впечатление', 'тренды'],
            S: ['надежность', 'гарантия', 'стабильность'],
            C: ['качество', 'характеристики', 'точность']
        };
        
        return priorityMap[discType];
    }

    generateDealBreakers(discType) {
        const dealBreakerMap = {
            D: ['медленное обслуживание', 'избыточная информация', 'неуверенность'],
            I: ['скучное предложение', 'формальность', 'отсутствие энтузиазма'],
            S: ['давление', 'риски', 'ненадежность'],
            C: ['неточность', 'отсутствие данных', 'поверхностность']
        };
        
        return dealBreakerMap[discType];
    }

    generateGreeting(client) {
        const greetingTemplates = {
            D: [
                `Мне нужно ${client.needs.toLowerCase()}. Бюджет ${this.formatMoney(client.budget)}. Что предложите?`,
                `Времени мало. ${client.businessType === 'cafe' ? 'Кафе' : 'Ресторан'} открывается через неделю. Показывайте лучшее.`,
                `Давайте сразу к делу. Нужно оборудование на ${this.formatMoney(client.budget)}. Что есть?`
            ],
            I: [
                `Привет! Я ${client.name}, открываю ${client.businessType === 'cafe' ? 'классное кафе' : 'ресторан'}! Помоги подобрать что-то крутое!`,
                `Здорово! Слышал, у вас потрясающий каталог! Мне нужно вау-эффект для моего заведения!`,
                `Рад познакомиться! Ищу оборудование, которое впечатлит гостей. Бюджет гибкий!`
            ],
            S: [
                `Здравствуйте. Я ${client.name}. Ищу надежного поставщика оборудования для ${client.businessType === 'cafe' ? 'кафе' : 'ресторана'}.`,
                `Добрый день. Мне посоветовали вашу компанию как надежную. Хотел бы обсудить возможности сотрудничества.`,
                `Приветствую. Нужно качественное оборудование с хорошей гарантией. Можем обсудить?`
            ],
            C: [
                `Здравствуйте. ${client.name}, ${client.businessType}. Нужна детальная информация о характеристиках оборудования.`,
                `Добрый день. Изучил ваш каталог. Есть вопросы по спецификациям. Можно обсудить?`,
                `Приветствую. Требуется ${client.needs.toLowerCase()}. Бюджет ${this.formatMoney(client.budget)}. Нужны технические данные.`
            ]
        };
        
        const templates = greetingTemplates[client.discType];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    formatMoney(amount) {
        return new Intl.NumberFormat('ru-RU').format(amount) + '₽';
    }
}

// 3. СИСТЕМА ОЦЕНКИ КАЧЕСТВА ВОПРОСОВ МЕНЕДЖЕРА
class QuestionAnalyzer {
    constructor() {
        this.questionTypes = {
            open: { // Открытые вопросы
                patterns: ['расскажите', 'опишите', 'как вы', 'что для вас', 'какие у вас'],
                scoreBonus: 15,
                trustBonus: 10,
                patienceImpact: -5
            },
            closed: { // Закрытые вопросы
                patterns: ['да или нет', 'это так', 'вам нужно', 'хотите ли'],
                scoreBonus: 5,
                trustBonus: -5,
                patienceImpact: -10
            },
            leading: { // Наводящие (плохо)
                patterns: ['согласитесь', 'очевидно что', 'все знают', 'конечно же'],
                scoreBonus: -10,
                trustBonus: -15,
                patienceImpact: -20
            },
            clarifying: { // Уточняющие (хорошо)
                patterns: ['правильно ли я понял', 'то есть вы', 'если я правильно', 'уточните'],
                scoreBonus: 12,
                trustBonus: 15,
                patienceImpact: -3
            }
        };
    }

    analyze(question, client) {
        const lowerQuestion = question.toLowerCase();
        let questionType = 'neutral';
        let feedback = {
            score: 0,
            trust: 0,
            patience: 0,
            message: '',
            quality: 'neutral'
        };

        // Определяем тип вопроса
        for (let [type, data] of Object.entries(this.questionTypes)) {
            if (data.patterns.some(pattern => lowerQuestion.includes(pattern))) {
                questionType = type;
                feedback.score = data.scoreBonus;
                feedback.trust = data.trustBonus;
                feedback.patience = data.patienceImpact;
                break;
            }
        }

        // Адаптируем под DISC тип клиента
        feedback = this.adaptToDisc(feedback, questionType, client);

        // Генерируем сообщение обратной связи
        feedback.message = this.generateFeedback(questionType, client);
        feedback.quality = feedback.score > 10 ? 'good' : feedback.score < 0 ? 'poor' : 'neutral';

        return feedback;
    }

    adaptToDisc(feedback, questionType, client) {
        switch(client.discType) {
            case 'D':
                if (questionType === 'open') {
                    feedback.patience -= 10; // D не любит длинные разговоры
                    feedback.message = '⚠️ Доминантный клиент ценит краткость';
                }
                if (questionType === 'closed') {
                    feedback.score += 5; // D любит конкретику
                }
                break;
                
            case 'I':
                if (questionType === 'open') {
                    feedback.trust += 5; // I любит поговорить
                }
                break;
                
            case 'S':
                if (questionType === 'leading') {
                    feedback.trust -= 10; // S не любит давление
                }
                break;
                
            case 'C':
                if (questionType === 'open' && !feedback.message.includes('характеристик')) {
                    feedback.score -= 5; // C хочет фактов, не эмоций
                }
                break;
        }

        return feedback;
    }

    generateFeedback(questionType, client) {
        const feedbackMap = {
            open: {
                D: '⚡ Доминантный клиент не любит долгих разговоров',
                I: '✅ Влиятельный клиент рад поговорить!',
                S: '✅ Стабильный клиент ценит внимание',
                C: '⚠️ Сознательный клиент ждет конкретики'
            },
            closed: {
                D: '✅ Доминантный клиент любит четкость',
                I: '⚠️ Влиятельному клиенту это скучно',
                S: '➡️ Нейтрально для стабильного клиента',
                C: '➡️ Годится, но нужны детали'
            },
            leading: {
                D: '⚠️ Давление не работает на доминантных',
                I: '❌ Влиятельный клиент чувствует манипуляцию',
                S: '❌ Стабильный клиент не любит давление',
                C: '❌ Сознательный клиент видит логическую ошибку'
            },
            clarifying: {
                D: '✅ Доминантный клиент ценит ясность',
                I: '✅ Влиятельный клиент чувствует заботу',
                S: '✅ Стабильный клиент доверяет больше',
                C: '✅ Сознательный клиент уважает точность'
            }
        };

        return feedbackMap[questionType]?.[client.discType] || 'Нейтральный вопрос';
    }
}

// 4. ДИНАМИЧЕСКАЯ СИСТЕМА ТЕРПЕНИЯ КЛИЕНТА
class PatienceSystem {
    constructor() {
        this.patienceDecayRate = {
            D: 8,  // Быстро теряет терпение
            I: 3,  // Терпелив если интересно
            S: 2,  // Очень терпелив
            C: 5   // Средне терпелив
        };
    }

    update(client, action) {
        const decayRate = this.patienceDecayRate[client.discType];
        
        // Базовое снижение терпения за каждый вопрос
        client.currentPatience -= decayRate;

        // Бонусы/штрафы в зависимости от действий
        if (action.type === 'good_question') {
            client.currentPatience += 5;
        } else if (action.type === 'bad_question') {
            client.currentPatience -= 15;
        } else if (action.type === 'showed_catalog') {
            client.currentPatience += 10; // Клиент рад видеть товары
        } else if (action.type === 'irrelevant_product') {
            client.currentPatience -= 20;
        }

        // Границы
        client.currentPatience = Math.max(0, Math.min(100, client.currentPatience));

        return this.getPatienceStatus(client);
    }

    getPatienceStatus(client) {
        if (client.currentPatience > 70) {
            return { status: 'patient', message: '', color: 'green' };
        } else if (client.currentPatience > 40) {
            return { status: 'neutral', message: `${client.name} начинает поглядывать на часы`, color: 'yellow' };
        } else if (client.currentPatience > 20) {
            return { status: 'impatient', message: `${client.name} выглядит нетерпеливо`, color: 'orange' };
        } else {
            return { status: 'leaving', message: `${client.name}: "Извините, у меня мало времени. Пожалуй, посмотрю у других."`, color: 'red' };
        }
    }
}

// 5. УМНАЯ СИСТЕМА ПОДБОРА ОБОРУДОВАНИЯ
class SmartEquipmentMatcher {
    constructor() {
        this.matchingAlgorithm = {
            budget: 0.4,      // 40% веса на соответствие бюджету
            needs: 0.3,       // 30% на соответствие потребностям
            priorities: 0.2,  // 20% на приоритеты клиента
            disc: 0.1         // 10% на DISC предпочтения
        };
    }

    calculateMatch(equipment, client) {
        let matchScore = 0;

        // 1. Соответствие бюджету
        const budgetRatio = equipment.price / client.budget;
        if (budgetRatio <= 0.3) matchScore += this.matchingAlgorithm.budget * 100; // Очень дешево
        else if (budgetRatio <= 0.5) matchScore += this.matchingAlgorithm.budget * 80; // Доступно
        else if (budgetRatio <= 0.8) matchScore += this.matchingAlgorithm.budget * 60; // Норм
        else if (budgetRatio <= 1.0) matchScore += this.matchingAlgorithm.budget * 40; // На грани
        else matchScore += this.matchingAlgorithm.budget * 10; // Дорого

        // 2. Соответствие типу бизнеса
        if (equipment.category && equipment.category.includes(client.businessType)) {
            matchScore += this.matchingAlgorithm.needs * 100;
        } else {
            matchScore += this.matchingAlgorithm.needs * 50;
        }

        // 3. Соответствие приоритетам
        const priorityMatch = this.checkPriorities(equipment, client.priorities);
        matchScore += this.matchingAlgorithm.priorities * priorityMatch;

        // 4. DISC адаптация
        const discBonus = this.getDiscBonus(equipment, client.discType);
        matchScore += this.matchingAlgorithm.disc * discBonus;

        return Math.round(matchScore);
    }

    checkPriorities(equipment, priorities) {
        let score = 0;
        priorities.forEach(priority => {
            if (equipment.tags && equipment.tags.includes(priority)) {
                score += 33;
            }
        });
        return Math.min(score, 100);
    }

    getDiscBonus(equipment, discType) {
        const discPreferences = {
            D: ['быстрая доставка', 'эффективность', 'топ модель'],
            I: ['дизайн', 'трендовость', 'уникальность'],
            S: ['надежность', 'гарантия', 'проверенный бренд'],
            C: ['точность', 'спецификации', 'сертификация']
        };

        const preferences = discPreferences[discType];
        let bonus = 0;

        preferences.forEach(pref => {
            if (equipment.tags && equipment.tags.includes(pref)) {
                bonus += 33;
            }
        });

        return Math.min(bonus, 100);
    }

    getSuggestions(equipmentList, client, count = 5) {
        const scored = equipmentList.map(item => ({
            ...item,
            matchScore: this.calculateMatch(item, client)
        }));

        return scored
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, count);
    }
}

// 6. СИСТЕМА ОБРАТНОЙ СВЯЗИ В РЕАЛЬНОМ ВРЕМЕНИ
class InstantFeedbackSystem {
    constructor() {
        this.feedbackElement = null;
    }

    init() {
        this.feedbackElement = document.getElementById('instantFeedback');
    }

    show(type, message, explanation, tip = null) {
        if (!this.feedbackElement) return;

        const icons = {
            excellent: '🎯',
            good: '✅',
            neutral: '➡️',
            poor: '⚠️',
            bad: '❌'
        };

        document.getElementById('feedbackIcon').textContent = icons[type] || '💡';
        document.getElementById('feedbackMessage').textContent = message;
        document.getElementById('feedbackExplanation').textContent = explanation;
        
        if (tip) {
            document.getElementById('feedbackTip').textContent = '💡 ' + tip;
            document.getElementById('feedbackTip').style.display = 'block';
        } else {
            document.getElementById('feedbackTip').style.display = 'none';
        }

        this.feedbackElement.style.display = 'flex';
        this.feedbackElement.className = `instant-feedback ${type}`;
    }

    hide() {
        if (this.feedbackElement) {
            this.feedbackElement.style.display = 'none';
        }
    }
}

// 7. ТУТОРИАЛ СИСТЕМА
class TutorialSystem {
    constructor() {
        this.steps = [
            {
                target: '#dialogBox',
                title: 'Диалог с клиентом',
                message: 'Здесь отображается общение с клиентом. Внимательно слушайте его потребности!',
                position: 'top'
            },
            {
                target: '#clientChar',
                title: 'Тип клиента',
                message: 'Обращайте внимание на поведение клиента - это подскажет его DISC тип',
                position: 'bottom'
            },
            {
                target: '#openCatalogBtn',
                title: 'Каталог товаров',
                message: 'Когда поймете потребности - откройте каталог и подберите оборудование',
                position: 'top'
            },
            {
                target: '#salesAmount',
                title: 'Ваши продажи',
                message: 'Отслеживайте прогресс. Цель - выполнить план продаж за месяц!',
                position: 'bottom'
            }
        ];
        
        this.currentStep = 0;
        this.isActive = false;
    }

    start() {
        this.currentStep = 0;
        this.isActive = true;
        this.showStep(0);
    }

    showStep(index) {
        if (index >= this.steps.length) {
            this.end();
            return;
        }

        const step = this.steps[index];
        const targetElement = document.querySelector(step.target);
        
        if (!targetElement) {
            this.next();
            return;
        }

        // Создаем overlay
        this.createOverlay(targetElement, step);
    }

    createOverlay(target, step) {
        // Удаляем предыдущий overlay если есть
        const existingOverlay = document.getElementById('tutorialOverlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.id = 'tutorialOverlay';
        overlay.className = 'tutorial-overlay';
        
        const tooltip = document.createElement('div');
        tooltip.className = `tutorial-tooltip ${step.position}`;
        tooltip.innerHTML = `
            <h3>${step.title}</h3>
            <p>${step.message}</p>
            <div class="tutorial-controls">
                <button onclick="game.tutorial.skip()">Пропустить</button>
                <button class="primary" onclick="game.tutorial.next()">Далее (${this.currentStep + 1}/${this.steps.length})</button>
            </div>
        `;

        // Позиционируем tooltip
        const rect = target.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        
        if (step.position === 'top') {
            tooltip.style.top = (rect.top - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.transform = 'translate(-50%, -100%)';
        } else if (step.position === 'bottom') {
            tooltip.style.top = (rect.bottom + 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.transform = 'translate(-50%, 0)';
        }

        // Highlight целевого элемента
        target.style.position = 'relative';
        target.style.zIndex = '10001';
        target.classList.add('tutorial-highlight');

        overlay.appendChild(tooltip);
        document.body.appendChild(overlay);
    }

    next() {
        this.clearHighlight();
        this.currentStep++;
        this.showStep(this.currentStep);
    }

    skip() {
        this.clearHighlight();
        this.end();
    }

    end() {
        this.isActive = false;
        const overlay = document.getElementById('tutorialOverlay');
        if (overlay) {
            overlay.remove();
        }
        this.clearHighlight();
        
        // Сохраняем что туториал пройден
        localStorage.setItem('tutorialCompleted', 'true');
    }

    clearHighlight() {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
            el.style.zIndex = '';
        });
    }
}

// ЭКСПОРТ
window.TypewriterEffect = TypewriterEffect;
window.EnhancedClientGenerator = EnhancedClientGenerator;
window.QuestionAnalyzer = QuestionAnalyzer;
window.PatienceSystem = PatienceSystem;
window.SmartEquipmentMatcher = SmartEquipmentMatcher;
window.InstantFeedbackSystem = InstantFeedbackSystem;
window.TutorialSystem = TutorialSystem;
