import * as React from 'react';
import './AddPatients.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import axios from 'axios';

function TitleAddPatient() {
  return (
    <h1 style={{ textAlign: 'center', marginBottom: 20, color: '#1976d2' }}>
      Add Patient Into System
    </h1>
  );
}

function ArrowBack() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      fill="currentColor"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" />
    </svg>
  );
}

export default function AddPatients({ backButtonPath = '/' }) {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    patientName: '',
    treatment: '',
    doctor: '',
    date: null,
    status: '',
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!values.patientName) tempErrors.patientName = 'Patient name is required';
    if (!values.treatment) tempErrors.treatment = 'Treatment is required';
    if (!values.doctor) tempErrors.doctor = 'Doctor is required';
    if (!values.date) tempErrors.date = 'Date is required';
    if (!values.status) tempErrors.status = 'Status is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3001/patientadmit/add', {
        patientName: values.patientName,
        treatment: values.treatment,
        doctor: values.doctor,
        date: values.date ? new Date(values.date).toISOString() : null,
        status: values.status,
      });

      alert('Patient added successfully!');
      setValues({
        patientName: '',
        treatment: '',
        doctor: '',
        date: null,
        status: '',
      });
      setErrors({});

      // Get the new patient ID from response and navigate to treatment page
      const newPatientId = response.data._id;
      if (newPatientId) {
        navigate(`/patient-treatment/${newPatientId}`);
      } else {
        // fallback to default if no ID returned
        navigate(backButtonPath);
      }
    } catch (error) {
      console.error('Failed to add patient:', error.response?.data || error.message);
      alert('Failed to add patient: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(backButtonPath);
  };

  return (
    <div className="add-patient-container">
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="add-patient-form"
        noValidate
        autoComplete="off"
      >
        <TitleAddPatient />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              name="patientName"
              label="Patient Name"
              value={values.patientName}
              onChange={(e) => handleFieldChange('patientName', e.target.value)}
              error={!!errors.patientName}
              helperText={errors.patientName ?? ' '}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="treatment"
              label="Treatment"
              value={values.treatment}
              onChange={(e) => handleFieldChange('treatment', e.target.value)}
              error={!!errors.treatment}
              helperText={errors.treatment ?? ' '}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="doctor"
              label="Doctor"
              value={values.doctor}
              onChange={(e) => handleFieldChange('doctor', e.target.value)}
              error={!!errors.doctor}
              helperText={errors.doctor ?? ' '}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={values.date ? dayjs(values.date) : null}
                onChange={(date) =>
                  handleFieldChange('date', date ? date.toISOString() : null)
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date ?? ' ',
                    size: 'small',
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <label
              htmlFor="status"
              style={{
                display: 'block',
                marginBottom: 4,
                fontSize: 13,
                color: errors.status ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
                fontWeight: '500',
              }}
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={(e) => handleFieldChange('status', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 4,
                border: errors.status ? '1px solid #d32f2f' : '1px solid #ccc',
                fontSize: '14px',
                outline: 'none',
              }}
            >
              <option value="">None</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && (
              <p
                style={{
                  color: '#d32f2f',
                  fontSize: '0.75rem',
                  marginTop: '4px',
                  marginBottom: 0,
                }}
              >
                {errors.status}
              </p>
            )}
          </Grid>
        </Grid>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 3 }}
        >
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBack />}
            size="medium"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            size="medium"
          >
            Add Patient
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
