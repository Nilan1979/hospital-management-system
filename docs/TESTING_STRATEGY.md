# Testing Strategy

## Overview
This document outlines the comprehensive testing strategy for the Hospital Management System, covering all aspects from unit tests to end-to-end testing.

## Testing Pyramid

```
     /\
    /E2E\     End-to-End Tests (Few)
   /____\
  /      \
 /Integration\ Integration Tests (Some)
/__________\
/            \
/  Unit Tests  \  Unit Tests (Many)
/________________\
```

## Testing Framework and Tools

### Frontend Testing
- **Testing Library**: Jest + React Testing Library
- **Component Testing**: @testing-library/react
- **E2E Testing**: Cypress
- **Visual Testing**: Chromatic (optional)
- **Coverage**: NYC/Istanbul

### Backend Testing
- **Unit Testing**: Jest + Supertest
- **API Testing**: Supertest + Jest
- **Database Testing**: MongoDB Memory Server
- **Load Testing**: Artillery or K6
- **Security Testing**: OWASP ZAP

### Common Tools
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint + Prettier
- **Coverage Reporting**: Codecov

## Test Structure and Organization

### Frontend Test Structure
```
src/
├── components/
│   ├── __tests__/
│   │   ├── Button.test.jsx
│   │   └── Modal.test.jsx
│   └── ...
├── pages/
│   ├── __tests__/
│   │   ├── Dashboard.test.jsx
│   │   └── Login.test.jsx
│   └── ...
├── services/
│   ├── __tests__/
│   │   ├── api.test.js
│   │   └── auth.test.js
│   └── ...
├── utils/
│   ├── __tests__/
│   │   └── helpers.test.js
│   └── ...
└── __mocks__/
    ├── axios.js
    └── localStorage.js
```

### Backend Test Structure
```
server/
├── controllers/
│   ├── __tests__/
│   │   ├── userController.test.js
│   │   └── appointmentController.test.js
│   └── ...
├── models/
│   ├── __tests__/
│   │   ├── User.test.js
│   │   └── Appointment.test.js
│   └── ...
├── routes/
│   ├── __tests__/
│   │   ├── users.test.js
│   │   └── appointments.test.js
│   └── ...
├── services/
│   ├── __tests__/
│   │   └── emailService.test.js
│   └── ...
├── utils/
│   ├── __tests__/
│   │   └── validation.test.js
│   └── ...
└── __mocks__/
    ├── mongodb.js
    └── nodemailer.js
```

## Testing Types and Implementation

### 1. Unit Tests

#### Frontend Unit Tests

**Component Testing Example:**
```javascript
// src/components/__tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct styling based on variant', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

**Utility Function Testing Example:**
```javascript
// src/utils/__tests__/dateHelpers.test.js
import { formatDate, isValidAppointmentTime, calculateAge } from '../dateHelpers';

describe('Date Helpers', () => {
  describe('formatDate', () => {
    test('formats date correctly for display', () => {
      const date = new Date('2025-09-13');
      expect(formatDate(date)).toBe('September 13, 2025');
    });

    test('handles invalid dates', () => {
      expect(formatDate(null)).toBe('Invalid Date');
      expect(formatDate('invalid')).toBe('Invalid Date');
    });
  });

  describe('isValidAppointmentTime', () => {
    test('validates business hours correctly', () => {
      expect(isValidAppointmentTime('09:00')).toBe(true);
      expect(isValidAppointmentTime('17:00')).toBe(true);
      expect(isValidAppointmentTime('08:00')).toBe(false);
      expect(isValidAppointmentTime('18:00')).toBe(false);
    });
  });

  describe('calculateAge', () => {
    test('calculates age correctly', () => {
      const birthDate = new Date('1990-01-01');
      const currentDate = new Date('2025-01-01');
      expect(calculateAge(birthDate, currentDate)).toBe(35);
    });
  });
});
```

#### Backend Unit Tests

**Controller Testing Example:**
```javascript
// server/controllers/__tests__/userController.test.js
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');

jest.mock('../../models/User');

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/users', () => {
    test('creates user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'patient'
      };

      User.create.mockResolvedValue({ id: '123', ...userData });

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.firstName).toBe('John');
    });

    test('returns error for invalid data', async () => {
      const invalidData = { email: 'invalid-email' };

      const response = await request(app)
        .post('/api/users')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });
});
```

**Model Testing Example:**
```javascript
// server/models/__tests__/User.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../User');

