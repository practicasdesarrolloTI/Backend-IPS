import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import os from 'os'; // Importar para obtener la IP local

dotenv.config();
connectDB(); // Conectar a MongoDB

const app = express();

app.use(express.json()); // Permite recibir JSON
app.use(cors()); // Habilita CORS

// Definir rutas
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// 📌 Obtener la IP de la red local para pruebas en móviles
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (let iface of Object.values(interfaces)) {
    for (let alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "localhost";
};

const LOCAL_IP = getLocalIP();
const API_URL = `http://${LOCAL_IP}:${PORT}/api`;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en:\n➡ Local: http://localhost:${PORT}/api`);
  console.log(`➡ Red local: ${API_URL}`);
});




// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';

// dotenv.config();
// connectDB(); // Conectar a MongoDB

// const app = express();

// app.use(express.json()); // Permite recibir JSON
// app.use(cors()); // Habilita CORS

// // Rutas
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
