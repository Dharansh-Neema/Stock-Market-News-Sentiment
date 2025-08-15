import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import StockHeader from './components/StockHeader';
import StockCharts from './components/StockCharts';
import NewsSection from './components/NewsSection';
import AnalysisSection from './components/AnalysisSection';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import TabNav from './components/TabNav';
import { safelyParseJSON, getSampleData } from './utils/dataUtils';

function App() {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/run-graph', { query });
      
      if (!response.data) {
        throw new Error('Empty response from API');
      }
      
      // Check if graph_data is a string and needs parsing
      if (response.data.graph_data && typeof response.data.graph_data === 'string') {
        response.data.graph_data = safelyParseJSON(response.data.graph_data);
      }
      
      setStockData(response.data);
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError('Failed to fetch stock data. Please try again.');
      
      // In development, you can uncomment this to see sample data when API fails
      // setStockData(getSampleData());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-green-600">Stock</span>-Sense
            </h1>
          </div>
          <div className="text-sm text-gray-500 hidden md:block">
            AI-Powered Real-Time Stock Analysis
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="w-full px-4 py-6">
        {/* Search Section */}
        <div className="w-full px-4 py-6">
          <div className="w-full">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                Stock Market Analysis
              </h2>
              
              <div className="relative">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg text-red-700 p-4 mb-6" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!stockData && !loading && !error && <EmptyState />}

        {/* Stock Data Dashboard */}
        {stockData && !loading && (
          <div>
            {/* Stock Header with Overview */}
            <StockHeader 
              symbol={stockData.symbol} 
              query={stockData.query} 
            />
            
            {/* Tab Navigation */}
            <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Tab Content */}
            <div className="tab-content">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="overview-tab max-w-full">
                  {/* Market Sentiment Banner */}
                  <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="flex items-center">
                        {sentimentIcon(stockData.agent_analysis?.sentiment)}
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-800 mr-3">Market Sentiment:</h3>
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${getSentimentColor(stockData.agent_analysis?.sentiment)}`}>
                              {stockData.agent_analysis?.sentiment || 'N/A'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 max-w-4xl">
                            {stockData.agent_analysis?.reasoning?.substring(0, 180)}...
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 md:mt-0">
                        <span className="text-sm font-medium mr-3">Recommendation:</span>
                        <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(stockData.agent_analysis?.recommendation)}`}>
                          {recommendationIcon(stockData.agent_analysis?.recommendation)}
                          <span className="ml-1">{stockData.agent_analysis?.recommendation || 'N/A'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price and Volume Charts */}
                  <div className="h-[500px]">
                    <StockCharts graphData={stockData.graph_data} />
                  </div>
                  
                </div>
              )}
              
              {/* News Tab */}
              {activeTab === 'news' && (
                <div className="news-tab">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Latest News
                      </h3>
                      <span className="text-gray-500 text-sm">
                        {stockData.news_data?.length || 0} articles
                      </span>
                    </div>
                    <div className="w-full">
                      <NewsSection news={stockData.news_data} expanded={true} />
                    </div>
                  </div>
                </div>
              )}
              
              {/* AI Analysis Tab */}
              {activeTab === 'analysis' && (
                <div className="analysis-tab">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex items-center mb-6">
                      <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-800">AI-Powered Market Analysis</h3>
                    </div>
                    <div className="w-full">
                      <AnalysisSection analysis={stockData.agent_analysis} expanded={true} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="max-w-7xl mx-auto">
          <footer className="mt-16 text-center text-gray-500 text-sm py-6 border-t border-gray-200">
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <span className="text-green-600 font-semibold">Stock</span>-Sense | AI-Powered Stock Analysis
              </div>
              <div className="text-xs">
                &copy; {new Date().getFullYear()} All rights reserved
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

// Helper functions for styling based on sentiment and recommendation
const getSentimentColor = (sentiment) => {
  if (!sentiment) return 'bg-gray-100 text-gray-800';
  
  switch(sentiment.toLowerCase()) {
    case 'positive':
      return 'bg-green-100 text-green-800';
    case 'negative':
      return 'bg-red-100 text-red-800';
    case 'neutral':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const sentimentIcon = (sentiment) => {
  if (!sentiment) {
    return (
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
  }
  
  const lowerSentiment = sentiment.toLowerCase();
  if (lowerSentiment.includes('positive') || lowerSentiment.includes('bullish')) {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    );
  } else if (lowerSentiment.includes('negative') || lowerSentiment.includes('bearish')) {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    );
  } else {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    );
  }
};

const getRecommendationColor = (recommendation) => {
  if (!recommendation) return 'bg-gray-100 text-gray-800';
  
  switch(recommendation.toLowerCase()) {
    case 'buy':
      return 'bg-green-100 text-green-800';
    case 'sell':
      return 'bg-red-100 text-red-800';
    case 'hold':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const recommendationIcon = (recommendation) => {
  if (!recommendation) {
    return null;
  }
  
  const lowerRec = recommendation.toLowerCase();
  if (lowerRec.includes('buy')) {
    return (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
  } else if (lowerRec.includes('sell')) {
    return (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
  } else {
    return (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
  }
};

export default App;
