import React, { useState, useEffect } from 'react';
import { UserPlus, X, BookOpen, ImageIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import { gameApi } from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';

const AddCharacter = ({ gameHistory, onSuccess, onCancel, addCharacter }) => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // 1: Character Info, 2: Attributes, 3: Success
  
  const [characterData, setCharacterData] = useState({
    name: '',
    manhwa_title: '',
    description: '',
    image_url: ''
  });

  const [attributeAnswers, setAttributeAnswers] = useState({});

  // Load attributes on mount
  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      setLoading(true);
      const response = await gameApi.getAttributes();
      if (response.success) {
        setAttributes(response.data);
        
        // Pre-fill answers from game history
        const preFilledAnswers = {};
        gameHistory.answers.forEach((answer, index) => {
          const attribute = response.data[index];
          if (attribute) {
            preFilledAnswers[attribute.id] = answer.answer;
          }
        });
        setAttributeAnswers(preFilledAnswers);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterSubmit = (e) => {
    e.preventDefault();
    if (!characterData.name.trim() || !characterData.manhwa_title.trim()) {
      setError('Character name and manhwa/manhua title are required');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleAttributeChange = (attributeId, value) => {
    setAttributeAnswers(prev => ({
      ...prev,
      [attributeId]: value
    }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);

      // Convert answers to required format
      const formattedAnswers = Object.entries(attributeAnswers)
        .filter(([_, value]) => value && value !== 'unknown')
        .map(([attributeId, value]) => ({
          attributeId: parseInt(attributeId),
          value
        }));

      await addCharacter(characterData, formattedAnswers);
      setStep(3);
    } catch (error) {
      setError(error.message || 'Failed to add character');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <LoadingSpinner size="large" text="Loading character form..." />
      </div>
    );
  }

  // Success Step
  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Character Added Successfully!
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          Thank you for contributing to our database! Your character "{characterData.name}" 
          from "{characterData.manhwa_title}" has been added and will help improve the game for everyone.
        </p>

        <div className="bg-green-50 rounded-lg p-6 mb-8 max-w-md">
          <h3 className="font-semibold text-green-800 mb-2">
            What happens next?
          </h3>
          <ul className="text-sm text-green-700 space-y-1 text-left">
            <li>• Your character is now part of our database</li>
            <li>• Other players might encounter them in future games</li>
            <li>• The AI will learn from your answers</li>
          </ul>
        </div>

        <button
          onClick={onSuccess}
          className="btn btn-primary px-8 py-3"
        >
          Start New Game
        </button>
      </div>
    );
  }

  // Character Info Step
  if (step === 1) {
    return (
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Character</h1>
              <p className="text-gray-600">Help us expand our database</p>
            </div>
          </div>
          
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>Step 1 of 2: Character Information</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full w-1/2"></div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleCharacterSubmit} className="space-y-6">
          {/* Character Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Character Name *
            </label>
            <input
              type="text"
              value={characterData.name}
              onChange={(e) => setCharacterData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Sung Jin-Woo"
              required
            />
          </div>

          {/* Manhwa/Manhua Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manhwa/Manhua Title *
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={characterData.manhwa_title}
                onChange={(e) => setCharacterData(prev => ({ ...prev, manhwa_title: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Solo Leveling"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={characterData.description}
              onChange={(e) => setCharacterData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of the character..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL (Optional)
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={characterData.image_url}
                onChange={(e) => setCharacterData(prev => ({ ...prev, image_url: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/character-image.jpg"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn btn-primary"
            >
              Next: Attributes
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Attributes Step
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setStep(1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Character Attributes</h1>
            <p className="text-gray-600">Answer questions about {characterData.name}</p>
          </div>
        </div>
        
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <span>Step 2 of 2: Character Attributes</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary-600 h-2 rounded-full w-full"></div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm">
          <strong>Instructions:</strong> Answer these questions about your character. 
          Some answers might be pre-filled based on your previous game responses. 
          You can skip questions you're unsure about.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleFinalSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">
                {attribute.question}
              </h3>
              
              <div className="space-y-2">
                {['yes', 'no', 'maybe'].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`attribute-${attribute.id}`}
                      value={option}
                      checked={attributeAnswers[attribute.id] === option}
                      onChange={() => handleAttributeChange(attribute.id, option)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {option}
                    </span>
                  </label>
                ))}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`attribute-${attribute.id}`}
                    value="unknown"
                    checked={attributeAnswers[attribute.id] === 'unknown' || !attributeAnswers[attribute.id]}
                    onChange={() => handleAttributeChange(attribute.id, 'unknown')}
                    className="text-gray-400 focus:ring-gray-300"
                  />
                  <span className="text-sm text-gray-500">Skip / Unknown</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
          >
            {submitting ? (
              <LoadingSpinner size="small" />
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Add Character</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCharacter;