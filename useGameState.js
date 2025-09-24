import { useState, useCallback } from 'react';
import { gameApi } from '../services/api';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    sessionId: null,
    phase: 'idle', // idle, loading, questioning, guessing, ended, error
    currentQuestion: null,
    currentGuess: null,
    questionsAsked: 0,
    maxQuestions: 20,
    candidatesRemaining: 0,
    error: null,
    loading: false
  });

  const [gameHistory, setGameHistory] = useState({
    answers: [],
    guesses: []
  });

  const startNewGame = useCallback(async () => {
    try {
      setGameState(prev => ({ 
        ...prev, 
        phase: 'loading', 
        loading: true, 
        error: null 
      }));

      const response = await gameApi.startGame();
      
      if (response.success) {
        setGameState(prev => ({
          ...prev,
          sessionId: response.data.sessionId,
          phase: 'questioning',
          loading: false,
          questionsAsked: 0,
          candidatesRemaining: response.data.totalCharacters
        }));

        setGameHistory({
          answers: [],
          guesses: []
        });

        // Get first question
        const questionResponse = await gameApi.getQuestion(response.data.sessionId);
        if (questionResponse.success) {
          setGameState(prev => ({
            ...prev,
            currentQuestion: questionResponse.data,
            questionsAsked: questionResponse.data.questionNumber || 0,
            candidatesRemaining: questionResponse.data.candidatesRemaining || 0
          }));
        }
      }
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        phase: 'error',
        loading: false,
        error: error.message || 'Failed to start game'
      }));
    }
  }, []);

  const submitAnswer = useCallback(async (answer) => {
    if (!gameState.sessionId || !gameState.currentQuestion) {
      throw new Error('No active game session');
    }

    try {
      setGameState(prev => ({ ...prev, loading: true, error: null }));

      const response = await gameApi.submitAnswer(
        gameState.sessionId,
        // Backend returns attribute under data.attribute with id
        gameState.currentQuestion?.attribute?.id ?? gameState.currentQuestion?.attributeId,
        answer
      );

      if (response.success) {
        // Update game history
        setGameHistory(prev => ({
          ...prev,
          answers: [
            ...prev.answers,
            {
              question: gameState.currentQuestion.question,
              answer,
              timestamp: Date.now()
            }
          ]
        }));

        // After answering, fetch next step (question or guess)
        const next = await gameApi.getQuestion(gameState.sessionId);
        if (next.success && next.data?.type === 'question') {
          setGameState(prev => ({
            ...prev,
            currentQuestion: next.data,
            questionsAsked: next.data.questionNumber || prev.questionsAsked + 1,
            candidatesRemaining: next.data.candidatesRemaining || 0,
            loading: false
          }));
        } else if (next.success && next.data?.type === 'guess') {
          setGameState(prev => ({
            ...prev,
            phase: 'guessing',
            currentGuess: next.data,
            currentQuestion: null,
            loading: false
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            phase: 'error',
            error: next.error || 'No more questions available',
            currentQuestion: null,
            loading: false
          }));
        }
      }
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to submit answer'
      }));
    }
  }, [gameState.sessionId, gameState.currentQuestion]);

  const submitGuessFeedback = useCallback(async (isCorrect) => {
    if (!gameState.sessionId) {
      throw new Error('No active game session');
    }

    try {
      setGameState(prev => ({ ...prev, loading: true, error: null }));

      const response = await gameApi.submitFeedback(gameState.sessionId, isCorrect);

      if (response.success) {
        // Update game history
        setGameHistory(prev => ({
          ...prev,
          guesses: [
            ...prev.guesses,
            {
              character: gameState.currentGuess?.character,
              wasCorrect: isCorrect,
              timestamp: Date.now()
            }
          ]
        }));

        if (response.data.type === 'success') {
          setGameState(prev => ({
            ...prev,
            phase: 'ended',
            loading: false
          }));
        } else if (response.data.type === 'question') {
          // Continue questioning
          setGameState(prev => ({
            ...prev,
            phase: 'questioning',
            currentQuestion: response.data,
            currentGuess: null,
            questionsAsked: response.data.questionNumber || prev.questionsAsked,
            candidatesRemaining: response.data.candidatesRemaining || 0,
            loading: false
          }));
        } else if (response.data.type === 'guess') {
          // Next guess
          setGameState(prev => ({
            ...prev,
            currentGuess: response.data,
            loading: false
          }));
        } else {
          // No more guesses
          setGameState(prev => ({
            ...prev,
            phase: 'ended',
            currentGuess: null,
            loading: false
          }));
        }
      }
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to submit feedback'
      }));
    }
  }, [gameState.sessionId, gameState.currentGuess]);

  const addCharacter = useCallback(async (characterData, attributeAnswers) => {
    try {
      setGameState(prev => ({ ...prev, loading: true, error: null }));

      const response = await gameApi.addCharacter(characterData, attributeAnswers);

      if (response.success) {
        setGameState(prev => ({
          ...prev,
          phase: 'ended',
          loading: false
        }));
        return response.data;
      }
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to add character'
      }));
      throw error;
    }
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      sessionId: null,
      phase: 'idle',
      currentQuestion: null,
      currentGuess: null,
      questionsAsked: 0,
      maxQuestions: 20,
      candidatesRemaining: 0,
      error: null,
      loading: false
    });
    setGameHistory({
      answers: [],
      guesses: []
    });
  }, []);

  const clearError = useCallback(() => {
    setGameState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    gameState,
    gameHistory,
    startNewGame,
    submitAnswer,
    submitGuessFeedback,
    addCharacter,
    resetGame,
    clearError
  };
};