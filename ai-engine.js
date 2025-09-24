/**
 * Advanced AI Engine for Enhanced Character Recognition
 * Features: Machine Learning, Pattern Recognition, User Behavior Analysis
 */

class AdvancedAIEngine {
    constructor() {
        this.userPatterns = new Map(); // Track user behavior patterns
        this.characterPopularity = new Map(); // Track character popularity
        this.difficultyLevels = new Map(); // Dynamic difficulty adjustment
        this.learningMatrix = new Map(); // ML-like learning from user interactions
    }

    /**
     * Analyze user answering patterns to improve question selection
     */
    analyzeUserPattern(sessionId, answers) {
        if (!this.userPatterns.has(sessionId)) {
            this.userPatterns.set(sessionId, {
                answerSpeed: [],
                certaintyLevel: 0,
                preferredQuestionTypes: new Map(),
                difficultyPreference: 'medium'
            });
        }

        const pattern = this.userPatterns.get(sessionId);
        
        // Analyze answer certainty (Yes/No vs Maybe/Unknown)
        const certainAnswers = answers.filter(a => a.answer === 'yes' || a.answer === 'no').length;
        const uncertainAnswers = answers.filter(a => a.answer === 'maybe' || a.answer === 'unknown').length;
        
        pattern.certaintyLevel = certainAnswers / (certainAnswers + uncertainAnswers + 1);
        
        return pattern;
    }

    /**
     * Smart Question Selection using ML-inspired algorithm
     */
    selectOptimalQuestion(candidates, askedQuestions, userPattern, attributes) {
        // Calculate information gain for each potential question
        const questionScores = attributes
            .filter(attr => !askedQuestions.has(attr.id))
            .map(attr => {
                const score = this.calculateInformationGain(attr, candidates, userPattern);
                return { attribute: attr, score, priority: this.getQuestionPriority(attr, userPattern) };
            })
            .sort((a, b) => (b.score * b.priority) - (a.score * a.priority));

        return questionScores[0]?.attribute || null;
    }

    /**
     * Calculate information gain for a question (inspired by decision trees)
     */
    calculateInformationGain(attribute, candidates, userPattern) {
        if (candidates.length <= 1) return 0;

        // Count how many candidates have this attribute
        const withAttribute = candidates.filter(char => 
            char.attributes && char.attributes.includes(attribute.id)
        ).length;
        
        const withoutAttribute = candidates.length - withAttribute;
        
        // Calculate entropy-like measure
        const ratio = withAttribute / candidates.length;
        const entropy = ratio > 0 && ratio < 1 ? 
            -(ratio * Math.log2(ratio) + (1 - ratio) * Math.log2(1 - ratio)) : 0;
        
        // Boost score for balanced splits
        const balanceBonus = 1 - Math.abs(0.5 - ratio);
        
        return entropy * balanceBonus;
    }

    /**
     * Dynamic question priority based on user patterns
     */
    getQuestionPriority(attribute, userPattern) {
        let priority = 1.0;
        
        // Boost visual attributes for uncertain users
        if (userPattern.certaintyLevel < 0.5) {
            if (['hair_color', 'eye_color', 'appearance', 'gender'].includes(attribute.name.toLowerCase())) {
                priority *= 1.5;
            }
        }
        
        // Boost story/personality attributes for certain users
        if (userPattern.certaintyLevel > 0.7) {
            if (['personality', 'ability', 'role', 'goal'].includes(attribute.name.toLowerCase())) {
                priority *= 1.3;
            }
        }
        
        return priority;
    }

    /**
     * Advanced Character Scoring with Multiple Factors
     */
    calculateAdvancedScore(character, answers, userPattern) {
        let score = 1.0;
        let confidence = 1.0;
        
        for (const answerData of answers) {
            const hasAttribute = character.attributes && 
                character.attributes.includes(answerData.attributeId);
            
            switch (answerData.answer) {
                case 'yes':
                    if (hasAttribute) {
                        score *= 1.5; // Strong positive
                        confidence *= 1.1;
                    } else {
                        score *= 0.2; // Strong negative
                        confidence *= 1.2;
                    }
                    break;
                    
                case 'no':
                    if (!hasAttribute) {
                        score *= 1.3; // Positive confirmation
                        confidence *= 1.1;
                    } else {
                        score *= 0.3; // Negative confirmation
                        confidence *= 1.2;
                    }
                    break;
                    
                case 'maybe':
                    if (hasAttribute) {
                        score *= 1.2; // Slight boost
                    } else {
                        score *= 0.9; // Slight penalty
                    }
                    confidence *= 0.95; // Reduce confidence
                    break;
                    
                case 'unknown':
                    score *= 0.95; // Small penalty
                    confidence *= 0.9; // Reduce confidence more
                    break;
            }
        }
        
        // Apply popularity boost for well-known characters
        const popularityBonus = this.getCharacterPopularity(character.id);
        score *= (1 + popularityBonus * 0.1);
        
        // Apply user pattern adjustments
        if (userPattern.certaintyLevel > 0.8 && confidence > 1.5) {
            score *= 1.1; // Boost for confident users with high confidence answers
        }
        
        return { score, confidence };
    }

    /**
     * Get character popularity based on previous games
     */
    getCharacterPopularity(characterId) {
        return this.characterPopularity.get(characterId) || 0;
    }

