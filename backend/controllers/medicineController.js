import { Medication } from '../models/medicine.js';

// Create a new medication request (POST)
export const requestMedication = async (req, res) => {
  try {
    const { type, brand, quantity, description, urgent } = req.body;

    // Create a new medication request
    const newMedication = new Medication({
      type,
      brand,
      quantity,
      description,
      urgent,
    });

    // Save the request to the database
    await newMedication.save();

    res.status(201).json({
      message: 'Medication request submitted successfully!',
      medication: newMedication,
    });
  } catch (error) {
    console.error('Error submitting medication request:', error);
    res.status(500).json({
      message: 'Failed to submit medication request',
      error: error.message,
    });
  }
};

// Get all medication requests (GET)
export const getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find(); // Fetch all medications
    res.status(200).json(medications); // Return the list
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({
      message: 'Failed to fetch medications',
      error: error.message,
    });
  }
};
