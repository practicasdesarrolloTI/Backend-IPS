import Patient from '../models/patientModel.js';

export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.find();
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la información del paciente', error });
  }
};
