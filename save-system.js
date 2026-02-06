// Система сохранения прогресса
class SaveSystem {
    static SAVE_KEY = 'horeca_game_save';
    
    static saveGame(gameData) {
        try {
            const saveData = {
                player: gameData.player,
                gameState: gameData.gameState,
                timestamp: Date.now(),
                version: '1.0'
            };
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
            return true;
        } catch (e) {
            console.error('Ошибка сохранения:', e);
            return false;
        }
    }
    
    static loadGame() {
        try {
            const saveData = localStorage.getItem(this.SAVE_KEY);
            if (!saveData) return null;
            
            const parsed = JSON.parse(saveData);
            if (parsed.version !== '1.0') return null;
            
            return parsed;
        } catch (e) {
            console.error('Ошибка загрузки:', e);
            return null;
        }
    }
    
    static hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    }
    
    static deleteSave() {
        localStorage.removeItem(this.SAVE_KEY);
    }
}

// Автосохранение каждые 30 секунд
let autoSaveInterval;

function startAutoSave(game) {
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    
    autoSaveInterval = setInterval(() => {
        SaveSystem.saveGame({
            player: game.player,
            gameState: game.gameState
        });
    }, 30000);
}

function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
}