import React from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { COLORS } from '../../constants/theme';

const Typography = ({ 
  variant = 'body1',
  color = 'textPrimary',
  align = 'left',
  gutterBottom = false,
  noWrap = false,
  children,
  sx,
  ...props 
}) => {
  const getColor = (colorProp) => {
    if (colorProp === 'primary') return COLORS.primary.main;
    if (colorProp === 'secondary') return COLORS.secondary.main;
    if (colorProp === 'error') return COLORS.error.main;
    if (colorProp === 'warning') return COLORS.warning.main;
    if (colorProp === 'success') return COLORS.success.main;
    if (colorProp === 'textPrimary') return COLORS.text.primary;
    if (colorProp === 'textSecondary') return COLORS.text.secondary;
    return colorProp;
  };

  return (
    <MuiTypography
      variant={variant}
      color={getColor(color)}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      sx={sx}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;