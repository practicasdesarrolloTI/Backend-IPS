import express from 'express';
import { getPatient } from '../controllers/patientController.js';

const router = express.Router();

router.get('/', getPatient);

export default router;
