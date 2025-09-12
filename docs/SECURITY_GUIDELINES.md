# Security Guidelines (Local Development)

## Overview
This document outlines security guidelines for the Hospital Management System during local development. While this is a learning project not intended for production use, implementing proper security practices is essential for educational purposes and developing good security habits.

**Important Note: This project is designed for local development only. The security measures outlined here are for learning purposes and should not be considered production-ready without significant additional hardening.**

## Security Framework

### Security Principles
1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Users have minimum necessary permissions
3. **Zero Trust**: Never trust, always verify
4. **Data Minimization**: Collect and store only necessary data
5. **Privacy by Design**: Security built into the system architecture

### Learning-Focused Security Standards
- **OWASP**: Top 10 Web Application Security Risks (educational implementation)
- **Basic Authentication**: JWT and session management practices
- **Input Validation**: XSS and injection prevention techniques
- **Access Control**: Role-based permissions demonstration
- **Data Protection**: Basic encryption and hashing examples

**Note: While we reference healthcare compliance standards for educational context, this local development project does not require HIPAA or other regulatory compliance.**

## Authentication and Authorization

### Multi-Factor Authentication (MFA)

**Implementation:**
```javascript
// server/middleware/mfaMiddleware.js
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const generateMFASecret = (user) => {
  const secret = speakeasy.generateSecret({
    name: `Hospital Management (${user.email})`,
    issuer: 'Hospital Management System',
    length: 32
  });
  
  return {
    secret: secret.base32,
    qrCode: qrcode.toDataURL(secret.otpauth_url)
  };
};

const verifyMFAToken = (token, secret) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2
  });
};
```

### JWT Security Configuration

**Secure JWT Implementation:**
```javascript
// server/config/jwt.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_CONFIG = {
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  algorithm: 'RS256', // Use asymmetric encryption
  issuer: 'hospital-management-system',
  audience: 'hospital-management-client'
};

// Generate RSA key pairs for JWT signing
const generateKeyPair = () => {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
};

const createTokens = (payload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: JWT_CONFIG.accessTokenExpiry,
      algorithm: JWT_CONFIG.algorithm,
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience
    }
  );

  const refreshToken = jwt.sign(
    { userId: payload.userId },
    process.env.JWT_REFRESH_PRIVATE_KEY,
    {
      expiresIn: JWT_CONFIG.refreshTokenExpiry,
      algorithm: JWT_CONFIG.algorithm,
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience
    }
  );

  return { accessToken, refreshToken };
};
```

### Role-Based Access Control (RBAC)

**Permission System:**
```javascript
// server/models/Permission.js
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  resource: {
    type: String,
    required: true,
    enum: ['users', 'appointments', 'treatments', 'inventory', 'reports']
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'read', 'update', 'delete', 'manage']
  },
  conditions: {
    type: Object,
    default: {}
  }
});

// Role-based permissions
const rolePermissions = {
  admin: [
    'users:manage', 'appointments:manage', 'treatments:manage', 
    'inventory:manage', 'reports:read'
  ],
  doctor: [
    'appointments:read', 'appointments:update', 'treatments:manage',
    'patients:read', 'medical-records:manage'
  ],
  nurse: [
    'appointments:read', 'treatments:read', 'treatments:update',
    'patients:read', 'inventory:read'
  ],
  receptionist: [
    'appointments:manage', 'users:read', 'users:create'
  ],
  patient: [
    'appointments:read:own', 'treatments:read:own', 'medical-records:read:own'
  ]
};

module.exports = mongoose.model('Permission', permissionSchema);
```

