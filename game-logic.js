const Database = require('./database');

class GameLogic {
  constructor() {
    this.db = new Database();
    this.sessions = new Map(); // In-memory session storage
    this.sessionTimeout = parseInt(process.env.SESSION_TIMEOUT) || 3600000; // 1 hour
  }

  // Create new game session
  async createSession(sessionId) {
    try {
      const characters = await this.db.getAllCharacters();
      const attributes = await this.db.getAllAttributes();
      
      const session = {
        id: sessionId,
        candidates: characters.map(char => ({
          ...char,
          probability: 1.0,
          eliminated: false
        })),
        attributes: attributes,
        usedAttributes: [],
        answers: [],
        currentQuestion: null,
        questionsAsked: 0,
        maxQuestions: 20,
        createdAt: Date.now(),
        phase: 'questioning' // questioning, guessing, ended
      };

      this.sessions.set(sessionId, session);
      this.cleanupExpiredSessions();

      return {
        sessionId,
        totalCharacters: characters.length,
        totalQuestions: attributes.length
      };
    } catch (error) {
      throw new Error(`Failed to create session: ${error.message}`);
    }
  }

  // Get next question for session
  async getNextQuestion(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    if (session.phase !== 'questioning') {
      throw new Error('Session not in questioning phase');
    }

    // Check if we should make a guess
    const activeCandidates = session.candidates.filter(c => !c.eliminated);
    if (activeCandidates.length <= 3 || session.questionsAsked >= session.maxQuestions) {
      session.phase = 'guessing';
      return this.getCurrentGuess(sessionId);
    }

    // Find best question to ask
    const nextAttribute = this.findBestAttribute(session);
    if (!nextAttribute) {
      session.phase = 'guessing';
      return this.getCurrentGuess(sessionId);
    }

    session.currentQuestion = nextAttribute;
    session.questionsAsked++;

    return {
      type: 'question',
      question: nextAttribute.question,
      questionNumber: session.questionsAsked,
      maxQuestions: session.maxQuestions,
      candidatesRemaining: activeCandidates.length,
      attributeId: nextAttribute.id
    };
  }

  // Process answer and update probabilities
  async processAnswer(sessionId, attributeId, answer) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Validate answer
    if (!['yes', 'no', 'maybe', 'unknown'].includes(answer)) {
      throw new Error('Invalid answer. Must be yes, no, maybe, or unknown');
    }

    // Store answer
    session.answers.push({ attributeId, answer });
    session.usedAttributes.push(attributeId);

    // Update candidate probabilities
    await this.updateProbabilities(session, attributeId, answer);

