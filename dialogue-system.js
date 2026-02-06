// Система диалогов для тренинга продаж
class DialogueSystem {
    constructor() {
        this.currentDialogue = [];
        this.currentTurn = 0;
        this.clientType = null; // 'returning' или 'new'
        this.clientProfile = null;
        this.trustLevel = 50;
        this.gameScore = 0;
    }

    // Инициализация диалога с постоянным клиентом
    initReturningClientDialogue(clientProfile) {
        this.clientType = 'returning';
        this.clientProfile = clientProfile;
        this.currentDialogue = this.generateReturningClientDialogue(clientProfile);
        this.currentTurn = 0;
        return this.getCurrentTurn();
    }

    // Инициализация диалога с новым клиентом
    initNewClientDialogue() {
        this.clientType = 'new';
        this.clientProfile = null;
        this.currentDialogue = this.generateNewClientDialogue();
        this.currentTurn = 0;
        return this.getCurrentTurn();
    }

    // Получить текущий ход диалога
    getCurrentTurn() {
        if (this.currentTurn >= this.currentDialogue.length) {
            return null;
        }
        return this.currentDialogue[this.currentTurn];
    }

    // Перейти к следующему ходу
    nextTurn() {
        this.currentTurn++;
        return this.getCurrentTurn();
    }

    // Обработать выбор менеджера
    processManagerChoice(choiceIndex, customText = null) {
        const currentTurn = this.getCurrentTurn();
        if (!currentTurn || currentTurn.speaker !== 'MANAGER') {
            return null;
        }

        // Применить эффекты выбора
        if (currentTurn.choices && currentTurn.choices[choiceIndex]) {
            const choice = currentTurn.choices[choiceIndex];
            if (choice.trustChange) {
                this.trustLevel += choice.trustChange;
                this.trustLevel = Math.max(0, Math.min(100, this.trustLevel));
            }
            if (choice.scoreChange) {
                this.gameScore += choice.scoreChange;
            }
        }

        this.nextTurn();
        return this.getCurrentTurn();
    }

    // Генерация диалога для постоянного клиента
    generateReturningClientDialogue(profile) {
        const dialogues = {
            wine_bar: [
                {
                    speaker: "CLIENT",
                    intent: "greeting",
                    text: `Привет, ${profile.managerName || 'Мария'}. Есть пара минут? Нужно пополнить запасы красного.`,
                    tags: ["neutral"]
                },
                {
                    speaker: "MANAGER",
                    intent: "clarification",
                    choices: [
                        {
                            text: "Привет, Алекс. Повторяем последний заказ или ищем что-то новое в том же ценовом сегменте?",
                            trustChange: 5,
                            scoreChange: 10
                        },
                        {
                            text: "Конечно! У нас есть отличные новинки, которые точно понравятся вашим гостям!",
                            trustChange: -10,
                            scoreChange: -5
                        }
                    ],
                    tags: ["trust_building"]
                },
                {
                    speaker: "CLIENT",
                    intent: "clarification",
                    text: "Тот же сегмент, но хочу лучшую маржу на этот раз.",
                    tags: ["price_sensitive"]
                },
                {
                    speaker: "MANAGER",
                    intent: "value_framing",
                    choices: [
                        {
                            text: "Понял. Могу предложить два варианта с более высокой маржой и похожим вкусовым профилем. Приоритет цене или эксклюзивности?",
                            trustChange: 10,
                            scoreChange: 15
                        },
                        {
                            text: "Тогда давайте посмотрим на более дешевые позиции из нашего каталога.",
                            trustChange: -5,
                            scoreChange: 0
                        }
                    ],
                    tags: ["consultative"]
                },
                {
                    speaker: "CLIENT",
                    intent: "decision",
                    text: "Сначала маржа. Гости не заметят небольших различий.",
                    tags: ["pragmatic"]
                }
            ],
            restaurant: [
                {
                    speaker: "CLIENT",
                    intent: "greeting",
                    text: `Добрый день! Мне нужно срочно решить вопрос с поставками для ресторана.`,
                    tags: ["urgent"]
                },
                {
                    speaker: "MANAGER",
                    intent: "probing",
                    choices: [
                        {
                            text: "Что случилось? Расскажите подробнее о ситуации.",
                            trustChange: 5,
                            scoreChange: 10
                        },
                        {
                            text: "Не волнуйтесь, у нас есть все необходимое на складе!",
                            trustChange: -5,
                            scoreChange: -10
                        }
                    ],
                    tags: ["empathy"]
                }
            ]
        };

        return dialogues[profile.businessType] || dialogues.wine_bar;
    }

