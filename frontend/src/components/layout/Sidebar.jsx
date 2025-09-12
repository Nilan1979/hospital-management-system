import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box,
  Tooltip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as LocalHospitalIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { SIDEBAR_NAVIGATION, APP_CONFIG } from '../../constants/app';
import { COLORS, SPACING } from '../../constants/theme';

const iconMap = {
  DashboardIcon: <DashboardIcon />,
  CalendarIcon: <CalendarIcon />,
  LocalHospitalIcon: <LocalHospitalIcon />,
  PeopleIcon: <PeopleIcon />,
  InventoryIcon: <InventoryIcon />,
  AssessmentIcon: <AssessmentIcon />
};

const SIDEBAR_WIDTH = 260;
const SIDEBAR_WIDTH_COLLAPSED = 64;

const Sidebar = ({ open, onClose, variant = 'permanent', collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Filter navigation based on user permissions
  const filteredNavigation = SIDEBAR_NAVIGATION.filter(item => 
    item.permissions.includes(user?.userType || 'Employee')
  );

  const handleNavigation = (path) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose?.();
    }
  };

  const isActive = (path) => location.pathname === path;
  const currentWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;

  const sidebarContent = (
    <Box sx={{ width: currentWidth, height: '100%', backgroundColor: 'white' }}>

      {/* Navigation Items */}
      <List sx={{ pt: SPACING.sm }}>
        {filteredNavigation.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.id} disablePadding>
              <Tooltip title={collapsed ? item.title : ''} placement="right">
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    mx: collapsed ? SPACING.xs : SPACING.sm,
                    mb: SPACING.xs,
                    borderRadius: 1,
                    minHeight: 48,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    backgroundColor: active ? COLORS.primary.main : 'transparent',
                    color: active ? 'white' : COLORS.text.secondary,
                    '&:hover': {
                      backgroundColor: active ? COLORS.primary.dark : COLORS.background.paper,
                    },
                    '& .MuiListItemIcon-root': {
                      color: active ? 'white' : COLORS.text.secondary,
                      minWidth: collapsed ? 'auto' : 40,
                      justifyContent: 'center'
                    }
                  }}
                >
                  <ListItemIcon>
                    {iconMap[item.icon]}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText 
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: active ? 'bold' : 'normal'
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: currentWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${COLORS.border}`,
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          position: variant === 'permanent' ? 'relative' : 'fixed',
          height: variant === 'permanent' ? 'auto' : '100vh'
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;