import Medicament from '../models/medicamentModel.js';

export const getMedicaments = async (req, res) => {
  try {
    const medicaments = await Medicament.find();
    res.json(medicaments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener medicamentos', error });
  }
};

  