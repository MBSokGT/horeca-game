# 🎨 Шпаргалка: Создание персонажей и фонов

## Инструменты для AI-генерации

### 1. Leonardo.AI (РЕКОМЕНДУЮ)
- **Ссылка:** https://leonardo.ai
- **Бесплатно:** 15 кредитов/день (150 изображений/день)
- **Качество:** Отличное для игровых персонажей
- **Скорость:** 10-30 секунд

### 2. Stable Diffusion Online
- **Ссылка:** https://stablediffusionweb.com
- **Бесплатно:** Да, без лимитов
- **Качество:** Среднее-высокое
- **Скорость:** 20-60 секунд

### 3. Bing Image Creator
- **Ссылка:** https://www.bing.com/create
- **Бесплатно:** 100 изображений/день
- **Качество:** Хорошее (DALL-E 3)
- **Скорость:** 30-60 секунд

---

## Промпты для персонажей

### Менеджер (главный герой)

```
professional sales manager avatar, male, 30 years old,
business casual attire, friendly confident smile,
flat design illustration style, simple solid color background,
front view portrait, clean lines, PNG transparent background,
suitable for visual novel game character
```

**Эмоции:**
1. **Neutral:** "calm professional expression"
2. **Happy:** "bright smile, positive energy"
3. **Concerned:** "worried expression, thoughtful"

### Клиент D-типа (Доминантный)

```
confident business executive, male, 45 years old,
expensive dark suit, arms crossed, stern serious expression,
flat design illustration style, simple background,
front view portrait, authoritative pose,
suitable for visual novel game character
```

**Эмоции:**
1. **Neutral:** "serious business expression"
2. **Happy:** "slight satisfied smirk"
3. **Angry:** "frustrated impatient look"

### Клиент I-типа (Влиятельный)

```
cheerful restaurant owner, female, 35 years old,
colorful casual elegant clothing, wide friendly smile,
flat design illustration style, simple background,
front view portrait, warm welcoming pose,
suitable for visual novel game character
```

**Эмоции:**
1. **Neutral:** "friendly smile"
2. **Happy:** "excited joyful expression"
3. **Sad:** "disappointed pouty face"

### Клиент S-типа (Стабильный)

```
calm reliable cafe owner, male, 50 years old,
comfortable casual wear, gentle patient smile,
flat design illustration style, simple background,
front view portrait, relaxed trustworthy pose,
suitable for visual novel game character
```

**Эмоции:**
1. **Neutral:** "calm kind expression"
2. **Happy:** "warm genuine smile"
3. **Concerned:** "worried caring look"

### Клиент C-типа (Сознательный)

```
analytical hotel manager, female, 40 years old,
professional formal attire, glasses, focused expression,
flat design illustration style, simple background,
front view portrait, precise detailed pose,
suitable for visual novel game character
```

**Эмоции:**
1. **Neutral:** "analytical thoughtful expression"
2. **Happy:** "satisfied professional smile"
3. **Confused:** "skeptical questioning look"

---

## Промпты для фонов

### Офис менеджера

```
modern office interior, clean professional style,
large window with city view, desk with laptop,
daytime natural lighting, minimalist design,
suitable for visual novel background,
wide angle view, no people,
high quality illustration style
```

### Кафе (встреча с клиентом)

```
cozy coffee shop interior, modern design,
wooden tables, warm lighting, coffee bar in background,
comfortable atmosphere, plants decoration,
suitable for visual novel background,
wide angle view, no people,
high quality illustration style
```

### Ресторан (зал клиента)

```
elegant restaurant interior, fine dining atmosphere,
set tables with white tablecloths, modern design,
soft warm lighting, professional kitchen view,
suitable for visual novel background,
wide angle view, no people,
high quality illustration style
```

### Склад оборудования

```
professional warehouse interior, organized storage,
stainless steel equipment, clean industrial style,
bright overhead lighting, shelving with supplies,
suitable for visual novel background,
wide angle view, no people,
high quality illustration style
```

---

## Пошаговая инструкция

### ШАГ 1: Регистрация на leonardo.ai

1. Зайдите на https://leonardo.ai
2. Нажмите "Sign Up" (Google аккаунт работает)
3. Подтвердите email
4. У вас есть 15 кредитов = 150 изображений

### ШАГ 2: Генерация персонажа

