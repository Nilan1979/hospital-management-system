import React from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { MainLayout, Typography } from '../components';

const TreatmentPage = () => {

  return (
    <MainLayout title="Treatment Management">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Treatment Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage patient treatments, medical procedures, and therapy sessions.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Treatments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage ongoing patient treatments and therapy sessions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Treatment History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access complete treatment records and patient medical history.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Procedures
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Schedule and track medical procedures and surgical operations.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Treatment Plans
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create and manage comprehensive treatment plans for patients.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default TreatmentPage;