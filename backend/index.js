import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Import configuration
import { connectDB } from './config/database.js';
import { logger } from './config/logger.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import medicationRoutes from './routes/medicineRoutes.js';
import patientadmitRoutes from './routes/patientAdmit.js';

// Import routes (will be created later)
// import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';

// Load environment variables
dotenv.config();


// Connect to MongoDB
connectDB();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 1000, // limit each IP to 1000 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.'
    }
  }
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Hospital Management System API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes (will be added as we create them)
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Hospital Management System API v0.1.0',
    endpoints: {
      health: '/health',
      // auth: '/api/auth',
      // users: '/api/users',
      // appointments: '/api/appointments',
      // treatments: '/api/treatments',
      // inventory: '/api/inventory'
    }
  });
});


// Patient routes
import patientRoutes from './routes/patients.js';
app.use('/api/patients', patientRoutes);


app.use('/medication', medicationRoutes);
app.use('/patientadmit', patientadmitRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`
    }
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    // Try to connect to database
    await connectDB();
    logger.info('✅ Database connected successfully');
  } catch (error) {
    logger.warn('⚠️  Database connection failed, starting server without database:', error.message);
    logger.warn('🔧 Make sure MongoDB is running on localhost:27017');
  }
  
  // Start server regardless of database connection status
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
    logger.info(`🏥 Hospital Management System API v0.1.0`);
    logger.info(`📚 API Documentation: http://localhost:${PORT}/api`);
    logger.info(`🔍 Health Check: http://localhost:${PORT}/health`);
    logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();
