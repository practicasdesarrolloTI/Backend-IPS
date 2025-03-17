import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  fecha: String,
  hora: String,
  especialidad: String,
  programa: String,
  medico: String,
  estado: String,
});

export default mongoose.model('Appointment', appointmentSchema);
