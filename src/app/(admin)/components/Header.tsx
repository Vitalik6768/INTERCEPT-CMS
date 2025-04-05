import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-36 bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </div>
        
        <nav className="flex items-center space-x-4">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
