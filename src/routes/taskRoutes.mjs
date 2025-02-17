import express from "express";
import Task from "../models/Task.mjs";

const router = express.Router();

// Crear tarea
router.post("/tasks", async (req, res) => {
  const { title, description, user } = req.body;
  try {
    const newTask = new Task({ title, description, user });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creando tarea", message: error.message });
  }
});

// Listar tareas de un usuario
router.get("/tasks", async (req, res) => {
  const { user } = req.query; // Suponiendo que pasas el ID del usuario como query param
  try {
    const tasks = await Task.find({ user });
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error listando tareas", message: error.message });
  }
});
// Actualizar tarea
router.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error actualizando tarea", message: error.message });
  }
});

// Eliminar tarea
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error eliminando tarea", message: error.message });
  }
});

export default router;
