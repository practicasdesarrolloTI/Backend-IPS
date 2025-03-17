import express from 'express';
import { getMedicaments } from '../controllers/medicamentController.js';

const router = express.Router();

router.get('/', getMedicaments);

export default router;
