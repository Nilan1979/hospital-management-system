import * as React from 'react';
import './AddPatients.css';
import { Box, Button, Grid, TextField, Checkbox, FormControlLabel, MenuItem, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function Title() {
  return (
    <h1 style={{ textAlign: 'center', marginBottom: 20, color: '#1976d2' }}>
      Request Medications
    </h1>
  );
}

export default function RequestMedications({ backButtonPath = '/' }) {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    type: '',
    brand: '',
    quantity: '',
    description: '',
    urgent: false,
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validate = () => {
    const temp = {};
    if (!values.type) temp.type = 'Type is required';
    if (!values.brand) temp.brand = 'Brand is required';
    if (!values.quantity || isNaN(values.quantity) || values.quantity <= 0)
      temp.quantity = 'Valid quantity is required';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      // Make POST request to backend
      const response = await axios.post('http://localhost:3001/medication/request', {
        type: values.type,
        brand: values.brand,
        quantity: values.quantity,
        description: values.description,
        urgent: values.urgent,
      });

      // Success response handling
      alert('Medication request submitted!');
      setValues({ type: '', brand: '', quantity: '', description: '', urgent: false });
      setErrors({});
      navigate(backButtonPath);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-patient-container">
      <Box component="form" onSubmit={handleSubmit} className="add-patient-form" noValidate autoComplete="off">
        <Title />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Type"
              value={values.type}
              onChange={(e) => handleChange('type', e.target.value)}
              fullWidth
              error={!!errors.type}
              helperText={errors.type ?? ' '}
              size="small"
            >
              <MenuItem value="Tablet">Tablet</MenuItem>
              <MenuItem value="Capsule">Capsule</MenuItem>
              <MenuItem value="Injection">Injection</MenuItem>
              <MenuItem value="Syrup">Syrup</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Brand (Model Number)"
              value={values.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              fullWidth
              error={!!errors.brand}
              helperText={errors.brand ?? ' '}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Quantity"
              value={values.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              fullWidth
              error={!!errors.quantity}
              helperText={errors.quantity ?? ' '}
              size="small"
              type="number"
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              minRows={4}
              value={values.description}
              onChange={(e) => handleChange('description', e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.urgent}
                  onChange={(e) => handleChange('urgent', e.target.checked)}
                />
              }
              label="Mark as urgent"
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate(backButtonPath)}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
