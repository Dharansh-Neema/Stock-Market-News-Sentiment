import React from 'react';
import { useTheme } from '../utils/ThemeContext';

const TabNav = ({ activeTab, setActiveTab }) => {
  const { darkMode } = useTheme();
  const tabs = [
    { id: 'overview', label: 'Overview', icon: (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    )},
    { id: 'news', label: 'News', icon: (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    )},
    { id: 'analysis', label: 'AI Analysis', icon: (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )}
  ];

  return (
    <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
      <nav className="flex w-full overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center justify-center px-6 py-4 text-base font-medium flex-1 transition-all duration-300 ease-in-out
              ${activeTab === tab.id
                ? darkMode 
                  ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-900/30 drop-shadow-[0_0_3px_rgba(129,140,248,0.5)]'
                  : 'text-green-600 border-b-2 border-green-600 bg-green-50'
                : darkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNav;
