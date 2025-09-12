import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  AccountCircle,
  ExitToApp as LogoutIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const Appointments = () => {
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

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#00897b' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <HospitalIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Appointment Management
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.username} ({user?.userType})
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
        <Card>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h4" gutterBottom color="primary">
              Appointment Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              This is a placeholder for the Appointment Management system. Here you would be able to:
            </Typography>
            <Box sx={{ textAlign: 'left', maxWidth: 600, mx: 'auto' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>• Schedule new appointments</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• View appointment calendar</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• Manage doctor schedules</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• Send appointment reminders</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• Handle appointment cancellations</Typography>
            </Box>
            <Button 
              variant="contained" 
              onClick={() => navigate('/dashboard')}
              sx={{ mt: 3, bgcolor: '#00897b' }}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Appointments;