import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './models/appointmentModel.js';
import Program from './models/programModel.js';
import Medicament from './models/medicamentModel.js';
import Result from './models/resultModel.js';
import Patient from './models/patientModel.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado para inserción de datos');
  } catch (error) {
    console.error('Error al conectar:', error);
  }
};

const seedData = async () => {
  await connectDB();

  await Patient.deleteMany();
  await Appointment.deleteMany();
  await Program.deleteMany();
  await Medicament.deleteMany();
  await Result.deleteMany();

  await Patient.create({
    nombre: "Pablo Pérez Gómez",
    edad: 56,
    sexo: "Masculino",
    direccion: "Cra 23-65-123",
    telefono: "34988934",
    ciudad: "Barranquilla",
    departamento: "Atlántico",
    antecedentes: "Hipertensión Arterial",
    medicoCabecera: "Antonio Castro López",
    especialidad: "Médico experto Cardiovascular",
  });

  await Appointment.insertMany([
    { fecha: '2024-03-10', hora: '10:00 AM', especialidad: 'Cardiología', programa: 'Prevención de Infartos', medico: 'Dr. García', estado: 'Pendiente' },
    { fecha: '2024-03-15', hora: '02:00 PM', especialidad: 'Dermatología', programa: 'Cuidado de la Piel', medico: 'Dra. Martínez', estado: 'Completada' },
    { fecha: '2024-03-20', hora: '08:30 AM', especialidad: 'Neurología', programa: 'Control de Migrañas', medico: 'Dr. Ramírez', estado: 'Pendiente' },        { id: '4', fecha: '2024-04-05', hora: '09:00 AM', especialidad: 'Oftalmología', programa: 'Salud Visual', medico: 'Dr. Pérez', estado: 'Pendiente' },
    { fecha: '2024-04-12', hora: '11:15 AM', especialidad: 'Pediatría', programa: 'Vacunación Infantil', medico: 'Dra. Gómez', estado: 'Completada' },
    { fecha: '2024-04-18', hora: '01:00 PM', especialidad: 'Psicología', programa: 'Terapia Cognitiva', medico: 'Dr. Herrera', estado: 'Pendiente' },
    { fecha: '2024-04-25', hora: '04:30 PM', especialidad: 'Nutrición', programa: 'Plan de Alimentación', medico: 'Dra. Rojas', estado: 'Completada' },
    { fecha: '2024-05-03', hora: '10:45 AM', especialidad: 'Ginecología', programa: 'Control Prenatal', medico: 'Dra. López', estado: 'Pendiente' },
    { fecha: '2024-05-10', hora: '03:00 PM', especialidad: 'Ortopedia', programa: 'Rehabilitación Postural', medico: 'Dr. Castro', estado: 'Completada' },
    { fecha: '2024-05-17', hora: '07:30 AM', especialidad: 'Medicina General', programa: 'Chequeo Anual', medico: 'Dr. Silva', estado: 'Pendiente' }
  ]);

  await Program.insertMany([
    {fechaInscripcion: '2024-02-10', nombre: 'Ruta Riesgo Cardiovascular', medico: 'Dr. Juan Pablo Vargas', fechaProximaCita: '2025-07-05', estado: 'Pendiente' },
    {fechaInscripcion: '2024-03-15', nombre: 'Ruta de P y M Vejez', medico: 'Dra. María Camila Gómez', fechaProximaCita: '2025-08-05', estado: 'Cumplida' },
    {fechaInscripcion: '2024-01-20', nombre: 'Programa de Control de Diabetes', medico: 'Dr. Andrés Rodríguez', fechaProximaCita: '2025-06-20', estado: 'Cancelada' },
    {fechaInscripcion: '2024-04-05', nombre: 'Programa de Salud Mental', medico: 'Dra. Luisa Herrera', fechaProximaCita: '2025-09-15', estado: 'Pendiente' },
    {fechaInscripcion: '2024-05-12', nombre: 'Programa de Rehabilitación Física', medico: 'Dr. Carlos Mendoza', fechaProximaCita: '2025-10-10', estado: 'Cumplida' },
    {fechaInscripcion: '2024-06-18', nombre: 'Programa de Nutrición Balanceada', medico: 'Dra. Andrea Rojas', fechaProximaCita: '2025-11-20', estado: 'Cancelada' },
    {fechaInscripcion: '2024-07-25', nombre: 'Programa de Prevención de Obesidad', medico: 'Dr. Samuel Pérez', fechaProximaCita: '2025-12-05', estado: 'Pendiente' },
    {fechaInscripcion: '2024-08-03', nombre: 'Programa de Control de Hipertensión', medico: 'Dra. Sofia Morales', fechaProximaCita: '2026-01-18', estado: 'Cumplida' },
    {fechaInscripcion: '2024-09-10', nombre: 'Programa de Terapia Respiratoria', medico: 'Dr. Luis Fernández', fechaProximaCita: '2026-02-22', estado: 'Pendiente' },
    {fechaInscripcion: '2024-10-05', nombre: 'Programa de Revisión Cardiológica', medico: 'Dra. Paula Ramírez', fechaProximaCita: '2026-03-10', estado: 'Cancelada' }
  ]);

  await Medicament.insertMany([
    {nombre: 'Losartán 50mg', fechaOrden: '2024-02-10', medico: 'Dr. Juan Pérez', estado: 'Pendiente' },
    {nombre: 'Metformina 850mg', fechaOrden: '2024-03-12', medico: 'Dra. María Gómez', estado: 'Reformulado' },
    {nombre: 'Ibuprofeno 600mg', fechaOrden: '2024-04-05', medico: 'Dr. Carlos Mendoza', estado: 'Descargado' },
    {nombre: 'Omeprazol 20mg', fechaOrden: '2024-05-15', medico: 'Dra. Luisa Herrera', estado: 'Pendiente' },
    {nombre: 'Paracetamol 500mg', fechaOrden: '2024-06-20', medico: 'Dr. Samuel Pérez', estado: 'Reformulado' },
  ]);

  await Result.insertMany([
    {fechaRealizacion: "10 de marzo 2024", examen: "Hemograma Completo", estado: "Disponible", programa: "Chequeo General" },
    {fechaRealizacion: "15 de marzo 2024", examen: "Radiografía de Tórax", estado: "Pendiente", programa: "Neumología" },
    {fechaRealizacion: "20 de marzo 2024", examen: "Prueba de Glucosa", estado: "Disponible", programa: "Diabetes" }
  ]);

  console.log('Datos de prueba insertados en MongoDB');
  process.exit();
};

seedData();
