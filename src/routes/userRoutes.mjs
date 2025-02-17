import express from "express";
import * as userController from "../controllers/userController.mjs";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.mjs";
import * as authController from "../controllers/authController.mjs";

const router = express.Router();

// Ruta para el registro de usuarios
router.post("/register", authController.register);

// Rutas para obtener todos los usuarios y obtener un usuario por ID
router.get("/users", authenticate, isAdmin, userController.getUsers);
router.get("/users/:id", authenticate, userController.getUserById);

// Rutas para actualizar y eliminar un usuario
router.put("/users/:id", authenticate, isAdmin, userController.updateUser);
router.delete("/users/:id", authenticate, isAdmin, userController.deleteUser);

export default router;
