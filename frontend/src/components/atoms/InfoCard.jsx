import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const StyledCard = styled(Card)(({ clickable }) => ({
  borderRadius: BORDER_RADIUS.medium,
  boxShadow: SHADOWS.light,
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: clickable ? 'pointer' : 'default',
  ...(clickable && {
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: SHADOWS.medium
    }
  })
}));

const IconContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: SPACING.md,
  '& svg': {
    fontSize: '48px'
  }
}));

const CardTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: SPACING.sm,
  color: COLORS.text.primary
}));

const CardDescription = styled(Typography)(() => ({
  textAlign: 'center',
  color: COLORS.text.secondary,
  lineHeight: 1.5
}));

const InfoCard = ({
  title,
  description,
  icon,
  color = COLORS.primary.main,
  onClick,
  children,
  ...props
}) => {
  const isClickable = Boolean(onClick);

  return (
    <StyledCard clickable={isClickable} onClick={onClick} {...props}>
      <CardContent sx={{ textAlign: 'center', p: SPACING.lg }}>
        {icon && (
          <IconContainer>
            {React.cloneElement(icon, { sx: { color, fontSize: 48 } })}
          </IconContainer>
        )}
        
        {title && (
          <CardTitle variant="h6">
            {title}
          </CardTitle>
        )}
        
        {description && (
          <CardDescription variant="body2">
            {description}
          </CardDescription>
        )}
        
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default InfoCard;