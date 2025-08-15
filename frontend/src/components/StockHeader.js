import React from 'react';

const StockHeader = ({ symbol, query }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {symbol} <span className="text-sm font-normal text-gray-500">({query})</span>
      </h2>
      <div className="flex items-center text-sm text-gray-600">
        <span className="mr-2">
          <svg className="h-4 w-4 text-blue-500 inline" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </span>
        <span>Real-time analysis as of {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default StockHeader;
