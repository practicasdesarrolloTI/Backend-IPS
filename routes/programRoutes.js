import express from 'express';
import { getProgram } from '../controllers/programController.js';

const router = express.Router();

router.get('/', getProgram);

export default router;
