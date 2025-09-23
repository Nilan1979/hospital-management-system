import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Icon } from '../atoms';
import { COLORS, SPACING } from '../../constants/theme';

const NavigationItem = ({ 
  icon,
  title,
  active = false,
  collapsed = false,
  onClick,
  ...props 
}) => {
  return (
    <ListItem disablePadding>
      <Tooltip title={collapsed ? title : ''} placement="right">
        <ListItemButton
          onClick={onClick}
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
          {...props}
        >
          <ListItemIcon>
            <Icon name={icon} />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText 
              primary={title}
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
};

export default NavigationItem;