**Authorization Middleware:**
```javascript
// server/middleware/authorizationMiddleware.js
const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const userPermissions = await getUserPermissions(user.role);
      
      if (!hasPermission(userPermissions, requiredPermission, req)) {
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Insufficient permissions'
          }
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'AUTHORIZATION_ERROR',
          message: 'Authorization check failed'
        }
      });
    }
  };
};

const hasPermission = (userPermissions, requiredPermission, req) => {
  const [resource, action, condition] = requiredPermission.split(':');
  
  const permission = userPermissions.find(p => 
    p.resource === resource && 
    (p.action === action || p.action === 'manage')
  );
  
  if (!permission) return false;
  
  // Check conditions (e.g., 'own' means user can only access their own data)
  if (condition === 'own') {
    return req.params.userId === req.user.id || 
           req.query.patientId === req.user.id;
  }
  
  return true;
};
```

## Data Protection

### Encryption at Rest

**Database Encryption:**
```javascript
// server/config/database.js
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

// Database connection with encryption
const connectDB = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: true,
    sslCA: fs.readFileSync('./ssl/mongodb-ca.pem'),
    authSource: 'admin'
  };

  await mongoose.connect(process.env.MONGODB_URI, options);
};

// Field-level encryption for sensitive data
const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  ssn: {
    type: String,
    encrypted: true // This field will be encrypted
  },
  medicalHistory: {
    type: String,
    encrypted: true
  },
  // ... other fields
});

patientSchema.plugin(encrypt, {
  secret: process.env.ENCRYPTION_KEY,
  encryptedFields: ['ssn', 'medicalHistory']
});
```

### Encryption in Transit

**HTTPS Configuration:**
```javascript
// server/config/https.js
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// HTTPS configuration
const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  // Enable perfect forward secrecy
  ciphers: [
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-RSA-AES128-SHA256',
    'ECDHE-RSA-AES256-SHA384'
  ].join(':'),
  honorCipherOrder: true,
  secureProtocol: 'TLSv1_2_method'
};

// Force HTTPS redirect
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(`https://${req.header('host')}${req.url}`);
  }
  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

const server = https.createServer(httpsOptions, app);
```

## Input Validation and Sanitization

### Comprehensive Validation

**Validation Schemas:**
```javascript
// server/validation/schemas.js
const Joi = require('joi');
const DOMPurify = require('isomorphic-dompurify');

// User registration validation
const userRegistrationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'First name must contain only letters and spaces'
    }),
  
  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required(),
  
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
  
  phoneNumber: Joi.string()
    .pattern(/^\+?[\d\s\-\(\)]+$/)
    .required(),
  
  role: Joi.string()
    .valid('admin', 'doctor', 'nurse', 'receptionist', 'patient')
    .required()
});

// SQL injection prevention
const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    // Remove or escape dangerous characters
    return DOMPurify.sanitize(input)
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }
  return input;
};

// Recursive sanitization for objects
const sanitizeObject = (obj) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'object' ? sanitizeObject(item) : sanitizeInput(item)
      );
    } else {
      sanitized[key] = sanitizeInput(value);
    }
  }
  return sanitized;
};
```

### Rate Limiting and DDoS Protection

**Advanced Rate Limiting:**
```javascript
// server/middleware/rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const slowDown = require('express-slow-down');

// Different rate limits for different endpoints
const createRateLimiter = (options) => {
  return rateLimit({
    store: new MongoStore({
      uri: process.env.MONGODB_URI,
      collectionName: 'rate_limits',
      expireTimeMs: options.windowMs
    }),
    ...options,
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: `Too many requests. Try again in ${options.windowMs / 1000} seconds.`
      }
    }
  });
};

// General API rate limit
const generalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  standardHeaders: true,
  legacyHeaders: false
});

// Stricter limit for authentication endpoints
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  skipSuccessfulRequests: true
});

// File upload rate limiting
const uploadLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 uploads per hour
  keyGenerator: (req) => `${req.ip}-${req.user?.id || 'anonymous'}`
});

// Progressive delay for suspicious activity
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 10, // Allow 10 requests per windowMs without delay
  delayMs: 500, // Add 500ms delay per request after delayAfter
  maxDelayMs: 20000 // Maximum delay of 20 seconds
});
```

## Session Management

### Secure Session Configuration

```javascript
// server/config/session.js
const session = require('express-session');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 // 24 hours
  }),
  secret: process.env.SESSION_SECRET,
  name: 'hospital.session.id', // Don't use default session name
  resave: false,
  saveUninitialized: false,
  rolling: true, // Reset expiry on activity
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict' // CSRF protection
  },
  genid: () => {
    return crypto.randomBytes(32).toString('hex');
  }
};

