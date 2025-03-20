import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fechaInscripcion: String,
  nombre: String,
  medico: String,
  fechaProximaCita: String,
  estado: String,
});

export default mongoose.model('Program', programSchema);
