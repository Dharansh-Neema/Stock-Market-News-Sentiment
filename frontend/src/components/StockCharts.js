import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chart.js/auto';
import { format } from 'date-fns';
import { safelyParseJSON } from '../utils/dataUtils';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const StockCharts = ({ graphData }) => {
  const [priceChartData, setPriceChartData] = useState(null);
  const [volumeChartData, setVolumeChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!graphData) {
      setError("No graph data available");
      return;
    }

    try {
      // Parse graph data if it's a string
      const parsedData = safelyParseJSON(graphData);
      
      if (!parsedData || parsedData.error) {
        setError(parsedData?.error || "Invalid graph data format");
        return;
      }

      // If we have the proper data structure from test_output.py
      if (parsedData.price_data && parsedData.volume_data) {
        // Format price chart data
        const priceLabels = parsedData.price_data.map(item => format(new Date(item.time), 'HH:mm'));
        const priceValues = parsedData.price_data.map(item => item.close);
        
        setPriceChartData({
          labels: priceLabels,
          datasets: [
            {
              label: 'Stock Price ($)',
              data: priceValues,
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 2,
              pointRadius: 1,
              pointHoverRadius: 5,
              fill: true,
              tension: 0.4,
            },
          ],
        });

        // Format volume chart data
        const volumeLabels = parsedData.volume_data.map(item => format(new Date(item.time), 'HH:mm'));
        const volumeValues = parsedData.volume_data.map(item => item.volume);
        
        setVolumeChartData({
          labels: volumeLabels,
          datasets: [
            {
              label: 'Volume',
              data: volumeValues,
              borderColor: 'rgb(99, 102, 241)',
              backgroundColor: 'rgba(99, 102, 241, 0.4)',
              borderWidth: 1,
              borderRadius: 4,
              barThickness: 8,
              type: 'bar',
            },
          ],
        });
      }
    } catch (err) {
      console.error('Error parsing graph data:', err);
      setError('Failed to parse graph data');
    }
  }, [graphData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };

  if (error) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Price Chart</h3>
      
      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Price Chart</h4>
        <div className="chart-container">
          {priceChartData ? (
            <Line data={priceChartData} options={chartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Loading chart data...</p>
            </div>
          )}
        </div>
      </div>
      

    </div>
  );
};

export default StockCharts;
