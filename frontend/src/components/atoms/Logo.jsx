import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { APP_CONFIG } from '../../constants/app';
import { COLORS, SPACING, BORDER_RADIUS, Z_INDEX } from '../../constants/theme';

const LogoContainer = styled(Box)(() => ({
  position: 'absolute',
  top: SPACING.lg,
  right: SPACING.lg,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: `${SPACING.sm} ${SPACING.md}`,
  borderRadius: BORDER_RADIUS.large,
  fontWeight: 'bold',
  fontSize: '18px',
  color: COLORS.primary.main,
  zIndex: Z_INDEX.appBar,
  display: 'flex',
  alignItems: 'center',
  gap: SPACING.sm
}));

const Logo = ({ showIcon = true, showText = true, ...props }) => {
  return (
    <LogoContainer {...props}>
      {showIcon && <span>🏥</span>}
      {showText && <span>{APP_CONFIG.shortName}</span>}
    </LogoContainer>
  );
};

export default Logo;