import React from 'react';
import { Heart, Github, Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <span className="text-gray-600">Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span className="text-gray-600">for Kerala food lovers</span>
        </div>
        
        <div className="flex justify-center space-x-6 mb-4">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Coffee className="w-4 h-4" />
            <span className="text-sm">Buy me chai</span>
          </button>
        </div>
        
        <div className="text-sm text-gray-500 space-y-1">
          <p>This is a fun project celebrating Kerala's rich food culture.</p>
          <p className="text-xs">
            Traditional Sadhya rules passed down through generations. 
            <span className="text-yellow-600 font-medium"> ഓണാശംസകൾ! 🌸</span>
          </p>
        </div>
      </div>
    </footer>
  );
};