// Session timeout middleware
const sessionTimeout = (req, res, next) => {
  const now = Date.now();
  const lastActivity = req.session.lastActivity;
  
  if (lastActivity && (now - lastActivity) > (30 * 60 * 1000)) { // 30 minutes
    req.session.destroy((err) => {
      if (err) console.error('Session destruction error:', err);
    });
    
    return res.status(401).json({
      success: false,
      error: {
        code: 'SESSION_EXPIRED',
        message: 'Session has expired due to inactivity'
      }
    });
  }
  
  req.session.lastActivity = now;
  next();
};
```

## File Upload Security

### Secure File Handling

```javascript
// server/middleware/fileUploadMiddleware.js
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const fs = require('fs');

// Allowed file types for medical documents
const ALLOWED_MIME_TYPES = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/tiff': 'tiff',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
};

// File type validation
const fileFilter = (req, file, cb) => {
  const isAllowed = ALLOWED_MIME_TYPES[file.mimetype];
  
  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`), false);
  }
};

// Secure filename generation
const generateSecureFilename = (originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  const randomName = crypto.randomBytes(32).toString('hex');
  return `${randomName}${ext}`;
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.env.UPLOAD_PATH, req.user.id);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const secureFilename = generateSecureFilename(file.originalname);
    cb(null, secureFilename);
  }
});

// File size limits
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB
  files: 5 // Maximum 5 files per request
};

const upload = multer({
  storage,
  fileFilter,
  limits,
  onError: (err, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new Error('File size exceeds 10MB limit'));
    }
    next(err);
  }
});

// Virus scanning (using ClamAV)
const scanFile = async (filePath) => {
  const NodeClam = require('clamscan');
  
  const clamscan = await new NodeClam().init({
    removeInfected: true,
    quarantineInfected: './quarantine/',
    scanLog: './logs/clamscan.log',
    debugMode: false
  });
  
  const scanResult = await clamscan.scanFile(filePath);
  return scanResult;
};

// Complete file upload middleware
const secureFileUpload = (fieldName) => {
  return async (req, res, next) => {
    upload.array(fieldName)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'FILE_UPLOAD_ERROR',
            message: err.message
          }
        });
      }
      
      // Scan uploaded files for viruses
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          try {
            const scanResult = await scanFile(file.path);
            if (scanResult.isInfected) {
              // File was infected and removed by ClamAV
              return res.status(400).json({
                success: false,
                error: {
                  code: 'INFECTED_FILE',
                  message: 'Uploaded file contains malicious content'
                }
              });
            }
          } catch (scanError) {
            console.error('Virus scan error:', scanError);
            // Delete file if scan fails
            await fs.promises.unlink(file.path).catch(console.error);
            
            return res.status(500).json({
              success: false,
              error: {
                code: 'SCAN_ERROR',
                message: 'File security scan failed'
              }
            });
          }
        }
      }
      
      next();
    });
  };
};
```

## Logging and Monitoring

### Security Event Logging

```javascript
// server/utils/securityLogger.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Security-specific logger
const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'hospital-security' },
  transports: [
    new DailyRotateFile({
      filename: 'logs/security-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '90d'
    }),
    new winston.transports.File({ 
      filename: 'logs/security-error.log', 
      level: 'error' 
    })
  ]
});

// Security event types
const SECURITY_EVENTS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  MFA_SUCCESS: 'MFA_SUCCESS',
  MFA_FAILURE: 'MFA_FAILURE',
  DATA_ACCESS: 'DATA_ACCESS',
  DATA_MODIFICATION: 'DATA_MODIFICATION',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',
  SECURITY_POLICY_VIOLATION: 'SECURITY_POLICY_VIOLATION'
};

const logSecurityEvent = (eventType, details, req = null) => {
  const logData = {
    eventType,
    timestamp: new Date().toISOString(),
    ...details
  };

  if (req) {
    logData.ip = req.ip || req.connection.remoteAddress;
    logData.userAgent = req.get('User-Agent');
    logData.userId = req.user?.id;
    logData.sessionId = req.sessionID;
    logData.url = req.originalUrl;
    logData.method = req.method;
  }

  securityLogger.info(logData);

  // Real-time alerting for critical events
  if ([
    SECURITY_EVENTS.UNAUTHORIZED_ACCESS,
    SECURITY_EVENTS.SUSPICIOUS_ACTIVITY,
    SECURITY_EVENTS.SECURITY_POLICY_VIOLATION
  ].includes(eventType)) {
    sendSecurityAlert(logData);
  }
};

const sendSecurityAlert = async (logData) => {
  // Implementation for real-time security alerts
  // Could be email, Slack, PagerDuty, etc.
  console.error('SECURITY ALERT:', logData);
};

module.exports = {
  securityLogger,
  SECURITY_EVENTS,
  logSecurityEvent
};
```

## Privacy and Compliance

### HIPAA Compliance Measures

```javascript
// server/middleware/hipaaComplianceMiddleware.js
const { logSecurityEvent, SECURITY_EVENTS } = require('../utils/securityLogger');

// Audit trail for PHI access
const auditPHIAccess = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Log access to protected health information
    if (containsPHI(data)) {
      logSecurityEvent(SECURITY_EVENTS.DATA_ACCESS, {
        userId: req.user?.id,
        resource: req.route?.path,
        action: req.method,
        dataAccessed: getDataSummary(data)
      }, req);
    }
    
    originalSend.call(this, data);
  };
  
  next();
};

// Check if data contains PHI
const containsPHI = (data) => {
  if (typeof data !== 'string') return false;
  
  const phiIndicators = [
    'ssn', 'medicalRecord', 'diagnosis', 'treatment',
    'prescription', 'patientId', 'medicalHistory'
  ];
  
  return phiIndicators.some(indicator => 
    data.toLowerCase().includes(indicator)
  );
};

// Data minimization - remove unnecessary fields
const minimizeData = (data, userRole) => {
  const fieldPermissions = {
    patient: ['firstName', 'lastName', 'email', 'phoneNumber'],
    nurse: ['firstName', 'lastName', 'email', 'phoneNumber', 'medicalRecords'],
    doctor: ['*'], // Full access
    admin: ['*']
  };
  
  const allowedFields = fieldPermissions[userRole] || [];
  
  if (allowedFields.includes('*')) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => filterObject(item, allowedFields));
  }
  
  return filterObject(data, allowedFields);
};

const filterObject = (obj, allowedFields) => {
  const filtered = {};
  
  allowedFields.forEach(field => {
    if (obj[field] !== undefined) {
      filtered[field] = obj[field];
    }
  });
  
  return filtered;
};

// Consent management
const verifyConsent = async (patientId, dataType, purpose) => {
  const consent = await ConsentModel.findOne({
    patientId,
    dataType,
    purpose,
    isActive: true,
    expiresAt: { $gt: new Date() }
  });
  
  return !!consent;
};

module.exports = {
  auditPHIAccess,
  minimizeData,
  verifyConsent
};
```

## Security Headers and CSP

### Content Security Policy

```javascript
// server/middleware/securityHeadersMiddleware.js
const helmet = require('helmet');

const securityHeaders = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // Only for development
          "https://apis.google.com",
          "https://cdn.jsdelivr.net"
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https:"
        ],
        connectSrc: [
          "'self'",
          "https://api.hospital-management.com"
        ],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        workerSrc: ["'self'"],
        childSrc: ["'none'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        manifestSrc: ["'self'"]
      }
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    frameguard: { action: 'deny' },
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    permittedCrossDomainPolicies: false,
    crossOriginEmbedderPolicy: false
  });
};

module.exports = { securityHeaders };
```

## Incident Response Plan

### Security Incident Handling

```javascript
// server/utils/incidentResponse.js
const { sendNotification } = require('./notifications');
const { securityLogger } = require('./securityLogger');

class SecurityIncident {
  constructor(type, severity, description, affectedResources = []) {
    this.id = require('crypto').randomUUID();
    this.type = type; // 'breach', 'intrusion', 'malware', 'dos', 'unauthorized_access'
    this.severity = severity; // 'low', 'medium', 'high', 'critical'
    this.description = description;
    this.affectedResources = affectedResources;
    this.timestamp = new Date();
    this.status = 'open';
    this.actions = [];
  }

  async escalate() {
    const escalationMatrix = {
      low: ['security-team@hospital.com'],
      medium: ['security-team@hospital.com', 'it-manager@hospital.com'],
      high: ['security-team@hospital.com', 'it-manager@hospital.com', 'ciso@hospital.com'],
      critical: ['security-team@hospital.com', 'it-manager@hospital.com', 'ciso@hospital.com', 'ceo@hospital.com']
    };

    const recipients = escalationMatrix[this.severity] || escalationMatrix.medium;
    
    await sendNotification({
      to: recipients,
      subject: `Security Incident ${this.id} - ${this.severity.toUpperCase()}`,
      template: 'security-incident',
      data: {
        incident: this,
        dashboardUrl: `https://admin.hospital.com/security/incidents/${this.id}`
      }
    });

    this.addAction('escalated', `Incident escalated to: ${recipients.join(', ')}`);
  }

  addAction(action, details) {
    this.actions.push({
      action,
      details,
      timestamp: new Date(),
      user: 'system'
    });
  }

  async containThreat() {
    switch (this.type) {
      case 'unauthorized_access':
        await this.lockAffectedAccounts();
        break;
      case 'malware':
        await this.quarantineAffectedSystems();
        break;
      case 'dos':
        await this.enableDDoSProtection();
        break;
    }
  }

  async lockAffectedAccounts() {
    for (const resource of this.affectedResources) {
      if (resource.type === 'user_account') {
        await UserModel.findByIdAndUpdate(resource.id, { 
          isLocked: true,
          lockReason: `Security incident: ${this.id}`
        });
        
        this.addAction('account_locked', `Account ${resource.id} has been locked`);
      }
    }
  }
}

