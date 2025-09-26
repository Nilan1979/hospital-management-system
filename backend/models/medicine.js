// backend/models/medicine.js
import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Tablet', 'Capsule', 'Injection', 'Syrup', 'Other'],
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    required: true,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Medication = mongoose.model('Medication', medicationSchema);
