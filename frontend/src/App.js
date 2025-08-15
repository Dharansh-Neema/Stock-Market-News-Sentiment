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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            <span className="text-blue-600">Stock</span>-Sense
          </h1>
          <p className="text-gray-600 text-center mb-8">
            AI-Powered Real-Time Stock Analysis
          </p>
          <SearchBar onSearch={handleSearch} />
        </header>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
            <p>{error}</p>
          </div>
        )}

        {!stockData && !loading && !error && <EmptyState />}

        {stockData && !loading && (
          <div className="space-y-8">
            <StockHeader 
              symbol={stockData.symbol} 
              query={stockData.query} 
            />
            
            <StockCharts 
              graphData={stockData.graph_data} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <NewsSection news={stockData.news_data} />
              </div>
              <div className="lg:col-span-1">
                <AnalysisSection analysis={stockData.agent_analysis} />
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-gray-500 text-sm py-4">
          &copy; {new Date().getFullYear()} Stock-Sense | AI-Powered Stock Analysis
        </footer>
      </div>
    </div>
  );
}

export default App;
