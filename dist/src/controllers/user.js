"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = exports.editUser = exports.getUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../service/user"));
const userAuth_1 = __importDefault(require("../service/userAuth"));
const createUser = async (req, res) => {
    const user = req.body;
    console.log(user);
    try {
        const isExist = await userAuth_1.default.isUserExist(user.email);
        if (isExist) {
            return res.status(401).json({
                message: "Email is already exist",
            });
        }
        else {
            await user_1.default.createUser(user.name, user.lastName, user.gender, user.email, user.phoneNumber, user.birthDate, user.username, user.password, user.role);
        }
    }
    catch (error) {
        res.send(error);
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await user_1.default.findUserById(userId);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.getUser = getUser;
const editUser = async (req, res) => {
    const userId = req.params.id;
    const user = req.body;
    try {
        await user_1.default.editUser(userId, user);
        res.status(200).send("Edited");
    }
    catch (error) {
        res.status(404).send(error);
    }
};
exports.editUser = editUser;
const getAllUsers = async (req, res) => {
    //get all users
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    //delete user
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map