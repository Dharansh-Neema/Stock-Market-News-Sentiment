# Stock-Sense Docker Setup

This document explains how to run the Stock-Sense application using Docker and Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system

## Environment Variables

Before running the application, make sure to set up your environment variables:

1. Copy the sample environment file:
   ```
   cp .env.sample .env
   ```

2. Edit the `.env` file and add your API keys and other required variables:
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `GOOGLE_API_KEY` - Your Google API key (if using Google's AI services)
   - `FINNHUB_API_KEY` - Your Finnhub API key for stock data

## Running the Application

To start the entire application with a single command:

```bash
docker-compose up -d
```

This will:
- Build the frontend and backend Docker images (if not already built)
- Start the backend service on port 8000
- Start the frontend service on port 80
- Create a network for the services to communicate

## Accessing the Application

- Frontend: http://localhost
- Backend API: http://localhost:8000

## Stopping the Application

To stop the running containers:

```bash
docker-compose down
```

## Viewing Logs

To view logs from the containers:

```bash
# View all logs
docker-compose logs

# View logs for a specific service
docker-compose logs frontend
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f
```

## Rebuilding the Application

If you make changes to the code, you'll need to rebuild the Docker images:

```bash
docker-compose build
```

Or to rebuild and restart in one command:

```bash
docker-compose up -d --build
```

## Troubleshooting

1. If the frontend can't connect to the backend, check that:
   - The backend container is running (`docker-compose ps`)
   - The nginx configuration is correct
   - The API endpoints are correctly configured

2. If you encounter a 405 Method Not Allowed error:
   - Verify that the nginx configuration in `frontend/nginx.conf` is correctly routing to `/api/run-graph`
   - Check that the FastAPI backend has the correct endpoint defined
   - Ensure CORS is properly configured in the FastAPI application

3. If you encounter permission issues with the logs volume:
   - Ensure the logs directory exists and has appropriate permissions
   - Or remove the volume mapping in docker-compose.yml if logs aren't critical

4. If you need to rebuild after making changes:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

5. To view logs for debugging:
   ```bash
   # View backend logs
   docker-compose logs backend
   
   # View frontend logs
   docker-compose logs frontend
   ```
