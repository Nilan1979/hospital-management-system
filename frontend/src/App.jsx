import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box,
  Card,
  CardContent,
  Button,
  Grid
} from '@mui/material'
import { 
  LocalHospital as HospitalIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material'

// Placeholder components - will be replaced with actual pages
const Dashboard = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2">
        Welcome to the Hospital Management System dashboard. This will show key metrics and quick actions.
      </Typography>
    </CardContent>
  </Card>
)

const Patients = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Patient Management
      </Typography>
      <Typography variant="body2">
        Manage patient records, registration, and medical history.
      </Typography>
    </CardContent>
  </Card>
)

const Appointments = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Appointment Management
      </Typography>
      <Typography variant="body2">
        Schedule and manage patient appointments with doctors.
      </Typography>
    </CardContent>
  </Card>
)

const Home = () => (
  <Container maxWidth="md">
    <Box sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Hospital Management System
      </Typography>
      <Typography variant="h6" component="p" gutterBottom align="center" color="text.secondary">
        Comprehensive Healthcare Administration Platform
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <DashboardIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Dashboard</Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor hospital operations and key metrics
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <PeopleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Patient Management</Typography>
            <Typography variant="body2" color="text.secondary">
              Manage patient records and medical history
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CalendarIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Appointments</Typography>
            <Typography variant="body2" color="text.secondary">
              Schedule and manage appointments
            </Typography>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          🚀 Development Mode - Frontend and Backend running locally
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Frontend: http://localhost:5173 | Backend: http://localhost:5000
        </Typography>
      </Box>
    </Box>
  </Container>
)

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <HospitalIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hospital Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  )
}

export default App
