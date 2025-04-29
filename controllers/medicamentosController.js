import axios from 'axios';
import dayjs from 'dayjs';

const API_TOKEN_URL = 'https://training.aacustomers.com/aa_panacap/pana/rest/auth_server.php';
const API_MEDICAMENTOS_URL = 'https://training.aacustomers.com/aa_panacap/pana/rest/router.php/ordenes/consmed';

const HEADERS_AUTH = {
  'X-Client-Id': 'rest901',
  'X-Secret': 'rest901',
  'X-Custom-Id': '901',
};

export const obtenerMedicamentosVigentes = async (req, res) => {
  try {
    const { tipo, documento } = req.params;

    // Paso 1: Obtener token
    const tokenRes = await axios.post(API_TOKEN_URL, {}, { headers: HEADERS_AUTH });
    const token = tokenRes.data.token;

    // Paso 2: Obtener medicamentos
    const { data } = await axios.post(
      API_MEDICAMENTOS_URL,
      {
        tipo_doc: tipo,
        identi_usr: documento,
        codigo_ord: '',
      },
      {
        headers: {
          'X-TOKEN': token,
          'Content-Type': 'application/json',
        },
      }
    );

    // Paso 3: Filtrar por fecha de vigencia
    const hoy = dayjs();
    const ordenesVigentes = data.filter((orden) => {
      const desde = dayjs(orden.fecha_vigencia);
      const hasta = dayjs(orden.fecha_vencimiento);
      return hoy.isAfter(desde.subtract(1, 'day')) && hoy.isBefore(hasta.add(1, 'day'));
    });

    res.json(ordenesVigentes);
  } catch (error) {
    console.error('❌ Error al obtener medicamentos:', error.message);
    res.status(500).json({ error: 'Error al consultar medicamentos' });
  }
};
