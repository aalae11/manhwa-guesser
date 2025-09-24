import React, { useState } from 'react';
import { CheckCircle, XCircle, Sparkles, BookOpen } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

const GameGuess = ({ guess, onFeedback, loading }) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  if (!guess) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <LoadingSpinner size="large" text="Making a guess..." />
      </div>
    );
  }

  const handleFeedback = async (isCorrect) => {
    if (loading) return;
    
    setSelectedFeedback(isCorrect);
    try {
      await onFeedback(isCorrect);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setSelectedFeedback(null);
    }
  };

  if (guess.type === 'no_guess' || guess.type === 'no_more_guesses') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          I'm Stumped!
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          {guess.message}
        </p>

        <div className="bg-primary-50 rounded-lg p-6 max-w-md">
          <h3 className="font-semibold text-primary-800 mb-2">
            Help Us Learn!
          </h3>
          <p className="text-sm text-primary-700">
            Add your character to our database so we can guess them next time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          I think I know who it is!
        </h2>
        
        <p className="text-gray-600 mb-2">
          Is this the character you were thinking of?
        </p>
        
        {guess.confidence && (
          <div className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-1" />
            {guess.confidence}% confident
          </div>
        )}
      </div>

      {/* Character Card */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8 border-2 border-primary-200">
          {/* Character Image */}
          {guess.character.image_url && (
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg bg-white">
                <img
                  src={guess.character.image_url}
                  alt={guess.character.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-character.png';
                  }}
                />
              </div>
            </div>
          )}

          {/* Character Info */}
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-bold text-gray-900">
              {guess.character.name}
            </h3>
            
            <div className="flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary-600" />
              <span className="text-lg font-medium text-primary-700">
                {guess.character.manhwa_title}
              </span>
            </div>

            {guess.character.description && (
              <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
                {guess.character.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <button
          onClick={() => handleFeedback(true)}
          disabled={loading}
          className={`flex-1 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl p-6 text-center transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        >
          <div className="flex flex-col items-center space-y-2">
            {loading && selectedFeedback === true ? (
              <LoadingSpinner size="small" />
            ) : (
              <CheckCircle className="w-8 h-8 text-green-600" />
            )}
            <span className="text-lg font-semibold text-green-700">
              Yes, Correct!
            </span>
            <span className="text-sm text-green-600">
              That's the character I was thinking of
            </span>
          </div>
        </button>

        <button
          onClick={() => handleFeedback(false)}
          disabled={loading}
          className={`flex-1 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-xl p-6 text-center transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
        >
          <div className="flex flex-col items-center space-y-2">
            {loading && selectedFeedback === false ? (
              <LoadingSpinner size="small" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <span className="text-lg font-semibold text-red-700">
              No, Keep Guessing
            </span>
            <span className="text-sm text-red-600">
              That's not who I was thinking of
            </span>
          </div>
        </button>
      </div>

      {/* Additional Info */}
      {guess.alternativesCount > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {guess.alternativesCount} other character{guess.alternativesCount === 1 ? '' : 's'} remaining
          </p>
        </div>
      )}
    </div>
  );
};

export default GameGuess;