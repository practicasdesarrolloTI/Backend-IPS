import fetch from "node-fetch";
import { generarToken, desencriptarRespuesta } from "../utils/jwtHelper.js";


const IDENTIFICATIONS = [
  { common: "Cédula de Extranjería", short: "CE", codes: [2] },
  { common: "Tarjeta de Identidad", short: "TI", codes: [5] },
  { common: "Cédula de Ciudadanía", short: "CC", codes: [1, 3] },
  { common: "Registro Civil", short: "RC", codes: [4] },
  { common: "Pasaporte", short: "PA", codes: [3] },
  { common: "Menor Sin Identificación", short: "MSI", codes: [7] },
  { common: "Adulto Sin Identificación", short: "ASI", codes: [6] },
  { common: "Cédula Diplomática", short: "CD", codes: [9] },
  { common: "Salvoconducto", short: "SC", codes: [11] },
  { common: "Permiso Especial de Permanencia", short: "PEP", codes: [13] },
  { common: "Permiso Temporal de Permanencia", short: "PTP", codes: [14] },
];

function homologarTipoDocumento(tipoCodigo) {
  const tipoNum = Number(tipoCodigo);
  const found = IDENTIFICATIONS.find(item => item.codes.includes(tipoNum));
  return {
    tipo_abreviado: found ? found.short : String(tipoCodigo),
    tipo_nombre: found ? found.common : "Tipo desconocido",
  };
}

function buildHeaders(documento) {
  const token = generarToken(documento);
  return {
    authorization: "Bearer " + process.env.AUTH_BASE_POBLACIONAL,
    data: token,
  };
}

// export async function getBasicData(documento) {

//   const res = await fetch(`${process.env.URL_BASE_POBLACIONAL}/api/v1/getBasicData`, {
//     method: "GET",
//     headers: buildHeaders(documento),
//   });

//   if (!res.ok) throw new Error("getBasicData failed: " + res.status);
//   const data = await res.json();
//   return desencriptarRespuesta(data.data);
// }

export async function getBasicData(documento) {
  const res = await fetch(`${process.env.URL_BASE_POBLACIONAL}/api/v1/getBasicData`, {
    method: "GET",
    headers: buildHeaders(documento),
  });

  if (!res.ok) throw new Error("getBasicData failed: " + res.status);
  
  const rawData = await res.json();
  const desencriptado = desencriptarRespuesta(rawData.data);

  // Homologar tipo_documento si existe
  if (desencriptado && desencriptado.tipo_documento !== undefined) {
    const homologado = homologarTipoDocumento(desencriptado.tipo_documento);
    desencriptado.tipo_documento_abreviado = homologado.tipo_abreviado;
  }

  return desencriptado;
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
