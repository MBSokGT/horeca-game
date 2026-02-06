class SimpleGame {
    constructor() {
        this.init();
    }
    
    init() {
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('mainMenu').style.display = 'flex';
        }, 2000);
        
        document.getElementById('startSingleGame')?.addEventListener('click', () => {
            this.startGame();
        });
    }
    
    startGame() {
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        
        // Простая инициализация
        document.getElementById('dayNumber').textContent = '1';
        document.getElementById('salesAmount').textContent = '0';
        document.getElementById('progressFill').style.width = '0%';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new SimpleGame();
});