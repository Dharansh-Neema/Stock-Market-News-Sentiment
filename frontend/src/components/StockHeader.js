import React from 'react';
import { useTheme } from '../utils/ThemeContext';

const StockHeader = ({ symbol, query }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/30' : 'bg-white'} rounded-lg shadow-md p-6 mb-8 ${darkMode ? 'border border-gray-700' : ''}`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-indigo-300 drop-shadow-[0_0_5px_rgba(165,180,252,0.5)]' : 'text-gray-800'} mb-2`}>
        {symbol} <span className={`text-sm font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>({query})</span>
      </h2>
      <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="mr-2">
          <svg className={`h-4 w-4 ${darkMode ? 'text-blue-400 drop-shadow-[0_0_3px_rgba(96,165,250,0.5)]' : 'text-blue-500'} inline`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </span>
        <span>Real-time analysis as of {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default StockHeader;
