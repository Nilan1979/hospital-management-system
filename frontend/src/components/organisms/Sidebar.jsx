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
import { Icon } from '../atoms';
import { NavigationItem } from '../molecules';
import { useAuth } from '../../hooks/useAuth';
import { SIDEBAR_NAVIGATION, APP_CONFIG } from '../../constants/app';
import { COLORS, SPACING } from '../../constants/theme';

const iconMap = {
  DashboardIcon: 'dashboard',
  CalendarIcon: 'calendar',
  LocalHospitalIcon: 'hospital',
  PeopleIcon: 'people',
  InventoryIcon: 'inventory',
  LocalPharmacyIcon: 'pharmacy',
  AssessmentIcon: 'assessment'
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
            <NavigationItem
              key={item.id}
              icon={iconMap[item.icon]}
              title={item.title}
              active={active}
              collapsed={collapsed}
              onClick={() => handleNavigation(item.path)}
            />
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