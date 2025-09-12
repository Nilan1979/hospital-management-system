import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import { COLORS, SPACING } from '../../constants/theme';

const PageContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  backgroundColor: COLORS.background.default,
  overflow: 'hidden'
}));

const MainContent = styled(Box)(() => ({
  display: 'flex',
  flexGrow: 1,
  minHeight: 0
}));

const ContentArea = styled(Box)(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const ContentContainer = styled(Box)(() => ({
  flexGrow: 1,
  paddingTop: SPACING.lg,
  paddingBottom: SPACING.lg,
  paddingLeft: SPACING.lg,
  paddingRight: SPACING.lg,
  width: '100%',
  maxWidth: 'none'
}));

const MainLayout = ({ 
  children, 
  title, 
  showBackButton = false, 
  backPath
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <PageContainer>
      {/* Full Width Header */}
      <AppHeader 
        title={title} 
        showBackButton={showBackButton} 
        backPath={backPath}
        onMenuClick={handleDrawerToggle}
        showMenuButton={isMobile}
        onSidebarToggle={handleSidebarToggle}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <MainContent>
        {/* Desktop Sidebar */}
        <Sidebar
          variant="permanent"
          open={true}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
          sx={{ display: { xs: 'none', md: 'block' } }}
        />
        
        {/* Mobile Sidebar */}
        <Sidebar
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          collapsed={false}
          sx={{ display: { xs: 'block', md: 'none' } }}
        />

        <ContentArea>
          <ContentContainer>
            {children}
          </ContentContainer>
        </ContentArea>
      </MainContent>
    </PageContainer>
  );
};

export default MainLayout;