    // Генерация диалога для нового клиента
    generateNewClientDialogue() {
        return [
            {
                speaker: "CLIENT",
                intent: "greeting",
                text: "Здравствуйте. Ищу поставщика для своего ресторана.",
                tags: ["neutral"]
            },
            {
                speaker: "MANAGER",
                intent: "probing",
                choices: [
                    {
                        text: "Приятно познакомиться! Расскажите, какой у вас ресторан и какую роль играют напитки в вашей концепции?",
                        trustChange: 10,
                        scoreChange: 15
                    },
                    {
                        text: "Отлично! У нас есть специальные предложения для новых клиентов!",
                        trustChange: -10,
                        scoreChange: -15
                    },
                    {
                        text: "Какой у вас бюджет на закупки?",
                        trustChange: -5,
                        scoreChange: -10
                    }
                ],
                tags: ["discovery"]
            },
            {
                speaker: "CLIENT",
                intent: "disclosure",
                text: "Это демократичное итальянское заведение. Вино важно, но не хотим, чтобы оно пугало гостей.",
                tags: ["needs_revealed"]
            },
            {
                speaker: "MANAGER",
                intent: "probing",
                choices: [
                    {
                        text: "Понятно. Что для вас сейчас важнее — стабильность поставок или гибкость в меню?",
                        trustChange: 10,
                        scoreChange: 15
                    },
                    {
                        text: "Тогда вам нужны простые итальянские вина по доступным ценам.",
                        trustChange: -5,
                        scoreChange: -10
                    }
                ],
                tags: ["discovery"]
            },
            {
                speaker: "CLIENT",
                intent: "objection",
                text: "Стабильность. У нас уже были проблемы с этим раньше.",
                tags: ["trust_issue"]
            },
            {
                speaker: "MANAGER",
                intent: "objection_handling",
                choices: [
                    {
                        text: "Это частая проблема. Можете рассказать, что именно пошло не так с предыдущим поставщиком?",
                        trustChange: 15,
                        scoreChange: 20
                    },
                    {
                        text: "Не переживайте, мы очень надежная компания с многолетним опытом!",
                        trustChange: -10,
                        scoreChange: -15
                    }
                ],
                tags: ["empathy"]
            }
        ];
    }

    // Получить варианты ответов для менеджера
    getManagerChoices() {
        const currentTurn = this.getCurrentTurn();
        if (!currentTurn || currentTurn.speaker !== 'MANAGER' || !currentTurn.choices) {
            return [];
        }
        return currentTurn.choices.map((choice, index) => ({
            index,
            text: choice.text,
            preview: this.getChoicePreview(choice)
        }));
    }

    // Предварительный просмотр эффектов выбора
    getChoicePreview(choice) {
        let preview = [];
        if (choice.trustChange > 0) preview.push(`+${choice.trustChange} доверие`);
        if (choice.trustChange < 0) preview.push(`${choice.trustChange} доверие`);
        if (choice.scoreChange > 0) preview.push(`+${choice.scoreChange} очков`);
        if (choice.scoreChange < 0) preview.push(`${choice.scoreChange} очков`);
        return preview.join(', ');
    }

    // Получить статистику диалога
    getStats() {
        return {
            trustLevel: this.trustLevel,
            gameScore: this.gameScore,
            currentTurn: this.currentTurn,
            totalTurns: this.currentDialogue.length,
            clientType: this.clientType
        };
    }

    // Проверить завершение диалога
    isDialogueComplete() {
        return this.currentTurn >= this.currentDialogue.length;
    }

    // Получить результат диалога
    getDialogueResult() {
        let result = "neutral";
        let message = "";

        if (this.trustLevel >= 80 && this.gameScore >= 50) {
            result = "excellent";
            message = "Отличная работа! Клиент полностью доверяет вам и готов к сотрудничеству.";
        } else if (this.trustLevel >= 60 && this.gameScore >= 30) {
            result = "good";
            message = "Хорошая работа! Клиент заинтересован в продолжении разговора.";
        } else if (this.trustLevel >= 40) {
            result = "average";
            message = "Неплохо, но есть над чем работать. Клиент настроен нейтрально.";
        } else {
            result = "poor";
            message = "Диалог прошел неудачно. Клиент потерял интерес к сотрудничеству.";
        }

        return {
            result,
            message,
            trustLevel: this.trustLevel,
            gameScore: this.gameScore,
            feedback: this.generateFeedback()
        };
    }

    // Генерация обратной связи
    generateFeedback() {
        const feedback = [];

        if (this.trustLevel < 40) {
            feedback.push("💡 Совет: Больше слушайте клиента и задавайте открытые вопросы.");
        }
        if (this.gameScore < 20) {
            feedback.push("💡 Совет: Избегайте преждевременных предложений продуктов.");
        }
        if (this.clientType === 'new' && this.gameScore < 30) {
            feedback.push("💡 Совет: С новыми клиентами важно сначала выяснить их потребности.");
        }
        if (this.clientType === 'returning' && this.trustLevel < 60) {
            feedback.push("💡 Совет: С постоянными клиентами можно быть более прямолинейным.");
        }

        return feedback;
    }
}

// Экспорт для использования в игре
window.DialogueSystem = DialogueSystem;