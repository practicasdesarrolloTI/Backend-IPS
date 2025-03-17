import Appointment from '../models/appointmentModel.js';

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error });
  }
};
