import React from 'react';
import { Badge as MuiBadge } from '@mui/material';
import { COLORS } from '../../constants/theme';

const Badge = ({ 
  badgeContent,
  color = 'primary',
  variant = 'standard',
  overlap = 'rectangular',
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  showZero = false,
  max = 99,
  children,
  sx,
  ...props 
}) => {
  const getColor = (colorProp) => {
    switch (colorProp) {
      case 'primary': return 'primary';
      case 'secondary': return 'secondary';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'success': return 'success';
      default: return colorProp;
    }
  };

  return (
    <MuiBadge
      badgeContent={badgeContent}
      color={getColor(color)}
      variant={variant}
      overlap={overlap}
      anchorOrigin={anchorOrigin}
      showZero={showZero}
      max={max}
      sx={sx}
      {...props}
    >
      {children}
    </MuiBadge>
  );
};

export default Badge;