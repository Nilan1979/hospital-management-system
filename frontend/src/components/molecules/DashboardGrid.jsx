import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import InfoCard from '../atoms/InfoCard';
import PrimaryButton from '../atoms/PrimaryButton';
import { DASHBOARD_CARDS } from '../../constants/app';
import { COLORS } from '../../constants/theme';

const iconMap = {
  PeopleIcon: <PeopleIcon />,
  CalendarIcon: <CalendarIcon />,
  InventoryIcon: <InventoryIcon />,
  AssessmentIcon: <AssessmentIcon />
};

const DashboardGrid = ({ userType = 'Employee' }) => {
  const navigate = useNavigate();

  // Filter cards based on user permissions
  const filteredCards = DASHBOARD_CARDS.filter(card => 
    card.permissions.includes(userType)
  );

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Grid container spacing={3} sx={{ width: '100%' }}>
      {filteredCards.map((card) => (
        <Grid item xs={12} sm={6} md={6} lg={3} key={card.id}>
          <InfoCard
            title={card.title}
            description={card.description}
            icon={iconMap[card.icon]}
            color={card.color}
            onClick={() => handleCardClick(card.path)}
          >
            <PrimaryButton 
              variant="contained" 
              sx={{ 
                bgcolor: card.color,
                mt: 2,
                '&:hover': {
                  bgcolor: card.color,
                  filter: 'brightness(0.9)'
                }
              }}
            >
              Access
            </PrimaryButton>
          </InfoCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardGrid;