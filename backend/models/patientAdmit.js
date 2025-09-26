// backend/models/patient.js
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId, // or String if you prefer
    required: true,
    ref: 'Patient', // referencing Patient collection (optional but recommended)
  },
  patientName: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Pending'],
    required: true,
  },
});

export const Patient = mongoose.model('PatientAdmit', patientSchema);
