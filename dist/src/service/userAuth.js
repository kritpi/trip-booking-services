"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../service/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isUserExist = async (email) => {
    const user = await user_1.default.findUserByEmail(email);
    return !!user; //return as boolean
};
const checkPassword = async (email, password) => {
    const user = await user_1.default.findUserByEmail(email);
    if (!user) {
        //not found user
        return false;
    }
    return bcrypt_1.default.compareSync(password, user.password);
};
const generateAccessToken = async (email) => {
    const user = await user_1.default.findUserByEmail(email);
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    return token;
};
const generateRefreshToken = async (email) => {
    const user = await user_1.default.findUserByEmail(email);
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return token;
};
const decodeRefreshToken = async (token) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new Error('Token is invalid');
        }
        return decoded;
    });
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new jsonwebtoken_1.default.TokenExpiredError('Token is expired', new Date(decoded.exp));
    }
    return decoded;
};
const decodeAccessToken = async (token) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new Error('Token is invalid');
        }
        return decoded;
    });
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new jsonwebtoken_1.default.TokenExpiredError('Token is expired', new Date(decoded.exp));
    }
    return decoded;
};
exports.default = {
    isUserExist,
    checkPassword,
    generateAccessToken,
    generateRefreshToken,
    decodeRefreshToken,
    decodeAccessToken,
};
//# sourceMappingURL=userAuth.js.map