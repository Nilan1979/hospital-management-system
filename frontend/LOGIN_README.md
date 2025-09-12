# Hospital Management System - Login Form

## Login Credentials

Use the following credentials to access the system:

- **Username**: `admin`
- **Password**: `1234`
- **User Type**: You can select any type (Employee, Doctor, Admin)

## Features

### Login Form
- Beautiful login interface matching the provided design
- Background image from the assets folder
- Responsive design with Material-UI components
- Form validation with error messages
- User type selection dropdown

### Authentication
- Simple hardcoded authentication for demo purposes
- Session persistence using localStorage
- Automatic redirect to dashboard on successful login
- Protected routes requiring authentication

### Dashboard
- Welcome screen with user information
- Quick stats cards
- Navigation cards for different modules:
  - Patient Management
  - Appointments
  - Inventory Management
  - Reports & Analytics
- Recent activity section
- User menu with logout functionality

### Navigation
- Protected routes for all main pages
- Automatic redirect to login if not authenticated
- Back navigation from individual pages to dashboard
- Consistent header with user information

## How to Run

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

5. Use the login credentials above to access the system

## File Structure

```
src/
├── components/
│   ├── Login.jsx          # Main login form component
│   ├── Dashboard.jsx      # Dashboard with navigation cards
│   ├── Patients.jsx       # Patient management placeholder
│   ├── Appointments.jsx   # Appointments placeholder
│   └── ProtectedRoute.jsx # Route protection component
├── contexts/
│   └── AuthContext.jsx    # Authentication context
├── hooks/
│   └── useAuth.js         # Authentication hook
├── assets/
│   └── login-cover.jpg    # Background image for login
└── App.jsx               # Main app with routing
```

## Technical Details

- **React 18** with functional components and hooks
- **React Router** for client-side routing
- **Material-UI (MUI)** for UI components and styling
- **Styled Components** for custom styling
- **Context API** for state management
- **localStorage** for session persistence

The login form is designed to match the provided image with:
- Teal color scheme (#00897b)
- Rounded corners and modern design
- Professional medical background
- HIMS branding in the top right
- Responsive layout that works on all screen sizes