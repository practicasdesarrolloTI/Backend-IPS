import jwt from "jsonwebtoken";

export function generarToken(documento) {
  const dataToFetch = {
    documento: Number(documento),
    query: [],
  };

  return jwt.sign(dataToFetch, process.env.SECRET_API, {
    algorithm: "HS256",
  });
}

export function desencriptarRespuesta(token) {
  return jwt.verify(token, process.env.SECRET_API, {
    algorithms: ["HS256"],
  });
}
