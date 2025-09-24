import React from 'react';
import { AlertCircle, RotateCcw, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameError = ({ error, onRetry, onClearError }) => {
  const getErrorType = (errorMessage) => {
    if (errorMessage?.includes('network') || errorMessage?.includes('fetch')) {
      return 'network';
    }
    if (errorMessage?.includes('timeout')) {
      return 'timeout';
    }
    if (errorMessage?.includes('not found')) {
      return 'not_found';
    }
    return 'general';
  };

  const errorType = getErrorType(error);

  const errorInfo = {
    network: {
      title: 'Connection Error',
      description: 'Unable to connect to the game server. Please check your internet connection.',
      suggestions: [
        'Check your internet connection',
        'Try refreshing the page',
        'Wait a moment and try again'
      ]
    },
    timeout: {
      title: 'Request Timeout',
      description: 'The server is taking too long to respond.',
      suggestions: [
        'Check your internet speed',
        'Try again in a few moments',
        'Consider restarting your browser'
      ]
    },
    not_found: {
      title: 'Game Session Not Found',
      description: 'Your game session has expired or could not be found.',
      suggestions: [
        'Start a new game',
        'Check if you\'ve been inactive for too long',
        'Try refreshing the page'
      ]
    },
    general: {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred while playing the game.',
      suggestions: [
        'Try starting a new game',
        'Refresh the page',
        'Contact support if the problem persists'
      ]
    }
  };

  const currentError = errorInfo[errorType];

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center">
      {/* Error Icon */}
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>

      {/* Error Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {currentError.title}
      </h1>

      {/* Error Description */}
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        {currentError.description}
      </p>

      {/* Error Details */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md">
          <p className="text-sm text-red-700 font-medium mb-2">
            Error Details:
          </p>
          <p className="text-sm text-red-600 break-words">
            {error}
          </p>
        </div>
      )}

      {/* Suggestions */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-md">
        <h3 className="font-semibold text-blue-800 mb-3">
          What you can try:
        </h3>
        <ul className="text-left text-blue-700 space-y-2">
          {currentError.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-sm">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onRetry}
          className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Try Again</span>
        </button>

        <button
          onClick={() => window.location.reload()}
          className="flex-1 btn btn-secondary flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Refresh Page</span>
        </button>
      </div>

      {/* Additional Actions */}
      <div className="mt-6 flex flex-col items-center space-y-3">
        <Link
          to="/"
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Link>

        {onClearError && (
          <button
            onClick={onClearError}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Dismiss Error
          </button>
        )}
      </div>

      {/* Development Info */}
      {import.meta.env.DEV && (
        <details className="mt-8 text-left bg-gray-100 p-4 rounded text-xs max-w-md w-full">
          <summary className="cursor-pointer font-medium text-gray-700 mb-2">
            Debug Information
          </summary>
          <div className="space-y-2 text-gray-600">
            <div>
              <strong>Error Type:</strong> {errorType}
            </div>
            <div>
              <strong>Timestamp:</strong> {new Date().toISOString()}
            </div>
            <div>
              <strong>User Agent:</strong> {navigator.userAgent}
            </div>
            {error && (
              <div>
                <strong>Full Error:</strong>
                <pre className="mt-1 whitespace-pre-wrap text-xs">
                  {error}
                </pre>
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  );
};

export default GameError;