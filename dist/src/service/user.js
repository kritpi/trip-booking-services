"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordEncoder_1 = __importDefault(require("../utils/passwordEncoder"));
const prismaClient_1 = require("../utils/prismaClient");
const findUserByEmail = async (email) => {
    const user = await prismaClient_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
};
const createUser = async (name, lastName, gender, email, phoneNumber, birthDate, username, password, role) => {
    const user = await prismaClient_1.prisma.user.create({
        data: {
            username,
            name,
            lastName,
            gender,
            email,
            phoneNumber,
            birthDate,
            password: (0, passwordEncoder_1.default)(password),
            role,
        },
    });
    return user;
};
const deleteUser = async (id) => {
    const deleted = await prismaClient_1.prisma.user.delete({
        where: {
            id,
        },
    });
    return deleted;
};
const getAllUsers = async () => {
    const users = await prismaClient_1.prisma.user.findMany();
    return users;
};
const findUserById = async (id) => {
    const user = await prismaClient_1.prisma.user.findUnique({
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
const editUser = async (userId, user) => {
    const updatedUser = await prismaClient_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: user,
    });
};
exports.default = {
    findUserByEmail,
    createUser,
    deleteUser,
    getAllUsers,
    findUserById,
    editUser
};
//# sourceMappingURL=user.js.map