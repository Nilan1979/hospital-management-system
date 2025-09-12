# Contributing Guidelines

## Welcome to the Learning Project! 👋

This Hospital Management System is primarily a personal learning and portfolio project. While it's designed as a single-developer project, these contribution guidelines serve as documentation of professional development practices and can be helpful if you're studying the codebase or using it as a learning resource.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Requirements](#testing-requirements)
8. [Documentation Guidelines](#documentation-guidelines)
9. [Security Considerations](#security-considerations)
10. [Getting Help](#getting-help)

## Code of Conduct

### Our Pledge
We are committed to creating a welcoming and inclusive environment for all contributors, regardless of background, identity, or experience level.

### Expected Behavior
- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Public or private harassment
- Publishing others' private information without permission
- Any conduct that would be inappropriate in a professional setting

## Getting Started

### Prerequisites
Before contributing, ensure you have:
- Node.js 18+ installed
- MongoDB running locally
- Git configured with your name and email
- A GitHub account

### Setting Up Development Environment

1. **Local Development Setup**
   ```bash
   # Navigate to project directory (already exists locally)
   cd "d:\Education\Programming\Web\Projects\Project 7 - Hospitap Management System\hospital-management-system"
   ```

2. **Git Workflow (For Learning/Portfolio)**
   ```bash
   # Work with feature branches for organization
   git checkout -b feature/your-feature-name
   git add .
   git commit -m "feat: implement new feature"
   git checkout main
   git merge feature/your-feature-name
   ```

3. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your local configuration
   nano .env
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1: Start backend
   cd server
   npm run dev
   
   # Terminal 2: Start frontend
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention
Use descriptive branch names with prefixes:
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

**Examples:**
```
feature/appointment-booking
bugfix/user-authentication
hotfix/security-patch
docs/api-documentation
refactor/database-queries
test/appointment-validation
```

### Development Process

1. **Create Feature Branch**
   ```bash
   # Ensure you're on main and up to date
   git checkout main
   git pull upstream main
   
   # Create and switch to feature branch
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow coding standards
   - Add appropriate tests
   - Update documentation as needed

3. **Commit Your Changes**
   ```bash
   # Stage changes
   git add .
   
   # Commit with descriptive message
   git commit -m "feat: add appointment booking functionality"
   ```

4. **Keep Branch Updated**
   ```bash
   # Regularly sync with upstream
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push and Create Pull Request**
   ```bash
   # Push to your fork
   git push origin feature/your-feature-name
   
   # Create PR via GitHub UI
   ```

## Coding Standards

### JavaScript/React Standards

#### General Rules
- Use ES6+ features (arrow functions, destructuring, etc.)
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names
- Keep functions small and focused (max 20-30 lines)
- Add JSDoc comments for complex functions

#### React Best Practices
```javascript
// ✅ Good - Functional component with hooks
const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEdit = useCallback(() => {
    setIsEditing(true);
    onEdit(appointment.id);
  }, [appointment.id, onEdit]);

  return (
    <div className="appointment-card">
      <h3>{appointment.reason}</h3>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

// ❌ Avoid - Class component for simple cases
class AppointmentCard extends React.Component {
  // ... unnecessary complexity for simple component
}
```

#### Naming Conventions
```javascript
// Variables and functions: camelCase
const patientData = {};
const fetchPatients = () => {};

// Components: PascalCase
const PatientList = () => {};
const AppointmentModal = () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.hospital.com';
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Private functions: prefix with underscore
const _validateInput = (input) => {};
```

### Backend Standards

#### Express.js Best Practices
```javascript
// ✅ Good - Proper error handling
const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find()
      .select('firstName lastName email phoneNumber')
      .lean();
    
    res.json({
      success: true,
      data: patients
    });
  } catch (error) {
    next(error); // Let error middleware handle it
  }
};

// ✅ Good - Input validation
const createAppointment = [
  // Validation middleware
  body('doctorId').isMongoId().notEmpty(),
  body('patientId').isMongoId().notEmpty(),
  body('appointmentDate').isISO8601().toDate(),
  body('reason').isLength({ min: 5, max: 500 }).trim(),
  
  // Controller
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array()
        }
      });
    }
    
    // Create appointment logic...
  }
];
```

### Database Standards

#### MongoDB Schema Design
```javascript
// ✅ Good - Well-structured schema with validation
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['admin', 'doctor', 'nurse', 'receptionist', 'patient'],
      message: 'Role must be one of: admin, doctor, nurse, receptionist, patient'
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });

// Virtual fields
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware for password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
```

## Commit Guidelines

### Commit Message Format
Use the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `perf`: Performance improvements
- `ci`: CI/CD configuration changes

### Examples
```bash
# Feature
git commit -m "feat: add appointment booking validation"
git commit -m "feat(auth): implement multi-factor authentication"

# Bug fix
git commit -m "fix: resolve user session timeout issue"
git commit -m "fix(api): handle null values in patient data"

# Documentation
git commit -m "docs: update API documentation for appointments"

# Breaking change
git commit -m "feat!: redesign user authentication system

BREAKING CHANGE: The authentication API has been redesigned.
Users will need to re-authenticate after this update."
```

## Pull Request Process

### Before Creating a PR

1. **Update Your Branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run Tests**
   ```bash
   # Run all tests
   npm test
   
   # Run linting
   npm run lint
   
   # Check test coverage
   npm run test:coverage
   ```

3. **Update Documentation**
   - Update relevant README files
   - Add JSDoc comments for new functions
   - Update API documentation if needed

### PR Template
When creating a PR, include:

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran and how to reproduce them.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Related Issues
Fixes #(issue number)
```

### Review Process
1. **Automated Checks**: All PRs must pass automated tests and linting
2. **Code Review**: At least one maintainer must approve the PR
3. **Security Review**: Security-sensitive changes require additional review
4. **Documentation Review**: Changes affecting APIs or user interfaces need documentation updates

## Testing Requirements

### Test Coverage Standards
- **Unit Tests**: Minimum 80% coverage for new code
- **Integration Tests**: All API endpoints must have integration tests
- **E2E Tests**: Critical user workflows must have end-to-end tests

### Writing Tests

#### Frontend Tests
```javascript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { AppointmentForm } from './AppointmentForm';

describe('AppointmentForm', () => {
  test('should validate required fields', async () => {
    render(<AppointmentForm />);
    
    const submitButton = screen.getByRole('button', { name: /book appointment/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/doctor is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/date is required/i)).toBeInTheDocument();
  });
  
  test('should submit form with valid data', async () => {
    const mockOnSubmit = jest.fn();
    render(<AppointmentForm onSubmit={mockOnSubmit} />);
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText(/doctor/i), { target: { value: 'doctor-1' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-09-15' } });
    
    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      doctorId: 'doctor-1',
      appointmentDate: '2025-09-15',
      // ... other expected fields
    });
  });
});
```

#### Backend Tests
```javascript
// API test example
describe('POST /api/appointments', () => {
  beforeEach(async () => {
    await setupTestDatabase();
  });

  afterEach(async () => {
    await cleanupTestDatabase();
  });

  test('should create appointment with valid data', async () => {
    const appointmentData = {
      doctorId: testDoctor._id,
      patientId: testPatient._id,
      appointmentDate: '2025-09-15T10:00:00Z',
      reason: 'Regular checkup'
    };

    const response = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(appointmentData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.appointment).toMatchObject({
      doctorId: appointmentData.doctorId.toString(),
      patientId: appointmentData.patientId.toString(),
      reason: appointmentData.reason
    });
  });

  test('should return 400 for invalid data', async () => {
    const invalidData = { reason: 'No doctor or patient' };

    const response = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(invalidData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
```

## Documentation Guidelines

### Code Documentation
```javascript
/**
 * Creates a new appointment in the system
 * @param {Object} appointmentData - The appointment data
 * @param {string} appointmentData.doctorId - MongoDB ObjectId of the doctor
 * @param {string} appointmentData.patientId - MongoDB ObjectId of the patient
 * @param {Date} appointmentData.appointmentDate - Date and time of the appointment
 * @param {string} appointmentData.reason - Reason for the appointment
 * @returns {Promise<Object>} The created appointment object
 * @throws {ValidationError} When appointment data is invalid
 * @throws {ConflictError} When time slot is already booked
 * 
 * @example
 * const appointment = await createAppointment({
 *   doctorId: '507f1f77bcf86cd799439011',
 *   patientId: '507f1f77bcf86cd799439012',
 *   appointmentDate: new Date('2025-09-15T10:00:00Z'),
 *   reason: 'Regular checkup'
 * });
 */
const createAppointment = async (appointmentData) => {
  // Implementation...
};
```

### README Updates
When adding features or making changes, update relevant README files:

```markdown
## New Feature: Appointment Reminders

### Description
Automated appointment reminder system that sends notifications to patients before their scheduled appointments.

### Usage
```javascript
// Enable reminders when creating appointment
const appointment = await createAppointment({
  // ... other fields
  reminders: {
    enabled: true,
    methods: ['email', 'sms'],
    schedule: [24, 2] // 24 hours and 2 hours before
  }
});
```

### Configuration
Add to your `.env` file:
```
REMINDER_EMAIL_ENABLED=true
REMINDER_SMS_ENABLED=true
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
```
```

## Security Considerations

### Security Review Process
All contributions must pass security review, especially:
- Authentication and authorization changes
- Database queries and data access
- File upload and processing
- Input validation and sanitization
- API endpoint modifications

### Security Checklist for Contributors
- [ ] No hardcoded secrets or credentials
- [ ] All inputs are properly validated and sanitized
- [ ] Authentication checks are in place
- [ ] Authorization is properly implemented
- [ ] Sensitive data is properly encrypted
- [ ] Error messages don't leak sensitive information
- [ ] Rate limiting is considered for new endpoints
- [ ] HTTPS is enforced where applicable

### Reporting Security Issues
**Do not create public issues for security vulnerabilities.**

Instead:
1. Email security@hospital.com with details
2. Include steps to reproduce
3. Provide potential impact assessment
4. Allow 90 days for resolution before disclosure

## Getting Help

### Communication Channels
- **GitHub Discussions**: General questions and feature discussions
- **GitHub Issues**: Bug reports and feature requests
- **Email**: maintainers@hospital.com for urgent matters
- **Discord**: [Hospital Dev Community](https://discord.gg/hospital-dev) for real-time chat

### Resources
- [Project Documentation](./docs/)
- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)

### Mentorship Program
New contributors can request mentorship by:
1. Creating an issue with the `mentorship` label
2. Describing your background and goals
3. Specifying areas where you'd like guidance

### Good First Issues
Look for issues labeled:
- `good first issue`: Perfect for first-time contributors
- `help wanted`: Issues where maintainers welcome contributions
- `documentation`: Documentation improvements needed
- `beginner friendly`: Issues suitable for beginners

## Recognition

Contributors will be recognized in:
- The project's `CONTRIBUTORS.md` file
- Release notes for significant contributions
- Annual contributor appreciation posts
- Conference speaking opportunities (when available)

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to the Hospital Management System! Your efforts help improve healthcare technology and make a positive impact on patient care. 🏥✨
