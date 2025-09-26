// backend/routes/medicineRoutes.js
import express from 'express';
import { requestMedication, getAllMedications } from '../controllers/medicineController.js';

const router = express.Router();

// POST request for submitting medication request
router.post('/request', requestMedication);

// GET request to retrieve all medication requests
router.get('/', getAllMedications);

export default router;
