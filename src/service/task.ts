import { Task } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class TaskService {
  getAllTask = async () => {
    const tasks = await prisma.task.findMany();
    return tasks;
  };

  createTask = async (task) => {
    const newTask = await prisma.task.create({
      data: task,
    });
  };

  findTaskById = async (id) => {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    return task;
  };

  editTask = async (task) => {
    const edited = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        ...task,
      },
    });
    return edited;
  };

  deleteTask = async (id) => {
    const deleted = await prisma.task.delete({
      where: {
        id: id,
      },
    });
  };
}
