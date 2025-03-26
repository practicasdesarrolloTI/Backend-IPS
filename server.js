// // import express from 'express';
// // import dotenv from 'dotenv';
// // import cors from 'cors';
// // import connectDB from './config/db.js';
// // import authRoutes from './routes/authRoutes.js';
// // import os from 'os';

// // import appointmentRoutes from './routes/appointmentRoutes.js';
// // import programRoutes from './routes/programRoutes.js';
// // import medicamentRoutes from './routes/medicamentRoutes.js';
// // import resultRoutes from './routes/resultRoutes.js';
// // import patientRoutes from './routes/patientRoutes.js';

// // dotenv.config();
// // connectDB(); // Conectar a MongoDB

// // const app = express();

// // app.use(express.json()); // Permite recibir JSON
// // app.use(cors()); // Habilita CORS

// // // Definir rutas
// // app.use('/api/auth', authRoutes);
// // app.use('/api/patient', patientRoutes);
// // app.use('/api/appointments', appointmentRoutes);
// // app.use('/api/programs', programRoutes);
// // app.use('/api/medicaments', medicamentRoutes);
// // app.use('/api/results', resultRoutes);

// // const PORT = process.env.PORT || 5000;

// // // 📌 Obtener la IP de la red local para pruebas en móviles
// // const getLocalIP = () => {
// //   const interfaces = os.networkInterfaces();
// //   for (let iface of Object.values(interfaces)) {
// //     for (let alias of iface) {
// //       if (alias.family === 'IPv4' && !alias.internal) {
// //         return alias.address;
// //       }
// //     }
// //   }
// //   return "localhost";
// // };

// // const LOCAL_IP = getLocalIP();
// // const API_URL = `http://${LOCAL_IP}:${PORT}/api`;

// // // Iniciar servidor
// // app.listen(PORT, () => {
// //   console.log(`✅ Servidor corriendo en:\n➡ Local: http://localhost:${PORT}/api`);
// //   console.log(`➡ Red local: ${API_URL}`);
// // });




// // // import express from 'express';
// // // import dotenv from 'dotenv';
// // // import cors from 'cors';
// // // import connectDB from './config/db.js';
// // // import authRoutes from './routes/authRoutes.js';

// // // dotenv.config();
// // // connectDB(); // Conectar a MongoDB

// // // const app = express();

// // // app.use(express.json()); // Permite recibir JSON
// // // app.use(cors()); // Habilita CORS

// // // // Rutas
// // // app.use('/api/auth', authRoutes);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import {
  getBasicData,
  getMaestra,
  getMaestraFull,
 // getBienestar,
  getHealth,
} from "./services/pacienteService.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/paciente/:documento", async (req, res) => {
  try {
    const data = await getBasicData(req.params.documento);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/maestra/:documento", async (req, res) => {
  try {
    const data = await getMaestra(req.params.documento);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/maestra-full/:documento", async (req, res) => {
  try {
    const data = await getMaestraFull(req.params.documento);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.get("/api/bienestar/:documento", async (req, res) => {
//   try {
//     const data = await getBienestar(req.params.documento);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.get("/api/health", async (req, res) => {
  try {
    const data = await getHealth();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
