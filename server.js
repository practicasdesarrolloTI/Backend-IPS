import express from "express";
import dotenv from "dotenv";
import {
  getBasicData,
  getMaestra,
  getMaestraFull,
  getHealth,
} from "./services/pacienteService.js";
import medicamentos from './routes/medicamentos.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/paciente/:documento", async (req, res) => {
  try {
    const data = await getBasicData(req.params.documento);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/maestra/:codigoIPS", async (req, res) => {
  const codigo = req.params.codigoIPS
  try {
    console.log("Voy a entrar")
    const data = await getMaestra(codigo);
    console.log(data)
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

app.post('/api/probar-maestra', async (req, res) => {
  const codigo_ips = req.body;
  console.log(codigo_ips)
  try {
    const data = await getMaestra(codigo_ips);
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

app.use(medicamentos);

app.listen(PORT, () => {
  console.log(`✅ Servicios corriendo en http://localhost:${PORT}`);
});
