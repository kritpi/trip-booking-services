import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(403).json({
        message: "Authenticaion failed"
      })
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined')
    }
    const token = req.headers["authorization"].replace("Bearer ", "")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    return res.sendStatus(403).json({
      message: "Token is invalie"
    })
  }
}

export default authMiddleware;