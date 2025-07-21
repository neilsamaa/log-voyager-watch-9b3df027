# Docker Setup Guide for Docker Log Viewer

This guide explains how to containerize and run the Docker Log Viewer application using Docker.

## 📁 Files Overview

- `Dockerfile` - Production build with Nginx
- `Dockerfile.dev` - Development build with hot reload
- `docker-compose.yml` - Multi-service orchestration
- `nginx.conf` - Nginx configuration for production
- `.dockerignore` - Files to exclude from Docker build

## 🚀 Quick Start

### Option 1: Docker Run Commands

#### Production Build
```bash
# Build the production image
docker build -t docker-log-viewer:latest .

# Run the production container
docker run -d \
  --name docker-log-viewer-prod \
  -p 3000:80 \
  docker-log-viewer:latest

# Access the application at http://localhost:3000
```

#### Development Build
```bash
# Build the development image
docker build -f Dockerfile.dev -t docker-log-viewer:dev .

# Run the development container with hot reload
docker run -d \
  --name docker-log-viewer-dev \
  -p 8080:8080 \
  -v $(pwd):/app \
  -v /app/node_modules \
  docker-log-viewer:dev

# Access the application at http://localhost:8080
```

### Option 2: Docker Compose (Recommended)

#### Production Environment
```bash
# Start production services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Development Environment
```bash
# Start development services with hot reload
docker-compose --profile dev up -d

# View logs
docker-compose --profile dev logs -f docker-log-viewer-dev

# Stop development services
docker-compose --profile dev down
```

## 🔧 Configuration Options

### Environment Variables

You can customize the application using environment variables:

```bash
# Development
VITE_HOST=0.0.0.0
VITE_PORT=8080
NODE_ENV=development

# Production
NODE_ENV=production
```

### Port Mapping

- **Production**: `localhost:3000` → Container port `80`
- **Development**: `localhost:8080` → Container port `8080`

## 📊 Health Checks

Both containers include health checks:

```bash
# Check container health
docker ps

# View health check logs
docker inspect docker-log-viewer-prod | grep -A 5 Health
```

## 🔍 Useful Commands

### Container Management
```bash
# List running containers
docker ps

# View container logs
docker logs docker-log-viewer-prod

# Execute commands in running container
docker exec -it docker-log-viewer-prod sh

# Remove container
docker rm -f docker-log-viewer-prod

# Remove image
docker rmi docker-log-viewer:latest
```

### Build Optimization
```bash
# Build with no cache
docker build --no-cache -t docker-log-viewer:latest .

# Build multi-platform image
docker buildx build --platform linux/amd64,linux/arm64 -t docker-log-viewer:latest .

# View image details
docker image inspect docker-log-viewer:latest
```

### Volume Management
```bash
# Create named volume for development
docker volume create docker-log-viewer-node-modules

# Run dev container with named volume
docker run -d \
  --name docker-log-viewer-dev \
  -p 8080:8080 \
  -v $(pwd):/app \
  -v docker-log-viewer-node-modules:/app/node_modules \
  docker-log-viewer:dev
```

## 🌐 Production Deployment

### Using Docker Compose with Traefik
```yaml
# Add to your existing docker-compose.yml
version: '3.8'
services:
  traefik:
    image: traefik:v2.10
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command:
      - --providers.docker=true
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
```

### Using with Custom Domain
```bash
# Update the Traefik labels in docker-compose.yml
labels:
  - "traefik.http.routers.docker-log-viewer.rule=Host(\`your-domain.com\`)"
```

## 🔒 Security Considerations

1. **Nginx Security Headers**: Already configured in `nginx.conf`
2. **Non-root User**: Consider adding a non-root user to Dockerfile
3. **Secret Management**: Use Docker secrets for sensitive data
4. **Network Isolation**: Use custom networks as shown in compose file

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   lsof -i :3000
   
   # Use different port
   docker run -p 3001:80 docker-log-viewer:latest
   ```

2. **Permission Issues** (Linux)
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Build Failures**
   ```bash
   # Clean Docker system
   docker system prune -af
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

### Logs and Debugging
```bash
# View detailed build logs
docker-compose up --build

# Debug container
docker run -it --rm docker-log-viewer:latest sh

# Check nginx configuration
docker exec docker-log-viewer-prod nginx -t
```

## 📈 Performance Optimization

1. **Multi-stage Build**: Already implemented in Dockerfile
2. **Gzip Compression**: Enabled in nginx.conf
3. **Static Asset Caching**: Configured for 1 year
4. **Health Checks**: Ensure container reliability

## 🎯 Next Steps

1. Set up CI/CD pipeline with GitHub Actions
2. Configure monitoring with Prometheus/Grafana
3. Implement log aggregation with ELK stack
4. Add SSL/TLS certificates for HTTPS
5. Set up automated backups

---

**Happy Dockerizing! 🐳**