import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Typography } from '@mui/material';
import FormInput from '../atoms/FormInput';
import PrimaryButton from '../atoms/PrimaryButton';
import { SPACING } from '../../constants/theme';

const FormContainer = styled('form')(() => ({
  width: '100%'
}));

const FormTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: SPACING.lg,
  fontSize: '24px',
  color: '#333',
}));

const ForgotPasswordLink = styled(Typography)(() => ({
  textAlign: 'right',
  color: '#666',
  fontSize: '14px',
  cursor: 'pointer',
  marginTop: SPACING.sm,
  '&:hover': {
    color: '#00897b',
    textDecoration: 'underline',
  },
}));

const LoginForm = ({
  title = 'SIGN IN',
  onSubmit,
  loading = false,
  error = '',
  onForgotPassword
}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleForgotPasswordClick = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      alert('Please contact the administrator to reset your password.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle variant="h4">
        {title}
      </FormTitle>

      <FormInput
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />

      <FormInput
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <PrimaryButton
        type="submit"
        fullWidth
        size="large"
        loading={loading}
        sx={{ mt: SPACING.md, mb: SPACING.md }}
      >
        Login
      </PrimaryButton>

      <ForgotPasswordLink onClick={handleForgotPasswordClick}>
        Forgot Password?
      </ForgotPasswordLink>
    </FormContainer>
  );
};

export default LoginForm;