import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import userAuthService from "../service/userAuth"
import { Role } from "@prisma/client"

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(403).json({
        message: "Authentication failed"
      })
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error('ACCESS_TOKEN_SECRET is not definded')
    }
    const token = req.headers["authorization"].replace("Bearer ", "")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    //Check Role
    const decoded = await userAuthService.decodeAccessToken(token)
    if (decoded.role !== Role.Admin) {
      return res.sendStatus(403).json({
        message: "Authentication failed"
      })
    }
  } catch (error) {
    return res.sendStatus(403).json({
      message: "Token is invalid"
    })
  }
}