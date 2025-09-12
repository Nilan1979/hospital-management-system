# Troubleshooting Guide

## Overview
This guide provides comprehensive troubleshooting solutions for common issues that may arise during development, deployment, and operation of the Hospital Management System.

## Table of Contents
1. [Environment Setup Issues](#environment-setup-issues)
2. [Database Connectivity Problems](#database-connectivity-problems)
3. [Authentication & Authorization Issues](#authentication--authorization-issues)
4. [API & Backend Issues](#api--backend-issues)
5. [Frontend React Issues](#frontend-react-issues)
6. [File Upload Problems](#file-upload-problems)
7. [Performance Issues](#performance-issues)
8. [Security-Related Issues](#security-related-issues)
9. [Deployment Issues](#deployment-issues)
10. [Common Error Messages](#common-error-messages)

---

## Environment Setup Issues

### Node.js Version Incompatibility

**Problem**: Application fails to start with Node.js version errors
```
Error: The engine "node" is incompatible with this module
```

**Solutions**:
```bash
# Check current Node.js version
node --version

# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use correct Node.js version
nvm install 18.17.0
nvm use 18.17.0

# Verify version
node --version
```

**Prevention**: Always specify Node.js version in `package.json`:
```json
{
  "engines": {
    "node": ">=16.0.0 <19.0.0",
    "npm": ">=8.0.0"
  }
}
```

### Package Installation Failures

**Problem**: npm install fails with permission or dependency errors

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with correct permissions
npm install

# For permission issues on Linux/Mac
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Environment Variables Not Loading

**Problem**: Application cannot access environment variables

**Diagnostic Steps**:
```bash
# Check if .env file exists
ls -la | grep .env

# Verify .env file content
cat .env

# Check if dotenv is installed
npm list dotenv
```

**Solutions**:
```javascript
// Ensure dotenv is loaded at the top of your main file
require('dotenv').config();

// For custom .env file locations
require('dotenv').config({ path: './config/.env' });

// Debug environment variables
console.log('Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT SET'
});
```

---

## Database Connectivity Problems

### MongoDB Connection Refused

**Problem**: `Connection refused` or `ECONNREFUSED` errors

**Diagnostic Steps**:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check MongoDB logs
sudo journalctl -u mongod -f

# Test connection manually
mongo --host localhost --port 27017
```

**Solutions**:
```bash
# Start MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check MongoDB configuration
sudo nano /etc/mongod.conf

# Restart MongoDB with new configuration
sudo systemctl restart mongod
```

### Authentication Failed

**Problem**: MongoDB authentication errors
```
MongoServerError: Authentication failed
```

**Solutions**:
```javascript
// Correct URI format with credentials
const mongoURI = 'mongodb://username:password@localhost:27017/database_name?authSource=admin';

// For connection debugging
const mongoose = require('mongoose');

mongoose.set('debug', true); // Enable debugging

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Connection string:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    process.exit(1);
  }
};
```

### Slow Database Queries

**Problem**: Database operations are taking too long

**Diagnostic Tools**:
```javascript
// Enable MongoDB profiler
db.setProfilingLevel(2, { slowms: 100 });

// Check slow operations
db.system.profile.find().limit(5).sort({ ts: -1 }).pretty();

// Explain query performance
db.appointments.find({ doctorId: "123" }).explain("executionStats");
```

**Solutions**:
```javascript
// Add appropriate indexes
db.appointments.createIndex({ doctorId: 1, appointmentDate: 1 });
db.users.createIndex({ email: 1 }, { unique: true });
db.treatments.createIndex({ patientId: 1, createdAt: -1 });

// Use aggregation pipeline for complex queries
const pipeline = [
  { $match: { status: 'active' } },
  { $lookup: {
    from: 'users',
    localField: 'doctorId',
    foreignField: '_id',
    as: 'doctor'
  }},
  { $project: {
    appointmentDate: 1,
    'doctor.name': 1,
    'doctor.specialization': 1
  }}
];
```

---

## Authentication & Authorization Issues

### JWT Token Errors

**Problem**: Invalid token or token expiration errors

**Common Error Messages**:
- `JsonWebTokenError: invalid token`
- `TokenExpiredError: jwt expired`
- `JsonWebTokenError: jwt malformed`

**Solutions**:
```javascript
// Proper JWT verification middleware
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: { code: 'NO_TOKEN', message: 'No authorization header provided' }
    });
  }

  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    let errorMessage = 'Invalid token';
    let errorCode = 'INVALID_TOKEN';
    
    if (error.name === 'TokenExpiredError') {
      errorMessage = 'Token has expired';
      errorCode = 'TOKEN_EXPIRED';
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Malformed token';
      errorCode = 'MALFORMED_TOKEN';
    }
    
    return res.status(401).json({
      success: false,
      error: { code: errorCode, message: errorMessage }
    });
  }
};

// Frontend token handling
const handleAuthError = (error) => {
  if (error.response?.status === 401) {
    // Clear stored tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    
    // Redirect to login
    window.location.href = '/login';
  }
};
```

### Session Management Issues

**Problem**: Sessions not persisting or timing out unexpectedly

**Solutions**:
```javascript
// Session configuration debugging
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax' // Adjust based on CORS requirements
  },
  name: 'hospital.session.id'
}));

