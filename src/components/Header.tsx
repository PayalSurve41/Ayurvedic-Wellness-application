import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white px-6 py-8 mb-8 relative overflow-hidden">
      {/* Decorative floating dots */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-8 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-12 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Title */}
      <div className="relative flex items-center justify-center">
        <Sparkles size={32} className="mr-4 text-yellow-300 animate-pulse" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
