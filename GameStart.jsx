import React from 'react';
import { Brain, Sparkles, Play } from 'lucide-react';

const GameStart = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center">
      {/* Icon */}
      <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mb-6">
        <Brain className="w-12 h-12 text-white" />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Ready to Play?
      </h1>

      {/* Instructions */}
      <div className="max-w-2xl mb-8">
        <p className="text-lg text-gray-600 mb-6">
          Think of any character from a manhwa or manhua series, and I'll try to guess who it is!
        </p>
        
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary-600" />
            How to Play:
          </h3>
          <ol className="text-left text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              Think of a character from any manhwa or manhua
            </li>
            <li className="flex items-start">
              <span className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              Answer my questions with Yes, No, Maybe, or I don't know
            </li>
            <li className="flex items-start">
              <span className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              See if I can guess your character correctly!
            </li>
          </ol>
        </div>

        <div className="text-sm text-gray-500 mb-8">
          <p>
            ✨ Don't see your character? You can add them to help improve the game for everyone!
          </p>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartGame}
        className="btn btn-primary text-xl px-8 py-4 flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
      >
        <Play className="w-6 h-6" />
        <span>Let's Begin!</span>
      </button>
    </div>
  );
};

export default GameStart;