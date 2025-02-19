import express from "express";
import { register, login } from "../controllers/authController.mjs";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validationMiddleware.mjs";

const router = express.Router();

//Ruta para registro de usuario
router.post("/register", validateRegister, register);

// Ruta para loggin de usuario
router.post("/login", validateLogin, login);

export default router;
