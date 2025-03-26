import fetch from "node-fetch";
import { generarToken, desencriptarRespuesta } from "../utils/jwtHelper.js";

function buildHeaders(documento) {
  const token = generarToken(documento);
  return {
    authorization: "Bearer " + process.env.AUTH_BASE_POBLACIONAL,
    data: token,
  };
}

export async function getBasicData(documento) {
  const res = await fetch(`${process.env.URL_BASE_POBLACIONAL}/api/v1/getBasicData`, {
    method: "GET",
    headers: buildHeaders(documento),
  });

  if (!res.ok) throw new Error("getBasicData failed: " + res.status);
  const data = await res.json();
  return desencriptarRespuesta(data.data);
}

export async function getMaestra(documento) {
  const res = await fetch(`${process.env.URL_BASE_POBLACIONAL}/api/v1/maestra`, {
    method: "GET",
    headers: buildHeaders(documento),
  });

  if (!res.ok) throw new Error("getMaestra failed: " + res.status);
  const data = await res.json();
  return desencriptarRespuesta(data.data);
} 

export async function getMaestraFull(documento) {
  const res = await fetch(`${process.env.URL_BASE_POBLACIONAL}/api/v1/maestra/full`, {
    method: "GET",
    headers: buildHeaders(documento),
  });

  if (!res.ok) throw new Error("getMaestraFull failed: " + res.status);
  const data = await res.json();
  return desencriptarRespuesta(data.data);
}

// export async function getBienestar(documento) {
//   const res = await fetch(`${process.env.URL_BASE_POBLACIONAL}/api/v1/bienestar`, {
//     method: "GET",
//     headers: buildHeaders(documento),
//   });

//   if (!res.ok) throw new Error("getBienestar failed: " + res.status);
//   const data = await res.json();
//   return desencriptarRespuesta(data.data);
// } //No sirve, sin autorización

export async function getHealth() {
  const res = await fetch(`${process.env.URL_BASE_POBLACIONAL}/api/v1/health`);
  if (!res.ok) throw new Error("Health check failed: " + res.status);
  return res.text();
}
