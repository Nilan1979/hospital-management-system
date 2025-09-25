import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  admittedDate: { type: Date, default: Date.now },
  diagnosis: { type: String },
  discharged: { type: Boolean, default: false }
});

export const Patient = mongoose.model('Patient', patientSchema);
