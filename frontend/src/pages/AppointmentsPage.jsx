import React from 'react';
import PlaceholderPage from './PlaceholderPage';

const AppointmentsPage = () => {
  const features = [
    'Schedule new appointments',
    'View appointment calendar',
    'Manage doctor schedules',
    'Send appointment reminders',
    'Handle appointment cancellations',
    'Track appointment history',
    'Generate appointment reports'
  ];

  return (
    <PlaceholderPage
      title="Appointment Management"
      description="This is the Appointment Management system. Here you would be able to schedule and manage all patient appointments."
      features={features}
    />
  );
};

export default AppointmentsPage;