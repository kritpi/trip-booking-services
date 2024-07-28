import { Task } from "../models/task";
import { Request, Response } from "express";

let tasks: Task[] = [];

export class TaskController {
  getAllTask(req: Request, res: Response) {
    res.status(200).json(tasks);
  }
  createTask(req: Request, res: Response) {
    console.log("test", req.body.title)
    const task: Task = {
      id: tasks.length + 1,
      title: req.body.title,
      description: req.body.description,
      status: false,
    };
    tasks.push(task);
    res.json(tasks)

  }
}

