import { Role, Gender, User } from "@prisma/client";
import passwordEncoder from "../utils/passwordEncoder";

import { prisma } from "../utils/prismaClient";

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
//Edit user only name, lastname, gender, phone
// const editUser = async (
//   id: string,
//   name?: string,
//   lastName?: string,
//   gender?: Gender,
//   phoneNumber?: string,
//   birthDate?: string,
//   username?: string,
// ) => {
//   const updatedUser = await prisma.user.update({
//     where: {
//       id,
//     },
//     data: {
//       ...(name && { name }),
//       ...(lastName && { lastName }),
//       ...(gender && { gender }),      
//       ...(phoneNumber && { phoneNumber }),
//       ...(birthDate && { birthDate }),
//       ...(username && { username }),      
//     },
//   });
//   return updatedUser;
// };
const editUser = async (userId: string, user: User) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: user,
  })
}

export default {
  findUserByEmail,
  createUser,
  deleteUser,
  getAllUsers,
  findUserById,
  editUser
};
