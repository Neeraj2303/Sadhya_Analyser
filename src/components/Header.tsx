import React from 'react';
import { Leaf, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center mb-4">
        <div className="relative">
          <Leaf className="w-12 h-12 text-green-600" />
          <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Sadhya Symmetry Analyzer
      </h1>
      
      <p className="text-lg text-gray-600 mb-4">
        Check if your Onam Sadhya follows traditional placement rules!
      </p>
      
      <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-yellow-800 text-sm font-medium">
        <Sparkles className="w-4 h-4 mr-2" />
        Powered by AI & Kerala Tradition
      </div>
    </div>
  );
};