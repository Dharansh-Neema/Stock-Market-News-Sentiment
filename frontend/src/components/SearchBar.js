import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className={`relative flex-1 transition-all duration-200 ${isFocused ? 'ring-2 ring-green-500 ring-opacity-50' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className={`h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-green-500' : 'text-gray-400'}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="w-full bg-white border border-gray-200 rounded-lg py-3.5 pl-11 pr-4 text-gray-700 placeholder:text-gray-400 focus:outline-none"
            placeholder="Search for a stock (e.g., Apple, AAPL, Tesla)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {query && (
            <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setQuery('')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70"
          disabled={!query.trim()}
        >
          <span>Analyze</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
