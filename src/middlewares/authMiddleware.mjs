import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error("Falta la clave secreta JWT en las variables de entorno");
}

// Middleware de autenticación
export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
};

// Middleware para verificar si el usuario es admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};