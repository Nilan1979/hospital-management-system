import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { MainLayout, DashboardGrid, QuickStats, Typography } from '../components';
import { APP_CONFIG } from '../constants/app';
import { COLORS, SPACING } from '../constants/theme';

const WelcomeSection = ({ user }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom color="primary">
      Dashboard
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Welcome back, {user?.username}! Monitor hospital operations and access key management features.
    </Typography>
  </Box>
);

const RecentActivity = () => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" component="h2" gutterBottom>
      Recent Activity
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          • Patient John Doe checked in for appointment at 10:30 AM
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          • Dr. Smith completed consultation with Patient ID: 1001
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          • New appointment scheduled for tomorrow at 2:00 PM
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          • Inventory alert: Bandages running low (5 units remaining)
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <MainLayout title={APP_CONFIG.name}>
      <WelcomeSection user={user} />
      
      {/* Quick Stats Section */}
      <Box sx={{ mb: 4 }}>
        <QuickStats />
      </Box>

      {/* Main Dashboard Cards */}
      <Box sx={{ mb: 4 }}>
        <DashboardGrid userType={user?.userType} />
      </Box>

      {/* Recent Activity Section */}
      <RecentActivity />
    </MainLayout>
  );
};

export default DashboardPage;