    /**
     * Update character popularity when guessed correctly
     */
    updateCharacterPopularity(characterId, wasGuessedCorrectly) {
        const current = this.characterPopularity.get(characterId) || 0;
        if (wasGuessedCorrectly) {
            this.characterPopularity.set(characterId, Math.min(current + 0.1, 2.0));
        }
    }

    /**
     * Machine Learning-inspired pattern recognition
     */
    learnFromUserInteraction(sessionId, character, wasCorrect, answers) {
        // Create learning vector
        const learningKey = `${character.id}_pattern`;
        
        if (!this.learningMatrix.has(learningKey)) {
            this.learningMatrix.set(learningKey, {
                successRate: 0,
                commonPatterns: new Map(),
                averageQuestions: 0,
                totalAttempts: 0
            });
        }
        
        const learning = this.learningMatrix.get(learningKey);
        learning.totalAttempts++;
        
        if (wasCorrect) {
            learning.successRate = (learning.successRate * (learning.totalAttempts - 1) + 1) / learning.totalAttempts;
            learning.averageQuestions = (learning.averageQuestions * (learning.totalAttempts - 1) + answers.length) / learning.totalAttempts;
        } else {
            learning.successRate = (learning.successRate * (learning.totalAttempts - 1)) / learning.totalAttempts;
        }
        
        // Store successful answer patterns
        if (wasCorrect && answers.length > 0) {
            const patternKey = answers.map(a => `${a.attributeId}:${a.answer}`).join('|');
            const current = learning.commonPatterns.get(patternKey) || 0;
            learning.commonPatterns.set(patternKey, current + 1);
        }
    }

    /**
     * Predict optimal question count based on character difficulty
     */
    predictOptimalQuestions(character, userPattern) {
        const learningKey = `${character.id}_pattern`;
        const learning = this.learningMatrix.get(learningKey);
        
        if (learning && learning.totalAttempts > 3) {
            // Use learned data
            return Math.ceil(learning.averageQuestions * (2 - userPattern.certaintyLevel));
        }
        
        // Default prediction based on character complexity
        let baseQuestions = 8;
        
        // Adjust based on attribute count
        if (character.attributes) {
            if (character.attributes.length > 12) baseQuestions += 2;
            if (character.attributes.length < 6) baseQuestions -= 1;
        }
        
        // Adjust based on user certainty
        if (userPattern.certaintyLevel < 0.4) baseQuestions += 3;
        if (userPattern.certaintyLevel > 0.8) baseQuestions -= 2;
        
        return Math.max(5, Math.min(baseQuestions, 15));
    }

    /**
     * Generate AI insights and recommendations
     */
    generateGameInsights(sessionId, character, answers, wasCorrect) {
        const userPattern = this.userPatterns.get(sessionId);
        const insights = {
            playerStyle: this.determinePlayerStyle(userPattern),
            difficultyLevel: this.calculateDifficultyLevel(answers, wasCorrect),
            recommendations: [],
            aiConfidence: this.calculateAIConfidence(answers, character)
        };
        
        // Generate personalized recommendations
        if (userPattern.certaintyLevel < 0.5) {
            insights.recommendations.push("Try characters you know very well to improve accuracy!");
        }
        
        if (answers.length > 12) {
            insights.recommendations.push("This was a challenging character - great job sticking with it!");
        }
        
        return insights;
    }

    /**
     * Determine player style for personalization
     */
    determinePlayerStyle(userPattern) {
        if (!userPattern) return 'balanced';
        
        if (userPattern.certaintyLevel > 0.8) return 'confident';
        if (userPattern.certaintyLevel < 0.4) return 'cautious';
        return 'balanced';
    }

    /**
     * Calculate AI confidence in its guess
     */
    calculateAIConfidence(answers, character) {
        const positiveAnswers = answers.filter(a => a.answer === 'yes').length;
        const totalAnswers = answers.length;
        
        if (totalAnswers === 0) return 0.5;
        
        const confidence = Math.min(0.95, (positiveAnswers / totalAnswers) * 0.8 + 0.2);
        return Math.round(confidence * 100);
    }

    /**
     * Calculate dynamic difficulty level
     */
    calculateDifficultyLevel(answers, wasCorrect) {
        const questionCount = answers.length;
        const uncertainAnswers = answers.filter(a => a.answer === 'maybe' || a.answer === 'unknown').length;
        
        let difficulty = 'medium';
        
        if (questionCount <= 5 && wasCorrect) difficulty = 'easy';
        else if (questionCount >= 12 || uncertainAnswers > 5) difficulty = 'hard';
        else if (questionCount >= 8) difficulty = 'medium-hard';
        
        return difficulty;
    }

    /**
     * Get performance analytics
     */
    getAnalytics() {
        return {
            totalSessions: this.userPatterns.size,
            popularCharacters: Array.from(this.characterPopularity.entries())
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10),
            learningData: this.learningMatrix.size,
            averageQuestions: this.calculateAverageQuestions()
        };
    }

    /**
     * Calculate average questions across all sessions
     */
    calculateAverageQuestions() {
        let total = 0;
        let count = 0;
        
        for (const [, learning] of this.learningMatrix) {
            if (learning.averageQuestions > 0) {
                total += learning.averageQuestions;
                count++;
            }
        }
        
        return count > 0 ? Math.round(total / count) : 8;
    }
}

module.exports = AdvancedAIEngine;