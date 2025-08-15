from pydantic import BaseModel,Field,Json
from typing import List,Any,Dict
class SearchOutput(BaseModel):
    symbol: str = Field(description="Stock symbol as per yfinance (e.g., AAPL, MSFT). Returns 'NA' if no stock symbol is found.")


class NewsSearchResult(BaseModel):
    symbol: str = Field(..., description="Stock symbol")
    headline: List[str] = Field(..., description="List of important news related to the stock")
    summary : List[str] = Field(...,description="Summary of the news report")
    links: List[str] = Field(..., description="List of links associated with the news sources")

class StockAnalysis(BaseModel):
    symbol: str = Field(..., description="The stock symbol.")
    sentiment: str = Field(..., description="Overall market sentiment regarding the stock.")
    recommendation: str = Field(..., description="Final recommendation for the stock, such as buy, sell, or hold.")
    reasoning: str = Field(..., description="The rationale behind the recommendation, highlighting key factors.")
    buy_or_sell_price : str = Field(...,description="Recommend a buy or sell price point.")
    news_summary: str = Field(..., description="A summary of the news and events impacting the stock.")
    stock_data_summary : str = Field(...,description="A brief summary of important stock close price and volume traded which ")
class AgentState(BaseModel):
    query : str
    symbol: str = ""
    graph_data: Any = None
    news_data: List[Dict[str, Any]] = []
    agent_analysis: Dict[str, Any] = {}



