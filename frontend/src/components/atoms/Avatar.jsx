import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import { COLORS } from '../../constants/theme';

const Avatar = ({ 
  src,
  alt,
  children,
  variant = 'circular',
  size = 'medium',
  color = 'primary',
  sx,
  ...props 
}) => {
  const getSizeStyles = (sizeProp) => {
    const sizes = {
      small: { width: 32, height: 32, fontSize: '0.875rem' },
      medium: { width: 40, height: 40, fontSize: '1rem' },
      large: { width: 56, height: 56, fontSize: '1.25rem' }
    };
    
    return sizes[sizeProp] || sizes.medium;
  };

  const getColorStyles = (colorProp) => {
    const colors = {
      primary: { backgroundColor: COLORS.primary.main, color: 'white' },
      secondary: { backgroundColor: COLORS.secondary.main, color: 'white' },
      success: { backgroundColor: COLORS.success.main, color: 'white' },
      error: { backgroundColor: COLORS.error.main, color: 'white' },
      warning: { backgroundColor: COLORS.warning.main, color: 'white' },
      default: { backgroundColor: COLORS.background.paper, color: COLORS.text.primary }
    };
    
    return colors[colorProp] || colors.default;
  };

  return (
    <MuiAvatar
      src={src}
      alt={alt}
      variant={variant}
      sx={{
        ...getSizeStyles(size),
        ...(!src && getColorStyles(color)),
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiAvatar>
  );
};

export default Avatar;