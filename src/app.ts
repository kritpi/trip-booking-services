import express, { Request, Response } from "express";
import setUpRouter from "./routes/index";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors"

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}

app.use(express.json());
app.use(cors(corsOptions))


setUpRouter(app);

app.listen(port, () => {
  console.log(`Running On Port ${port}`);
});

export default app;
