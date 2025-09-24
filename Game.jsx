import React, { useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import GameStart from '../components/game/GameStart';
import GameQuestion from '../components/game/GameQuestion';
import GameGuess from '../components/game/GameGuess';
import GameEnd from '../components/game/GameEnd';
import GameError from '../components/game/GameError';
import AddCharacter from '../components/game/AddCharacter';
import LoadingSpinner from '../components/LoadingSpinner';
import { ResponsiveAd } from '../components/AdPlaceholder';

const Game = () => {
  const {
    gameState,
    gameHistory,
    startNewGame,
    submitAnswer,
    submitGuessFeedback,
    addCharacter,
    resetGame,
    clearError
  } = useGameState();

  const [showAddCharacter, setShowAddCharacter] = useState(false);

  useEffect(() => {
    // Start a new game if we're in idle state
    if (gameState.phase === 'idle') {
      startNewGame();
    }
  }, [gameState.phase, startNewGame]);

  const handleStartNewGame = () => {
    setShowAddCharacter(false);
    startNewGame();
  };

  const handleAddCharacterSuccess = () => {
    setShowAddCharacter(false);
    resetGame();
  };

  const handleShowAddCharacter = () => {
    setShowAddCharacter(true);
  };

  const renderGameContent = () => {
    if (showAddCharacter) {
      return (
        <AddCharacter
          gameHistory={gameHistory}
          onSuccess={handleAddCharacterSuccess}
          onCancel={() => setShowAddCharacter(false)}
          addCharacter={addCharacter}
        />
      );
    }

    switch (gameState.phase) {
      case 'loading':
        return (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="large" text="Starting new game..." />
          </div>
        );

      case 'questioning':
        return (
          <GameQuestion
            question={gameState.currentQuestion}
            questionsAsked={gameState.questionsAsked}
            maxQuestions={gameState.maxQuestions}
            candidatesRemaining={gameState.candidatesRemaining}
            onAnswer={submitAnswer}
            loading={gameState.loading}
            gameHistory={gameHistory}
          />
        );

      case 'guessing':
        return (
          <GameGuess
            guess={gameState.currentGuess}
            onFeedback={submitGuessFeedback}
            loading={gameState.loading}
          />
        );

      case 'ended':
        return (
          <GameEnd
            gameState={gameState}
            gameHistory={gameHistory}
            onNewGame={handleStartNewGame}
            onAddCharacter={handleShowAddCharacter}
          />
        );

      case 'error':
        return (
          <GameError
            error={gameState.error}
            onRetry={handleStartNewGame}
            onClearError={clearError}
          />
        );

      default:
        return (
          <GameStart onStartGame={handleStartNewGame} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Game Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg min-h-[600px]">
              {renderGameContent()}
            </div>
          </div>

          {/* Sidebar with Ad */}
          <div className="lg:w-80 space-y-6">
            {/* Ad */}
            <ResponsiveAd />
            
            {/* Game Tips */}
            {gameState.phase === 'questioning' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  💡 Tips for Better Results
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Answer as accurately as possible</li>
                  <li>• Use "Maybe" if you're unsure</li>
                  <li>• "I don't know" is okay for unknown details</li>
                  <li>• Think about the character's main traits</li>
                </ul>
              </div>
            )}

            {/* Game Stats */}
            {(gameState.phase === 'questioning' || gameState.phase === 'guessing') && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  📊 Game Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions Asked:</span>
                    <span className="font-medium">
                      {gameState.questionsAsked} / {gameState.maxQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Candidates Left:</span>
                    <span className="font-medium text-primary-600">
                      {gameState.candidatesRemaining}
                    </span>
                  </div>
                  {gameHistory.answers.length > 0 && (
                    <div className="pt-3 border-t">
                      <span className="text-gray-600 text-xs">Recent answers:</span>
                      <div className="mt-1 space-y-1">
                        {gameHistory.answers.slice(-3).map((answer, index) => (
                          <div key={index} className="text-xs text-gray-500">
                            {answer.answer.toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;