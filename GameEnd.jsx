import React from 'react';
import { CheckCircle, XCircle, RotateCcw, UserPlus, Trophy, Clock, Target } from 'lucide-react';

const GameEnd = ({ gameState, gameHistory, onNewGame, onAddCharacter }) => {
  const wasSuccessful = gameState.currentGuess && gameHistory.guesses.some(g => g.wasCorrect);
  const totalGuesses = gameHistory.guesses.length;
  const questionsAsked = gameState.questionsAsked;

  const getPerformanceRating = () => {
    if (wasSuccessful) {
      if (questionsAsked <= 5) return { rating: 'Excellent!', color: 'text-green-600', icon: Trophy };
      if (questionsAsked <= 10) return { rating: 'Great!', color: 'text-blue-600', icon: Target };
      if (questionsAsked <= 15) return { rating: 'Good!', color: 'text-yellow-600', icon: Target };
      return { rating: 'Success!', color: 'text-green-600', icon: CheckCircle };
    }
    return { rating: 'Challenge!', color: 'text-gray-600', icon: XCircle };
  };

  const performance = getPerformanceRating();
  const PerformanceIcon = performance.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center">
      {/* Status Icon */}
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
        wasSuccessful 
          ? 'bg-gradient-to-br from-green-400 to-green-600' 
          : 'bg-gradient-to-br from-gray-400 to-gray-600'
      }`}>
        {wasSuccessful ? (
          <CheckCircle className="w-12 h-12 text-white" />
        ) : (
          <XCircle className="w-12 h-12 text-white" />
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {wasSuccessful ? 'Game Complete!' : 'Game Over!'}
      </h1>

      {/* Result Message */}
      <div className="max-w-2xl mb-8">
        {wasSuccessful ? (
          <div>
            <p className="text-lg text-gray-600 mb-4">
              🎉 Great! I successfully guessed your character!
            </p>
            {gameState.currentGuess && (
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="font-medium text-green-800">
                  The character was: <span className="font-bold">{gameState.currentGuess.name}</span>
                </p>
                <p className="text-green-700 text-sm">
                  from "{gameState.currentGuess.manhwa_title}"
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-lg text-gray-600 mb-4">
              I wasn't able to guess your character this time. 
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="font-medium text-blue-800 mb-2">
                Help us improve!
              </p>
              <p className="text-blue-700 text-sm">
                Consider adding your character to our database so we can guess them next time.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Game Statistics */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <PerformanceIcon className={`w-6 h-6 mr-2 ${performance.color}`} />
          <span className={`font-semibold ${performance.color}`}>
            {performance.rating}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-2xl font-bold text-gray-900">
                {questionsAsked}
              </span>
            </div>
            <span className="text-sm text-gray-600">Questions</span>
          </div>

          <div>
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-2xl font-bold text-gray-900">
                {totalGuesses}
              </span>
            </div>
            <span className="text-sm text-gray-600">Guesses</span>
          </div>
        </div>

        {/* Answer History */}
        {gameHistory.answers.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Your Answers:
            </h4>
            <div className="flex flex-wrap gap-1 justify-center">
              {gameHistory.answers.map((answer, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    answer.answer === 'yes' ? 'bg-green-100 text-green-700' :
                    answer.answer === 'no' ? 'bg-red-100 text-red-700' :
                    answer.answer === 'maybe' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}
                >
                  {answer.answer.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onNewGame}
          className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again</span>
        </button>

        {!wasSuccessful && (
          <button
            onClick={onAddCharacter}
            className="flex-1 btn btn-accent flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Character</span>
          </button>
        )}
      </div>

      {/* Encouragement Message */}
      <div className="mt-6 text-sm text-gray-500 max-w-md">
        {wasSuccessful ? (
          <p>
            Thanks for playing! Try thinking of another character to test our AI again.
          </p>
        ) : (
          <p>
            Don't worry! Our AI is always learning. Adding your character helps us improve for everyone.
          </p>
        )}
      </div>
    </div>
  );
};

export default GameEnd;