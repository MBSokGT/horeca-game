// Система достижений
const achievements = {
    first_sale: {
        id: 'first_sale',
        name: 'Первая сделка',
        description: 'Заключите первую сделку',
        icon: '💰',
        condition: (stats) => stats.totalDeals >= 1,
        reward: { reputation: 5 }
    },
    big_deal: {
        id: 'big_deal', 
        name: 'Крупная сделка',
        description: 'Заключите сделку на 100,000₽',
        icon: '💎',
        condition: (stats) => stats.biggestDeal >= 100000,
        reward: { reputation: 10 }
    },
    sales_master: {
        id: 'sales_master',
        name: 'Мастер продаж',
        description: 'Достигните 500,000₽ продаж',
        icon: '🏆',
        condition: (stats) => stats.totalSales >= 500000,
        reward: { reputation: 15 }
    },
    perfect_day: {
        id: 'perfect_day',
        name: 'Идеальный день',
        description: 'Заключите 5 сделок за день',
        icon: '⭐',
        condition: (stats) => stats.dealsInDay >= 5,
        reward: { reputation: 8 }
    },
    client_whisperer: {
        id: 'client_whisperer',
        name: 'Заклинатель клиентов',
        description: 'Достигните 90% удовлетворенности',
        icon: '🎭',
        condition: (stats) => stats.bestSatisfaction >= 90,
        reward: { reputation: 12 }
    }
};

// Система навыков
const playerSkills = {
    negotiation: {
        name: 'Переговоры',
        description: 'Улучшает шансы на скидку',
        maxLevel: 5,
        effect: (level) => ({ discountChance: level * 0.1 })
    },
    product_knowledge: {
        name: 'Знание товара',
        description: 'Лучше отвечает на вопросы клиентов',
        maxLevel: 5,
        effect: (level) => ({ questionBonus: level * 5 })
    },
    charisma: {
        name: 'Харизма',
        description: 'Улучшает первое впечатление',
        maxLevel: 5,
        effect: (level) => ({ moodBonus: level * 3 })
    },
    efficiency: {
        name: 'Эффективность',
        description: 'Больше клиентов за день',
        maxLevel: 3,
        effect: (level) => ({ clientsPerDay: level })
    }
};

function checkAchievements(game) {
    const stats = {
        totalDeals: game.player.totalDeals || 0,
        totalSales: game.player.sales,
        biggestDeal: game.player.biggestDeal || 0,
        dealsInDay: game.player.dealsToday || 0,
        bestSatisfaction: game.player.bestSatisfaction || 0
    };

    for (const achievement of Object.values(achievements)) {
        if (!game.player.achievements?.includes(achievement.id) && achievement.condition(stats)) {
            unlockAchievement(game, achievement);
        }
    }
}

function unlockAchievement(game, achievement) {
    if (!game.player.achievements) game.player.achievements = [];
    game.player.achievements.push(achievement.id);
    
    if (achievement.reward.reputation) {
        game.player.reputation += achievement.reward.reputation;
    }
    
    showAchievementPopup(achievement);
}

function showAchievementPopup(achievement) {
    document.getElementById('achievementIcon').textContent = achievement.icon;
    document.getElementById('achievementText').textContent = `${achievement.name}: ${achievement.description}`;
    document.getElementById('achievementPopup').style.display = 'block';
}

function levelUpSkill(game, skillId) {
    if (!game.player.skills) game.player.skills = {};
    if (!game.player.skills[skillId]) game.player.skills[skillId] = 0;
    
    const skill = playerSkills[skillId];
    if (game.player.skills[skillId] < skill.maxLevel) {
        game.player.skills[skillId]++;
        return true;
    }
    return false;
}

function getSkillEffect(game, skillId) {
    const skillLevel = game.player.skills?.[skillId] || 0;
    return playerSkills[skillId]?.effect(skillLevel) || {};
}