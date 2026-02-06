// Система обратной связи и аналитики для премиальной игры
class PremiumFeedbackSystem {
    constructor() {
        this.sessionData = {
            startTime: Date.now(),
            interactions: [],
            mistakes: [],
            strengths: [],
            recommendations: []
        };
    }

    // Записываем каждое взаимодействие
    recordInteraction(type, data) {
        this.sessionData.interactions.push({
            timestamp: Date.now(),
            type: type,
            data: data,
            context: this.getCurrentContext()
        });
    }

    // Анализируем ошибки в реальном времени
    analyzeChoice(choice, client, outcome) {
        const analysis = {
            choice: choice,
            clientType: client.discType,
            outcome: outcome,
            feedback: this.generateDetailedFeedback(choice, client, outcome)
        };

        if (outcome.points < 0) {
            this.sessionData.mistakes.push(analysis);
        } else if (outcome.points > 10) {
            this.sessionData.strengths.push(analysis);
        }

        return analysis;
    }

    generateDetailedFeedback(choice, client, outcome) {
        const feedback = {
            immediate: this.getImmediateFeedback(choice, client, outcome),
            explanation: this.getDetailedExplanation(choice, client),
            improvement: this.getImprovementTip(choice, client),
            discInsight: this.getDiscInsight(client)
        };

        return feedback;
    }

    getImmediateFeedback(choice, client, outcome) {
        if (outcome.points >= 15) {
            return "🎯 Отличный выбор! Вы точно попали в потребности клиента.";
        } else if (outcome.points >= 5) {
            return "👍 Неплохо, но можно было выбрать более эффективный подход.";
        } else if (outcome.points >= 0) {
            return "⚠️ Нейтральный ответ. Клиент не впечатлен.";
        } else {
            return "❌ Неудачный выбор. Клиент разочарован вашим подходом.";
        }
    }

    getDetailedExplanation(choice, client) {
        const explanations = {
            'D': {
                good: "D-клиенты ценят прямоту, скорость и результат. Ваш ответ был конкретным и деловым.",
                bad: "D-клиенты не любят долгие разговоры и детали. Им нужны быстрые решения."
            },
            'I': {
                good: "I-клиенты любят общение и эмоции. Ваш ответ был дружелюбным и вовлекающим.",
                bad: "I-клиенты хотят чувствовать связь. Сухие факты их не мотивируют."
            },
            'S': {
                good: "S-клиенты ценят стабильность и надежность. Ваш ответ вызвал доверие.",
                bad: "S-клиенты осторожны. Давление и спешка их отталкивают."
            },
            'C': {
                good: "C-клиенты любят детали и факты. Ваш ответ был информативным и точным.",
                bad: "C-клиенты не доверяют общим словам. Им нужны конкретные данные."
            }
        };

        return explanations[client.discType];
    }

    getImprovementTip(choice, client) {
        const tips = {
            'D': "💡 Совет: С D-клиентами говорите о результатах, экономии времени и конкурентных преимуществах.",
            'I': "💡 Совет: С I-клиентами делитесь историями успеха, показывайте популярность продукта.",
            'S': "💡 Совет: С S-клиентами подчеркивайте надежность, гарантии и поддержку.",
            'C': "💡 Совет: С C-клиентами предоставляйте детальную информацию, сравнения и доказательства."
        };

        return tips[client.discType];
    }

    getDiscInsight(client) {
        const insights = {
            'D': "🔍 DISC-анализ: Доминантный тип фокусируется на власти и результатах. Ключевые слова: 'быстро', 'эффективно', 'результат'.",
            'I': "🔍 DISC-анализ: Влиятельный тип ориентирован на людей и признание. Ключевые слова: 'популярно', 'все говорят', 'модно'.",
            'S': "🔍 DISC-анализ: Стабильный тип ценит безопасность и постоянство. Ключевые слова: 'надежно', 'проверено', 'гарантия'.",
            'C': "🔍 DISC-анализ: Сознательный тип требует точности и качества. Ключевые слова: 'детали', 'характеристики', 'сертификаты'."
        };

        return insights[client.discType];
    }

