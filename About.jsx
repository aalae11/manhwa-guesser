import React from 'react';
import { Heart, Instagram } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About the Developer
          </h1>
          <p className="text-xl text-gray-600">
            Get to know the person behind Manhwa Akinator
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Section */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-8 text-white text-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Heart className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Developer</h2>
            <p className="text-white/90">Full-Stack Web Developer & Manhwa Enthusiast</p>
          </div>

          {/* Bio Section */}
          <div className="p-6 md:p-8">
            <div className="prose max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Hi there! 👋
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Welcome to Manhwa Akinator! I'm a passionate full-stack developer who loves both 
                coding and reading manhwa/manhua. This project combines my technical skills with 
                my love for these amazing stories and characters.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                As an avid reader of manhwa and manhua, I've always been fascinated by the rich 
                characters and intricate storylines. From the epic adventures in Solo Leveling to 
                the romantic tales in Who Made Me a Princess, these stories have provided countless 
                hours of entertainment.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                This Akinator-style game is my way of celebrating these wonderful characters while 
                showcasing modern web development techniques. The project uses React for the frontend, 
                Node.js for the backend, and implements a smart probability-based guessing algorithm.
              </p>

              {/* Skills */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Technologies Used
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">R</span>
                    </div>
                    <span className="text-sm text-gray-600">React</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">N</span>
                    </div>
                    <span className="text-sm text-gray-600">Node.js</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">T</span>
                    </div>
                    <span className="text-sm text-gray-600">Tailwind</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-yellow-600 font-bold">S</span>
                    </div>
                    <span className="text-sm text-gray-600">SQLite</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-red-600 font-bold">A</span>
                    </div>
                    <span className="text-sm text-gray-600">AI Logic</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-indigo-600 font-bold">V</span>
                    </div>
                    <span className="text-sm text-gray-600">Vite</span>
                  </div>
                </div>
              </div>

              {/* Future Plans */}
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Future Updates
              </h4>
              <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                <li>More characters from popular series</li>
                <li>Enhanced AI algorithm for better guessing</li>
                <li>User accounts and statistics</li>
                <li>Mobile app version</li>
                <li>Community features and character suggestions</li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="border-t pt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                Connect With Me
              </h4>
              
              <div className="flex justify-center space-x-6">
                <a
                  href="https://instagram.com/placeholder_username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                
                <a
                  href="https://tiktok.com/@placeholder_username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-black text-xs font-bold">T</span>
                  </div>
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg p-6 mt-8 text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Support This Project
              </h4>
              <p className="text-gray-600 mb-4">
                If you enjoy Manhwa Akinator, consider supporting its development!
              </p>
              <button
                onClick={() => alert('Support options coming soon! Thank you for your interest.')}
                className="btn btn-accent inline-flex items-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>Support Developer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;