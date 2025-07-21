# 🐳 Docker Log Viewer

A beautiful, real-time web interface for monitoring Docker container logs. Built with React, TypeScript, and Tailwind CSS.

![Docker Log Viewer](https://img.shields.io/badge/Docker-Log%20Viewer-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## ✨ Features

- 🔍 **Container Selection** - Browse and select from available Docker containers
- ⚡ **Real-time Log Streaming** - Live log updates with automatic scrolling
- 🎯 **Smart Filtering** - Search through logs and filter by severity level
- 📊 **Log Level Indicators** - Color-coded severity levels (Error, Warning, Info, Debug)
- ⏰ **Timestamp Control** - Toggle timestamp display on/off
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 📁 **Export Functionality** - Download logs as text files
- 🎨 **Professional UI** - Dark theme optimized for log reading
- 🚀 **Auto-scroll** - Automatically follow new log entries
- 🔄 **Container Status** - Real-time container status indicators

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React hooks
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd docker-log-viewer

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:8080
```

### Docker Deployment

#### Option 1: Docker Compose (Recommended)

```bash
# Production build
docker-compose up -d

# Development with hot reload
docker-compose --profile dev up -d
```

#### Option 2: Docker Build & Run

```bash
# Build production image
docker build -t docker-log-viewer .

# Run container
docker run -d -p 3000:80 docker-log-viewer
```

See [DOCKER_SETUP.md](./DOCKER_SETUP.md) for detailed Docker instructions.

## 📖 Usage

### Getting Started

1. **Select a Container**: Choose from the list of available Docker containers
2. **Start Streaming**: Click the "Start" button to begin real-time log streaming  
3. **Filter Logs**: Use the search box or log level filter to find specific entries
4. **Control Display**: Toggle timestamps and auto-scroll as needed
5. **Export Logs**: Download filtered logs as a text file

### Interface Overview

- **Container Selector**: Top section for choosing which container to monitor
- **Log Controls**: Middle section with streaming controls and filters
- **Log Viewer**: Bottom section displaying the actual log entries
- **Status Indicators**: Real-time status of containers and streaming state

### Keyboard Shortcuts

- **Ctrl/Cmd + F**: Focus search box
- **Space**: Toggle streaming (when log viewer is focused)
- **Escape**: Clear search or stop streaming

## 🔧 Configuration

### Environment Variables

```bash
# Development
VITE_HOST=0.0.0.0
VITE_PORT=8080
NODE_ENV=development

# Production  
NODE_ENV=production
```

### Customization

The application uses a design system defined in:
- `src/index.css` - CSS custom properties for colors and themes
- `tailwind.config.ts` - Tailwind CSS configuration

## 🏗️ Project Structure

```
docker-log-viewer/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Shadcn/ui components
│   │   ├── ContainerSelector.tsx
│   │   ├── LogControls.tsx
│   │   └── LogViewer.tsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   └── main.tsx            # Application entry point
├── public/                  # Static assets
├── docker-compose.yml       # Docker orchestration
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
└── nginx.conf              # Nginx configuration
```

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Docker
docker-compose up -d              # Start production
docker-compose --profile dev up   # Start development
docker-compose down               # Stop services
```

## 🌐 Deployment

### Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy with Docker**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application** at `http://localhost:3000`

### Cloud Deployment

The application can be deployed to any platform that supports Docker:

- **AWS**: ECS, EKS, or Elastic Beanstalk
- **Google Cloud**: Cloud Run or GKE  
- **Azure**: Container Instances or AKS
- **DigitalOcean**: App Platform or Droplets
- **Heroku**: Container Registry

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test them
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use the existing design system and component patterns
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📋 Roadmap

- [ ] **Real Docker Integration** - Connect to actual Docker daemon API
- [ ] **Authentication** - Add user authentication and authorization
- [ ] **Multi-host Support** - Monitor containers across multiple Docker hosts
- [ ] **Log Persistence** - Save and search historical logs
- [ ] **Alerting System** - Set up alerts for error patterns
- [ ] **Performance Metrics** - Add container performance monitoring
- [ ] **Themes** - Light/dark theme toggle
- [ ] **WebSocket Support** - Real-time updates via WebSocket connection

## 🐛 Known Issues

- Currently uses simulated data (not connected to real Docker API)
- Log streaming simulation may vary in timing
- Export feature downloads simulated data

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for the Docker community**
