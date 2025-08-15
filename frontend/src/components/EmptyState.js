import React from 'react';

const EmptyState = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-10 text-center mt-8">
      <div className="mx-auto h-24 w-24 text-blue-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Stock-Sense</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Enter a stock name or symbol in the search bar above to get AI-powered analysis, 
        real-time charts, and latest news.
      </p>
      <div className="text-sm text-gray-500">
        <p>Try searching for:</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full">AAPL</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">MSFT</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">GOOGL</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">AMZN</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">TSLA</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
