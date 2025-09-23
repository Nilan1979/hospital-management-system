import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { MainLayout, PrimaryButton, Typography } from '../components';
import { ROUTES } from '../constants/app';
import { useNavigate } from 'react-router-dom';

const PlaceholderPage = ({ 
  title, 
  description, 
  features = [] 
}) => {
  const navigate = useNavigate();

  return (
    <MainLayout 
      title={title} 
      showBackButton={true} 
      backPath={ROUTES.DASHBOARD}
    >
      <Card>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h4" gutterBottom color="primary">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>
          
          {features.length > 0 && (
            <Box sx={{ textAlign: 'left', maxWidth: 600, mx: 'auto', mb: 3 }}>
              {features.map((feature, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  • {feature}
                </Typography>
              ))}
            </Box>
          )}
          
          <PrimaryButton 
            variant="contained" 
            onClick={() => navigate(ROUTES.DASHBOARD)}
            sx={{ mt: 3 }}
          >
            Back to Dashboard
          </PrimaryButton>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default PlaceholderPage;