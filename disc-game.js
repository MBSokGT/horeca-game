// DISC мини-игра с расширенной базой клиентов
class DiscMiniGame {
    constructor() {
        this.score = 0;
        this.trustLevel = 50;
        this.currentClient = null;
        this.dialogStep = 0;
        this.maxDialogSteps = 6;
        this.clientsPlayed = new Set();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.getElementById('playDiscGame')?.addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('backFromDiscGame')?.addEventListener('click', () => {
            this.endGame();
        });
    }
    
    startGame() {
        document.getElementById('miniGamesMenu').style.display = 'none';
        document.getElementById('discGame').style.display = 'block';
        
        this.score = 0;
        this.trustLevel = 50;
        this.dialogStep = 0;
        
        this.currentClient = this.selectRandomClient();
        this.showClientContext();
        this.startDialog();
        this.updateUI();
    }
    
    selectRandomClient() {
        // Используем новый генератор
        if (typeof discGenerator !== 'undefined') {
            let client;
            let attempts = 0;
            
            // Пытаемся найти клиента, которого еще не играли
            do {
                client = discGenerator.getRandomClient();
                attempts++;
            } while (this.clientsPlayed.has(client.id) && attempts < 50 && this.clientsPlayed.size < 100);
            
            // Если все клиенты сыграны, сбрасываем историю
            if (this.clientsPlayed.size >= 100) {
                this.clientsPlayed.clear();
            }
            
            this.clientsPlayed.add(client.id);
            return client;
        }
        
        // Fallback на старую базу
        return allDiscClients[Math.floor(Math.random() * allDiscClients.length)];
    }
    
    showClientContext() {
        const client = this.currentClient;
        document.getElementById('contextText').innerHTML = `
            <strong>Клиент:</strong> ${client.name}<br>
            <strong>Тип заведения:</strong> ${client.horecaType}<br>
            <strong>Ситуация:</strong> ${client.scenario}<br>
            <strong>Черты:</strong> ${client.traits.join(', ')}<br>
            <small style="color: #666;">Клиент #${client.id} из ${typeof discGenerator !== 'undefined' ? discGenerator.getAllClients().length : 'базы'}</small>
        `;
    }
    
    startDialog() {
        document.getElementById('chatMessages').innerHTML = '';
        this.dialogStep = 0;
        this.showNextDialogStep();
    }
    
