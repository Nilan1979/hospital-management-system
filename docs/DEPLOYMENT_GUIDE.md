# Local Development Setup Guide

## Overview
This guide provides comprehensive instructions for setting up the Hospital Management System on your local laptop for development and learning purposes. **Note: This project is designed for local development only and is not intended for production deployment.**

## Prerequisites

### System Requirements
- **Operating System**: Windows 10/11, macOS, or Linux
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: Minimum 5GB available space
- **CPU**: Any modern processor

### Software Requirements
- Node.js v18+ and npm
- MongoDB v5.0+ (Community Edition)
- Git for version control
- VS Code or your preferred code editor
- MongoDB Compass (optional, for database visualization)

## Local Environment Setup

### 1. Install Required Software

#### Node.js Installation
**Windows:**
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Verify installation: `node --version` and `npm --version`

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

**Linux:**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### MongoDB Installation
**Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and choose "Complete" setup
3. Install MongoDB as a service
4. Optionally install MongoDB Compass for GUI

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Project Setup

#### Navigate to Project Directory
```bash
cd "d:\Education\Programming\Web\Projects\Project 7 - Hospitap Management System\hospital-management-system"
```

#### Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

#### Environment Configuration
```bash
# Copy environment template
copy .env.example .env  # Windows
# cp .env.example .env   # macOS/Linux

# Edit .env file with your local configuration
```

#### Start Development Servers
```bash
# Terminal 1: Start MongoDB (if not running as service)
mongod

# Terminal 2: Start backend server
cd server
npm run dev

# Terminal 3: Start frontend development server
npm run dev
```

### 3. Development Tools Setup

#### VS Code Extensions (Recommended)
Install these helpful extensions for better development experience:
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code
- Thunder Client (for API testing)
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

#### MongoDB Compass Setup
1. Download MongoDB Compass from [mongodb.com](https://www.mongodb.com/products/compass)
2. Install and connect to `mongodb://localhost:27017`
3. Create a new database named `hospital_management`

#### Browser Development Tools
- Install React Developer Tools extension
- Install Redux DevTools extension (if using Redux)
- Consider using Chrome/Firefox for better debugging capabilities

## Environment Configuration

### Environment Variables

Create `.env` file in the project root:

```bash
# Application (Local Development)
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database (Local MongoDB)
MONGODB_URI=mongodb://localhost:27017/hospital_management
MONGODB_TEST_URI=mongodb://localhost:27017/hospital_management_test

# Authentication (Development Keys - Generate your own for security)
JWT_SECRET=your_local_development_jwt_secret_key_here
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_local_refresh_token_secret_here

# Email Service (Optional - for testing notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-test-email@gmail.com
SMTP_PASS=your-app-password

# File Upload (Local Development)
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760  # 10MB

# Security (Development Settings)
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW=900000  # 15 minutes
RATE_LIMIT_MAX=1000  # Higher limit for development

# Logging (Local Development)
LOG_LEVEL=debug
LOG_FILE=./logs/app.log

# Development Features
DEBUG_MODE=true
ENABLE_CORS=true
```

### MongoDB Configuration

```bash
# Create MongoDB configuration
sudo nano /etc/mongod.conf
```

```yaml
# mongod.conf
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1

security:
  authorization: enabled

processManagement:
  fork: true
  pidFilePath: /var/run/mongodb/mongod.pid
```

### Create MongoDB Users
```bash
# Start MongoDB
sudo systemctl start mongod

# Create admin user
mongo
> use admin
> db.createUser({
    user: "admin",
    pwd: "secure_admin_password",
    roles: ["root"]
  })

# Create application user
> use hospital_management
> db.createUser({
    user: "hospital_app",
    pwd: "secure_app_password",
    roles: ["readWrite"]
  })
> exit
```

## Local Development Scripts

### Package.json Scripts Setup

Add these scripts to your `package.json` files for easier development:

**Root package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "test": "jest",
    "test:watch": "jest --watch",
    "server": "cd server && npm run dev",
    "start:all": "concurrently \"npm run server\" \"npm run dev\""
  }
}
```

**Server package.json:**
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --watchAll=false",
    "test:watch": "jest --watch"
  }
}
```

