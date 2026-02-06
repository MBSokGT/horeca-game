// Интеграция диалоговой системы с игрой
class DialogueManager {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.dialogueSystem = new DialogueSystem();
        this.isActive = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Обработчик начала встречи с клиентом
        document.getElementById('startMeetingBtn')?.addEventListener('click', () => {
            this.startClientMeeting();
        });
    }

    // Начать встречу с клиентом
    startClientMeeting() {
        const client = this.game.gameState.currentClient;
        if (!client) return;

        // Скрыть карточку клиента
        document.getElementById('clientCard').style.display = 'none';

        // Определить тип клиента и начать диалог
        if (client.isReturning) {
            this.startReturningClientDialogue(client);
        } else {
            this.startNewClientDialogue();
        }
    }

    // Диалог с постоянным клиентом
    startReturningClientDialogue(client) {
        const profile = {
            name: client.name,
            businessType: client.type,
            managerName: this.game.player.name
        };

        const firstTurn = this.dialogueSystem.initReturningClientDialogue(profile);
        this.displayDialogueTurn(firstTurn);
        this.isActive = true;
    }

    // Диалог с новым клиентом
    startNewClientDialogue() {
        const firstTurn = this.dialogueSystem.initNewClientDialogue();
        this.displayDialogueTurn(firstTurn);
        this.isActive = true;
    }

    // Отобразить ход диалога
    displayDialogueTurn(turn) {
        if (!turn) {
            this.endDialogue();
            return;
        }

        const dialogBox = document.getElementById('dialogBox');
        const speakerAvatar = document.getElementById('speakerAvatar');
        const speakerName = document.getElementById('speakerName');
        const dialogText = document.getElementById('dialogText');
        const dialogActions = document.getElementById('dialogActions');

        // Настроить информацию о говорящем
        if (turn.speaker === 'CLIENT') {
            const client = this.game.gameState.currentClient;
            speakerAvatar.textContent = client.avatar;
            speakerName.textContent = client.name;
        } else {
            speakerAvatar.textContent = '👨💼';
            speakerName.textContent = this.game.player.name;
        }

        // Отобразить текст
        dialogText.textContent = turn.text;

        // Очистить действия
        dialogActions.innerHTML = '';

        // Если это ход менеджера с выборами
        if (turn.speaker === 'MANAGER' && turn.choices) {
            this.displayManagerChoices(turn.choices);
        } else {
            // Кнопка продолжения для реплик клиента
            const continueBtn = document.createElement('button');
            continueBtn.className = 'dialog-action';
            continueBtn.textContent = 'Продолжить';
            continueBtn.addEventListener('click', () => {
                this.nextDialogueTurn();
            });
            dialogActions.appendChild(continueBtn);
        }

        // Показать диалоговое окно
        dialogBox.style.display = 'block';

        // Обновить статистику
        this.updateDialogueStats();
    }

    // Отобразить варианты выбора для менеджера
    displayManagerChoices(choices) {
        const dialogActions = document.getElementById('dialogActions');

        choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('button');
            choiceBtn.className = 'dialog-action';
            choiceBtn.innerHTML = `
                <div class="choice-text">${choice.text}</div>
                <div class="choice-preview">${this.getChoicePreview(choice)}</div>
            `;
            
            choiceBtn.addEventListener('click', () => {
                this.selectManagerChoice(index);
            });
            
            dialogActions.appendChild(choiceBtn);
        });
    }

    // Получить предварительный просмотр выбора
    getChoicePreview(choice) {
        let preview = [];
        if (choice.trustChange > 0) preview.push(`<span class="positive">+${choice.trustChange} доверие</span>`);
        if (choice.trustChange < 0) preview.push(`<span class="negative">${choice.trustChange} доверие</span>`);
        if (choice.scoreChange > 0) preview.push(`<span class="positive">+${choice.scoreChange} очков</span>`);
        if (choice.scoreChange < 0) preview.push(`<span class="negative">${choice.scoreChange} очков</span>`);
        return preview.join(', ');
    }

    // Выбрать вариант менеджера
    selectManagerChoice(choiceIndex) {
        const nextTurn = this.dialogueSystem.processManagerChoice(choiceIndex);
        
        // Показать эффекты выбора
        this.showChoiceEffects();
        
        // Перейти к следующему ходу через небольшую задержку
        setTimeout(() => {
            this.displayDialogueTurn(nextTurn);
        }, 1000);
    }

    // Показать эффекты выбора
    showChoiceEffects() {
        const stats = this.dialogueSystem.getStats();
        
        // Создать всплывающее уведомление об изменениях
        const notification = document.createElement('div');
        notification.className = 'dialogue-notification';
        notification.innerHTML = `
            <div>Доверие: ${stats.trustLevel}%</div>
            <div>Очки: ${stats.gameScore}</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Следующий ход диалога
    nextDialogueTurn() {
        const nextTurn = this.dialogueSystem.nextTurn();
        this.displayDialogueTurn(nextTurn);
    }

    // Обновить статистику диалога
    updateDialogueStats() {
        const stats = this.dialogueSystem.getStats();
        
        // Обновить индикаторы доверия (если есть)
        const trustIndicator = document.getElementById('trustLevel');
        if (trustIndicator) {
            trustIndicator.textContent = stats.trustLevel;
        }
    }

    // Завершить диалог
    endDialogue() {
        this.isActive = false;
        const result = this.dialogueSystem.getDialogueResult();
        
        // Скрыть диалоговое окно
        document.getElementById('dialogBox').style.display = 'none';
        
        // Показать результат диалога
        this.showDialogueResult(result);
    }

    // Показать результат диалога
    showDialogueResult(result) {
        const dealResult = document.getElementById('dealResult');
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultText = document.getElementById('resultText');

        // Настроить иконку и заголовок
        const resultConfig = {
            excellent: { icon: '🎉', title: 'Отличная работа!' },
            good: { icon: '👍', title: 'Хорошая работа!' },
            average: { icon: '😐', title: 'Неплохо' },
            poor: { icon: '😞', title: 'Нужно поработать' }
        };

        const config = resultConfig[result.result] || resultConfig.average;
        resultIcon.textContent = config.icon;
        resultTitle.textContent = config.title;
        
        // Составить текст результата
        let resultTextContent = result.message + '\n\n';
        resultTextContent += `Доверие клиента: ${result.trustLevel}%\n`;
        resultTextContent += `Набрано очков: ${result.gameScore}\n\n`;
        
        if (result.feedback.length > 0) {
            resultTextContent += result.feedback.join('\n');
        }
        
        resultText.textContent = resultTextContent;

        // Показать результат
        dealResult.style.display = 'block';

        // Обновить игровую статистику
        this.updateGameStats(result);
    }

    // Обновить игровую статистику
    updateGameStats(result) {
        // Добавить очки к общему счету игрока
        this.game.player.reputation += Math.floor(result.trustLevel / 10);
        
        // Если диалог прошел успешно, можно перейти к каталогу
        if (result.result === 'excellent' || result.result === 'good') {
            // Разблокировать каталог или дать бонус
            this.game.gameState.gameModifiers.salesBonus *= 1.1;
        }
        
        this.game.updateUI();
    }

    // Проверить, активен ли диалог
    isDialogueActive() {
        return this.isActive;
    }
}

// Экспорт для использования в игре
window.DialogueManager = DialogueManager;