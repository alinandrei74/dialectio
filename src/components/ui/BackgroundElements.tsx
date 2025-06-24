import React from 'react';

function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blue/purple elements in upper section with enhanced shadows */}
      <div className="absolute top-20 -right-32 w-96 h-64 bg-gradient-to-br from-blue-600 to-blue-800 transform rotate-45 opacity-20 shadow-2xl"></div>
      <div className="absolute top-10 left-1/4 w-32 h-8 bg-gradient-to-r from-purple-600 to-purple-800 transform rotate-30 opacity-25 shadow-xl"></div>
      
      {/* Neutral elements in middle with refined gradients */}
      <div className="absolute top-1/2 left-10 w-2 h-80 bg-gradient-to-b from-gray-700 to-gray-900 transform rotate-12 opacity-30 shadow-lg"></div>
      <div className="absolute top-1/2 right-20 w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 transform -rotate-45 opacity-25 shadow-xl"></div>
      
      {/* Green elements in lower section with depth */}
      <div className="absolute bottom-40 left-1/3 w-48 h-8 bg-gradient-to-r from-green-700 to-green-900 transform rotate-15 opacity-30 shadow-xl"></div>
      <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-gradient-to-br from-green-800 to-black transform rotate-45 opacity-35 shadow-2xl"></div>
      
      {/* Black elements throughout with subtle variations */}
      <div className="absolute top-60 left-1/3 w-8 h-8 bg-black transform rotate-45 opacity-50 shadow-lg"></div>
      <div className="absolute bottom-80 left-1/4 w-6 h-6 bg-black transform rotate-12 opacity-60 shadow-md"></div>
      <div className="absolute top-80 right-1/3 w-4 h-32 bg-black transform -rotate-30 opacity-45 shadow-lg"></div>
      <div className="absolute bottom-60 right-10 w-2 h-60 bg-black transform -rotate-45 opacity-40 shadow-md"></div>
    </div>
  );
}

export default BackgroundElements;