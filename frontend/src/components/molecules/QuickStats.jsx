import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { QUICK_STATS } from '../../constants/app';
import { COLORS } from '../../constants/theme';

const StatsCard = ({ label, value, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography 
        variant="h3" 
        component="div" 
        sx={{ 
          color, 
          fontWeight: 'bold',
          mb: 1
        }}
      >
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </CardContent>
  </Card>
);

const QuickStats = () => {
  return (
    <Grid container spacing={3} sx={{ width: '100%' }}>
      {QUICK_STATS.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.id}>
          <StatsCard
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStats;