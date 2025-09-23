import React from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { MainLayout, Typography } from '../components';

const ReportsPage = () => {

  return (
    <MainLayout title="Reports & Analytics">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View hospital performance metrics, statistics, and generate comprehensive reports.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="primary" gutterBottom>
                3,280
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Patients This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="success.main" gutterBottom>
                $580K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="warning.main" gutterBottom>
                94%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bed Occupancy Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="info.main" gutterBottom>
                4.8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patient Satisfaction
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Reports Placeholder */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Analytics Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Advanced charts and analytics will be available here. This includes patient visit trends, department performance metrics, revenue analysis, and custom reporting tools.
              </Typography>
              <Box sx={{ mt: 2, p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  📊 Charts and visualizations coming soon...
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default ReportsPage;