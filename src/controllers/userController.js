// Standardized Response Structure

import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../models/userModel.js";

const handleResponse = (res, statusCode, data = null, message = "") => {
  const response = {
    status: statusCode,
    message: message,
    data: data,
  };
  res.status(statusCode).json(response);
};

export const createUser = (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newUser = createUserService({ name, email });
    handleResponse(res, 201, newUser, "User created successfully");
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, users, "Users retrieved successfully");
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdService(id);
    if (!user) {
      return handleResponse(res, 404, null, "User not found");
    }
    handleResponse(res, 200, user, "User retrieved successfully");
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    const updatedUser = await updateUserService(id, { name, email });
    if (!updatedUser) {
      return handleResponse(res, 404, null, "User not found");
    }
    handleResponse(res, 200, updatedUser, "User updated successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteUserService(id);
    handleResponse(res, 200, null, "User deleted successfully");
  } catch (err) {
    next(err);
  }
};
