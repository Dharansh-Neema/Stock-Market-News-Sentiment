# Stock-Sense

Stock-Sense is an intelligent stock analysis platform that provides real-time market insights, news analysis, and AI-driven recommendations. The system combines technical analysis with natural language processing to deliver comprehensive stock market intelligence.

### System Architecture
![arch](./utils/arch.png)


## Features

- Real-time stock price and volume analysis
- News sentiment analysis
- AI-powered stock recommendations
- Modern React frontend with beautiful charts
- RESTful API backend with FastAPI
- Comprehensive technical analysis

## Tech Stack

- **Frontend**: 
  - Modern React with Tailwind CSS
  - Chart.js for interactive visualizations
  - Axios for API requests
- **Backend**: FastAPI, Python
- **Data Processing**: pandas, yfinance
- **AI/ML**: LangChain, Langgraph, OpenAI and Gemini

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Stock-Sense.git
cd Stock-Sense
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
# Create a .env file and add your API keys
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
FINNHUB_API_KEY=your_finnhub_api_key
```

## Running the Application

### Backend
1. Start the FastAPI server:
```bash
uvicorn main:app --reload --port 8000
```
The backend API will be available at `http://localhost:8000`

You can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`

### Frontend

#### Option 1: Streamlit Dashboard
1. Start the Streamlit dashboard:
```bash
streamlit run app.py
```
The dashboard will be available at `http://localhost:8501`

#### Option 2: Modern React Frontend
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The React frontend will be available at `http://localhost:3000`

4. Build for production:
```bash
npm run build
```

## API Endpoints

- `POST /run-graph`: Main endpoint for stock analysis
  - Input: Query string for stock/company analysis
  - Output: Comprehensive analysis including price data, volume data, news, and AI recommendations

## Project Structure

```
Stock-Sense/
├── app.py              # Streamlit frontend
├── main.py            # FastAPI backend
├── graph_workflow.py  # Main analysis workflow
├── pydantic_class.py  # Data models
├── requirements.txt   # Project dependencies
├── frontend/          # React frontend
│   ├── public/        # Static assets
│   ├── src/           # React source code
│   │   ├── components/# React components
│   │   ├── utils/     # Utility functions
│   │   ├── App.js     # Main React component
│   │   └── index.js   # React entry point
│   ├── package.json   # Frontend dependencies
│   └── README.md      # Frontend documentation
└── README.md         # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
