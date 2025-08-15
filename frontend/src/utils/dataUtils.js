/**
 * Utility functions for handling and parsing API data
 */

/**
 * Safely parses JSON strings or returns the original object if already parsed
 * @param {string|object} data - The data to parse
 * @returns {object} The parsed object
 */
export const safelyParseJSON = (data) => {
  if (!data) return null;
  
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return { error: 'Invalid data format' };
    }
  }
  
  return data; // Already an object
};

/**
 * Formats currency values
 * @param {number} value - The number to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Formats large numbers with K, M, B suffixes
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export const formatLargeNumber = (num) => {
  if (num === undefined || num === null) return 'N/A';
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Gets a color based on the value change (positive or negative)
 * @param {number} change - The change value 
 * @returns {string} CSS color class
 */
export const getChangeColor = (change) => {
  if (change === undefined || change === null) return '';
  
  return change >= 0 ? 'text-green-600' : 'text-red-600';
};

/**
 * Creates a sample test dataset for development
 * @returns {object} Sample stock data
 */
export const getSampleData = () => {
  return {
    "query": "Apple stock",
    "symbol": "AAPL",
    "graph_data": {
      "symbol": "AAPL",
      "price_data": [
        { "time": "2025-04-14 13:30:00", "close": 207.03 },
        { "time": "2025-04-14 13:45:00", "close": 206.76 },
        { "time": "2025-04-14 14:00:00", "close": 206.05 },
        { "time": "2025-04-14 14:15:00", "close": 205.71 },
        { "time": "2025-04-14 14:30:00", "close": 205.02 },
        { "time": "2025-04-14 14:45:00", "close": 204.83 },
        { "time": "2025-04-14 15:00:00", "close": 203.95 },
        { "time": "2025-04-14 15:15:00", "close": 204.12 },
        { "time": "2025-04-14 15:30:00", "close": 203.45 },
        { "time": "2025-04-14 15:45:00", "close": 203.22 },
        { "time": "2025-04-14 16:00:00", "close": 202.88 },
        { "time": "2025-04-14 16:15:00", "close": 201.75 },
        { "time": "2025-04-14 16:30:00", "close": 203.02 },
        { "time": "2025-04-14 16:45:00", "close": 202.18 },
        { "time": "2025-04-14 17:00:00", "close": 203.23 },
        { "time": "2025-04-14 17:15:00", "close": 203.86 },
        { "time": "2025-04-14 17:30:00", "close": 203.89 },
        { "time": "2025-04-14 17:45:00", "close": 204.63 },
        { "time": "2025-04-14 18:00:00", "close": 205.15 },
        { "time": "2025-04-14 18:15:00", "close": 205.79 },
        { "time": "2025-04-14 18:30:00", "close": 205.96 },
        { "time": "2025-04-14 18:45:00", "close": 205.89 },
        { "time": "2025-04-14 19:00:00", "close": 206.46 },
        { "time": "2025-04-14 19:15:00", "close": 205.71 },
        { "time": "2025-04-14 19:30:00", "close": 205.66 },
        { "time": "2025-04-14 19:45:00", "close": 202.59 }
      ],
      "volume_data": [
        { "time": "2025-04-14 13:30:00", "volume": 23988588 },
        { "time": "2025-04-14 13:45:00", "volume": 5461932 },
        { "time": "2025-04-14 14:00:00", "volume": 5093956 },
        { "time": "2025-04-14 14:15:00", "volume": 4308106 },
        { "time": "2025-04-14 14:30:00", "volume": 3819113 },
        { "time": "2025-04-14 14:45:00", "volume": 2538800 },
        { "time": "2025-04-14 15:00:00", "volume": 3056916 },
        { "time": "2025-04-14 15:15:00", "volume": 2411839 },
        { "time": "2025-04-14 15:30:00", "volume": 2813462 },
        { "time": "2025-04-14 15:45:00", "volume": 2571480 },
        { "time": "2025-04-14 16:00:00", "volume": 2099518 },
        { "time": "2025-04-14 16:15:00", "volume": 4316999 },
        { "time": "2025-04-14 16:30:00", "volume": 2162456 },
        { "time": "2025-04-14 16:45:00", "volume": 1417025 },
        { "time": "2025-04-14 17:00:00", "volume": 1953817 },
        { "time": "2025-04-14 17:15:00", "volume": 2491685 },
        { "time": "2025-04-14 17:30:00", "volume": 1789588 },
        { "time": "2025-04-14 17:45:00", "volume": 1472782 },
        { "time": "2025-04-14 18:00:00", "volume": 1674505 },
        { "time": "2025-04-14 18:15:00", "volume": 1272819 },
        { "time": "2025-04-14 18:30:00", "volume": 1636553 },
        { "time": "2025-04-14 18:45:00", "volume": 1389519 },
        { "time": "2025-04-14 19:00:00", "volume": 1906124 },
        { "time": "2025-04-14 19:15:00", "volume": 1930014 },
        { "time": "2025-04-14 19:30:00", "volume": 2153961 },
        { "time": "2025-04-14 19:45:00", "volume": 6255290 }
      ]
    },
    "news_data": [
      {
        "headline": "A Short Strangle Apple Stock Trade Brings High Premiums — And High Risk",
        "summary": "Apple stock is showing higher implied volatility than normal. Option traders can take advantage of that by selling a short strangle."
      },
      {
        "headline": "Apple's pause on the AI race: What to know",
        "summary": "Apple's (AAPL) artificial intelligence (AI) ambitions seem to have been put on pause, with no major AI announcements expected at the company's Worldwide Developers Conference next week."
      },
      {
        "headline": "Jony Ive, Described By Sam Altman As 'The Greatest Designer In The World' Joins OpenAI In $6.5B Deal",
        "summary": "OpenAI announced on May 21 that it had made a significant move by acquiring io, the AI hardware startup co-founded by renowned designer Jony Ive."
      },
      {
        "headline": "Latest News In Cloud AI - Agentuity Launches World's First Agent-Native Cloud Platform",
        "summary": "Agentuity has announced the launch of the world's first agent-native cloud, an infrastructure specifically designed for autonomous AI agents, marking a significant development in the field of Cloud AI."
      },
      {
        "headline": "Apple Challenges EU Order Mandating Ecosystem Access",
        "summary": "The company said forced interoperability could endanger user privacy and increase compliance costs."
      }
    ],
    "agent_analysis": {
      "symbol": "AAPL",
      "sentiment": "Neutral to Slightly Bearish",
      "recommendation": "Hold",
      "reasoning": "While JP Morgan reiterates a 'Buy' rating and some analyses point to a buying opportunity in the sell-off, several factors suggest a cautious approach. The lack of AI announcements at the upcoming WWDC, as reported, is a concern given the current market focus on AI. The news of Jony Ive joining OpenAI also raises questions about Apple's future hardware direction. Additionally, the article highlighting 'Apple Stock's Rebound May Be A Trap' warns of margin and valuation pressures.",
      "buy_or_sell_price": "Hold at current price. Re-evaluate if the price drops significantly below $170, considering a buy if the AI strategy becomes clearer or if regulatory headwinds ease. A sell would be considered if the price rises above $220 without substantial positive news regarding revenue growth or AI advancements.",
      "news_summary": "Apple stock exhibits higher implied volatility, prompting short strangle option strategies. Apple's AI ambitions appear paused, with focus on OS improvements rather than major announcements at WWDC. Jony Ive joins OpenAI in a $6.5B deal to build AI-powered hardware, potentially impacting Apple's hardware strategy.",
      "stock_data_summary": "The stock shows significant volatility throughout the trading day, starting at $207.03 and ending at $202.59, representing a 2.14% decrease. Trading volume was particularly high at market open and close, with a spike of nearly 24M shares traded in the first 15 minutes."
    }
  };
};
