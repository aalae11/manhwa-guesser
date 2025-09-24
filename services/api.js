import axios from 'axios';

// Use environment variable with intelligent fallback
const getApiBaseUrl = () => {
  // If environment variable is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For development, use localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }
  
  // For production, use the Vercel API
  return 'https://webtoon-guesser-o8hg0zbbk-thefools-projects-11b1ffcc.vercel.app/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('API Base URL:', API_BASE_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error(error.response.data?.error || 'An unexpected error occurred.');
  }
);

export const gameApi = {
  // Start new game session
  async startGame() {
    const response = await api.post('/session', {});
    return response.data;
  },

  // Get next question
  async getQuestion(sessionId) {
    const response = await api.get(`/session/${sessionId}/question`);
    return response.data;
  },

  // Submit answer
  async submitAnswer(sessionId, attributeId, answer) {
    console.log('Submitting answer:', { sessionId, attributeId, answer });
    const response = await api.post(`/session/${sessionId}/answer`, {
      attributeId: parseInt(attributeId),
      answer: answer.toLowerCase()
    });
    return response.data;
  },

  // Get current guess
  async getGuess(sessionId) {
    const response = await api.get(`/session/${sessionId}/guess`);
    return response.data;
  },

  // Submit guess feedback
  async submitFeedback(sessionId, isCorrect) {
    const response = await api.post(`/session/${sessionId}/feedback`, {
      isCorrect
    });
    return response.data;
  },

  // Add new character
  async addCharacter(character, attributes) {
    const response = await api.post('/character', {
      character,
      attributes
    });
    return response.data;
  },

  // Get session info
  async getSessionInfo(sessionId) {
    const response = await api.get(`/session/${sessionId}`);
    return response.data;
  },

  // Get all attributes
  async getAttributes() {
    const response = await api.get('/attributes');
    return response.data;
  }
};

export default api;