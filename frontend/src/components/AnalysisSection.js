import React from 'react';

const AnalysisSection = ({ analysis, expanded = false }) => {
  if (!analysis || Object.keys(analysis).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div className="flex items-center mb-5">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <h3 className="text-xl font-bold text-gray-800">AI Analysis</h3>
        </div>
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-500 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            No analysis available for this stock
          </p>
        </div>
      </div>
    );
  }

  // Determine the sentiment color and icon
  const getSentimentData = (sentiment) => {
    const lowerSentiment = sentiment.toLowerCase();
    
    if (lowerSentiment.includes('bullish') || lowerSentiment.includes('positive')) {
      return {
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
        )
      };
    }
    
    if (lowerSentiment.includes('bearish') || lowerSentiment.includes('negative')) {
      return {
        textColor: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"></path>
          </svg>
        )
      };
    }
    
    // Neutral or mixed sentiment
    return {
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: (
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
        </svg>
      )
    };
  };

  // Determine the recommendation badge style and icon
  const getRecommendationData = (recommendation) => {
    const lowerRec = recommendation.toLowerCase();
    
    if (lowerRec.includes('buy') || lowerRec.includes('strong buy')) {
      return {
        bgColor: 'bg-green-100', 
        textColor: 'text-green-800',
        icon: (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
      };
    }
    
    if (lowerRec.includes('sell') || lowerRec.includes('strong sell')) {
      return {
        bgColor: 'bg-red-100', 
        textColor: 'text-red-800',
        icon: (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
      };
    }
    
    // Hold or neutral
    return {
      bgColor: 'bg-yellow-100', 
      textColor: 'text-yellow-800',
      icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    };
  };

  const sentimentData = getSentimentData(analysis.sentiment);
  const recommendationData = getRecommendationData(analysis.recommendation);
  
  return (
    <div className={`${!expanded ? 'bg-white rounded-lg shadow-md p-6 border border-gray-100' : ''}`}>
      {!expanded && (
        <div className="flex items-center mb-5">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <h3 className="text-xl font-bold text-gray-800">AI Analysis</h3>
        </div>
      )}
      
      <div className={`space-y-6 ${expanded ? '' : ''}`}>
        {/* Sentiment and Recommendation Cards */}
        <div className={`grid ${expanded ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
          <div className={`${sentimentData.bgColor} rounded-lg p-4 flex flex-col`}>
            <span className="text-xs font-medium text-gray-600 uppercase mb-1">Market Sentiment</span>
            <div className="flex items-center">
              {sentimentData.icon}
              <span className={`text-lg font-bold ml-2 ${sentimentData.textColor}`}>
                {analysis.sentiment}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
            <span className="text-xs font-medium text-gray-600 uppercase mb-1">Recommendation</span>
            <div className="flex items-center">
              <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${recommendationData.bgColor} ${recommendationData.textColor}`}>
                {recommendationData.icon}
                {analysis.recommendation}
              </span>
            </div>
          </div>
        </div>
        
        {/* Price Points Card */}
        <div className={`bg-blue-50 rounded-lg p-4 ${expanded ? 'col-span-3' : ''}`}>
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 className="font-semibold text-gray-800">Buy/Sell Price Points</h4>
          </div>
          <div className="text-sm text-gray-800 font-medium">
            {analysis.buy_or_sell_price}
          </div>
        </div>
        
        {/* Analysis Details */}
        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-md font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Analysis Details
          </h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Reasoning</h5>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {analysis.reasoning}
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">News Summary</h5>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {analysis.news_summary}
              </p>
            </div>
            
            {analysis.stock_data_summary && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Stock Data Summary</h5>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {analysis.stock_data_summary}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;