const handleSecurityIncident = async (type, severity, description, affectedResources) => {
  const incident = new SecurityIncident(type, severity, description, affectedResources);
  
  // Log the incident
  securityLogger.error('Security incident created', {
    incidentId: incident.id,
    type: incident.type,
    severity: incident.severity,
    description: incident.description
  });

  // Immediate actions based on severity
  if (incident.severity === 'critical') {
    await incident.containThreat();
  }

  // Always escalate high and critical incidents
  if (['high', 'critical'].includes(incident.severity)) {
    await incident.escalate();
  }

  // Store incident for tracking
  await IncidentModel.create(incident);
  
  return incident;
};

module.exports = {
  SecurityIncident,
  handleSecurityIncident
};
```

## Security Testing

### Automated Security Scanning

```javascript
// scripts/security-scan.js
const { execSync } = require('child_process');
const fs = require('fs');

// OWASP Dependency Check
const runDependencyCheck = () => {
  console.log('Running OWASP Dependency Check...');
  
  try {
    execSync('dependency-check --project hospital-management --scan ./ --format JSON --out ./security-reports/', {
      stdio: 'inherit'
    });
    console.log('✅ Dependency check completed');
  } catch (error) {
    console.error('❌ Dependency check failed:', error.message);
  }
};

// ESLint Security Plugin
const runSecurityLinting = () => {
  console.log('Running security linting...');
  
  try {
    execSync('eslint . --ext .js --config .eslintrc.security.json --format json --output-file ./security-reports/eslint-security.json', {
      stdio: 'inherit'
    });
    console.log('✅ Security linting completed');
  } catch (error) {
    console.log('⚠️ Security linting found issues - check report');
  }
};

