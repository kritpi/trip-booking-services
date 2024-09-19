import { PrismaClient, Role, Gender } from "@prisma/client";
import passwordEncoder from "../utils/passwordEncoder";

const prisma = new PrismaClient();

const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const createUser = async (
  name: string,
  lastName: string,
  gender: Gender,
  email: string,
  phoneNumber: string,
  birthDate: string,
  username: string,
  password: string,
  role: Role
) => {
  const user = await prisma.user.create({
    data: {
      username,
      name,
      lastName,
      gender,
      email,
      phoneNumber,
      birthDate,
      password: passwordEncoder(password),
      role,
    },
  });
  return user;
};

const deleteUser = async (id: string) => {
  const deleted = await prisma.user.delete({
    where: {
      id,
    },
  });
  return deleted;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export default {
  findUserByEmail,
  createUser,
  deleteUser,
  getAllUsers,
  findUserById,
};
