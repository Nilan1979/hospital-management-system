import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Assessment as AssessmentIcon,
  AccountCircle,
  ExitToApp as LogoutIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const dashboardCards = [
    {
      title: 'Patient Management',
      description: 'Manage patient records, registration, and medical history',
      icon: <PeopleIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      color: '#1976d2',
      path: '/patients'
    },
    {
      title: 'Appointments',
      description: 'Schedule and manage patient appointments with doctors',
      icon: <CalendarIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      color: '#2e7d32',
      path: '/appointments'
    },
    {
      title: 'Inventory Management',
      description: 'Track medical supplies, equipment, and medications',
      icon: <InventoryIcon sx={{ fontSize: 48, color: 'warning.main' }} />,
      color: '#ed6c02',
      path: '/inventory'
    },
    {
      title: 'Reports & Analytics',
      description: 'View hospital performance metrics and generate reports',
      icon: <AssessmentIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      color: '#9c27b0',
      path: '/reports'
    }
  ];

  const quickStats = [
    { label: 'Total Patients', value: '1,234', color: '#1976d2' },
    { label: 'Today\'s Appointments', value: '48', color: '#2e7d32' },
    { label: 'Available Beds', value: '23', color: '#ed6c02' },
    { label: 'Staff on Duty', value: '67', color: '#9c27b0' }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#00897b' }}>
        <Toolbar>
          <HospitalIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hospital Management System
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {user?.username} ({user?.userType})
          </Typography>
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, pb: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor hospital operations and access key management features
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" component="div" sx={{ color: stat.color, fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Dashboard Cards */}
        <Grid container spacing={3}>
          {dashboardCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
                onClick={() => navigate(card.path)}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {card.description}
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: card.color,
                      '&:hover': {
                        bgcolor: card.color,
                        filter: 'brightness(0.9)'
                      }
                    }}
                  >
                    Access
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Recent Activity
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                • Patient John Doe checked in for appointment at 10:30 AM
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                • Dr. Smith completed consultation with Patient ID: 1001
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                • New appointment scheduled for tomorrow at 2:00 PM
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                • Inventory alert: Bandages running low (5 units remaining)
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;