import express from "express";
import * as userController from "../controllers/userController.mjs";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.mjs";
import * as authController from "../controllers/authController.mjs";

const router = express.Router();

// Ruta para el registro de usuario
router.post("/register", authController.register);

// Ruta para el login de usuario
router.post("/login", authController.login);

// Ruta para obtener todos los usuarios
router.get("/users", authenticate, isAdmin, userController.getUsers);

// Ruta para obtener un usuario por ID
router.get("/users/:id", authenticate, userController.getUserById);

// Ruta para actualizar un usuario
router.put("/users/:id", authenticate, isAdmin, userController.updateUser);

// Ruta para eliminar un usuariopor ID
router.delete("/users/:id", authenticate, isAdmin, userController.deleteUser);

export default router;
