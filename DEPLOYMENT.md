# Deployment Guide for Stock-Sense

This guide explains how to deploy the Stock-Sense application using Docker Hub and Netlify.

## 1. Push Docker Images to Docker Hub

### Prerequisites
- Docker and Docker Compose installed
- Docker Hub account
- Docker Desktop running

### Steps

1. **Edit the Docker Hub script**
   Open `docker-hub-push.bat` and replace `your-dockerhub-username` with your actual Docker Hub username.

2. **Login to Docker Hub**
   ```
   docker login
   ```
   Enter your Docker Hub credentials when prompted.

3. **Run the Docker Hub push script**
   ```
   docker-hub-push.bat
   ```
   This script will:
   - Build the Docker images
   - Tag them appropriately
   - Push them to Docker Hub

4. **Verify on Docker Hub**
   Go to https://hub.docker.com/r/your-username/stock-sense to verify your images are uploaded.

## 2. Deploy Frontend to Netlify

### Prerequisites
- Netlify account
- Git repository with your code

### Steps

1. **Connect your repository to Netlify**
   - Go to [Netlify](https://www.netlify.com/)
   - Sign in and click "New site from Git"
   - Connect to your Git provider and select the repository
   - Set build settings:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `build`

2. **Set environment variables in Netlify**
   Go to Site settings > Build & deploy > Environment > Environment variables and add:
   ```
   BACKEND_API_URL=https://your-backend-api-url
   ```
   Replace `your-backend-api-url` with the URL where your backend Docker container is hosted.

3. **Deploy the site**
   Click "Deploy site" and wait for the build to complete.

## 3. Deploy Backend Docker Container

You have several options for hosting your backend Docker container:

### Option 1: Cloud Provider (AWS, Azure, GCP)
1. Create a container service (AWS ECS, Azure Container Instances, GCP Cloud Run)
2. Pull your image from Docker Hub:
   ```
   your-dockerhub-username/stock-sense:backend
   ```
3. Configure environment variables for your API keys
4. Set up a domain name and SSL certificate

### Option 2: VPS (DigitalOcean, Linode, etc.)
1. Create a droplet/instance
2. SSH into the server
3. Pull and run your Docker image:
   ```bash
   docker pull your-dockerhub-username/stock-sense:backend
   docker run -d -p 80:8000 -e OPENAI_API_KEY=your_key -e GOOGLE_API_KEY=your_key your-dockerhub-username/stock-sense:backend
   ```

### Option 3: Heroku
1. Install the Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   heroku container:login
   ```
3. Create a Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Push your Docker image:
   ```bash
   docker tag your-dockerhub-username/stock-sense:backend registry.heroku.com/your-app-name/web
   docker push registry.heroku.com/your-app-name/web
   heroku container:release web --app your-app-name
   ```

## 4. Update Netlify Function Configuration

After deploying your backend, update the Netlify function to point to your backend:

1. Go to Netlify site settings
2. Navigate to Build & deploy > Environment
3. Add environment variable:
   ```
   BACKEND_API_URL=https://your-backend-domain.com
   ```
4. Trigger a new deploy

## Troubleshooting

### Docker Hub Issues
- Check Docker Desktop is running
- Verify your Docker Hub credentials
- Check network connectivity

### Netlify Deployment Issues
- Check build logs in Netlify dashboard
- Verify the netlify.toml configuration
- Test the Netlify function locally using Netlify CLI

### API Connection Issues
- Check CORS configuration in your FastAPI backend
- Verify the BACKEND_API_URL is set correctly in Netlify
- Check that your backend is accessible from the internet
