import { Request, Response } from "express";
import  UserServcie  from "../service/user";

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  
  await UserServcie.createUser(user.name, user.lastName, user.gender, user.email, user.phoneNumber, user.birthDate, user.username, user.password, user.role);
  
}

export const getAllUsers = async (req: Request, res: Response) => {
  //get all users
}

export const getUser = async (req: Request, res: Response) => {
  //get user 
}

export const deleteUser = async (req: Request, res: Response) => {
  //delete user
}


