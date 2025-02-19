import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.mjs";

dotenv.config();

// Registro de usuario
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) {
      throw new Error("Falta la clave secreta JWT en las variables de entorno");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Incluye el role
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
