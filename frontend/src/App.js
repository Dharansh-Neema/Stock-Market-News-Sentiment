import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import StockHeader from './components/StockHeader';
import StockCharts from './components/StockCharts';
import NewsSection from './components/NewsSection';
import AnalysisSection from './components/AnalysisSection';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { safelyParseJSON, getSampleData } from './utils/dataUtils';

function App() {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search for a Stock
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Enter a stock symbol (e.g., AAPL, MSFT) or company name for real-time analysis
            </p>
            <SearchBar onSearch={handleSearch} />
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
            
            {/* Price and Volume Charts */}
            <StockCharts 
              graphData={stockData.graph_data} 
            />
            
            {/* News and Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NewsSection news={stockData.news_data} />
              </div>
              <div className="lg:col-span-1">
                <AnalysisSection analysis={stockData.agent_analysis} />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
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
  );
}

export default App;
