# Hospital Management System - Frontend

## 🏥 Overview

A modern, enterprise-grade Hospital Management System frontend built with React 18, Material-UI, and following industry best practices for scalable healthcare applications.

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-ready authentication system
- Role-based access control
- Protected route implementation
- Session management with localStorage

### 🎨 Modern UI/UX
- Material Design 3 principles
- Fully responsive design
- Atomic design component architecture
- Accessibility (WCAG 2.1) compliant

### 🏗️ Architecture
- Atomic Design pattern implementation
- Clean separation of concerns
- Scalable folder structure
- Design system with consistent tokens
- Reusable component library

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Default Login Credentials
- **Username**: `admin`
- **Password**: `1234`

## 🏗️ Project Architecture

### Atomic Design Structure
```
src/
├── components/
│   ├── atoms/              # Basic UI elements
│   │   ├── Logo.jsx
│   │   ├── FormInput.jsx
│   │   ├── PrimaryButton.jsx
│   │   └── InfoCard.jsx
│   ├── molecules/          # Component combinations
│   │   ├── LoginForm.jsx
│   │   ├── DashboardGrid.jsx
│   │   └── QuickStats.jsx
│   ├── layout/             # Layout components
│   │   ├── AppHeader.jsx
│   │   ├── MainLayout.jsx
│   │   └── FullscreenLayout.jsx
│   └── ProtectedRoute.jsx
├── pages/                  # Page components
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── PatientsPage.jsx
│   └── AppointmentsPage.jsx
├── contexts/               # React Context
│   └── AuthContext.jsx
├── hooks/                  # Custom hooks
│   └── useAuth.js
├── constants/              # App constants
│   ├── app.js
│   └── theme.js
├── theme/                  # Material-UI theme
│   └── index.js
└── assets/                 # Static resources
```

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Latest React with concurrent features
- **TypeScript Ready** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Material-UI (MUI) 5** - Enterprise UI framework

### State Management
- **React Context API** - Built-in state management
- **Custom Hooks** - Reusable stateful logic

### Routing & Navigation
- **React Router 6** - Modern client-side routing
- **Protected Routes** - Authentication-based access
- **Dynamic Navigation** - Role-based menu items

### Styling & Theming
- **Styled Components** - CSS-in-JS styling
- **Material-UI Theme** - Consistent design tokens
- **Responsive Design** - Mobile-first approach

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Building
npm run build        # Build for production
npm run lint         # Run ESLint

# Testing
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Test coverage report
```

## 🎨 Design System

### Color Palette
- **Primary**: #00897b (Medical Teal)
- **Secondary**: #f50057 (Accent Pink)
- **Success**: #4caf50
- **Warning**: #ff9800
- **Error**: #f44336

### Typography
- **Font Family**: Roboto, Helvetica, Arial
- **Scale**: 12px, 14px, 16px, 18px, 24px, 32px
- **Weights**: Light (300), Regular (400), Medium (500), Bold (700)

### Spacing System
Based on 4px grid system:
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

## 🔧 Configuration

### Environment Variables
Create `.env` file in frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=Hospital Management System
VITE_APP_VERSION=1.0.0
```

## 🎯 Module Documentation

### Authentication System
```jsx
// Using authentication
const { user, login, logout, isAuthenticated } = useAuth();

// Protected routes
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

### Component Usage
```jsx
// Atomic components
<PrimaryButton variant="contained" loading={isLoading}>
  Save Changes
</PrimaryButton>

// Layout components
<MainLayout title="Patient Management" showBackButton>
  <YourContent />
</MainLayout>
```

## 🚀 Deployment

### Production Build
```bash
# Build optimized production bundle
npm run build

# Files generated in dist/ directory
# Deploy dist/ contents to your web server
```

## 📚 Additional Documentation

- [Component Architecture Guide](./COMPONENT_ARCHITECTURE.md)
- [Login System Documentation](./LOGIN_README.md)

## 🤝 Contributing

### Development Workflow
1. Follow atomic design principles
2. Use design tokens for styling
3. Write comprehensive tests
4. Update documentation
5. Follow commit conventions

## 📄 License

This project is part of the Hospital Management System - Educational/Commercial License.

---

**Built with ❤️ for healthcare professionals**
