import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  sexo: String,
  direccion: String,
  telefono: String,
  ciudad: String,
  departamento: String,
  antecedentes: String,
  medicoCabecera: String,
  especialidad: String,
});

export default mongoose.model('Patient', patientSchema);