// Session debugging middleware
app.use((req, res, next) => {
  console.log('Session Debug:', {
    sessionID: req.sessionID,
    session: req.session,
    cookies: req.headers.cookie
  });
  next();
});
```

### Permission Denied Errors

**Problem**: Users getting access denied for actions they should be able to perform

**Debugging Steps**:
```javascript
// Add detailed authorization logging
const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    console.log('Authorization Debug:', {
      userId: req.user?.id,
      userRole: req.user?.role,
      requiredPermission,
      requestPath: req.path,
      requestMethod: req.method
    });

    const userPermissions = await getUserPermissions(req.user.role);
    console.log('User Permissions:', userPermissions);

    if (!hasPermission(userPermissions, requiredPermission, req)) {
      console.log('Permission Denied:', {
        user: req.user?.id,
        required: requiredPermission,
        available: userPermissions
      });
      
      return res.status(403).json({
        success: false,
        error: {
          code: 'PERMISSION_DENIED',
          message: `Required permission: ${requiredPermission}`,
          userRole: req.user?.role,
          availablePermissions: userPermissions.map(p => `${p.resource}:${p.action}`)
        }
      });
    }
    
    next();
  };
};
```

---

## API & Backend Issues

### CORS Issues

**Problem**: Cross-Origin Request Blocked errors in browser

**Solutions**:
```javascript
const cors = require('cors');

// Development CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://hospital-management.vercel.app'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
```

### Rate Limiting Issues

**Problem**: Legitimate requests being blocked by rate limiter

**Solutions**:
```javascript
const rateLimit = require('express-rate-limit');

// Create separate limiters for different endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  keyGenerator: (req) => {
    // Use IP + User ID if authenticated
    return req.user ? `${req.ip}-${req.user.id}` : req.ip;
  },
  handler: (req, res) => {
    console.log('Rate limit exceeded:', {
      ip: req.ip,
      user: req.user?.id,
      endpoint: req.path,
      timestamp: new Date()
    });
    
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.round(req.rateLimit.resetTime / 1000)
      }
    });
  }
});

// Bypass rate limiting for health checks
app.use('/health', (req, res, next) => next());
```

### Memory Leaks

**Problem**: Application memory usage keeps increasing

**Diagnostic Tools**:
```javascript
// Memory monitoring middleware
const memoryMonitor = (req, res, next) => {
  const memBefore = process.memoryUsage();
  
  res.on('finish', () => {
    const memAfter = process.memoryUsage();
    const memDiff = {
      rss: memAfter.rss - memBefore.rss,
      heapUsed: memAfter.heapUsed - memBefore.heapUsed,
      heapTotal: memAfter.heapTotal - memBefore.heapTotal
    };
    
    if (memDiff.heapUsed > 10 * 1024 * 1024) { // 10MB threshold
      console.warn('Memory spike detected:', {
        endpoint: req.path,
        method: req.method,
        memoryDiff: memDiff,
        timestamp: new Date()
      });
    }
  });
  
  next();
};

