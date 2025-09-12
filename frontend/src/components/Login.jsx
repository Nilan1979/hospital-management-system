import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import loginCover from '../assets/login-cover.jpg';

const StyledContainer = styled(Container)(() => ({
  minHeight: '100vh',
  width: '100vw',
  maxWidth: 'none !important',
  padding: '0 !important',
  margin: '0 !important',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${loginCover})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 150, 136, 0.1)', // Teal overlay
    zIndex: 1,
  }
}));

const LoginCard = styled(Card)(() => ({
  padding: '32px',
  borderRadius: '24px',
  backgroundColor: 'white',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  minWidth: '360px',
  maxWidth: '400px',
  position: 'relative',
  zIndex: 2,
}));

const LoginTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '24px',
  fontSize: '24px',
  color: '#333',
}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    '&:hover fieldset': {
      borderColor: '#00897b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00897b',
    },
  },
}));



const LoginButton = styled(Button)(() => ({
  backgroundColor: '#00897b',
  color: 'white',
  borderRadius: '12px',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  marginTop: '16px',
  marginBottom: '16px',
  '&:hover': {
    backgroundColor: '#00796b',
  },
}));

const ForgotPasswordLink = styled(Typography)(() => ({
  textAlign: 'right',
  color: '#666',
  fontSize: '14px',
  cursor: 'pointer',
  '&:hover': {
    color: '#00897b',
    textDecoration: 'underline',
  },
}));

const HimsLogo = styled(Box)(() => ({
  position: 'absolute',
  top: '24px',
  right: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '8px 16px',
  borderRadius: '20px',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#00897b',
  zIndex: 3,
}));

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Use the auth context login function
    const result = login(formData.username, formData.password, 'Employee');
    
    if (result.success) {
      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleForgotPassword = () => {
    alert('Please contact the administrator to reset your password.');
  };

  return (
    <StyledContainer maxWidth={false}>
      <HimsLogo>
        🏥 HIMS
      </HimsLogo>
      
      <LoginCard>
        <LoginTitle variant="h4">
          SIGN IN
        </LoginTitle>

        <form onSubmit={handleLogin}>
          <StyledTextField
            fullWidth
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            variant="outlined"
            required
          />

          <StyledTextField
            fullWidth
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            required
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Login
          </LoginButton>

          <ForgotPasswordLink onClick={handleForgotPassword}>
            Forgot Password?
          </ForgotPasswordLink>
        </form>
      </LoginCard>
    </StyledContainer>
  );
};

export default Login;