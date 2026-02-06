const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'users.json');
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

app.use(express.json());
app.use(express.static(__dirname));

// Инициализация БД
if (!fs.existsSync(DB_FILE)) {
    const initialData = {
        users: [{
            id: 1,
            username: 'admin',
            email: 'admin@horeca.com',
            fullName: 'Главный Администратор',
            department: 'IT',
            password: crypto.createHash('sha256').update('admin123').digest('hex'),
            role: 'god',
            resetToken: null,
            score: 0,
            bookmarks: [],
            createdAt: new Date().toISOString()
        }]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify({ products: [] }, null, 2));
}

const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// Регистрация
app.post('/api/register', (req, res) => {
    const { username, email, fullName, department, password } = req.body;
    const db = readDB();
    
    if (db.users.find(u => u.username === username || u.email === email)) {
        return res.status(400).json({ error: 'Пользователь уже существует' });
    }
    
    const user = {
        id: Date.now(),
        username,
        email,
        fullName,
        department,
        password: crypto.createHash('sha256').update(password).digest('hex'),
        role: 'user',
        resetToken: null,
        score: 0,
        bookmarks: [],
        createdAt: new Date().toISOString()
    };
    
    db.users.push(user);
    writeDB(db);
    res.json({ success: true, userId: user.id });
});

// Вход
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    const user = db.users.find(u => u.username === username && u.password === hashedPassword);
    
    if (!user) {
        return res.status(401).json({ error: 'Неверные данные' });
    }
    
    res.json({ 
        success: true, 
        user: { 
            id: user.id, 
            username: user.username, 
            fullName: user.fullName,
            role: user.role,
            bookmarks: user.bookmarks || []
        } 
    });
});

// Восстановление пароля
app.post('/api/reset-password', (req, res) => {
    const { email } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.email === email);
    
    if (!user) {
        return res.status(404).json({ error: 'Email не найден' });
    }
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    writeDB(db);
    
    console.log(`Токен восстановления для ${email}: ${resetToken}`);
    res.json({ success: true, message: 'Токен отправлен (см. консоль сервера)' });
});

// Смена пароля по токену
app.post('/api/change-password', (req, res) => {
    const { token, newPassword } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.resetToken === token);
    
    if (!user) {
        return res.status(400).json({ error: 'Неверный токен' });
    }
    
    user.password = crypto.createHash('sha256').update(newPassword).digest('hex');
    user.resetToken = null;
    writeDB(db);
    res.json({ success: true });
});

// Админ: список всех пользователей
app.get('/api/admin/users', (req, res) => {
    const db = readDB();
    const users = db.users.map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        fullName: u.fullName,
        department: u.department,
        role: u.role,
        score: u.score,
        createdAt: u.createdAt
    }));
    res.json({ total: users.length, users });
});

// Удаление пользователя (только для god)
app.delete('/api/admin/users/:id', (req, res) => {
    const { userId } = req.body;
    const db = readDB();
    const admin = db.users.find(u => u.id === userId);
    
    if (!admin || admin.role !== 'god') {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }
    
    const targetId = parseInt(req.params.id);
    db.users = db.users.filter(u => u.id !== targetId);
    writeDB(db);
    res.json({ success: true });
});

// Назначение соадмина (только для god)
app.post('/api/admin/promote', (req, res) => {
    const { userId, targetUserId } = req.body;
    const db = readDB();
    const admin = db.users.find(u => u.id === userId);
    
    if (!admin || admin.role !== 'god') {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }
    
    const target = db.users.find(u => u.id === targetUserId);
    if (!target) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    target.role = 'god';
    writeDB(db);
    res.json({ success: true });
});

// Добавление новинки (только для god)
app.post('/api/products', (req, res) => {
    const { userId, name, description, category, price, image } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    
    if (!user || user.role !== 'god') {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }
    
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    const product = {
        id: Date.now(),
        name,
        description,
        category,
        price,
        image,
        createdAt: new Date().toISOString()
    };
    
    products.products.push(product);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.json({ success: true, product });
});

// Получение всех новинок
app.get('/api/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    res.json(products);
});

// Удаление новинки (только для god)
app.delete('/api/products/:id', (req, res) => {
    const { userId } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    
    if (!user || user.role !== 'god') {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }
    
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    const productId = parseInt(req.params.id);
    products.products = products.products.filter(p => p.id !== productId);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.json({ success: true });
});

// Добавление в закладки
app.post('/api/bookmarks', (req, res) => {
    const { userId, productId } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    if (!user.bookmarks) user.bookmarks = [];
    if (!user.bookmarks.includes(productId)) {
        user.bookmarks.push(productId);
        writeDB(db);
    }
    res.json({ success: true, bookmarks: user.bookmarks });
});

// Удаление из закладок
app.delete('/api/bookmarks/:productId', (req, res) => {
    const { userId } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    const productId = parseInt(req.params.productId);
    user.bookmarks = (user.bookmarks || []).filter(id => id !== productId);
    writeDB(db);
    res.json({ success: true, bookmarks: user.bookmarks });
});

// Сохранение результата игры
app.post('/api/save-score', (req, res) => {
    const { userId, score } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    
    if (user) {
        user.score = Math.max(user.score, score);
        writeDB(db);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Пользователь не найден' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log(`Вход: http://localhost:${PORT}/login.html`);
    console.log(`Приложение: http://localhost:${PORT}/app.html`);
});