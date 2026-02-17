import express from "express";
import {verifyJWT} from "../middleware/auth.middleware.js";
import {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();


router.post("/", verifyJWT,createTask);
router.get("/", verifyJWT,getTasks);
router.get("/:id", verifyJWT,getSingleTask);
router.patch("/:id", verifyJWT,updateTask);
router.delete("/:id", verifyJWT,deleteTask);

export default router;
