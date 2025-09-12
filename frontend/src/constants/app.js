// Application constants
export const APP_CONFIG = {
  name: 'Hospital Management System',
  shortName: 'HIMS',
  version: '1.0.0',
  description: 'Comprehensive Healthcare Administration Platform'
};

export const API_ENDPOINTS = {
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  refresh: '/api/auth/refresh',
  patients: '/api/patients',
  appointments: '/api/appointments',
  inventory: '/api/inventory',
  reports: '/api/reports'
};

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  APPOINTMENTS: '/appointments',
  TREATMENT: '/treatment',
  USER: '/user',
  INVENTORY: '/inventory',
  REPORTS: '/reports',
  PROFILE: '/profile',
  SETTINGS: '/settings'
};

export const USER_TYPES = {
  ADMIN: 'Admin',
  DOCTOR: 'Doctor',
  NURSE: 'Nurse',
  EMPLOYEE: 'Employee',
  RECEPTIONIST: 'Receptionist'
};

export const STORAGE_KEYS = {
  IS_AUTHENTICATED: 'isAuthenticated',
  USER_TYPE: 'userType',
  USERNAME: 'username',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
};

export const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: '1234'
};

export const DASHBOARD_CARDS = [
  {
    id: 'patients',
    title: 'Patient Management',
    description: 'Manage patient records, registration, and medical history',
    icon: 'PeopleIcon',
    color: '#1976d2',
    path: ROUTES.PATIENTS,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.DOCTOR, USER_TYPES.NURSE, USER_TYPES.RECEPTIONIST]
  },
  {
    id: 'appointments',
    title: 'Appointments',
    description: 'Schedule and manage patient appointments with doctors',
    icon: 'CalendarIcon',
    color: '#2e7d32',
    path: ROUTES.APPOINTMENTS,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.DOCTOR, USER_TYPES.RECEPTIONIST]
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description: 'Track medical supplies, equipment, and medications',
    icon: 'InventoryIcon',
    color: '#ed6c02',
    path: ROUTES.INVENTORY,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.EMPLOYEE]
  },
  {
    id: 'reports',
    title: 'Reports & Analytics',
    description: 'View hospital performance metrics and generate reports',
    icon: 'AssessmentIcon',
    color: '#9c27b0',
    path: ROUTES.REPORTS,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.DOCTOR]
  }
];

export const QUICK_STATS = [
  { id: 'totalPatients', label: 'Total Patients', value: '1,234', color: '#1976d2' },
  { id: 'todayAppointments', label: 'Today\'s Appointments', value: '48', color: '#2e7d32' },
  { id: 'availableBeds', label: 'Available Beds', value: '23', color: '#ed6c02' },
  { id: 'staffOnDuty', label: 'Staff on Duty', value: '67', color: '#9c27b0' }
];

export const SIDEBAR_NAVIGATION = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'DashboardIcon',
    path: ROUTES.DASHBOARD,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.DOCTOR, USER_TYPES.NURSE, USER_TYPES.EMPLOYEE, USER_TYPES.RECEPTIONIST]
  },
  {
    id: 'appointments',
    title: 'Appointments',
    icon: 'CalendarIcon',
    path: ROUTES.APPOINTMENTS,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.DOCTOR, USER_TYPES.RECEPTIONIST, USER_TYPES.EMPLOYEE]
  },
  {
    id: 'treatment',
    title: 'Treatment',
    icon: 'LocalHospitalIcon',
    path: ROUTES.TREATMENT,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.DOCTOR, USER_TYPES.NURSE, USER_TYPES.EMPLOYEE]
  },
  {
    id: 'user',
    title: 'User',
    icon: 'PeopleIcon',
    path: ROUTES.USER,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.EMPLOYEE]
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: 'InventoryIcon',
    path: ROUTES.INVENTORY,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.EMPLOYEE]
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: 'AssessmentIcon',
    path: ROUTES.REPORTS,
    permissions: [USER_TYPES.ADMIN, USER_TYPES.DOCTOR, USER_TYPES.EMPLOYEE]
  }
];