import express from 'express';
import { getResults } from '../controllers/resultController.js';

const router = express.Router();

router.get('/', getResults);

export default router;
