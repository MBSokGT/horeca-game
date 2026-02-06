class HorecaGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.players = [
            { position: 0, score: 0, name: 'Игрок 1', color: '#8b1538' },
            { position: 0, score: 0, name: 'Игрок 2', color: '#1e88e5' }
        ];
        this.currentPlayer = 0;
        this.numPlayers = 1;
        this.cellSize = 70;
        this.boardSize = 10;
        this.gameStarted = false;
        
        // Специальные клетки: лестницы и змеи
        this.ladders = {
            3: 22, 5: 8, 11: 26, 20: 42
        };
        this.snakes = {
            16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78
        };
        
        // Клетки с заданиями
        this.taskCells = [4, 7, 12, 16, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 71, 75, 79, 83, 87, 91, 95];
        
        this.currentTask = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showGameSetup();
    }
    
    setupEventListeners() {
        document.getElementById('startGame').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('rollDice').addEventListener('click', () => {
            this.rollDice();
        });
        
        document.getElementById('submitAnswer').addEventListener('click', () => {
            this.submitAnswer();
        });
        
        document.getElementById('answerInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
    }
    
    showGameSetup() {
        document.getElementById('gameSetup').style.display = 'block';
        document.getElementById('gameContent').style.display = 'none';
    }
    
    startGame() {
        const selectedPlayers = document.querySelector('input[name="players"]:checked').value;
        this.numPlayers = parseInt(selectedPlayers);
        
        if (this.numPlayers === 1) {
            document.getElementById('player2').style.display = 'none';
        }
        
        document.getElementById('gameSetup').style.display = 'none';
        document.getElementById('gameContent').style.display = 'block';
        
        this.gameStarted = true;
        this.drawBoard();
        this.drawPlayers();
        this.updateUI();
    }
    
    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const positions = this.getBoardPositions();
        
        positions.forEach((pos, index) => {
            let cellColor = '#f8f9fa';
            
            if (index === 0) cellColor = '#28a745'; // Старт
            else if (index === 99) cellColor = '#ffd700'; // Финиш
            else if (this.ladders[index]) cellColor = '#20c997'; // Лестница
            else if (this.snakes[index]) cellColor = '#dc3545'; // Змея
            else if (this.taskCells.includes(index)) cellColor = '#ffc107'; // Задание
            
            this.ctx.fillStyle = cellColor;
            this.ctx.fillRect(pos.x, pos.y, this.cellSize, this.cellSize);
            
            this.ctx.strokeStyle = '#495057';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(pos.x, pos.y, this.cellSize, this.cellSize);
            
            // Номер клетки
            this.ctx.fillStyle = '#000';
            this.ctx.font = 'bold 12px Inter';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(index + 1, pos.x + this.cellSize/2, pos.y + 15);
            
            // Символы для специальных клеток
            if (this.ladders[index]) {
                this.ctx.fillText('🪜', pos.x + this.cellSize/2, pos.y + this.cellSize - 10);
            } else if (this.snakes[index]) {
                this.ctx.fillText('🐍', pos.x + this.cellSize/2, pos.y + this.cellSize - 10);
            } else if (this.taskCells.includes(index)) {
                this.ctx.fillText('❓', pos.x + this.cellSize/2, pos.y + this.cellSize - 10);
            }
        });
    }
    
    getBoardPositions() {
        const positions = [];
        const margin = 15;
        const cols = 10;
        const rows = 10;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x, y;
                
                if (row % 2 === 0) {
                    // Четные строки: слева направо
                    x = margin + col * this.cellSize;
                } else {
                    // Нечетные строки: справа налево
                    x = margin + (cols - 1 - col) * this.cellSize;
                }
                
                y = this.canvas.height - margin - (row + 1) * this.cellSize;
                
                positions.push({ x, y });
            }
        }
        
        return positions;
    }
    
    drawPlayers() {
        const positions = this.getBoardPositions();
        
        this.players.slice(0, this.numPlayers).forEach((player, index) => {
            const pos = positions[player.position];
            const offsetX = index * 20 - 10;
            
            this.ctx.fillStyle = player.color;
            this.ctx.beginPath();
            this.ctx.arc(pos.x + this.cellSize/2 + offsetX, pos.y + this.cellSize/2, 12, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }
    
    rollDice() {
        if (this.currentTask) return;
        
        const diceValue = Math.floor(Math.random() * 6) + 1;
        document.getElementById('diceValue').textContent = diceValue;
        
        this.movePlayer(diceValue);
    }
    
    movePlayer(steps) {
        const player = this.players[this.currentPlayer];
        const newPosition = Math.min(player.position + steps, 99);
        
        player.position = newPosition;
        
        // Проверяем лестницы и змеи
        if (this.ladders[newPosition]) {
            player.position = this.ladders[newPosition];
            this.showMessage(`Лестница! Поднимаемся на клетку ${this.ladders[newPosition] + 1}`);
        } else if (this.snakes[newPosition]) {
            player.position = this.snakes[newPosition];
            this.showMessage(`Змея! Спускаемся на клетку ${this.snakes[newPosition] + 1}`);
        }
        
        // Проверяем задания
        if (this.taskCells.includes(newPosition)) {
            this.showTask();
        } else {
            this.nextPlayer();
        }
        
        this.drawBoard();
        this.drawPlayers();
        this.updateUI();
        
        if (player.position === 99) {
            setTimeout(() => {
                alert(`${player.name} победил!`);
            }, 500);
        }
    }
    
    showTask() {
        this.currentTask = getRandomTask();
        document.getElementById('taskQuestion').textContent = this.currentTask.question;
        document.getElementById('answerInput').value = '';
        document.getElementById('taskPanel').style.display = 'block';
        document.getElementById('answerInput').focus();
    }
    
    submitAnswer() {
        const userAnswer = document.getElementById('answerInput').value;
        const isCorrect = checkAnswer(userAnswer, this.currentTask.answer);
        
        if (isCorrect) {
            this.players[this.currentPlayer].score += this.currentTask.points;
            this.showMessage(`Правильно! +${this.currentTask.points} очков`);
        } else {
            this.showMessage(`Неправильно. Правильный ответ: ${this.currentTask.answer}`);
        }
        
        document.getElementById('taskPanel').style.display = 'none';
        this.currentTask = null;
        this.nextPlayer();
        this.updateUI();
    }
    
    nextPlayer() {
        if (this.numPlayers > 1) {
            this.currentPlayer = (this.currentPlayer + 1) % this.numPlayers;
        }
    }
    
    showMessage(message) {
        document.getElementById('cellDescription').textContent = message;
    }
    
    updateUI() {
        document.getElementById('currentPlayer').textContent = this.players[this.currentPlayer].name;
        document.getElementById('score1').textContent = this.players[0].score;
        
        if (this.numPlayers > 1) {
            document.getElementById('score2').textContent = this.players[1].score;
        }
        
        // Обновляем активного игрока
        document.querySelectorAll('.player').forEach((el, index) => {
            el.classList.toggle('active', index === this.currentPlayer && this.numPlayers > 1);
        });
        
        const currentPos = this.players[this.currentPlayer].position + 1;
        document.getElementById('currentCell').textContent = `Клетка ${currentPos}`;
    }
}

// Запуск игры
window.addEventListener('DOMContentLoaded', () => {
    new HorecaGame();
});