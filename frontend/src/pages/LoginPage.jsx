import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../hooks/useAuth';
import FullscreenLayout from '../components/layout/FullscreenLayout';
import LoginForm from '../components/molecules/LoginForm';
import Logo from '../components/atoms/Logo';
import loginCover from '../assets/login-cover.jpg';
import { ROUTES } from '../constants/app';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const LoginCard = styled(Card)(() => ({
  padding: SPACING.xl,
  borderRadius: BORDER_RADIUS.large,
  backgroundColor: COLORS.background.paper,
  boxShadow: SHADOWS.heavy,
  minWidth: '360px',
  maxWidth: '400px',
  width: '100%'
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    setError('');
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = login(formData.username, formData.password, 'Employee');
      
      if (result.success) {
        navigate(ROUTES.DASHBOARD);
      } else {
        setError(result.error);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Please contact the administrator to reset your password.\n\nDefault credentials:\nUsername: admin\nPassword: 1234');
  };

  return (
    <FullscreenLayout backgroundImage={loginCover}>
      <Logo />
      <LoginCard>
        <LoginForm
          onSubmit={handleLogin}
          loading={loading}
          error={error}
          onForgotPassword={handleForgotPassword}
        />
      </LoginCard>
    </FullscreenLayout>
  );
};

export default LoginPage;