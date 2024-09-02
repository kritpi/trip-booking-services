import express, { Request, Response } from "express";
import taskRoutes from "./routes/task";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors"

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())

app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Running On Port ${port}`);
});
