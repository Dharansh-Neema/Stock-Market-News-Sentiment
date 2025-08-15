import React from 'react';

const NewsSection = ({ news, expanded = false }) => {
  if (!news || news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            Latest News
          </h3>
        </div>
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-500 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            No news available for this stock
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!expanded && (
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            Latest News
          </h3>
          <span className="text-sm text-gray-500">
            {news.length} articles
          </span>
        </div>
      )}
      
      <div className="space-y-6 w-full">
        {news.map((item, index) => (
          <div 
            key={index} 
            className={`news-card border-b border-gray-100 pb-5 last:border-b-0 last:pb-0 transition-all hover:bg-gray-50 ${!expanded ? '-mx-6 px-6' : 'rounded-lg shadow-sm p-4'}`}
          >
            <div className="flex items-start">
              <div className="w-full">
                <h4 className={`${expanded ? 'text-lg' : 'text-md'} font-semibold text-gray-800 mb-2 ${expanded ? '' : 'line-clamp-2'}`}>
                  {item.headline}
                </h4>
                <p className={`text-sm text-gray-600 mb-3 ${expanded ? '' : 'line-clamp-3'}`}>
                  {item.summary || 'No summary available'}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(item.datetime).toLocaleDateString()} • {new Date(item.datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 ${expanded ? 'bg-blue-50 hover:bg-blue-100 py-1 px-3 rounded-full' : ''}`}
                    >
                      {expanded ? 'Visit Source' : 'Read full article'}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Source logo or image placeholder for expanded view */}
              {expanded && (
                <div className="ml-4 flex-shrink-0 hidden md:block">
                  <div className="bg-gray-100 rounded-lg h-16 w-16 flex items-center justify-center text-gray-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
