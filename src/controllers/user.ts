import { Request, Response } from "express";
import UserServcie from "../service/user";
import userAuth from "../service/userAuth";

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  try {
    const isExist = await userAuth.isUserExist(user.email);
    if (isExist) {
      return res.status(401).json({
        message: "Email is already exist",
      });
    } else {
      await UserServcie.createUser(
        user.name,
        user.lastName,
        user.gender,
        user.email,
        user.phoneNumber,
        user.birthDate,
        user.username,
        user.password,
        user.role
      );
    }
  } catch (error) {
    res.send(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  //get all users
};

export const getUser = async (req: Request, res: Response) => {
  //get user
};

export const deleteUser = async (req: Request, res: Response) => {
  //delete user
};
