import { Router } from 'express';
import { obtenerMedicamentosVigentes } from '../controllers/medicamentosController.js';

const router = Router();

router.get('/api/medicamentos-vigentes/:tipo/:documento', obtenerMedicamentosVigentes);

export default router;
