# Stock-Sense Frontend

A modern, responsive React frontend for the Stock-Sense application. This frontend provides a beautiful UI for analyzing real-time stock data, displaying AI-powered analysis, charts, and news.

## Features

- Real-time stock data visualization with interactive charts
- AI-powered stock analysis and recommendations
- Latest news related to stocks
- Responsive design that works on all devices
- Beautiful UI with smooth animations

## Tech Stack

- React 18
- Chart.js for data visualization
- Tailwind CSS for styling
- Axios for API requests
- date-fns for date formatting

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   or with yarn:
   ```bash
   yarn start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Building for Production

To build the app for production, run:

```bash
npm run build
```

or with yarn:

```bash
yarn build
```

The build files will be in the `build` folder.

## Connecting to Backend

This frontend is configured to connect to the backend API running at http://localhost:8000 by default (using the proxy setting in package.json).

If your backend is running on a different URL, update the proxy setting in `package.json`.

## Usage

1. Enter a stock name or symbol in the search bar (e.g., "Apple stock" or "AAPL")
2. Click "Analyze" to fetch real-time data and AI analysis
3. Explore the price and volume charts, news, and AI recommendations
