import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  fechaRealizacion: String,
  examen: String,
  estado: String,
  programa: String,
});

export default mongoose.model('Result', resultSchema);
