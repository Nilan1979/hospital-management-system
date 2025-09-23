import React from 'react';
import { Box, ButtonGroup } from '@mui/material';
import { PrimaryButton } from '../atoms';

const ActionButtons = ({ 
  actions = [],
  orientation = 'horizontal',
  size = 'medium',
  sx,
  ...props 
}) => {
  if (actions.length === 0) return null;

  const renderButton = (action, index) => (
    <PrimaryButton
      key={index}
      variant={action.variant || 'contained'}
      color={action.color || 'primary'}
      size={size}
      startIcon={action.icon}
      onClick={action.onClick}
      disabled={action.disabled}
      sx={action.sx}
    >
      {action.label}
    </PrimaryButton>
  );

  if (actions.length === 1) {
    return renderButton(actions[0], 0);
  }

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        gap: 1,
        ...sx 
      }} 
      {...props}
    >
      {actions.map((action, index) => renderButton(action, index))}
    </Box>
  );
};

export default ActionButtons;