describe('User Model', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('should create user with valid data', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'patient'
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).not.toBe(userData.password); // Should be hashed
  });

  test('should not create user with invalid email', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      password: 'password123',
      role: 'patient'
    };

    const user = new User(userData);
    
    await expect(user.save()).rejects.toThrow();
  });
});
```

### 2. Integration Tests

**API Integration Testing:**
```javascript
// server/routes/__tests__/appointments.integration.test.js
const request = require('supertest');
const app = require('../../app');
const { setupTestDatabase, teardownTestDatabase } = require('../../utils/testSetup');

describe('Appointments API Integration', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  describe('Appointment Booking Flow', () => {
    let authToken;
    let doctorId;
    let patientId;

    beforeEach(async () => {
      // Setup test data
      const doctor = await request(app)
        .post('/api/users')
        .send({
          firstName: 'Dr. Smith',
          lastName: 'Medical',
          email: 'doctor@test.com',
          role: 'doctor',
          specialization: 'cardiology'
        });

      doctorId = doctor.body.data.user.id;

      const patient = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Jane',
          lastName: 'Patient',
          email: 'patient@test.com',
          password: 'password123',
          role: 'patient'
        });

      authToken = patient.body.data.token;
      patientId = patient.body.data.user.id;
    });

    test('complete appointment booking flow', async () => {
      // Check doctor availability
      const availability = await request(app)
        .get(`/api/appointments/availability?doctorId=${doctorId}&date=2025-09-15`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(availability.body.data.availableSlots).toContain('09:00-09:30');

      // Book appointment
      const booking = await request(app)
        .post('/api/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          doctorId,
          patientId,
          appointmentDate: '2025-09-15T09:00:00Z',
          timeSlot: '09:00-09:30',
          reason: 'Regular checkup'
        })
        .expect(201);

      expect(booking.body.data.appointment).toBeDefined();

      // Verify appointment in system
      const appointments = await request(app)
        .get('/api/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(appointments.body.data.appointments).toHaveLength(1);
    });
  });
});
```

### 3. End-to-End Tests

**Cypress E2E Tests:**
```javascript
// cypress/e2e/appointment-booking.cy.js
describe('Appointment Booking Flow', () => {
  beforeEach(() => {
    // Setup test data and login
    cy.task('seedDatabase');
    cy.login('patient@test.com', 'password123');
  });

  it('should allow patient to book an appointment', () => {
    // Navigate to appointment booking
    cy.visit('/appointments/book');
    
    // Select doctor
    cy.get('[data-cy=doctor-select]').click();
    cy.get('[data-cy=doctor-option]').first().click();
    
    // Select date
    cy.get('[data-cy=date-picker]').type('2025-09-15');
    
    // Select time slot
    cy.get('[data-cy=time-slot]').contains('09:00-09:30').click();
    
    // Enter reason
    cy.get('[data-cy=appointment-reason]').type('Regular checkup');
    
    // Submit booking
    cy.get('[data-cy=book-appointment-btn]').click();
    
    // Verify success
    cy.get('[data-cy=success-message]').should('contain', 'Appointment booked successfully');
    
    // Verify appointment appears in list
    cy.visit('/appointments');
    cy.get('[data-cy=appointment-list]').should('contain', 'Regular checkup');
  });

  it('should prevent double booking same time slot', () => {
    // Book first appointment
    cy.bookAppointment('2025-09-15', '09:00-09:30');
    
    // Try to book same slot
    cy.visit('/appointments/book');
    cy.selectDoctor('Dr. Smith');
    cy.selectDate('2025-09-15');
    
    // Time slot should not be available
    cy.get('[data-cy=time-slot]').contains('09:00-09:30').should('be.disabled');
  });
});
```

**Custom Cypress Commands:**
```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password }
  }).then((response) => {
    window.localStorage.setItem('authToken', response.body.data.token);
  });
});

Cypress.Commands.add('bookAppointment', (date, timeSlot) => {
  cy.visit('/appointments/book');
  cy.get('[data-cy=doctor-select]').click();
  cy.get('[data-cy=doctor-option]').first().click();
  cy.get('[data-cy=date-picker]').type(date);
  cy.get('[data-cy=time-slot]').contains(timeSlot).click();
  cy.get('[data-cy=appointment-reason]').type('Test appointment');
  cy.get('[data-cy=book-appointment-btn]').click();
});
```

### 4. Performance Tests

**Load Testing with Artillery:**
```yaml
# artillery-config.yml
config:
  target: 'http://localhost:3001'
  phases:
    - duration: 60
      arrivalRate: 10
  payload:
    path: 'test-data.csv'
    fields:
      - email
      - password

