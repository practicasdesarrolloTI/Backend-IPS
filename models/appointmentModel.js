import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fecha: String,
  hora: String,
  especialidad: String,
  programa: String,
  medico: String,
  estado: String,
});

export default mongoose.model('Appointment', appointmentSchema);
