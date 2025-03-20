import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fechaRealizacion: String,
  examen: String,
  estado: String,
  programa: String,
});

export default mongoose.model('Result', resultSchema);
