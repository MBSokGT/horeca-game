// Система аутентификации
class AuthSystem {
    static USERS_KEY = 'horeca_users';
    static CURRENT_USER_KEY = 'horeca_current_user';
    static RECOVERY_CODES_KEY = 'horeca_recovery_codes';
    
    static register(email, password, name) {
        if (!this.isValidEmail(email)) {
            return { success: false, message: 'Неверный формат email' };
        }
        
        if (password.length < 6) {
            return { success: false, message: 'Пароль должен быть не менее 6 символов' };
        }
        
        if (!name || name.trim().length < 2) {
            return { success: false, message: 'Имя должно быть не менее 2 символов' };
        }
        
        const users = this.getUsers();
        if (users[email]) {
            return { success: false, message: 'Пользователь уже существует' };
        }
        
        users[email] = {
            email: email,
            name: name.trim(),
            password: this.hashPassword(password),
            registeredAt: Date.now(),
            gameData: null
        };
        
        this.saveUsers(users);
        return { success: true, message: 'Регистрация успешна' };
    }
    
    static login(email, password) {
        const users = this.getUsers();
        const user = users[email];
        
        if (!user || user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Неверный email или пароль' };
        }
        
        localStorage.setItem(this.CURRENT_USER_KEY, email);
        return { success: true, user: user };
    }
    
    static logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    }
    
    static getCurrentUser() {
        const email = localStorage.getItem(this.CURRENT_USER_KEY);
        if (!email) return null;
        
        const users = this.getUsers();
        return users[email] || null;
    }
    
    static sendRecoveryCode(email) {
        const users = this.getUsers();
        if (!users[email]) {
            return { success: false, message: 'Пользователь не найден' };
        }
        
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const recoveryCodes = this.getRecoveryCodes();
        recoveryCodes[email] = {
            code: code,
            expires: Date.now() + 10 * 60 * 1000 // 10 минут
        };
        
        this.saveRecoveryCodes(recoveryCodes);
        
        // Имитация отправки email
        alert(`Код восстановления: ${code}\\n(В реальной игре он был бы отправлен на email)`);
        
        return { success: true, message: 'Код отправлен на email' };
    }
    
    static resetPassword(email, code, newPassword) {
        const recoveryCodes = this.getRecoveryCodes();
        const recoveryData = recoveryCodes[email];
        
        if (!recoveryData || recoveryData.code !== code || Date.now() > recoveryData.expires) {
            return { success: false, message: 'Неверный или истекший код' };
        }
        
        if (newPassword.length < 6) {
            return { success: false, message: 'Пароль должен быть не менее 6 символов' };
        }
        
        const users = this.getUsers();
        users[email].password = this.hashPassword(newPassword);
        this.saveUsers(users);
        
        delete recoveryCodes[email];
        this.saveRecoveryCodes(recoveryCodes);
        
        return { success: true, message: 'Пароль успешно изменен' };
    }
    
    static saveGameData(gameData) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;
        
        const users = this.getUsers();
        const email = localStorage.getItem(this.CURRENT_USER_KEY);
        users[email].gameData = gameData;
        this.saveUsers(users);
        return true;
    }
    
    static loadGameData() {
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.gameData : null;
    }
    
    // Вспомогательные методы
    static getUsers() {
        try {
            return JSON.parse(localStorage.getItem(this.USERS_KEY) || '{}');
        } catch {
            return {};
        }
    }
    
    static saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
    
    static getRecoveryCodes() {
        try {
            return JSON.parse(localStorage.getItem(this.RECOVERY_CODES_KEY) || '{}');
        } catch {
            return {};
        }
    }
    
    static saveRecoveryCodes(codes) {
        localStorage.setItem(this.RECOVERY_CODES_KEY, JSON.stringify(codes));
    }
    
    static hashPassword(password) {
        // Простое хеширование для демо (в реальном приложении используйте bcrypt)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
    
    static isValidEmail(email) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    }
}