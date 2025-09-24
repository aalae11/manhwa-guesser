import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg">Manhwa Akinator</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Manhwa Akinator. Made with{' '}
              <Heart className="w-4 h-4 inline text-red-500" /> for manga fans.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Support Button */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Support feature coming soon! Thank you for your interest.');
              }}
              className="flex items-center space-x-2 bg-accent-600 hover:bg-accent-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Support Developer</span>
            </a>

            {/* Contact Links */}
            <div className="flex items-center space-x-4">
              <a
                href="mailto:dev@manhwaakinator.com"
                className="text-gray-400 hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('GitHub repository will be available soon!');
                }}
                className="text-gray-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="text-center text-gray-400 text-xs">
            <p>
              This is an educational project. All character names and series titles
              are property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;