    // Генерируем персональные рекомендации
    generatePersonalizedRecommendations() {
        const recommendations = [];
        
        // Анализ по типам DISC
        const discStats = this.analyzeDiscPerformance();
        Object.keys(discStats).forEach(type => {
            if (discStats[type].accuracy < 70) {
                recommendations.push({
                    type: 'disc_improvement',
                    discType: type,
                    message: `Рекомендуем изучить особенности работы с ${type}-клиентами. Точность: ${discStats[type].accuracy}%`
                });
            }
        });

        // Анализ частых ошибок
        const commonMistakes = this.findCommonMistakes();
        commonMistakes.forEach(mistake => {
            recommendations.push({
                type: 'mistake_pattern',
                pattern: mistake.pattern,
                message: mistake.recommendation
            });
        });

        return recommendations;
    }

    analyzeDiscPerformance() {
        const stats = { D: {correct: 0, total: 0}, I: {correct: 0, total: 0}, S: {correct: 0, total: 0}, C: {correct: 0, total: 0} };
        
        this.sessionData.interactions.forEach(interaction => {
            if (interaction.type === 'dialog_choice') {
                const discType = interaction.data.clientType;
                stats[discType].total++;
                if (interaction.data.outcome.points > 5) {
                    stats[discType].correct++;
                }
            }
        });

        Object.keys(stats).forEach(type => {
            stats[type].accuracy = stats[type].total > 0 ? 
                Math.round((stats[type].correct / stats[type].total) * 100) : 0;
        });

        return stats;
    }

    findCommonMistakes() {
        const mistakes = [];
        const patterns = {};

        this.sessionData.mistakes.forEach(mistake => {
            const key = `${mistake.clientType}_${mistake.choice.type}`;
            patterns[key] = (patterns[key] || 0) + 1;
        });

        Object.keys(patterns).forEach(pattern => {
            if (patterns[pattern] >= 2) {
                mistakes.push({
                    pattern: pattern,
                    count: patterns[pattern],
                    recommendation: this.getPatternRecommendation(pattern)
                });
            }
        });

        return mistakes;
    }

    getPatternRecommendation(pattern) {
        const recommendations = {
            'D_slow': 'Избегайте медленных подходов с D-клиентами. Они ценят скорость.',
            'I_formal': 'Не будьте слишком формальными с I-клиентами. Они любят дружелюбие.',
            'S_pressure': 'Не давите на S-клиентов. Дайте им время подумать.',
            'C_vague': 'Избегайте общих фраз с C-клиентами. Будьте конкретными.'
        };

        return recommendations[pattern] || 'Обратите внимание на этот паттерн ошибок.';
    }

    getCurrentContext() {
        return {
            screen: game?.currentScreen || 'unknown',
            day: game?.gameState?.currentDay || 0,
            sales: game?.player?.sales || 0
        };
    }

    // Экспорт данных для анализа
    exportSessionData() {
        return {
            ...this.sessionData,
            duration: Date.now() - this.sessionData.startTime,
            summary: this.generateSessionSummary()
        };
    }

    generateSessionSummary() {
        return {
            totalInteractions: this.sessionData.interactions.length,
            successRate: this.calculateSuccessRate(),
            strongestDiscType: this.getStrongestDiscType(),
            weakestDiscType: this.getWeakestDiscType(),
            recommendations: this.generatePersonalizedRecommendations()
        };
    }

    calculateSuccessRate() {
        const successful = this.sessionData.interactions.filter(i => 
            i.type === 'dialog_choice' && i.data.outcome.points > 5
        ).length;
        
        const total = this.sessionData.interactions.filter(i => 
            i.type === 'dialog_choice'
        ).length;

        return total > 0 ? Math.round((successful / total) * 100) : 0;
    }

    getStrongestDiscType() {
        const performance = this.analyzeDiscPerformance();
        let strongest = 'D';
        let highestAccuracy = 0;

        Object.keys(performance).forEach(type => {
            if (performance[type].accuracy > highestAccuracy) {
                highestAccuracy = performance[type].accuracy;
                strongest = type;
            }
        });

        return { type: strongest, accuracy: highestAccuracy };
    }

    getWeakestDiscType() {
        const performance = this.analyzeDiscPerformance();
        let weakest = 'D';
        let lowestAccuracy = 100;

        Object.keys(performance).forEach(type => {
            if (performance[type].total > 0 && performance[type].accuracy < lowestAccuracy) {
                lowestAccuracy = performance[type].accuracy;
                weakest = type;
            }
        });

        return { type: weakest, accuracy: lowestAccuracy };
    }
}

// Глобальная система обратной связи
let feedbackSystem;

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
    feedbackSystem = new PremiumFeedbackSystem();
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PremiumFeedbackSystem };
}