1. Нажмите "AI Image Generation"
2. Вставьте промпт (например, для менеджера)
3. Настройки:
   - **Model:** Leonardo Phoenix (лучший для персонажей)
   - **Image Dimensions:** 832×1216 (портрет)
   - **Number of Images:** 4
   - **Prompt Magic:** ON
4. Нажмите "Generate"
5. Ждите 20-30 секунд

### ШАГ 3: Выбор и скачивание

1. Выберите лучший вариант из 4
2. Нажмите на изображение → "Download"
3. Сохраните как `manager_neutral.png`

### ШАГ 4: Повторите для эмоций

Измените промпт:
```
[тот же промпт] + ", bright smile, happy expression"
```
Сохраните как `manager_happy.png`

```
[тот же промпт] + ", worried expression, concerned"
```
Сохраните как `manager_concerned.png`

### ШАГ 5: Структура файлов

```
/images/
  /characters/
    manager_neutral.png
    manager_happy.png
    manager_concerned.png
    client_d_neutral.png
    client_d_happy.png
    client_d_angry.png
    client_i_neutral.png
    client_i_happy.png
    client_i_sad.png
    client_s_neutral.png
    client_s_happy.png
    client_s_concerned.png
    client_c_neutral.png
    client_c_happy.png
    client_c_confused.png
    
  /backgrounds/
    office.png
    cafe.png
    restaurant.png
    warehouse.png
```

---

## Интеграция в код

После создания всех изображений, обновите код:

```javascript
// В improved-game-integration.js

getClientSprite(client) {
    const sprites = {
        cafe: "url('images/characters/client_i_neutral.png')",
        restaurant: "url('images/characters/client_d_neutral.png')",
        hotel: "url('images/characters/client_c_neutral.png')",
        canteen: "url('images/characters/client_s_neutral.png')"
    };
    
    return sprites[client.businessType];
}

// Для фонов
updateLocationBackground() {
    const backgrounds = {
        cafe: "url('images/backgrounds/cafe.png')",
        restaurant: "url('images/backgrounds/restaurant.png')",
        hotel: "url('images/backgrounds/office.png')",
        canteen: "url('images/backgrounds/warehouse.png')"
    };
    
    const locationBg = document.getElementById('locationBg');
    locationBg.style.backgroundImage = backgrounds[this.gameState.currentClient.businessType];
}
```

---

## Советы по дизайну

### DO ✅
- Используйте **простые фоны** (однотонные или с gradientом)
- Персонажи смотрят **прямо в камеру**
- **Консистентный стиль** для всех персонажей
- **Четкие контуры** для видимости на любом фоне
- **Хорошее освещение** на лицах

### DON'T ❌
- Не делайте слишком детальные фоны персонажей
- Не используйте реалистичный стиль (фото-реализм плох для игр)
- Не делайте персонажей в профиль или 3/4
- Не используйте темные цвета для всего
- Не забывайте про эмоции

---

## Альтернатива: Pixel Art

Если хотите ретро-стиль:

### Инструмент: Piskel
- **Ссылка:** https://www.piskelapp.com
- **Размер:** 64×64 пикселя
- **Цвета:** 8-16 цветов
- **Время:** 15-30 минут на персонажа

### Пример персонажа:
```
1. Основа: прямоугольник (тело)
2. Голова: квадрат + круг
3. Лицо: 2 точки (глаза) + линия (рот)
4. Детали: костюм, галстук, волосы
5. Экспорт: PNG с прозрачностью
```

---

## Временные затраты

**План минимум (1-2 часа):**
- 5 персонажей × 1 эмоция = 5 изображений
- 2 фона
- Итого: ~7 генераций × 5 минут = 35 минут

**План оптимум (3-4 часа):**
- 5 персонажей × 3 эмоции = 15 изображений
- 4 фона
- Итого: ~19 генераций × 10 минут = 3 часа

**План максимум (1 день):**
- 7 персонажей × 5 эмоций = 35 изображений
- 6 фонов
- Кастомная обработка в Photoshop
- Итого: 6-8 часов работы

---

## Чеклист готовности

- [ ] Создан аккаунт на leonardo.ai
- [ ] Сгенерирован менеджер (3 эмоции)
- [ ] Сгенерированы 4 типа клиентов (по 3 эмоции)
- [ ] Созданы 4 фона локаций
- [ ] Все файлы в папке `/images/`
- [ ] Код обновлен с путями к изображениям
- [ ] Протестирована загрузка в игре

---

**Готово! Можете начинать создавать визуал** 🎨

Если застрянете - пишите промпт, который не работает, и я помогу его улучшить!
