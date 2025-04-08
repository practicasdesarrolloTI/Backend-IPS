import express from "express";
import dotenv from "dotenv";
import {
  getBasicData,
  getMaestra,
  getMaestraFull,
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
  console.log(`✅ Servicios corriendo en http://localhost:${PORT}`);
});
