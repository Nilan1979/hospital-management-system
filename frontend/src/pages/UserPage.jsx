import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';

const UserPage = () => {
  // Sample user data
  const users = [
    { id: 1, name: 'Dr. John Smith', role: 'Doctor', department: 'Cardiology', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', role: 'Nurse', department: 'Emergency', status: 'Active' },
    { id: 3, name: 'Mike Wilson', role: 'Technician', department: 'Radiology', status: 'Inactive' },
    { id: 4, name: 'Emily Davis', role: 'Receptionist', department: 'Front Desk', status: 'Active' },
  ];

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  return (
    <MainLayout title="User Management">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage hospital staff, roles, and user permissions.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="primary" gutterBottom>
                24
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="success.main" gutterBottom>
                22
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="warning.main" gutterBottom>
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Doctors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="info.main" gutterBottom>
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nurses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Staff Directory
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.status} 
                            color={getStatusColor(user.status)}
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

export default UserPage;