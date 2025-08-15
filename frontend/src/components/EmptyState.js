import React from 'react';

const EmptyState = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 text-center mt-8 border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <div className="mx-auto h-32 w-32 mb-6 bg-gray-50 rounded-full p-6 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Stock-Sentiment</h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        Get detailed analytics, real-time charts, and AI-powered insights for any stock. 
        Start by entering a company name or ticker symbol above.
      </p>
      
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700 flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          Popular searches
        </p>
        
        <div className="flex flex-wrap justify-center gap-2">
          <button className="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
            <span className="font-medium">AAPL</span>
            <span className="text-xs ml-1 text-green-600">Apple</span>
          </button>
          
          <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
            <span className="font-medium">MSFT</span>
            <span className="text-xs ml-1 text-blue-600">Microsoft</span>
          </button>
          
          <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
            <span className="font-medium">GOOGL</span>
            <span className="text-xs ml-1 text-yellow-600">Alphabet</span>
          </button>
          
          <button className="bg-orange-50 hover:bg-orange-100 text-orange-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
            <span className="font-medium">AMZN</span>
            <span className="text-xs ml-1 text-orange-600">Amazon</span>
          </button>
          
          <button className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
            <span className="font-medium">TSLA</span>
            <span className="text-xs ml-1 text-red-600">Tesla</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
