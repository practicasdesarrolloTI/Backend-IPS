import Program from '../models/programModel.js';

export const getProgram = async (req, res) => {
  try {
    const programs= await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener programas', error });
  }
};

  
  