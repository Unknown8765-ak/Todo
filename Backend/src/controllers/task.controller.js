import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// ➕ CREATE TASK
export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const task = await Task.create({
    title,
    description,
    user: req.user._id   // ✅ using your middleware user object
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});


// 📖 GET ALL TASKS
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});


// 📄 GET SINGLE TASK
export const getSingleTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task fetched successfully"));
});


// ✏ UPDATE TASK
export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});


// ❌ DELETE TASK
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  await task.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});
