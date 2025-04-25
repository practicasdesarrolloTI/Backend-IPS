import fetch from "node-fetch";
import { generarToken, desencriptarRespuesta } from "../utils/jwtHelper.js";


const IDENTIFICATIONS = [
  { 
    common: "Cédula de Extranjería", 
    short: "CE", 
    codes: { nuevaeps: 1, aliansalud: "CE", foneca: null } 
  },
  { 
    common: "Tarjeta de Identidad", 
    short: "TI", 
    codes: { nuevaeps: 2, aliansalud: "TI", foneca: "TI" } 
  },
  { 
    common: "Cédula de Ciudadanía", 
    short: "CC", 
    codes: { nuevaeps: 3, aliansalud: "CC", foneca: "CC" } 
  },
  { 
    common: "Registro Civil", 
    short: "RC", 
    codes: { nuevaeps: 5, aliansalud: "RC", foneca: "RC" } 
  },
  { 
    common: "Pasaporte", 
    short: "PA", 
    codes: { nuevaeps: 4, aliansalud: "PA", foneca: null } 
  },
  { 
    common: "Menor Sin Identificación", 
    short: "MSI", 
    codes: { nuevaeps: 6, aliansalud: null, foneca: null } 
  },
  { 
    common: "Adulto Sin Identificación", 
    short: "ASI", 
    codes: { nuevaeps: 7, aliansalud: null, foneca: null } 
  },
  { 
    common: "Cédula Diplomática", 
    short: "CD", 
    codes: { nuevaeps: 8, aliansalud: "CD", foneca: null } 
  },
  { 
    common: "Salvoconducto", 
    short: "SC", 
    codes: { nuevaeps: 10, aliansalud: "SC", foneca: null } 
  },
  { 
    common: "Permiso Especial de Permanencia", 
    short: "PEP", 
    codes: { nuevaeps: 11, aliansalud: "PE", foneca: null } 
  },
  { 
    common: "Permiso Temporal de Permanencia", 
    short: "PTP", 
    codes: { nuevaeps: 15, aliansalud: "PT", foneca: null } 
  },
];



export function homologarTipoDocumentoPorEPS(tipoCodigo, eps) {
  const epsKey = eps.toLowerCase().replace(/\s+/g, "");
  
  const found = IDENTIFICATIONS.find(item => item.codes[epsKey] === tipoCodigo || item.codes[epsKey] === Number(tipoCodigo));

  if (!found) {
    return { error: "Tipo de documento no encontrado para esa EPS" };
  }

  return {
    tipo_abreviado: found.short,
    tipo_nombre: found.common,
    homologado: found.codes[epsKey],
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
    const homologado = homologarTipoDocumentoPorEPS(desencriptado.tipo_documento, desencriptado.eps);
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
