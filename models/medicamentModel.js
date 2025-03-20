import mongoose from 'mongoose';

const medicamentSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true },
  nombre: String,
  fechaOrden: String,
  medico: String,
  estado: String,
});

export default mongoose.model('Medicament', medicamentSchema);
