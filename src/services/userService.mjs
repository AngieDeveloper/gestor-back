import User from "../models/User.mjs";
import bcrypt from "bcryptjs";

// Obtener todos los usuarios
export const getAllUsers = async () => {
  return await User.find();
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  return await User.findById(id);
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  const { email, password, role } = userData;
  const user = await User.findById(id);

  if (!user) throw new Error("Usuario no encontrado");

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  if (email) user.email = email;
  if (role) user.role = role;

  await user.save();
  return user;
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("Usuario no encontrado");
  return { message: "Usuario eliminado con éxito" };
};