// Periodic memory reporting
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log('Memory Usage:', {
    rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`
  });
  
  // Alert if memory usage is too high
  if (memUsage.heapUsed > 512 * 1024 * 1024) { // 512MB
    console.error('High memory usage detected!');
  }
}, 60000); // Every minute
```

---

## Frontend React Issues

### Component Not Rendering

**Problem**: React components not displaying or rendering blank

**Debugging Steps**:
```javascript
// Add error boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap your app
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Component debugging
const MyComponent = () => {
  console.log('Component rendering:', { props, state });
  
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounting');
  }, []);

  return <div>Component content</div>;
};
```

### State Management Issues

**Problem**: State updates not working or causing infinite re-renders

**Solutions**:
```javascript
// Proper useState usage
const [appointments, setAppointments] = useState([]);

// Avoid infinite loops
useEffect(() => {
  fetchAppointments();
}, []); // Empty dependency array

// Proper state updates for arrays/objects
const addAppointment = (newAppointment) => {
  setAppointments(prev => [...prev, newAppointment]); // Correct
  // setAppointments(prev => prev.push(newAppointment)); // Wrong - mutates state
};

const updateAppointment = (id, updates) => {
  setAppointments(prev => 
    prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
  );
};

// Use callback for expensive calculations
const expensiveCalculation = useMemo(() => {
  return appointments.reduce((sum, apt) => sum + apt.cost, 0);
}, [appointments]);

// Optimize re-renders with useCallback
const handleSubmit = useCallback((formData) => {
  // Handle form submission
}, [dependencies]);
```

### API Call Issues

**Problem**: API calls failing or not updating UI

**Solutions**:
```javascript
// Proper error handling for API calls
const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Handle authentication error
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return;
          }
          
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Request failed');
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error('API Error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

// Usage
const AppointmentsList = () => {
  const { data: appointments, loading, error } = useApi('/api/appointments');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {appointments?.map(appointment => (
        <div key={appointment.id}>{appointment.reason}</div>
      ))}
    </div>
  );
};
```

---

## File Upload Problems

### File Size Limit Exceeded

**Problem**: Large files failing to upload

**Solutions**:
```javascript
// Backend: Increase limits
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5
  },
  fileFilter: (req, file, cb) => {
    console.log('File upload attempt:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });
    
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  }
});

// Frontend: File validation
const FileUpload = () => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    const oversizedFiles = files.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert(`Files too large: ${oversizedFiles.map(f => f.name).join(', ')}`);
      event.target.value = '';
      return;
    }
    
    // Process valid files
    files.forEach(file => {
      console.log('File selected:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
    });
  };

  return (
    <input
      type="file"
      multiple
      onChange={handleFileChange}
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
    />
  );
};
```

### File Upload Progress Issues

**Problem**: No feedback during file upload

**Solutions**:
```javascript
// Upload with progress tracking
const uploadWithProgress = async (files, onProgress) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.open('POST', '/api/upload');
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    xhr.send(formData);
  });
};

// Usage component
const FileUploadComponent = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files) => {
    setUploading(true);
    
    try {
      await uploadWithProgress(files, setUploadProgress);
      alert('Upload successful!');
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div>
      {uploading && (
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${uploadProgress}%` }}
          />
          <span>{Math.round(uploadProgress)}%</span>
        </div>
      )}
    </div>
  );
};
```

---

## Performance Issues

### Slow Page Loading

**Problem**: Pages take too long to load

**Solutions**:
```javascript
// React optimization
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Appointments = lazy(() => import('./pages/Appointments'));

// App component
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </Suspense>
  );
};

