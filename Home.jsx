import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, BookOpen, Users, Play } from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Hero Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow">
              Manhwa Akinator
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Think of any manhwa or manhua character, and I'll try to guess who it is! 
              Just answer my questions with Yes, No, Maybe, or I don't know.
            </p>

            {/* CTA Button */}
            <Link
              to="/game"
              className="inline-flex items-center space-x-3 bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Play className="w-6 h-6" />
              <span>Start Playing</span>
            </Link>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-white/80">Characters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">20+</div>
                <div className="text-white/80">Smart Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">∞</div>
                <div className="text-white/80">Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI uses advanced algorithms to narrow down possibilities and guess your character
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Think of a Character</h3>
              <p className="text-gray-600">
                Pick any character from your favorite manhwa or manhua series
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Answer Questions</h3>
              <p className="text-gray-600">
                Respond with Yes, No, Maybe, or I don't know to our smart questions
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Makes Guess</h3>
              <p className="text-gray-600">
                Our algorithm analyzes your answers and makes an educated guess
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Help Us Learn</h3>
              <p className="text-gray-600">
                Add new characters to help improve the game for everyone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Characters Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Content */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Popular Characters
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Our database includes characters from popular manhwa and manhua series like:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-primary-600 mb-2">Korean Manhwa</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Solo Leveling</li>
                    <li>• The Beginning After The End</li>
                    <li>• Omniscient Reader</li>
                    <li>• Who Made Me a Princess</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-accent-600 mb-2">Chinese Manhua</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Mo Dao Zu Shi</li>
                    <li>• Against the Gods</li>
                    <li>• Battle Through The Heavens</li>
                    <li>• The King's Avatar</li>
                  </ul>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <Link
                  to="/game"
                  className="btn btn-primary inline-flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Try It Now</span>
                </Link>
              </div>
            </div>

            {/* Ad Sidebar */}
            <div className="lg:flex-shrink-0">
              <AdPlaceholder type="sidebar" className="sticky top-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Ad */}
      <div className="lg:hidden px-4 py-6">
        <AdPlaceholder type="banner" />
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Test Our AI?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Think you can stump our algorithm? Let's see if we can guess your favorite character!
          </p>
          <Link
            to="/game"
            className="btn bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center space-x-2 text-lg font-semibold"
          >
            <Brain className="w-6 h-6" />
            <span>Start Game</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;