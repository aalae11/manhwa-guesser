import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, MinusCircle, Brain, Users } from 'lucide-react';
import ProgressBar from '../ProgressBar';
import LoadingSpinner from '../LoadingSpinner';

const GameQuestion = ({
  question,
  questionsAsked,
  maxQuestions,
  candidatesRemaining,
  onAnswer,
  loading,
  gameHistory
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!question) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <LoadingSpinner size="large" text="Loading question..." />
      </div>
    );
  }

  const handleAnswer = async (answer) => {
    if (loading) return;
    
    setSelectedAnswer(answer);
    try {
      await onAnswer(answer);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setSelectedAnswer(null);
    }
  };

  const answerOptions = [
    {
      key: 'yes',
      label: 'Yes',
      icon: CheckCircle,
      color: 'green',
      bgClass: 'bg-green-50 hover:bg-green-100 border-green-200',
      iconClass: 'text-green-600'
    },
    {
      key: 'no',
      label: 'No',
      icon: XCircle,
      color: 'red',
      bgClass: 'bg-red-50 hover:bg-red-100 border-red-200',
      iconClass: 'text-red-600'
    },
    {
      key: 'maybe',
      label: 'Maybe',
      icon: HelpCircle,
      color: 'yellow',
      bgClass: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
      iconClass: 'text-yellow-600'
    },
    {
      key: 'unknown',
      label: "I don't know",
      icon: MinusCircle,
      color: 'gray',
      bgClass: 'bg-gray-50 hover:bg-gray-100 border-gray-200',
      iconClass: 'text-gray-600'
    }
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-primary-600" />
            <span className="text-lg font-semibold text-gray-900">
              Question {questionsAsked}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{candidatesRemaining} characters left</span>
          </div>
        </div>
        
        <ProgressBar
          current={questionsAsked}
          max={maxQuestions}
          label={`Progress: ${questionsAsked} of ${maxQuestions} questions`}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {question.question}
          </h2>
          
          <p className="text-gray-600">
            Think about the character you have in mind and choose the best answer.
          </p>
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        {answerOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedAnswer === option.key;
          const isLoading = loading && isSelected;
          
          return (
            <button
              key={option.key}
              onClick={() => handleAnswer(option.key)}
              disabled={loading}
              className={`${option.bgClass} ${
                loading && !isSelected ? 'opacity-50' : ''
              } border-2 rounded-xl p-6 text-left transition-all duration-200 hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
            >
              <div className="flex items-center space-x-4">
                <div className={`flex-shrink-0 ${option.iconClass}`}>
                  {isLoading ? (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <LoadingSpinner size="small" />
                    </div>
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {option.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {option.key === 'yes' && 'This definitely applies to my character'}
                    {option.key === 'no' && 'This does not apply to my character'}
                    {option.key === 'maybe' && 'This might apply, but I\'m not sure'}
                    {option.key === 'unknown' && 'I don\'t know this information'}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Answers */}
      {gameHistory.answers.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Answers:</h4>
          <div className="flex flex-wrap gap-2">
            {gameHistory.answers.slice(-5).map((answer, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white rounded text-xs text-gray-600 border"
              >
                {answer.answer.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameQuestion;