import { Request, Response, Router } from "express";

import { TaskController } from "../controllers/task";

const router = Router();
const taskController = new TaskController();

router.get("/", taskController.getAllTask);
router.get("/:id", taskController.findTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.editTask);
router.delete("/:id", taskController.deleteTask);

export default router;
