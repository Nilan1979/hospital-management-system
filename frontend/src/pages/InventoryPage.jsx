import React from 'react';
import { MainLayout, Typography } from '../components';
import { Box } from '@mui/material';

const InventoryPage = () => {
  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Inventory functionality will be implemented here.
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default InventoryPage;