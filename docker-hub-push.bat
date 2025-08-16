@echo off
REM Variables - replace with your Docker Hub username
set DOCKER_USERNAME=your-dockerhub-username
set APP_NAME=stock-sentiment
set BACKEND_TAG=backend
set FRONTEND_TAG=frontend

REM Login to Docker Hub (you'll be prompted for password)
echo Logging in to Docker Hub...
docker login

REM Build the images if they don't exist
echo Building Docker images...
docker-compose build

REM Tag the images for Docker Hub
echo Tagging images for Docker Hub...
docker tag stock-sense-backend:latest %DOCKER_USERNAME%/%APP_NAME%:%BACKEND_TAG%
docker tag stock-sense-frontend:latest %DOCKER_USERNAME%/%APP_NAME%:%FRONTEND_TAG%

REM Push the images to Docker Hub
echo Pushing images to Docker Hub...
docker push %DOCKER_USERNAME%/%APP_NAME%:%BACKEND_TAG%
docker push %DOCKER_USERNAME%/%APP_NAME%:%FRONTEND_TAG%

echo Docker images have been pushed to Docker Hub!
pause
