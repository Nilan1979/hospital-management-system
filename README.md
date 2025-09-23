# Hospital Management System

A comprehensive Hospital Management System designed as a learning project to demonstrate full-stack development skills in healthcare applications. This system showcases efficient management of appointments, treatments, users, and inventory through modern web technologies.

## 🏥 Overview

The Hospital Management System is a full-stack web application developed as a portfolio project to demonstrate proficiency in modern web development technologies. This local development project includes four core modules: Appointment Management, Treatment Management, User Management, and Inventory Management. **Note: This is a learning/demonstration project intended for local development only.**

## 🚀 Technology Stack

- **Frontend**: React + Vite + JavaScript with Material-UI (MUI)
- **Backend**: Express.js + Node.js
- **Database**: MongoDB
- **Architecture**: Model-View-Controller (MVC)

## ✨ Core Features

### 🗓️ Appointment Management
- Schedule, reschedule, and cancel appointments
- Patient appointment history tracking
- Doctor availability management
- Real-time appointment status updates
- Calendar view with time slot management
- Automated appointment reminders and notifications

### 🏥 Treatment Management
- Create and manage comprehensive treatment plans
- Track treatment progress and outcomes
- Medical records and prescription management
- Multi-doctor treatment coordination
- Medical document upload and storage
- Treatment analytics and reporting

### 👥 User Management
- Role-based access control (Admin, Doctor, Nurse, Receptionist, Patient)
- Secure user authentication and authorization
- Profile management for all user types
- Doctor specialization and credential tracking
- Patient demographics and medical history
- User activity logging and audit trails

### 📦 Inventory Management
- **Product Management**: Add, edit, and manage medical products with detailed specifications
- **Category Management**: Create hierarchical categories and subcategories for organized inventory
- **Issue Tracking**: Issue products to outpatients and admitted patients with complete audit trails
- **Stock Monitoring**: Real-time stock levels with automated low-stock alerts and expiry warnings
- **Supplier Management**: Track suppliers, purchase orders, and procurement history
- **Department Issues**: Internal transfers and emergency supply management
- **Advanced Reporting**: Comprehensive inventory reports with LKR currency support
- **Mobile Optimization**: Full mobile support for inventory operations on tablets and phones

## 🏗️ Project Structure

```
hospital-management-system/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Main application pages
│   ├── services/          # API service functions
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React context providers
│   ├── utils/             # Utility functions
│   ├── constants/         # Application constants
│   └── assets/            # Static assets
├── server/                # Backend Express application
│   ├── controllers/       # MVC Controllers
│   ├── models/           # MongoDB Models
│   ├── routes/           # Express routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── utils/            # Utility functions
│   ├── services/         # Business logic services
│   └── uploads/          # File upload directory
└── docs/                 # Documentation files
```

## 🔧 Development Phases

1. **Phase 1**: Project setup and basic structure
2. **Phase 2**: User authentication and management
3. **Phase 3**: Core modules development
4. **Phase 4**: Integration and testing
5. **Phase 5**: UI/UX refinement and optimization
6. **Phase 6**: Local deployment and documentation finalization

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm package manager

## 🛠️ Installation & Setup

1. **Navigate to the project directory**
   ```bash
   cd hospital-management-system
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Configure your environment variables
   # MongoDB connection string, JWT secret, etc.
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd server
   npm run dev
   
   # Start frontend development server (in another terminal)
   npm run dev
   ```

## 🔐 Security Features (Development/Learning Focus)

- JWT-based authentication (local development)
- Role-based access control demonstration
- Input sanitization and validation
- Secure password hashing (bcrypt)
- Rate limiting for API endpoints
- Basic security implementations for learning
- Authentication flow demonstrations

## 🧪 Testing

- Unit tests for utility functions
- Integration tests for API endpoints
- Component tests for React components
- End-to-end tests for critical workflows
- Performance testing for database operations
- Security testing for authentication

## 📖 Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Frontend Architecture Guide](./frontend/README.md)
- [Inventory Management Guide](./frontend/INVENTORY_MANAGEMENT_GUIDE.md)
- [Component Architecture](./frontend/src/components/README.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [Testing Strategy](./docs/TESTING_STRATEGY.md)
- [Security Guidelines](./docs/SECURITY_GUIDELINES.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

## 🤝 Contributing

Please read our [Contributing Guidelines](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues during local development, please refer to the [Troubleshooting Guide](./docs/TROUBLESHOOTING.md) for common development problems and solutions.

## 🎯 Learning Objectives & Success Criteria

- ✅ Demonstrate full-stack development skills with modern technologies
- ✅ Implement secure authentication and authorization patterns
- ✅ Create responsive and intuitive user interfaces
- ✅ Practice robust error handling and validation techniques
- ✅ Maintain comprehensive project documentation
- ✅ Build scalable and maintainable code architecture
- ✅ Showcase understanding of healthcare application requirements
- ✅ Implement comprehensive inventory management with LKR currency support
- ✅ Build atomic design component architecture for scalability
- ✅ Create mobile-first responsive healthcare interfaces

## 🎓 Educational Value

This project serves as a comprehensive learning exercise covering:
- **Frontend Development**: React, Material-UI, State Management
- **Backend Development**: Express.js, RESTful APIs, Authentication
- **Database Design**: MongoDB, Schema Design, Data Relationships
- **Security Practices**: Authentication, Authorization, Data Protection
- **Testing**: Unit Tests, Integration Tests, E2E Testing
- **Documentation**: Technical Writing, API Documentation
- **Project Management**: Version Control, Development Workflow

---

**Built with ❤️ as a learning journey in healthcare technology**