    showNextDialogStep() {
        if (this.dialogStep >= this.currentClient.dialog.length) {
            this.showDiscGuess();
            return;
        }
        
        const dialogData = this.currentClient.dialog[this.dialogStep];
        this.addMessage('client', dialogData.clientMessage);
        this.showPlayerOptions(dialogData.playerOptions);
    }
    
    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'client' ? '👤' : '👨💼';
        const name = sender === 'client' ? this.currentClient.name : 'Вы';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-name">${name}</div>
                <div class="message-text">${text}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    showPlayerOptions(options) {
        const actionsContainer = document.getElementById('actionButtons');
        actionsContainer.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = `action-btn ${option.type}`;
            button.textContent = option.text;
            
            // Цветовое кодирование кнопок
            if (option.type === 'optimal') {
                button.style.background = '#28a745';
            } else if (option.type === 'neutral') {
                button.style.background = '#ffc107';
                button.style.color = '#212529';
            } else if (option.type === 'bad') {
                button.style.background = '#dc3545';
            }
            
            button.addEventListener('click', () => {
                this.handlePlayerChoice(option);
            });
            
            actionsContainer.appendChild(button);
        });
    }
    
    handlePlayerChoice(option) {
        // Добавляем сообщение игрока
        this.addMessage('manager', option.text);
        
        // Добавляем реакцию клиента если есть
        if (option.clientResponse) {
            setTimeout(() => {
                this.addMessage('client', option.clientResponse);
            }, 1000);
        }
        
        // Обновляем очки и доверие
        this.score += option.points;
        
        if (option.type === 'optimal') {
            this.trustLevel = Math.min(100, this.trustLevel + 15);
        } else if (option.type === 'neutral') {
            this.trustLevel = Math.max(0, Math.min(100, this.trustLevel + 5));
        } else if (option.type === 'bad') {
            this.trustLevel = Math.max(0, this.trustLevel - 10);
        }
        
        // Очищаем кнопки
        document.getElementById('actionButtons').innerHTML = '';
        
        // Переходим к следующему шагу диалога
        setTimeout(() => {
            this.dialogStep++;
            this.showNextDialogStep();
            this.updateUI();
        }, option.clientResponse ? 2000 : 1000);
    }
    
    showDiscGuess() {
        document.getElementById('actionButtons').innerHTML = '';
        document.getElementById('discGuess').style.display = 'block';
        this.setupDiscButtons();
    }
    
    setupDiscButtons() {
        document.querySelectorAll('.disc-btn').forEach(btn => {
            btn.replaceWith(btn.cloneNode(true)); // Удаляем старые обработчики
        });
        
        document.querySelectorAll('.disc-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.makeGuess(e.target.dataset.type);
            });
        });
    }
    
    makeGuess(guessedType) {
        const isCorrect = guessedType === this.currentClient.discType;
        
        if (isCorrect) {
            this.score += 50;
            this.addMessage('system', `✅ Правильно! Клиент типа ${this.currentClient.discType}`);
        } else {
            this.score = Math.max(0, this.score - 20);
            this.addMessage('system', `❌ Неверно. Клиент типа ${this.currentClient.discType}`);
        }
        
        setTimeout(() => {
            this.showDetailedAnalysis();
        }, 1500);
        
        this.updateUI();
    }
    
    showDetailedAnalysis() {
        const client = this.currentClient;
        
        // Показываем ключевые сигналы
        const signalsText = `🔍 Ключевые сигналы: ${client.keySignals.join(', ')}`;
        this.addMessage('system', signalsText);
        
        setTimeout(() => {
            // Показываем красные флаги
            const redFlagsText = `🚩 Красные флаги: "${client.redFlags.join('", "')}"`;
            this.addMessage('system', redFlagsText);
            
            setTimeout(() => {
                // Показываем анализ типа
                const analysis = this.getDetailedAnalysis();
                this.addMessage('system', analysis);
                
                // Показываем кнопки для новой игры
                this.showGameEndButtons();
            }, 2000);
        }, 2000);
    }
    
    getDetailedAnalysis() {
        const typeAnalysis = {
            'D': 'Доминантный тип: Прямой, решительный, ориентирован на результат. Не любит детали, хочет быстрых решений. Ключевые слова: "быстро", "результат", "сколько стоит".',
            'I': 'Влиятельный тип: Общительный, эмоциональный, ориентирован на людей. Любит обсуждать, принимает импульсивные решения. Ключевые слова: "как дела", "что думают", "модно".',
            'S': 'Стабильный тип: Спокойный, осторожный, ценит надежность. Не любит перемен, принимает решения медленно. Ключевые слова: "подумать", "гарантии", "надежно".',
            'C': 'Сознательный тип: Аналитичный, точный, ориентирован на факты. Любит детали, тщательно анализирует. Ключевые слова: "характеристики", "документы", "сертификаты".'
        };
        
        return `📋 Анализ: ${typeAnalysis[this.currentClient.discType]}`;
    }
    
    showGameEndButtons() {
        const actionsContainer = document.getElementById('actionButtons');
        const playedCount = this.clientsPlayed.size;
        const totalClients = typeof discGenerator !== 'undefined' ? discGenerator.getAllClients().length : 100;
        
        actionsContainer.innerHTML = `
            <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 8px; text-align: center;">
                <strong>Прогресс:</strong> ${playedCount}/${totalClients} клиентов<br>
                <div style="width: 100%; height: 8px; background: #e9ecef; border-radius: 4px; margin-top: 5px;">
                    <div style="width: ${(playedCount/totalClients)*100}%; height: 100%; background: #28a745; border-radius: 4px;"></div>
                </div>
            </div>
            <button class="action-btn primary" onclick="discGame.startGame()">🔄 Новый клиент</button>
            <button class="action-btn" onclick="discGame.showStatistics()">📊 Статистика</button>
            <button class="action-btn" onclick="discGame.endGame()">🏠 В меню</button>
        `;
        
        document.getElementById('discGuess').style.display = 'none';
    }
    
    updateUI() {
        document.getElementById('discScore').textContent = this.score;
        document.getElementById('trustLevel').textContent = this.trustLevel;
    }
    
    showStatistics() {
        if (typeof discGenerator === 'undefined') return;
        
        const stats = discGenerator.getStatistics();
        const playedCount = this.clientsPlayed.size;
        
        const statsText = `
            📊 Статистика базы клиентов:
            
            Всего клиентов: ${stats.total}
            Сыграно: ${playedCount}
            
            По DISC типам:
            D (Доминантный): ${stats.byType.D || 0}
            I (Влиятельный): ${stats.byType.I || 0}
            S (Стабильный): ${stats.byType.S || 0}
            C (Сознательный): ${stats.byType.C || 0}
            
            По типам заведений:
            Ресторан: ${stats.byHorecaType['ресторан'] || 0}
            Бар: ${stats.byHorecaType['бар'] || 0}
            Кафе: ${stats.byHorecaType['кафе'] || 0}
            Кейтеринг: ${stats.byHorecaType['кейтеринг'] || 0}
        `;
        
        this.addMessage('system', statsText);
    }
    
    endGame() {
        document.getElementById('discGame').style.display = 'none';
        document.getElementById('miniGamesMenu').style.display = 'flex';
    }
}

let discGame;
window.addEventListener('DOMContentLoaded', () => {
    if (!discGame) discGame = new DiscMiniGame();
});