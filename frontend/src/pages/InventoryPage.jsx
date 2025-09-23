import React, { useState } from 'react';
import { MainLayout, Typography, InfoCard, PrimaryButton } from '../components';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Alert,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  AttachMoney as MoneyIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Assessment as ReportIcon,
  Notifications as AlertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Circle as CircleIcon
} from '@mui/icons-material';

const InventoryPage = () => {
  // Mock data for dashboard - in real app, this would come from API
  const [dashboardData] = useState({
    stats: [
      {
        title: 'Total Products',
        value: '1,247',
        icon: <InventoryIcon />,
        color: 'primary',
        trend: '+12',
        trendDirection: 'up'
      },
      {
        title: 'Low Stock Alerts',
        value: '23',
        icon: <WarningIcon />,
        color: 'warning',
        trend: '-5',
        trendDirection: 'down'
      },
      {
        title: 'Expired Items',
        value: '8',
        icon: <ErrorIcon />,
        color: 'error',
        trend: '+3',
        trendDirection: 'up'
      },
      {
        title: 'Total Value',
        value: 'LKR 36,85,200',
        icon: <MoneyIcon />,
        color: 'success',
        trend: '+8.5%',
        trendDirection: 'up'
      }
    ],
    quickActions: [
      { label: 'Add Product', icon: <AddIcon />, color: 'primary', action: 'add-product' },
      { label: 'Create Category', icon: <CategoryIcon />, color: 'secondary', action: 'create-category' },
      { label: 'Generate Report', icon: <ReportIcon />, color: 'info', action: 'generate-report' },
      { label: 'Stock Alerts', icon: <AlertIcon />, color: 'warning', action: 'stock-alerts' }
    ],
    recentActivity: [
      { id: 1, type: 'addition', message: 'Added 50 units of Surgical Masks', time: '2 hours ago', icon: 'add' },
      { id: 2, type: 'issue', message: 'Issued 5 units of Syringes to Ward A', time: '4 hours ago', icon: 'remove' },
      { id: 3, type: 'alert', message: 'Low stock alert for Bandages', time: '6 hours ago', icon: 'warning' },
      { id: 4, type: 'addition', message: 'New category "Cardiology" created', time: '1 day ago', icon: 'category' }
    ],
    lowStockItems: [
      { name: 'Surgical Masks', current: 15, minimum: 50, category: 'PPE' },
      { name: 'Syringes (10ml)', current: 8, minimum: 25, category: 'Medical Supplies' },
      { name: 'Bandages', current: 3, minimum: 20, category: 'First Aid' },
      { name: 'Blood Pressure Monitors', current: 2, minimum: 5, category: 'Equipment' }
    ],
    topCategories: [
      { name: 'Medications', count: 456, percentage: 36.5, value: 'LKR 13,41,750' },
      { name: 'Medical Supplies', count: 324, percentage: 26.0, value: 'LKR 9,78,450' },
      { name: 'PPE', count: 198, percentage: 15.9, value: 'LKR 6,85,200' },
      { name: 'Equipment', count: 156, percentage: 12.5, value: 'LKR 11,83,800' },
      { name: 'Laboratory', count: 113, percentage: 9.1, value: 'LKR 5,18,400' }
    ]
  });

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Handle navigation or modal opening
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'addition': return <AddIcon color="success" />;
      case 'issue': return <TrendingDownIcon color="warning" />;
      case 'alert': return <WarningIcon color="error" />;
      default: return <CircleIcon color="info" />;
    }
  };

  const getStockLevelColor = (current, minimum) => {
    const percentage = (current / minimum) * 100;
    if (percentage <= 20) return 'error';
    if (percentage <= 50) return 'warning';
    return 'success';
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Inventory Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage your medical inventory with real-time insights
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardData.stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <InfoCard>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Box>
                  <Chip 
                    label={stat.trend}
                    size="small"
                    color={stat.trendDirection === 'up' ? 'success' : 'error'}
                    icon={stat.trendDirection === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  />
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </InfoCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {dashboardData.quickActions.map((action, index) => (
                    <Grid item xs={6} key={index}>
                      <PrimaryButton
                        fullWidth
                        variant="outlined"
                        color={action.color}
                        startIcon={action.icon}
                        onClick={() => handleQuickAction(action.action)}
                        sx={{ 
                          height: 60,
                          flexDirection: 'column',
                          '& .MuiButton-startIcon': {
                            margin: 0,
                            mb: 0.5
                          }
                        }}
                      >
                        {action.label}
                      </PrimaryButton>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {dashboardData.recentActivity.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {getActivityIcon(activity.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.message}
                          secondary={activity.time}
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                      {index < dashboardData.recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Low Stock Alerts */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Low Stock Alerts
                  </Typography>
                  <Chip label={dashboardData.lowStockItems.length} color="warning" size="small" />
                </Box>
                
                {dashboardData.lowStockItems.length > 0 && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    {dashboardData.lowStockItems.length} items need restocking
                  </Alert>
                )}

                <List sx={{ maxHeight: 250, overflow: 'auto' }}>
                  {dashboardData.lowStockItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                {item.category} • Current: {item.current} / Min: {item.minimum}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={(item.current / item.minimum) * 100}
                                color={getStockLevelColor(item.current, item.minimum)}
                                sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < dashboardData.lowStockItems.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Categories */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Inventory by Category
                </Typography>
                <Grid container spacing={2}>
                  {dashboardData.topCategories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                      <Box sx={{ textAlign: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          {category.count}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {category.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {category.percentage}% • {category.value}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={category.percentage}
                          sx={{ mt: 1, height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default InventoryPage;