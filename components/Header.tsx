
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2H9z" />
                <path fillRule="evenodd" d="M4 8a2 2 0 012-2h5v10H6a2 2 0 01-2-2V8zm12 0a2 2 0 00-2-2h-5v10h5a2 2 0 002-2V8z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-white tracking-wider">
              AI Resume Relevance Checker
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
