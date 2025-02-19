import * as userService from "../services/userService.mjs";
import { handleError } from "../utils/errorHandler.mjs";

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    handleError(err, res);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Uer not found" });
    res.json(user);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const message = await userService.deleteUser(req.params.id);
    res.json(message);
  } catch (err) {
    handleError(err, res);
  }
};
