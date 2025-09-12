# Hospital Management System - Frontend

React-based frontend application for the Hospital Management System.

## Tech Stack
- **Framework:** React 19.1.1 with Vite
- **UI Library:** Material-UI 5.14+
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Testing:** Vitest + Testing Library

## Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API service functions
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── utils/              # Utility functions
└── constants/          # Application constants
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Backend server running on port 5000

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```
The application will start on `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues

## Environment Variables
Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Hospital Management System
```

## Features to Implement
- [ ] User Authentication & Authorization
- [ ] Dashboard for different user roles
- [ ] Patient Management
- [ ] Doctor Management  
- [ ] Appointment Scheduling
- [ ] Medical Records
- [ ] Billing & Payments
- [ ] Inventory Management
- [ ] Reports & Analytics

## Development Guidelines
- Follow React best practices
- Use Material-UI components consistently
- Implement proper error handling
- Write unit tests for components
- Use TypeScript for better code quality (future enhancement)
