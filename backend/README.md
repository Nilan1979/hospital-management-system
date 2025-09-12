# Hospital Management System - Backend

Express.js backend API server for the Hospital Management System.

## Tech Stack
- **Framework:** Express.js 4.18+
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Helmet, CORS, Rate Limiting
- **Logging:** Winston
- **Testing:** Jest + Supertest

## Project Structure
```
backend/
├── config/             # Configuration files
├── controllers/        # Route controllers
├── middleware/         # Custom middleware
├── models/            # MongoDB models
├── routes/            # API routes
├── services/          # Business logic services
├── utils/             # Utility functions
├── uploads/           # File upload storage
└── logs/              # Application logs
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running locally
- Git for version control

### Installation
```bash
cd backend
npm install
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Update the environment variables:
```bash
cp .env.example .env
```

### Development
```bash
npm run dev
```
The server will start on `http://localhost:5000`

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create new doctor
- `GET /api/doctors/:id` - Get doctor by ID
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

## Database Models

### User Roles
- **Admin:** Full system access
- **Doctor:** Patient management, appointments, medical records
- **Nurse:** Patient care, appointment assistance
- **Receptionist:** Appointment scheduling, patient registration

### Core Entities
- Users (Authentication & Authorization)
- Patients (Demographics, Contact Info, Medical History)
- Doctors (Specialization, Availability, Credentials)
- Appointments (Scheduling, Status, Notes)
- Medical Records (Diagnoses, Treatments, Prescriptions)
- Billing (Invoices, Payments, Insurance)

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Rate limiting to prevent abuse
- CORS configuration
- Input validation and sanitization
- Security headers with Helmet
- Session management

## Development Guidelines
- Follow MVC architecture pattern
- Implement proper error handling
- Write comprehensive unit tests
- Use middleware for common functionality
- Follow RESTful API conventions
- Document all API endpoints
- Use environment variables for configuration
