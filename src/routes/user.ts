import { Request, Response, Router } from "express";

import { createUser } from "../controllers/user";

const router = Router();

router.post("/sign-up", createUser);


export default router;