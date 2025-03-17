import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  fechaInscripcion: String,
  nombre: String,
  medico: String,
  fechaProximaCita: String,
  estado: String,
});

export default mongoose.model('Program', programSchema);