// Custom security checks
const runCustomSecurityChecks = () => {
  const securityIssues = [];

  // Check for hardcoded secrets
  const files = getAllJsFiles('./');
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for potential secrets
    const secretPatterns = [
      /password\s*[:=]\s*['"`][^'"`\s]+['"`]/gi,
      /api[_-]?key\s*[:=]\s*['"`][^'"`\s]+['"`]/gi,
      /secret\s*[:=]\s*['"`][^'"`\s]+['"`]/gi,
      /token\s*[:=]\s*['"`][^'"`\s]{20,}['"`]/gi
    ];

    secretPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        securityIssues.push({
          file,
          issue: 'Potential hardcoded secret',
          matches
        });
      }
    });
  });

  if (securityIssues.length > 0) {
    fs.writeFileSync('./security-reports/custom-security-issues.json', 
      JSON.stringify(securityIssues, null, 2));
    console.log('⚠️ Custom security check found issues');
  } else {
    console.log('✅ Custom security checks passed');
  }
};

// Run all security scans
const main = () => {
  console.log('Starting security scan suite...\n');
  
  // Create reports directory
  if (!fs.existsSync('./security-reports')) {
    fs.mkdirSync('./security-reports');
  }
  
  runDependencyCheck();
  runSecurityLinting();
  runCustomSecurityChecks();
  
  console.log('\n🔒 Security scan suite completed');
  console.log('📊 Check ./security-reports/ for detailed results');
};

