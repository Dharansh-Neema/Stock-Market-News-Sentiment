# VM Deployment Guide for Stock-Sense

This guide explains how to deploy the Stock-Sense application on a single VM using Docker and Docker Compose.

## Prerequisites

- A VM with Docker and Docker Compose installed
- Access to your Docker Hub account
- Your Docker Hub images pushed and available

## Deployment Steps

### 1. Set Up Environment Variables

1. Create a `.env` file on your VM:

```bash
# SSH into your VM
ssh user@your-vm-ip

# Create .env file
nano .env
```

2. Add the required environment variables:

```
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
# Add any other required environment variables
```

### 2. Create Docker Compose File

1. Create a `docker-compose.yml` file:

```bash
nano docker-compose.yml
```

2. Add the following content (replace YOUR_DOCKERHUB_USERNAME with your actual username):

```yaml
version: '3.8'

services:
  # Backend service
  backend:
    image: YOUR_DOCKERHUB_USERNAME/stock-sense:backend
    container_name: stock-sentiment-backend
    restart: unless-stopped
    ports:
      - "8000:8000"
    volumes:
      - ./logs:/app/logs
    env_file:
      - .env
    networks:
      - stock-sense-network

  # Frontend service
  frontend:
    image: YOUR_DOCKERHUB_USERNAME/stock-sense:frontend
    container_name: stock-sentiment-frontend
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - stock-sense-network

networks:
  stock-sense-network:
    driver: bridge
```

### 3. Create Logs Directory

```bash
mkdir -p logs
chmod 777 logs
```

### 4. Pull and Run the Docker Images

```bash
# Pull the images
docker-compose pull

# Start the services
docker-compose up -d
```

### 5. Verify Deployment

1. Check if containers are running:

```bash
docker-compose ps
```

2. Check logs for any issues:

```bash
# Backend logs
docker-compose logs backend

# Frontend logs
docker-compose logs frontend
```

3. Access your application:
   - Frontend: http://your-vm-ip
   - Backend API: http://your-vm-ip:8000

## Networking Configuration

### Firewall Settings

Make sure your VM's firewall allows traffic on ports 80 (HTTP) and 8000 (API):

```bash
# For Ubuntu/Debian
sudo ufw allow 80/tcp
sudo ufw allow 8000/tcp
sudo ufw reload

# For CentOS/RHEL
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=8000/tcp
sudo firewall-cmd --reload
```

### Domain Configuration (Optional)

If you have a domain name, you can configure it to point to your VM:

1. Add DNS A records for your domain pointing to your VM's IP address
2. Consider setting up SSL with Let's Encrypt:

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com
```

## Maintenance

### Updating the Application

When you have new Docker images:

```bash
# Pull the latest images
docker-compose pull

# Restart the services
docker-compose down
docker-compose up -d
```

### Monitoring

Monitor your containers:

```bash
# View resource usage
docker stats

# Check disk space
df -h
```

### Backup

Backup your environment variables and logs:

```bash
# Backup .env file
cp .env .env.backup

# Backup logs
tar -czvf logs_backup.tar.gz logs/
```

## Troubleshooting

### Container Issues

If containers fail to start:

```bash
# Check detailed logs
docker-compose logs --tail=100 backend
docker-compose logs --tail=100 frontend

# Restart containers
docker-compose restart
```

### API Connection Issues

If the frontend can't connect to the backend:

1. Verify both containers are running
2. Check the nginx configuration in the frontend container
3. Ensure the backend API is accessible on port 8000

### Permission Issues

If you encounter permission issues with the logs volume:

```bash
sudo chown -R 1000:1000 ./logs
```