    // Get next question or guess
    return this.getNextQuestion(sessionId);
  }

  // Update character probabilities based on answer
  async updateProbabilities(session, attributeId, answer) {
    for (const candidate of session.candidates) {
      if (candidate.eliminated) continue;

      try {
        const attributes = await this.db.getCharacterAttributes(candidate.id);
        const charAttribute = attributes.find(attr => attr.attribute_id === attributeId);

        if (!charAttribute) {
          // Character doesn't have this attribute defined
          if (answer === 'unknown') {
            candidate.probability *= 0.9; // Slight penalty for unknown
          } else {
            candidate.probability *= 0.7; // Penalty for missing data
          }
        } else {
          // Character has this attribute
          if (answer === 'unknown') {
            candidate.probability *= 0.95; // Small penalty
          } else if (charAttribute.value === answer) {
            candidate.probability *= 1.2; // Boost for match
          } else if (charAttribute.value === 'maybe' && answer !== 'no') {
            candidate.probability *= 1.1; // Small boost for maybe
          } else if (answer === 'maybe' && charAttribute.value !== 'no') {
            candidate.probability *= 1.05; // Small boost when user says maybe
          } else {
            candidate.probability *= 0.3; // Big penalty for mismatch
          }
        }

        // Eliminate candidates with very low probability
        if (candidate.probability < 0.01) {
          candidate.eliminated = true;
        }
      } catch (error) {
        console.error(`Error updating probability for character ${candidate.id}:`, error);
        candidate.probability *= 0.8; // Default penalty
      }
    }

    // Normalize probabilities
    const activeCandidates = session.candidates.filter(c => !c.eliminated);
    const totalProbability = activeCandidates.reduce((sum, c) => sum + c.probability, 0);
    
    if (totalProbability > 0) {
      activeCandidates.forEach(c => {
        c.probability = c.probability / totalProbability;
      });
    }
  }

  // Find best attribute to ask about
  findBestAttribute(session) {
    const unusedAttributes = session.attributes.filter(
      attr => !session.usedAttributes.includes(attr.id)
    );

    if (unusedAttributes.length === 0) return null;

    // Score attributes based on how well they split the remaining candidates
    let bestAttribute = null;
    let bestScore = -1;

    for (const attribute of unusedAttributes) {
      const score = this.calculateAttributeScore(session, attribute.id);
      if (score > bestScore) {
        bestScore = score;
        bestAttribute = attribute;
      }
    }

    return bestAttribute;
  }

  // Calculate how good an attribute is for splitting candidates
  calculateAttributeScore(session, attributeId) {
    const activeCandidates = session.candidates.filter(c => !c.eliminated);
    let yesCount = 0, noCount = 0, maybeCount = 0, unknownCount = 0;

    activeCandidates.forEach(candidate => {
      // This is simplified - in a real implementation you'd check the database
      const hasAttribute = Math.random() > 0.5; // Placeholder logic
      if (hasAttribute) yesCount++;
      else noCount++;
    });

    // Prefer attributes that split candidates more evenly
    const total = activeCandidates.length;
    const balance = 1 - Math.abs(yesCount - noCount) / total;
    
    return balance;
  }

  // Get current best guess
  async getCurrentGuess(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const activeCandidates = session.candidates
      .filter(c => !c.eliminated)
      .sort((a, b) => b.probability - a.probability);

    if (activeCandidates.length === 0) {
      session.phase = 'ended';
      return {
        type: 'no_guess',
        message: 'I couldn\'t find any matching characters. Would you like to add this character to the database?'
      };
    }

    const bestGuess = activeCandidates[0];
    session.currentGuess = bestGuess;

    return {
      type: 'guess',
      character: {
        id: bestGuess.id,
        name: bestGuess.name,
        manhwa_title: bestGuess.manhwa_title,
        description: bestGuess.description,
        image_url: bestGuess.image_url
      },
      confidence: Math.round(bestGuess.probability * 100),
      alternativesCount: activeCandidates.length - 1
    };
  }

  // Process guess feedback
  async processGuessFeedback(sessionId, isCorrect) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    if (isCorrect) {
      session.phase = 'ended';
      return {
        type: 'success',
        message: 'Great! I guessed correctly!',
        questionsAsked: session.questionsAsked
      };
    } else {
      // Eliminate the wrong guess and continue
      if (session.currentGuess) {
        const wrongGuess = session.candidates.find(c => c.id === session.currentGuess.id);
        if (wrongGuess) {
          wrongGuess.eliminated = true;
        }
      }

      // Try next guess or continue questioning
      const activeCandidates = session.candidates.filter(c => !c.eliminated);
      if (activeCandidates.length === 0) {
        session.phase = 'ended';
        return {
          type: 'no_more_guesses',
          message: 'I\'ve run out of guesses. Would you like to add this character to the database?'
        };
      } else if (activeCandidates.length <= 2) {
        return this.getCurrentGuess(sessionId);
      } else {
        session.phase = 'questioning';
        return this.getNextQuestion(sessionId);
      }
    }
  }

  // Add new character to database
  async addCharacter(characterData, attributeAnswers) {
    try {
      // Add character
      const result = await this.db.addCharacter(characterData);
      const characterId = result.id;

      // Add attribute answers
      for (const answer of attributeAnswers) {
        await this.db.addCharacterAttribute(
          characterId,
          answer.attributeId,
          answer.value
        );
      }

      return { success: true, characterId };
    } catch (error) {
      throw new Error(`Failed to add character: ${error.message}`);
    }
  }

  // Get session info
  getSessionInfo(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const activeCandidates = session.candidates.filter(c => !c.eliminated);
    
    return {
      sessionId: session.id,
      phase: session.phase,
      questionsAsked: session.questionsAsked,
      maxQuestions: session.maxQuestions,
      candidatesRemaining: activeCandidates.length,
      totalCandidates: session.candidates.length
    };
  }

  // Cleanup expired sessions
  cleanupExpiredSessions() {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions) {
      if (now - session.createdAt > this.sessionTimeout) {
        this.sessions.delete(sessionId);
      }
    }
  }

  // Get all attributes for character creation
  async getAllAttributes() {
    return this.db.getAllAttributes();
  }
}

module.exports = GameLogic;