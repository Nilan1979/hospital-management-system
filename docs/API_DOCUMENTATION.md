# API Documentation

## Overview
This document provides comprehensive documentation for the Hospital Management System REST API endpoints.

## Base URL
```
Development: http://localhost:3001/api/v1
Production: https://your-domain.com/api/v1
```

## Authentication
All API endpoints require authentication via JWT tokens, except for login and registration endpoints.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Response Format
All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "role": "string", // "admin", "doctor", "nurse", "receptionist", "patient"
  "phoneNumber": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "role": "string"
    },
    "token": "string"
  }
}
```

### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "role": "string"
    },
    "token": "string"
  }
}
```

## User Management Endpoints

### GET /users
Get list of users with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `role` (string): Filter by user role
- `search` (string): Search by name or email

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /users/:id
Get user details by ID.

### PUT /users/:id
Update user information.

### DELETE /users/:id
Delete user account.

## Appointment Management Endpoints

### POST /appointments
Create a new appointment.

**Request Body:**
```json
{
  "patientId": "string",
  "doctorId": "string",
  "appointmentDate": "ISO8601 date",
  "timeSlot": "string",
  "reason": "string",
  "notes": "string"
}
```

### GET /appointments
Get appointments with filtering and pagination.

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `doctorId` (string): Filter by doctor
- `patientId` (string): Filter by patient
- `status` (string): Filter by status
- `date` (string): Filter by date (YYYY-MM-DD)

### GET /appointments/:id
Get appointment details by ID.

### PUT /appointments/:id
Update appointment details.

### DELETE /appointments/:id
Cancel appointment.

### GET /appointments/availability
Get doctor availability for appointment scheduling.

**Query Parameters:**
- `doctorId` (string): Doctor ID
- `date` (string): Date (YYYY-MM-DD)

## Treatment Management Endpoints

### POST /treatments
Create a new treatment plan.

### GET /treatments
Get treatments with filtering.

### GET /treatments/:id
Get treatment details.

### PUT /treatments/:id
Update treatment plan.

### POST /treatments/:id/progress
Add treatment progress entry.

### GET /treatments/:id/history
Get treatment history.

## Inventory Management Endpoints

### POST /inventory
Add new inventory item.

### GET /inventory
Get inventory items with filtering.

### PUT /inventory/:id
Update inventory item.

### DELETE /inventory/:id
Remove inventory item.

### GET /inventory/alerts
Get low-stock alerts.

### POST /inventory/purchase-orders
Create purchase order.

## Medical Records Endpoints

### POST /medical-records
Create medical record.

### GET /medical-records/patient/:patientId
Get patient's medical records.

### PUT /medical-records/:id
Update medical record.

### POST /medical-records/upload
Upload medical document.

## Error Codes

| Code | Description |
|------|-------------|
| VALIDATION_ERROR | Request validation failed |
| UNAUTHORIZED | Authentication required |
| FORBIDDEN | Insufficient permissions |
| NOT_FOUND | Resource not found |
| CONFLICT | Resource conflict |
| INTERNAL_ERROR | Server error |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- General endpoints: 100 requests per 15 minutes
- Authentication endpoints: 5 requests per 15 minutes
- File upload endpoints: 10 requests per hour

## Pagination

All list endpoints support pagination with the following parameters:
- `page`: Page number (starts from 1)
- `limit`: Number of items per page (max 100)

Response includes pagination metadata:
```json
{
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## WebSocket Events

Real-time features use WebSocket connections:

### Connection
```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'jwt_token'
  }
});
```

### Events
- `appointment:created` - New appointment created
- `appointment:updated` - Appointment updated
- `appointment:cancelled` - Appointment cancelled
- `treatment:progress` - Treatment progress updated
- `inventory:alert` - Low stock alert
- `notification:new` - New notification

## Examples

### Creating an Appointment
```javascript
const response = await fetch('/api/v1/appointments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    patientId: '507f1f77bcf86cd799439011',
    doctorId: '507f1f77bcf86cd799439012',
    appointmentDate: '2025-09-15T10:00:00Z',
    timeSlot: '10:00-10:30',
    reason: 'Regular checkup'
  })
});
```

### Getting Appointments
```javascript
const response = await fetch('/api/v1/appointments?page=1&limit=10&status=scheduled', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
});
```

This API documentation will be updated as new endpoints are added or existing ones are modified.
