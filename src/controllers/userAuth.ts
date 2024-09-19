import { Request, Response } from "express"
import { Role } from "@prisma/client"
import user from "../service/user"
import userAuth from "../service/userAuth"
import { TokenExpiredError } from 'jsonwebtoken';
import { getJwtTokenHeader } from "../utils/token";
import { JWT_ACCESS_EXPIRE_TIME, JWT_REFRESH_EXPIRE_TIME } from "../constant"

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //Check if user exists
  const isExist = await userAuth.isUserExist(email)
  if (!isExist) {
    return res.status(401).json({
      message: "Email is not exist",
    })
  }

  //Password validation
  const isPasswordCorrected = await userAuth.checkPassword(email, password)
  if (!isPasswordCorrected) {
    return res.status(401).json({
      message: "Email or Password is incorrect"
    })
  }

  //Generate access and refresh token
  const accessToken = await userAuth.generateAccessToken(email)
  const refreshToken = await userAuth.generateRefreshToken(email)

  const info = await user.findUserByEmail(email)

  return res.status(200).json({
    id: info?.id,
    email: info?.email,
    username: info?.username,
    role: info?.role,
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessTokenExpires: new Date(Date.now() + JWT_ACCESS_EXPIRE_TIME),
    refreshTokenExpires: new Date(Date.now() + JWT_REFRESH_EXPIRE_TIME)
  })
}

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  if (!refreshToken) {
    return res.status(403).json({
      message: "Authentication failed"
    })
  }

  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined")
  }
  try {
    const decoded = await userAuth.decodeRefreshToken(refreshToken)

    //Generate new access token
    const accessToken = await userAuth.generateAccessToken(decoded.email)
    const newRefreshToken = await userAuth.generateRefreshToken(decoded.email)
    const info = await user.findUserByEmail(decoded.email)

    return res.status(200).json({
      id: info?.id,
      email: info?.email,
      username: info?.username,
      role: info?.role,
      accessToken: accessToken,
      refreshToken: newRefreshToken,
      accessTokenExpires: new Date(Date.now() + JWT_ACCESS_EXPIRE_TIME),
      refreshTokenExpires: new Date(Date.now() + JWT_REFRESH_EXPIRE_TIME)
    })
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(403).json({
        message: "Token is expired"
      })
    }
    return res.status(403).json({
      message: "Token is invalid"
    })
  }
}

export const register = async (req: Request, res: Response) => {
  const { name, lastName, gender, email, phoneNumber, birthDate, username, password } = req.body

  //Check if user exists
  const isExist = await userAuth.isUserExist(email)
  if (isExist) {
    return res.status(401).json({
      message: "Email is already exist",
    })
  }
  
  //Create new user
  const newUser = await user.createUser(name, lastName, gender, email, phoneNumber, birthDate, username, password, Role.User)

  //Generate access token and refresh token
  const accessToken = await userAuth.generateAccessToken(email);
  const refreshToken = await userAuth.generateRefreshToken(email);

  return res.status(200).json({
    id: newUser.id,
    name: newUser.name,
    lastName: newUser.lastName,
    gender: newUser.gender,
    email: newUser.email,
    phoneNumber: newUser.phoneNumber,
    birthDate: newUser.birthDate,
    username: newUser.username,
    password: newUser.password,
    role: newUser.role,
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessTokenExpires: new Date(Date.now() + JWT_ACCESS_EXPIRE_TIME),
    refreshTokenExpires: new Date(Date.now() + JWT_REFRESH_EXPIRE_TIME)
  })
}

export const myProfile = async (req: Request, res: Response) => {
  const token = getJwtTokenHeader(req)
  const jwtPayload = await userAuth.decodeAccessToken(token)
  const email = jwtPayload.email
  const info = await user.findUserByEmail(email)
  return res.status(200).json({
    id: info?.id,
    email: info?.email,
    username: info?.username,
    role: info?.role
  })
}