### Concurrent Development
Install concurrently to run both servers with one command:
```bash
npm install --save-dev concurrently
npm run start:all  # Runs both frontend and backend
```

## Nginx Configuration

### SSL Certificate Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com
```

### Nginx Virtual Host

Create `/etc/nginx/sites-available/hospital-management`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # Serve static files
    location / {
        root /opt/hospital-app/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # File upload limits
    client_max_body_size 10M;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### Enable Nginx Configuration
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/hospital-management /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
# Multi-stage build
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci --only=production
RUN cd server && npm ci --only=production && cd ..

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Install PM2
RUN npm install -g pm2

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/ecosystem.config.js ./

# Create non-root user
RUN addgroup -g 1001 -S hospital && \
    adduser -S hospital -u 1001

# Change ownership
RUN chown -R hospital:hospital /app
USER hospital

EXPOSE 3001

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secure_password
      MONGO_INITDB_DATABASE: hospital_management
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - hospital-network

  app:
    build: .
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://hospital_app:app_password@mongodb:27017/hospital_management
    depends_on:
      - mongodb
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    networks:
      - hospital-network

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    networks:
      - hospital-network

volumes:
  mongodb_data:

networks:
  hospital-network:
    driver: bridge
```

## Monitoring and Logging

### System Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Monitor PM2 processes
pm2 monit

# Check system resources
htop
```

### Log Management
```bash
# Configure log rotation
sudo nano /etc/logrotate.d/hospital-app
```

```
/opt/hospital-app/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}
```

## Backup and Recovery

### Database Backup
```bash
#!/bin/bash
# Create backup script
cat > /opt/hospital-app/scripts/backup.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/opt/backups/hospital-management"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="hospital_management_${DATE}"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create MongoDB backup
mongodump --uri="mongodb://hospital_app:app_password@localhost:27017/hospital_management" --out="$BACKUP_DIR/$BACKUP_NAME"

# Compress backup
tar -czf "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" -C "$BACKUP_DIR" "$BACKUP_NAME"
rm -rf "$BACKUP_DIR/$BACKUP_NAME"

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_NAME}.tar.gz"
EOF

chmod +x /opt/hospital-app/scripts/backup.sh
```

### Scheduled Backups
```bash
# Add to crontab
sudo crontab -e

# Add this line for daily backups at 2 AM
0 2 * * * /opt/hospital-app/scripts/backup.sh >> /var/log/hospital-backup.log 2>&1
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   sudo netstat -tulpn | grep :3001
   sudo kill -9 <PID>
   ```

2. **MongoDB connection issues**
   ```bash
   sudo systemctl status mongod
   sudo journalctl -u mongod
   ```

3. **PM2 process crashes**
   ```bash
   pm2 logs
   pm2 restart all
   ```

4. **Nginx configuration errors**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

### Health Checks

Create health check endpoints and monitoring scripts to ensure system availability.

## Security Checklist

- [ ] SSL certificates installed and configured
- [ ] Firewall configured (UFW recommended)
- [ ] MongoDB authentication enabled
- [ ] Application running as non-root user
- [ ] Regular security updates scheduled
- [ ] Backup system tested and verified
- [ ] Monitoring and alerting configured
- [ ] Rate limiting implemented
- [ ] Security headers configured in Nginx

## Performance Optimization

1. **Database Indexing**
   - Create indexes for frequently queried fields
   - Monitor query performance with MongoDB profiler

2. **Caching**
   - Implement Redis for session storage
   - Use CDN for static assets

3. **Load Balancing**
   - Configure multiple application instances
   - Use Nginx load balancing for high traffic

This deployment guide should be updated as the infrastructure requirements evolve.
