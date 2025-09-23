import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import { Icon, Typography as CustomTypography, Avatar } from '../atoms';
import { APP_CONFIG, ROUTES } from '../../constants/app';
import { COLORS } from '../../constants/theme';

const AppHeader = ({ 
  title = APP_CONFIG.name, 
  showBackButton = false, 
  backPath = ROUTES.DASHBOARD,
  onMenuClick,
  showMenuButton = false,
  onSidebarToggle,
  sidebarCollapsed = false
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
    handleClose();
  };

  const handleBackClick = () => {
    navigate(backPath);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: COLORS.primary.main,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: '100%',
        minHeight: '64px',
        boxShadow: 3
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important' }}>
        {showMenuButton && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <Icon name="menu" />
          </IconButton>
        )}
        
        {showBackButton && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBackClick}
            sx={{ mr: 2 }}
          >
            <Icon name="back" />
          </IconButton>
        )}
        
        <IconButton
          color="inherit"
          onClick={onSidebarToggle}
          sx={{ mr: 2 }}
        >
          <Icon name={sidebarCollapsed ? "chevronRight" : "chevronLeft"} />
        </IconButton>
        
        <Icon name="hospital" sx={{ mr: 2 }} />
        
        <CustomTypography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </CustomTypography>
        
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomTypography variant="body1" sx={{ mr: 2 }}>
              Welcome, {user.username} ({user.userType})
            </CustomTypography>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <Icon name="account" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>
                <Icon name="logout" sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;