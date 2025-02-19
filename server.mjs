import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import taskRoutes from "./src/routes/taskRoutes.mjs";
import authRoutes from "./src/routes/authRoutes.mjs";
import {
  jsonMiddleware,
  logRequestDetails,
} from "./src/middlewares/loggingMiddleware.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // Conectar a la base de datos

app.use(express.json());
app.use(cors());

// Middleware para loguear detalles de la solicitud
app.use(logRequestDetails);

// Middleware para loguear el cuerpo de las solicitudes
app.use(jsonMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
