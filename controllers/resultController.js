import Result from '../models/resultModel.js';

export const getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener resultados', error });
  }
};

  
  