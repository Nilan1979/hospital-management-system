import React from 'react';
import PlaceholderPage from './PlaceholderPage';

const PatientsPage = () => {
  const features = [
    'View and search patient records',
    'Register new patients',
    'Update patient information',
    'Manage medical history',
    'Generate patient reports',
    'Schedule patient appointments',
    'Track patient visits'
  ];

  return (
    <PlaceholderPage
      title="Patient Management"
      description="This is the Patient Management system. Here you would be able to manage all aspects of patient care and records."
      features={features}
    />
  );
};

export default PatientsPage;