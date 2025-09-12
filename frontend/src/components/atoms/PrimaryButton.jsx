import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../constants/theme';

const StyledButton = styled(Button)(({ variant, color, size }) => ({
  borderRadius: BORDER_RADIUS.medium,
  textTransform: 'none',
  fontWeight: TYPOGRAPHY.fontWeight.bold,
  padding: size === 'large' 
    ? `${SPACING.md} ${SPACING.lg}` 
    : size === 'small' 
    ? `${SPACING.sm} ${SPACING.md}` 
    : `${SPACING.sm} ${SPACING.md}`,
  fontSize: size === 'large' ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  
  ...(variant === 'contained' && {
    backgroundColor: color === 'primary' ? COLORS.primary.main : COLORS.secondary.main,
    color: COLORS.primary.contrastText,
    '&:hover': {
      backgroundColor: color === 'primary' ? COLORS.primary.dark : COLORS.secondary.dark,
    },
    '&:disabled': {
      backgroundColor: COLORS.text.disabled,
      color: COLORS.primary.contrastText,
    }
  }),
  
  ...(variant === 'outlined' && {
    borderColor: color === 'primary' ? COLORS.primary.main : COLORS.secondary.main,
    color: color === 'primary' ? COLORS.primary.main : COLORS.secondary.main,
    '&:hover': {
      borderColor: color === 'primary' ? COLORS.primary.dark : COLORS.secondary.dark,
      backgroundColor: color === 'primary' 
        ? `${COLORS.primary.main}08` 
        : `${COLORS.secondary.main}08`,
    }
  }),
  
  ...(variant === 'text' && {
    color: color === 'primary' ? COLORS.primary.main : COLORS.secondary.main,
    '&:hover': {
      backgroundColor: color === 'primary' 
        ? `${COLORS.primary.main}08` 
        : `${COLORS.secondary.main}08`,
    }
  })
}));

const PrimaryButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={!loading ? startIcon : undefined}
      endIcon={!loading ? endIcon : undefined}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
          Loading...
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default PrimaryButton;