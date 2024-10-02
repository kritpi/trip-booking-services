import { Request, Response } from "express";
import UserService from "../service/user";
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
      await UserService.createUser(
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

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await UserService.findUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error); 
  }
};

export const editUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = req.body;
  try {
    await UserService.editUser(userId, user);
    res.status(200).send("Edited")
  } catch (error) {
    res.status(404).send(error);
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  //get all users
};

export const deleteUser = async (req: Request, res: Response) => {
  //delete user
};
