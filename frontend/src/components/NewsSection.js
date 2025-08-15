import React from 'react';

const NewsSection = ({ news }) => {
  if (!news || news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest News</h3>
        <p className="text-gray-500">No news available for this stock.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest News</h3>
      
      <div className="space-y-4">
        {news.map((item, index) => (
          <div 
            key={index} 
            className="news-card border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            <h4 className="text-lg font-medium text-gray-800 mb-1">
              {item.headline}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {item.summary || 'No summary available'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