// Optimize expensive operations
const AppointmentsList = ({ appointments }) => {
  const sortedAppointments = useMemo(() => {
    return appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [appointments]);

  return (
    <div>
      {sortedAppointments.map(appointment => (
        <MemoizedAppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

const MemoizedAppointmentCard = memo(({ appointment }) => {
  return <div>{appointment.reason}</div>;
});

// Backend optimization
// Use pagination
const getAppointments = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const appointments = await Appointment
      .find()
      .populate('doctor', 'firstName lastName')
      .populate('patient', 'firstName lastName')
      .sort({ appointmentDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for read-only operations

    const total = await Appointment.countDocuments();

    res.json({
      success: true,
      data: {
        appointments,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

### Database Performance Issues

**Problem**: Database queries are slow

**Solutions**:
```javascript
// Add appropriate indexes
db.appointments.createIndex({ doctorId: 1, appointmentDate: 1 });
db.appointments.createIndex({ patientId: 1, status: 1 });
db.users.createIndex({ email: 1 }, { unique: true });
db.treatments.createIndex({ patientId: 1, createdAt: -1 });

// Use aggregation for complex queries
const getAppointmentStats = async (doctorId, startDate, endDate) => {
  return await Appointment.aggregate([
    {
      $match: {
        doctorId: new mongoose.Types.ObjectId(doctorId),
        appointmentDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalRevenue: { $sum: '$cost' }
      }
    }
  ]);
};

// Use lean() for read-only operations
const getPatients = async () => {
  return await User
    .find({ role: 'patient' })
    .select('firstName lastName email phoneNumber')
    .lean(); // Much faster for read operations
};

// Cache frequently accessed data
const redis = require('redis');
const client = redis.createClient();

const getCachedDoctors = async () => {
  const cacheKey = 'doctors:active';
  
  try {
    const cached = await client.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const doctors = await User.find({ role: 'doctor', isActive: true }).lean();
    await client.setex(cacheKey, 300, JSON.stringify(doctors)); // Cache for 5 minutes
    
    return doctors;
  } catch (error) {
    console.error('Cache error:', error);
    return await User.find({ role: 'doctor', isActive: true }).lean();
  }
};
```

---

## Security-Related Issues

### HTTPS Certificate Problems

**Problem**: SSL certificate errors or HTTPS not working

**Solutions**:
```bash
# Check certificate expiry
openssl x509 -in /path/to/certificate.crt -text -noout | grep "Not After"

# Test SSL configuration
openssl s_client -connect yourdomain.com:443

# Renew Let's Encrypt certificate
sudo certbot renew --dry-run
sudo certbot renew

# Update Nginx configuration
sudo nginx -t
sudo systemctl reload nginx
```

### Session Hijacking Prevention

**Problem**: Suspicious session activity

**Solutions**:
```javascript
// Session security middleware
const sessionSecurity = (req, res, next) => {
  if (req.session && req.user) {
    const currentFingerprint = generateFingerprint(req);
    
    if (req.session.fingerprint && req.session.fingerprint !== currentFingerprint) {
      console.warn('Session hijacking attempt detected:', {
        userId: req.user.id,
        sessionId: req.sessionID,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        storedFingerprint: req.session.fingerprint,
        currentFingerprint
      });
      
      req.session.destroy((err) => {
        if (err) console.error('Session destroy error:', err);
      });
      
      return res.status(401).json({
        success: false,
        error: {
          code: 'SESSION_INVALID',
          message: 'Session security violation detected'
        }
      });
    }
    
    req.session.fingerprint = currentFingerprint;
  }
  
  next();
};

const generateFingerprint = (req) => {
  const crypto = require('crypto');
  
  const components = [
    req.ip,
    req.get('User-Agent'),
    req.get('Accept-Language')
  ].join('|');
  
  return crypto.createHash('sha256').update(components).digest('hex');
};
```

---

## Deployment Issues

### PM2 Process Crashes

**Problem**: Application keeps crashing in production

**Solutions**:
```bash
# Check PM2 logs
pm2 logs hospital-management-backend

# Monitor PM2 processes
pm2 monit

# Restart specific process
pm2 restart hospital-management-backend

# Update PM2 configuration
pm2 delete hospital-management-backend
pm2 start ecosystem.config.js

# Check system resources
htop
df -h
free -h
```

**PM2 Configuration with Error Handling**:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'hospital-management-backend',
    script: './server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
```

### Nginx Configuration Issues

**Problem**: Nginx returning 502/504 errors

**Solutions**:
```bash
# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check if backend is running
curl http://localhost:3001/health

# Restart services
sudo systemctl restart nginx
pm2 restart all
```

**Nginx Troubleshooting Configuration**:
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Logging for debugging
    access_log /var/log/nginx/hospital-access.log combined;
    error_log /var/log/nginx/hospital-error.log warn;

    # API proxy with detailed error handling
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffer settings
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
        
        # Error handling
        proxy_intercept_errors on;
        error_page 502 503 504 /50x.html;
    }

    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

---

## Common Error Messages

### Frontend Error Messages

**Error**: `Cannot read property 'map' of undefined`
```javascript
// Problem: Trying to map over undefined data
appointments.map(apt => <div key={apt.id}>{apt.reason}</div>)

// Solution: Provide default value
(appointments || []).map(apt => <div key={apt.id}>{apt.reason}</div>)

// Or use optional chaining
appointments?.map(apt => <div key={apt.id}>{apt.reason}</div>)
```

**Error**: `Maximum update depth exceeded`
```javascript
// Problem: Infinite re-render loop
const Component = () => {
  const [count, setCount] = useState(0);
  setCount(count + 1); // This runs on every render!
  
  return <div>{count}</div>;
};

// Solution: Use useEffect or event handlers
const Component = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // This runs once after initial render
    setCount(1);
  }, []);
  
  return <div>{count}</div>;
};
```

### Backend Error Messages

**Error**: `UnhandledPromiseRejectionWarning`
```javascript
// Problem: Async function without error handling
app.get('/api/users', async (req, res) => {
  const users = await User.find(); // No error handling
  res.json(users);
});

// Solution: Always handle async errors
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: 'Failed to fetch users' }
    });
  }
});

// Or use async error handler middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
}));
```

**Error**: `ValidationError: Path 'email' is required`
```javascript
// Problem: Missing required fields
const user = new User({ firstName: 'John' }); // Missing email
await user.save();

// Solution: Validate before saving
const createUser = async (userData) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'password'];
  const missingFields = requiredFields.filter(field => !userData[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  const user = new User(userData);
  return await user.save();
};
```

## Emergency Contacts

### Development Team
- **Lead Developer**: developer@hospital.com
- **DevOps Engineer**: devops@hospital.com
- **Database Administrator**: dba@hospital.com

### Production Support
- **24/7 Support Hotline**: +1-800-HOSPITAL
- **Emergency Email**: emergency@hospital.com
- **Incident Management**: https://hospital.statuspage.io

### External Services
- **MongoDB Atlas Support**: https://cloud.mongodb.com/support
- **AWS Support**: https://console.aws.amazon.com/support/
- **Cloudflare Support**: https://support.cloudflare.com

Remember to always check the logs first, create minimal reproducible examples for complex issues, and document any new solutions you discover to help future troubleshooting efforts.