scenarios:
  - name: 'Login and browse appointments'
    weight: 50
    flow:
      - post:
          url: '/api/auth/login'
          json:
            email: '{{ email }}'
            password: '{{ password }}'
          capture:
            - json: '$.data.token'
              as: 'authToken'
      - get:
          url: '/api/appointments'
          headers:
            Authorization: 'Bearer {{ authToken }}'

  - name: 'Book appointment'
    weight: 30
    flow:
      - post:
          url: '/api/auth/login'
          json:
            email: '{{ email }}'
            password: '{{ password }}'
          capture:
            - json: '$.data.token'
              as: 'authToken'
      - post:
          url: '/api/appointments'
          headers:
            Authorization: 'Bearer {{ authToken }}'
          json:
            doctorId: '507f1f77bcf86cd799439011'
            appointmentDate: '2025-09-15T10:00:00Z'
            timeSlot: '10:00-10:30'
            reason: 'Load test appointment'
```

## Testing Configuration

### Jest Configuration

**jest.config.js:**
```javascript
module.exports = {
  // Frontend configuration
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/**/*.stories.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.(test|spec).{js,jsx}'
  ]
};
```

**Backend Jest Configuration:**
```javascript
// server/jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/utils/testSetup.js'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/dist/**'
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  }
};
```

### Test Database Setup

**Test Database Utilities:**
```javascript
// server/utils/testSetup.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

const setupTestDatabase = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const teardownTestDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const clearTestDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

module.exports = {
  setupTestDatabase,
  teardownTestDatabase,
  clearTestDatabase
};
```

## CI/CD Pipeline

### GitHub Actions Configuration

**.github/workflows/test.yml:**
```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: frontend

  test-backend:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          cd server
          npm ci
      
      - name: Run backend tests
        run: |
          cd server
          npm run test:coverage
        env:
          MONGODB_URI: mongodb://localhost:27017/hospital_test
          JWT_SECRET: test_secret
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./server/coverage/lcov.info
          flags: backend

  e2e-tests:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          npm ci
          cd server && npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Start application
        run: |
          cd server
          npm start &
          sleep 10
        env:
          MONGODB_URI: mongodb://localhost:27017/hospital_test
          JWT_SECRET: test_secret
      
      - name: Run Cypress tests
        uses: cypress-io/github-action@v5
        with:
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 120
```

## Test Data Management

### Test Fixtures

**Create test data factories:**
```javascript
// utils/testFactories.js
const faker = require('faker');

const createUser = (overrides = {}) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'password123',
  role: 'patient',
  phoneNumber: faker.phone.phoneNumber(),
  ...overrides
});

const createAppointment = (overrides = {}) => ({
  doctorId: faker.datatype.uuid(),
  patientId: faker.datatype.uuid(),
  appointmentDate: faker.date.future(),
  timeSlot: '09:00-09:30',
  reason: faker.lorem.sentence(),
  status: 'scheduled',
  ...overrides
});

module.exports = {
  createUser,
  createAppointment
};
```

## Test Metrics and Reporting

### Coverage Requirements
- **Unit Tests**: Minimum 80% coverage
- **Integration Tests**: All critical API endpoints
- **E2E Tests**: All user workflows
- **Performance Tests**: Response time < 200ms for 95% of requests

### Quality Gates
1. All tests must pass
2. Code coverage must meet minimum thresholds
3. No critical security vulnerabilities
4. Performance benchmarks must be met
5. Linting and formatting checks must pass

## Best Practices

### Writing Good Tests
1. **Follow AAA Pattern**: Arrange, Act, Assert
2. **Test Behavior, Not Implementation**: Focus on what the code does, not how
3. **Keep Tests Independent**: Each test should be able to run in isolation
4. **Use Descriptive Names**: Test names should clearly describe what is being tested
5. **Mock External Dependencies**: Use mocks for databases, APIs, etc.

### Test Maintenance
1. **Regular Review**: Review and update tests as code evolves
2. **Refactor Tests**: Keep test code clean and maintainable
3. **Remove Redundant Tests**: Eliminate duplicate or obsolete tests
4. **Update Test Data**: Keep test data relevant and realistic

This testing strategy provides comprehensive coverage of all system components and ensures high code quality throughout the development lifecycle.
