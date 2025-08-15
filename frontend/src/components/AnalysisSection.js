import React from 'react';

const AnalysisSection = ({ analysis }) => {
  if (!analysis || Object.keys(analysis).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Analysis</h3>
        <p className="text-gray-500">No analysis available for this stock.</p>
      </div>
    );
  }

  // Determine the sentiment color
  const getSentimentColor = (sentiment) => {
    const lowerSentiment = sentiment.toLowerCase();
    if (lowerSentiment.includes('bullish') || lowerSentiment.includes('positive')) return 'text-green-600';
    if (lowerSentiment.includes('bearish') || lowerSentiment.includes('negative')) return 'text-red-600';
    return 'text-yellow-600'; // Neutral or mixed sentiment
  };

  // Determine the recommendation badge style
  const getRecommendationStyle = (recommendation) => {
    const lowerRec = recommendation.toLowerCase();
    if (lowerRec.includes('buy') || lowerRec.includes('strong buy')) {
      return 'bg-green-100 text-green-800';
    }
    if (lowerRec.includes('sell') || lowerRec.includes('strong sell')) {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-yellow-100 text-yellow-800'; // Hold or neutral
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Analysis</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Sentiment</span>
            <p className={`text-lg font-medium ${getSentimentColor(analysis.sentiment)}`}>
              {analysis.sentiment}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Recommendation</span>
            <p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getRecommendationStyle(analysis.recommendation)}`}>
                {analysis.recommendation}
              </span>
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Buy/Sell Price Points</h4>
          <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded">
            {analysis.buy_or_sell_price}
          </p>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Reasoning</h4>
          <p className="text-sm text-gray-600">
            {analysis.reasoning}
          </p>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">News Summary</h4>
          <p className="text-sm text-gray-600">
            {analysis.news_summary}
          </p>
        </div>
        
        {analysis.stock_data_summary && (
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">Stock Data Summary</h4>
            <p className="text-sm text-gray-600">
              {analysis.stock_data_summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisSection;
