import { Request, Response } from "express";
import { TaskService } from "../service/task";

const taskService = new TaskService();
export class TaskController {
  createTask = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      await taskService.createTask(data);
      res.status(201).send("Task Created");
    } catch (error) {
      res.status(400).send("Cannot Create Task");
    }
  };

  getAllTask = async (req: Request, res: Response) => {
    try {
      const tasks = await taskService.getAllTask();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(404).send("Not Found Tasks");
    }
  };

  findTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);

      const task = await taskService.findTaskById(taskId);
      res.status(200).json(task);
    } catch (error) {
      res.status(404).send("Task Not Found");
    }
  };

  editTask = async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      const data = req.body;

      const oldTask = await taskService.findTaskById(taskId);
      if (!oldTask) {
        return res.status(404).send("Task Not Found");
      }

      oldTask.title = data.title || oldTask.title;
      oldTask.description = data.description || oldTask.description;
      oldTask.status = data.status || oldTask.status;

      await taskService.editTask(oldTask);
      res.status(200).send("Task Edited");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);
      await taskService.deleteTask(taskId);
      res.status(200).send("Task Deleted");
    } catch (error) {
      res.status(404).send("Can't Find Task");
    }
  };
}
