import fetch from "node-fetch";
import { generarToken, desencriptarRespuesta } from "../utils/jwtHelper.js";

export async function obtenerDatosBasicos(documento) {
  const token = generarToken(documento);

  const res = await fetch(`${process.env.URL_BASE_POBLACIONAL}/api/v1/getBasicData`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + process.env.AUTH_BASE_POBLACIONAL,
      data: token,
    },
  });

  if (!res.ok) {
    throw new Error("Error en la petición: " + res.status);
  }

  const data = await res.json();

  const desencriptado = desencriptarRespuesta(data.data);

  return desencriptado;
}
