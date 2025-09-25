import { Patient } from '../models/patient.js';

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, error: 'Patient not found' });
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a patient
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ success: false, error: 'Patient not found' });
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ success: false, error: 'Patient not found' });
    res.status(200).json({ success: true, message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
