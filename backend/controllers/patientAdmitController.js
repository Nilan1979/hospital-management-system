// backend/controllers/patientController.js
import mongoose from 'mongoose';
import { Patient } from '../models/patientAdmit.js';

// Add new patient
export const addPatient = async (req, res) => {
  try {
    const { patientName, treatment, doctor, date, status } = req.body;

    // Validate required fields
    if (!patientName || !treatment || !doctor || !date || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPatient = new Patient({
      patientID: new mongoose.Types.ObjectId(), // Generate unique ObjectId
      patientName,
      treatment,
      doctor,
      date,
      status,
    });

    await newPatient.save();

    res.status(201).json({
      message: 'Patient added successfully!',
      patient: newPatient,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding patient',
      error: error.message,
    });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select('-__v'); // Exclude version key

    res.status(200).json({
      message: 'Patients fetched successfully',
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching patients',
      error: error.message,
    });
  }
};

// Update patient
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientName, treatment, doctor, date, status } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { patientName, treatment, doctor, date, status },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      message: 'Patient updated',
      patient: updatedPatient,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      message: 'Error updating patient',
      error: error.message,
    });
  }
};

// Delete patient
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting patient',
      error: error.message,
    });
  }
};
