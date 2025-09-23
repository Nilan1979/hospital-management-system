import React from 'react';
import { Divider as MuiDivider } from '@mui/material';
import { COLORS } from '../../constants/theme';

const Divider = ({ 
  orientation = 'horizontal',
  variant = 'fullWidth',
  flexItem = false,
  sx,
  children,
  ...props 
}) => {
  return (
    <MuiDivider
      orientation={orientation}
      variant={variant}
      flexItem={flexItem}
      sx={{
        borderColor: COLORS.border,
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiDivider>
  );
};

export default Divider;