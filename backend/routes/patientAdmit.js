// backend/routes/patientRoutes.js
import express from 'express';
import {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
} from '../controllers/patientAdmitController.js';

const router = express.Router();

router.post('/add', addPatient);          // POST: Add patient
router.get('/allpatient', getPatients);   // GET: All patients
router.put('/update/:id', updatePatient); // PUT: Update patient
router.delete('/delete/:id', deletePatient); // DELETE: Remove patient

export default router;
