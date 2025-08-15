from fastapi import FastAPI
from pydantic_class import AgentState
from graph_workflow import invoke_graph

app = FastAPI()

@app.get("/")
async def hello():
    return {"Stock-Sense-API"}

@app.post("/run-graph")
async def run_graph(state :AgentState):
    result = invoke_graph(state)
    return result