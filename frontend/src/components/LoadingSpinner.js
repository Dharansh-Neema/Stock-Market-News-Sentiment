import React from 'react';
import { useTheme } from '../utils/ThemeContext';

const LoadingSpinner = () => {
  const { darkMode } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${darkMode ? 'border-indigo-400 drop-shadow-[0_0_5px_rgba(129,140,248,0.5)]' : 'border-blue-500'} mb-4`}></div>
      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>Analyzing stock data...</p>
    </div>
  );
};

export default LoadingSpinner;
