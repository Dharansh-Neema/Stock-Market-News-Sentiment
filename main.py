from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_class import AgentState
from graph_workflow import invoke_graph

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello():
    return {"Stock-Sense-API"}

@app.post("/run-graph")
async def run_graph(state: AgentState):
    result = invoke_graph(state)
    return result

# Add a new endpoint that accepts a simple query parameter
from fastapi import Body

@app.post("/api/run-graph")
async def run_graph_simple(query: str = Body(..., embed=True)):
    # Convert simple query to AgentState
    state = AgentState(query=query)
    result = invoke_graph(state)
    return result