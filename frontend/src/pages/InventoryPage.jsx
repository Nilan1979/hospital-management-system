import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, LinearProgress } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';

const InventoryPage = () => {
  // Sample inventory data
  const inventoryItems = [
    { id: 1, name: 'Surgical Masks', category: 'PPE', quantity: 500, minStock: 100, status: 'In Stock' },
    { id: 2, name: 'Syringes (10ml)', category: 'Medical Supplies', quantity: 25, minStock: 50, status: 'Low Stock' },
    { id: 3, name: 'Bandages', category: 'First Aid', quantity: 5, minStock: 20, status: 'Critical' },
    { id: 4, name: 'Wheelchairs', category: 'Equipment', quantity: 8, minStock: 5, status: 'In Stock' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Critical': return 'error';
      default: return 'default';
    }
  };

  const getStockLevel = (quantity, minStock) => {
    return Math.min((quantity / (minStock * 2)) * 100, 100);
  };

  return (
    <MainLayout title="Inventory Management">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Inventory Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track medical supplies, equipment, and medications inventory levels.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="primary" gutterBottom>
                1,234
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="warning.main" gutterBottom>
                15
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Low Stock Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="error.main" gutterBottom>
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Critical Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="success.main" gutterBottom>
                $45,230
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Value
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Inventory Items
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Stock Level</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inventoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell sx={{ width: 150 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={getStockLevel(item.quantity, item.minStock)}
                            color={item.status === 'Critical' ? 'error' : item.status === 'Low Stock' ? 'warning' : 'success'}
                            sx={{ height: 8, borderRadius: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={item.status} 
                            color={getStatusColor(item.status)}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default InventoryPage;