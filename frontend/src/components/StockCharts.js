import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, TimeScale, Filler, LogarithmicScale } from 'chart.js';
import 'chart.js/auto';
import { format, parseISO, startOfDay, isSameDay } from 'date-fns';
import { safelyParseJSON, formatLargeNumber } from '../utils/dataUtils';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  annotationPlugin
);

const StockCharts = ({ graphData, darkMode }) => {
  const [priceChartData, setPriceChartData] = useState(null);
  const [volumeChartData, setVolumeChartData] = useState(null);
  const [error, setError] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Will be set to first day option

  // Function to filter data by selected date (for price data)
  const filterPriceDataByDate = (data, selectedDate) => {
    if (selectedDate === 'all') {
      return data; // No filtering for price data
    }

    const targetDate = new Date(selectedDate);
    return data.filter(item => {
      const itemDate = new Date(item.time);
      return isSameDay(itemDate, targetDate);
    });
  };

  // Function to filter data by selected date (for volume data)
  const filterVolumeDataByDate = (data, selectedDate) => {
    if (selectedDate === 'all') {
      // Filter out empty periods (8:00-13:47 and 20:11-23:23)
      return data.filter(item => {
        const time = new Date(item.time);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const timeInMinutes = hours * 60 + minutes;
        
        // Remove data from 8:00 (480) to 13:47 (827)
        const isMorningGap = timeInMinutes >= 480 && timeInMinutes <= 827;
        
        // Remove data from 20:11 (1211) to 23:23 (1403)
        const isEveningGap = timeInMinutes >= 1211 && timeInMinutes <= 1403;
        
        return !(isMorningGap || isEveningGap) && item.volume > 0;
      });
    }

    const targetDate = new Date(selectedDate);
    return data.filter(item => {
      const itemDate = new Date(item.time);
      return isSameDay(itemDate, targetDate) && item.volume > 0;
    });
  };

  // Function to update charts based on selected date
  const updateCharts = (parsedData, dateFilter) => {
    // Process price data with proper date handling
    const filteredPriceData = filterPriceDataByDate(parsedData.price_data, dateFilter);
    const priceLabels = [];
    const priceValues = [];
    
    filteredPriceData.forEach(item => {
      const date = new Date(item.time);
      const formattedTime = format(date, 'HH:mm');
      priceLabels.push(formattedTime);
      priceValues.push(item.close);
    });
    
    // Format price chart data
    setPriceChartData({
      labels: priceLabels,
      datasets: [
        {
          label: 'Stock Price ($)',
          data: priceValues,
          borderColor: darkMode ? 'rgb(34, 197, 94)' : 'rgb(34, 197, 94)', // Green in both modes
          backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
          borderWidth: darkMode ? 3 : 2,
          // Add shadow for glowing effect in dark mode
          borderDash: darkMode ? [] : [],
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
          shadowOffsetX: darkMode ? 0 : 0,
          shadowOffsetY: darkMode ? 0 : 0,
          shadowBlur: darkMode ? 8 : 0,
          shadowColor: darkMode ? 'rgba(34, 197, 94, 0.5)' : 'transparent',
          pointRadius: filteredPriceData.length < 100 ? 2 : 0, // Show points for daily view
          pointHoverRadius: 6,
          fill: true,
          tension: 0.2, // Smoother line
          spanGaps: true, // Connect gaps in data
          pointBackgroundColor: darkMode ? 'rgb(34, 197, 94)' : 'rgb(34, 197, 94)',
          pointBorderColor: darkMode ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)',
          pointBorderWidth: 1,
          pointHoverBackgroundColor: darkMode ? 'rgb(22, 163, 74)' : 'rgb(22, 163, 74)',
          pointHoverBorderColor: darkMode ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)',
          pointHoverBorderWidth: 2,
        },
      ],
    });

    // Process volume data with proper date handling
    const filteredVolumeData = filterVolumeDataByDate(parsedData.volume_data, dateFilter);
    const volumeLabels = [];
    const volumeValues = [];
    
    filteredVolumeData.forEach(item => {
      const date = new Date(item.time);
      const formattedTime = format(date, 'HH:mm');
      volumeLabels.push(formattedTime);
      volumeValues.push(item.volume);
    });
    
    // Calculate average volume for highlighting significant spikes
    const avgVolume = volumeValues.reduce((sum, vol) => sum + vol, 0) / volumeValues.length || 1;
    const volumeThreshold = avgVolume * 2; // Threshold for significant volume
    
    // Format volume chart data with dynamic coloring for significant volume
    setVolumeChartData({
      labels: volumeLabels,
      datasets: [
        {
          label: 'Volume',
          data: volumeValues,
          backgroundColor: volumeValues.map(vol => 
            vol > volumeThreshold ? 
              (darkMode ? 'rgba(99, 102, 241, 0.95)' : 'rgba(79, 70, 229, 0.9)') : 
              (darkMode ? 'rgba(129, 140, 248, 0.7)' : 'rgba(59, 130, 246, 0.6)')
          ), // Highlight significant volume
          borderColor: volumeValues.map(vol => 
            vol > volumeThreshold ? 
              (darkMode ? 'rgb(99, 102, 241)' : 'rgb(79, 70, 229)') : 
              (darkMode ? 'rgb(129, 140, 248)' : 'rgb(59, 130, 246)')
          ),
          // Add shadow effect for bars in dark mode
          shadowOffsetX: darkMode ? 0 : 0,
          shadowOffsetY: darkMode ? 0 : 0,
          shadowBlur: darkMode ? 6 : 0,
          shadowColor: darkMode ? 'rgba(99, 102, 241, 0.5)' : 'transparent',
          borderWidth: volumeValues.map(vol => vol > volumeThreshold ? 2 : 1),
          borderRadius: 2,
          barThickness: filteredVolumeData.length < 100 ? 8 : 'flex',
          maxBarThickness: filteredVolumeData.length < 100 ? 8 : 4,
          categoryPercentage: 1.0,
          barPercentage: 1.0,
        },
      ],
    });
  };

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

      // If we have the proper data structure
      if (parsedData.price_data && parsedData.volume_data) {
        // Extract unique dates from data
        const dateSet = new Set();
        const dayOptions = [];
        
        parsedData.price_data.forEach(item => {
          const date = new Date(item.time);
          const dayKey = format(date, 'yyyy-MM-dd');
          if (!dateSet.has(dayKey)) {
            dateSet.add(dayKey);
            dayOptions.push({
              value: dayKey,
              label: format(date, 'MMM dd'),
              date: date
            });
          }
        });
        
        // Sort dates chronologically
        dayOptions.sort((a, b) => a.date - b.date);
        setDateOptions(dayOptions);
        
        // Set the first date as the default selected date if none selected
        if (dayOptions.length > 0 && selectedDate === null) {
          setSelectedDate(dayOptions[0].value);
        }
        
        // Update charts with either all data or filtered data
        updateCharts(parsedData, selectedDate);
      }
    } catch (err) {
      console.error('Error parsing graph data:', err);
      setError('Failed to parse graph data');
    }
  }, [graphData]);
  
  // Update charts when selected date changes
  useEffect(() => {
    if (graphData && selectedDate !== null) {
      const parsedData = safelyParseJSON(graphData);
      if (parsedData && parsedData.price_data && parsedData.volume_data) {
        updateCharts(parsedData, selectedDate);
        
        // Calculate average volume for annotation
        if (volumeChartOptions.plugins?.annotation?.annotations?.line1) {
          const filteredVolumeData = filterVolumeDataByDate(parsedData.volume_data, selectedDate);
          const volumeValues = filteredVolumeData.map(item => item.volume);
          const avgVolume = volumeValues.reduce((sum, vol) => sum + vol, 0) / volumeValues.length || 0;
          
          // Update the annotation line position
          volumeChartOptions.plugins.annotation.annotations.line1.yMin = avgVolume;
          volumeChartOptions.plugins.annotation.annotations.line1.yMax = avgVolume;
        }
      }
    }
  }, [selectedDate, graphData]);


  const priceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 16,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
          },
          color: darkMode ? '#e5e7eb' : undefined, // Light gray text for dark mode
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Price: $${context.parsed.y.toFixed(2)}`;
          },
        },
        borderColor: darkMode ? 'rgba(99, 102, 241, 0.4)' : undefined,
        borderWidth: darkMode ? 1 : undefined,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: darkMode ? 'rgba(148, 163, 184, 0.1)' : undefined,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 20,
          font: {
            size: 10,
          },
          color: darkMode ? '#94a3b8' : undefined, // Slate-300 for dark mode
        },
        border: {
          color: darkMode ? 'rgba(148, 163, 184, 0.2)' : undefined,
        },
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          },
          color: darkMode ? '#94a3b8' : undefined, // Slate-300 for dark mode
        },
        border: {
          color: darkMode ? 'rgba(148, 163, 184, 0.2)' : undefined,
        },
      },
    },
  };
  
  const volumeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 16,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          font: {
            size: 12,
          },
          color: darkMode ? '#e5e7eb' : undefined, // Light gray text for dark mode
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Volume: ${formatLargeNumber(context.parsed.y)}`;
          },
        },
        borderColor: darkMode ? 'rgba(99, 102, 241, 0.4)' : undefined,
        borderWidth: darkMode ? 1 : undefined,
      },
      // Add annotation plugin for marking average volume
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 0,
            yMax: 0, // Will be dynamically set
            borderColor: darkMode ? 'rgba(148, 163, 184, 0.5)' : 'rgba(107, 114, 128, 0.5)',
            borderWidth: 1,
            borderDash: [6, 4],
            label: {
              content: 'Avg Vol',
              display: true,
              position: 'start',
              backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.7)' : 'rgba(107, 114, 128, 0.7)',
              color: darkMode ? '#f1f5f9' : undefined,
              font: {
                size: 10
              },
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: darkMode ? 'rgba(148, 163, 184, 0.1)' : undefined,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 20,
          font: {
            size: 10,
          },
          color: darkMode ? '#94a3b8' : undefined, // Slate-300 for dark mode
        },
        border: {
          color: darkMode ? 'rgba(148, 163, 184, 0.2)' : undefined,
        },
      },
      y: {
        type: 'logarithmic', // Use logarithmic scale for better spike visibility
        grid: {
          color: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return formatLargeNumber(value);
          },
          padding: 10, // Add padding to prevent clustering
          autoSkip: true,
          maxTicksLimit: 8, // Limit number of ticks to avoid clustering
          color: darkMode ? '#94a3b8' : undefined, // Slate-300 for dark mode
        },
        // Ensure we start near zero but not at zero (which breaks log scale)
        min: 10,
        border: {
          color: darkMode ? 'rgba(148, 163, 184, 0.2)' : undefined,
        },
      },
    },
  };

  if (error) {
    return (
      <div className={`${darkMode ? 'bg-yellow-900/20 border-yellow-500' : 'bg-yellow-50 border-yellow-400'} border-l-4 p-4 mb-8`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className={`h-5 w-5 ${darkMode ? 'text-yellow-500' : 'text-yellow-400'} ${darkMode ? 'glow-sm' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700 shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'bg-white border-gray-100'} rounded-lg shadow-lg border p-6 mb-8`}>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]' : 'text-gray-800'}`}>
          <svg className={`w-5 h-5 mr-2 ${darkMode ? 'text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.7)]' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Market Data Dashboard
        </h3>
        
        {/* Date Filter Buttons */}
        <div className="flex flex-wrap items-center space-x-2 mt-2 md:mt-0">
          {dateOptions.map(date => (
            <button
              key={date.value}
              onClick={() => setSelectedDate(date.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md ${selectedDate === date.value ? (darkMode ? 'bg-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-green-600 text-white') : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
            >
              {date.label}
            </button>
          ))}
          
          <button
            onClick={() => setSelectedDate('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${selectedDate === 'all' 
              ? (darkMode ? 'bg-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-green-600 text-white') 
              : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}
          >
            5d
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Chart */}
        <div className={`${darkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-gray-50 border-gray-100'} rounded-lg p-4 border ${darkMode ? 'shadow-[0_0_15px_rgba(34,197,94,0.2)]' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Stock Price</h4>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {selectedDate === 'all' 
                ? '5-day minute-by-minute data' 
                : `${format(new Date(selectedDate), 'MMM dd, yyyy')} data`}
            </div>
          </div>
          <div className="chart-container h-80"> {/* Height adjusted for horizontal layout */}
            {priceChartData ? (
              <Line data={priceChartData} options={priceChartOptions} height={320} />
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-400 flex flex-col items-center">
                  <svg className={`animate-spin h-8 w-8 ${darkMode ? 'text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.7)]' : 'text-blue-500'} mb-2`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className={darkMode ? 'text-gray-300' : ''}>Loading chart data...</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Volume Chart */}
        <div className={`${darkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-gray-50 border-gray-100'} rounded-lg p-4 border ${darkMode ? 'shadow-[0_0_15px_rgba(99,102,241,0.2)]' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Trading Volume</h4>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2 py-1 mr-2 text-xs font-medium rounded-full ${darkMode ? 'bg-indigo-900/50 text-indigo-300 drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]' : 'bg-indigo-100 text-indigo-800'}`}>
                <span className={`w-2 h-2 mr-1 ${darkMode ? 'bg-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.7)]' : 'bg-indigo-700'} rounded-full`}></span>
                Volume Spike
              </span>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedDate === 'all' 
                  ? '5-day minute-by-minute data' 
                  : `${format(new Date(selectedDate), 'MMM dd, yyyy')} data`}
              </div>
            </div>
          </div>
          <div className="chart-container h-80"> {/* Height matched to price chart for consistency */}
            {volumeChartData ? (
              <Bar data={volumeChartData} options={volumeChartOptions} height={320} />
            ) : (
              <div className="flex items-center justify-center h-48">
                <div className="text-gray-400 flex flex-col items-center">
                  <svg className={`animate-spin h-8 w-8 ${darkMode ? 'text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.7)]' : 'text-blue-500'} mb-2`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className={darkMode ? 'text-gray-300' : ''}>Loading chart data...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCharts;
