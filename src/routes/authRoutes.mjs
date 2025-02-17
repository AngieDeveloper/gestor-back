import express from "express";
import { register, login } from "../controllers/authController.mjs";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validationMiddleware.mjs";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export default router;
