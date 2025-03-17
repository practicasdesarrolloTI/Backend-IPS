import mongoose from 'mongoose';

const medicamentSchema = new mongoose.Schema({
  nombre: String,
  fechaOrden: String,
  medico: String,
  estado: String,
});

export default mongoose.model('Medicament', medicamentSchema);
