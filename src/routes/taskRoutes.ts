import express from "express";
import taskController from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, taskController.addTask);
router.get("/", authMiddleware, taskController.getTasks);
router.put("/complete", authMiddleware, taskController.completeTask);
router.get("/history", authMiddleware, taskController.getTaskHistory);

export default router;
