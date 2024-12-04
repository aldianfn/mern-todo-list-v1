import express from "express";
import { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from "../controllers/TodoController.js";

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", getTodo)
router.post("/", createTodo);
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo);

export default router;