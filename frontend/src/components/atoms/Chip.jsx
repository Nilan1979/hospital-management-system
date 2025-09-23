import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import { COLORS } from '../../constants/theme';

const Chip = ({ 
  label,
  color = 'default',
  variant = 'filled',
  size = 'medium',
  icon,
  deleteIcon,
  onDelete,
  onClick,
  clickable = false,
  sx,
  ...props 
}) => {
  const getStatusColor = (colorProp, variantProp) => {
    const statusStyles = {
      success: {
        backgroundColor: variantProp === 'outlined' ? 'transparent' : COLORS.success.light,
        color: COLORS.success.main,
        borderColor: COLORS.success.main
      },
      error: {
        backgroundColor: variantProp === 'outlined' ? 'transparent' : COLORS.error.light,
        color: COLORS.error.main,
        borderColor: COLORS.error.main
      },
      warning: {
        backgroundColor: variantProp === 'outlined' ? 'transparent' : COLORS.warning.light,
        color: COLORS.warning.main,
        borderColor: COLORS.warning.main
      },
      info: {
        backgroundColor: variantProp === 'outlined' ? 'transparent' : COLORS.primary.light,
        color: COLORS.primary.main,
        borderColor: COLORS.primary.main
      }
    };

    return statusStyles[colorProp] || {};
  };

  return (
    <MuiChip
      label={label}
      color={['success', 'error', 'warning', 'info'].includes(color) ? 'default' : color}
      variant={variant}
      size={size}
      icon={icon}
      deleteIcon={deleteIcon}
      onDelete={onDelete}
      onClick={onClick}
      clickable={clickable || Boolean(onClick)}
      sx={{
        ...getStatusColor(color, variant),
        ...sx
      }}
      {...props}
    />
  );
};

export default Chip;