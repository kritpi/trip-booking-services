import { Request, Response, Router } from "express";

import { TaskController } from "../controllers/task";

const router = Router();
const taskController = new TaskController();
router.get("/Test", (req: Request, res: Response) => {
  res.send("Test Router Task");
});
router.get("/", taskController.getAllTask);
router.post("/", taskController.createTask);

export default router;