main();
```

## Security Checklist

### Pre-Deployment Security Checklist

- [ ] **Authentication & Authorization**
  - [ ] Multi-factor authentication implemented
  - [ ] Strong password policies enforced
  - [ ] Role-based access control configured
  - [ ] JWT tokens use secure algorithms (RS256)
  - [ ] Session management is secure

- [ ] **Data Protection**
  - [ ] Encryption at rest implemented
  - [ ] Encryption in transit (HTTPS/TLS)
  - [ ] Sensitive fields are encrypted
  - [ ] Database access is authenticated
  - [ ] Backup encryption configured

- [ ] **Input Validation**
  - [ ] All inputs are validated and sanitized
  - [ ] SQL injection protection in place
  - [ ] XSS protection implemented
  - [ ] File upload restrictions configured
  - [ ] Rate limiting enabled

- [ ] **Security Headers**
  - [ ] Content Security Policy configured
  - [ ] Security headers implemented
  - [ ] HTTPS redirects working
  - [ ] Cookie security flags set
  - [ ] CORS properly configured

- [ ] **Monitoring & Logging**
  - [ ] Security event logging implemented
  - [ ] Log rotation configured
  - [ ] Security monitoring alerts set up
  - [ ] Incident response plan documented
  - [ ] Audit trails for PHI access

- [ ] **Compliance**
  - [ ] HIPAA requirements met
  - [ ] Privacy policies updated
  - [ ] Consent management implemented
  - [ ] Data retention policies enforced
  - [ ] Right to deletion implemented

## Emergency Procedures

### Security Breach Response

1. **Immediate Actions** (0-1 hour)
   - Identify and contain the threat
   - Preserve evidence
   - Activate incident response team
   - Document initial findings

2. **Assessment** (1-4 hours)
   - Determine scope of breach
   - Identify affected systems/data
   - Assess business impact
   - Notify stakeholders

3. **Containment** (4-24 hours)
   - Implement containment measures
   - Apply security patches
   - Reset compromised credentials
   - Monitor for additional threats

4. **Recovery** (24-72 hours)
   - Restore systems from clean backups
   - Implement additional security measures
   - Validate system integrity
   - Resume normal operations

5. **Post-Incident** (1-2 weeks)
   - Conduct thorough investigation
   - Update security procedures
   - Provide staff training
   - Report to regulatory authorities if required

This security framework provides comprehensive protection for the Hospital Management System while ensuring compliance with healthcare regulations and industry best practices.
