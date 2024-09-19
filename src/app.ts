import express, { Request, Response } from "express";
import taskRoutes from "./routes/task";
import userAuthRoutes from "./routes/userAuth";
import userRoutes from "./routes/user";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors"

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}

app.use(express.json());
app.use(cors(corsOptions))

app.use("/tasks", taskRoutes);
app.use("/auth", userAuthRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Running On Port ${port}`);
});
