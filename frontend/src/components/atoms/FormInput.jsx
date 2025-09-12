import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

const StyledTextField = styled(TextField)(() => ({
  marginBottom: SPACING.md,
  '& .MuiOutlinedInput-root': {
    borderRadius: BORDER_RADIUS.medium,
    backgroundColor: '#f8f9fa',
    '&:hover fieldset': {
      borderColor: COLORS.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: COLORS.text.secondary,
    '&.Mui-focused': {
      color: COLORS.primary.main,
    },
  },
}));

const FormInput = ({ 
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  fullWidth = true,
  variant = 'outlined',
  error = false,
  helperText = '',
  ...props 
}) => {
  return (
    <StyledTextField
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth={fullWidth}
      variant={variant}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
};

export default FormInput;