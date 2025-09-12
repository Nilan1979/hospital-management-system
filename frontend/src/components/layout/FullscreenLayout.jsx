import React from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { COLORS, SPACING } from '../../constants/theme';

const StyledContainer = styled(Container)(() => ({
  minHeight: '100vh',
  width: '100vw',
  maxWidth: 'none !important',
  padding: '0 !important',
  margin: '0 !important',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000
}));

const BackgroundOverlay = styled('div')(({ backgroundImage }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background.overlay,
    zIndex: 1,
  }
}));

const ContentWrapper = styled('div')(() => ({
  position: 'relative',
  zIndex: 2,
  padding: SPACING.lg,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const FullscreenLayout = ({ 
  children, 
  backgroundImage
}) => {
  return (
    <StyledContainer maxWidth={false}>
      {backgroundImage && (
        <BackgroundOverlay backgroundImage={backgroundImage} />
      )}
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </StyledContainer>
  );
};

export default FullscreenLayout;