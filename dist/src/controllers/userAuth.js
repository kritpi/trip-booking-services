"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProfile = exports.register = exports.refreshToken = exports.login = void 0;
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("../service/user"));
const userAuth_1 = __importDefault(require("../service/userAuth"));
const jsonwebtoken_1 = require("jsonwebtoken");
const token_1 = require("../utils/token");
const constant_1 = require("../constant");
const login = async (req, res) => {
    const { email, password } = req.body;
    //Check if user exists
    const isExist = await userAuth_1.default.isUserExist(email);
    if (!isExist) {
        return res.status(401).json({
            message: "Email is not exist",
        });
    }
    //Password validation
    const isPasswordCorrected = await userAuth_1.default.checkPassword(email, password);
    if (!isPasswordCorrected) {
        return res.status(401).json({
            message: "Email or Password is incorrect"
        });
    }
    //Generate access and refresh token
    const accessToken = await userAuth_1.default.generateAccessToken(email);
    const refreshToken = await userAuth_1.default.generateRefreshToken(email);
    const info = await user_1.default.findUserByEmail(email);
    return res.status(200).json({
        id: info?.id,
        email: info?.email,
        username: info?.username,
        role: info?.role,
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessTokenExpires: new Date(Date.now() + constant_1.JWT_ACCESS_EXPIRE_TIME),
        refreshTokenExpires: new Date(Date.now() + constant_1.JWT_REFRESH_EXPIRE_TIME)
    });
};
exports.login = login;
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(403).json({
            message: "Authentication failed"
        });
    }
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined");
    }
    try {
        const decoded = await userAuth_1.default.decodeRefreshToken(refreshToken);
        //Generate new access token
        const accessToken = await userAuth_1.default.generateAccessToken(decoded.email);
        const newRefreshToken = await userAuth_1.default.generateRefreshToken(decoded.email);
        const info = await user_1.default.findUserByEmail(decoded.email);
        return res.status(200).json({
            id: info?.id,
            email: info?.email,
            username: info?.username,
            role: info?.role,
            accessToken: accessToken,
            refreshToken: newRefreshToken,
            accessTokenExpires: new Date(Date.now() + constant_1.JWT_ACCESS_EXPIRE_TIME),
            refreshTokenExpires: new Date(Date.now() + constant_1.JWT_REFRESH_EXPIRE_TIME)
        });
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return res.status(403).json({
                message: "Token is expired"
            });
        }
        return res.status(403).json({
            message: "Token is invalid"
        });
    }
};
exports.refreshToken = refreshToken;
const register = async (req, res) => {
    const { name, lastName, gender, email, phoneNumber, birthDate, username, password } = req.body;
    //Check if user exists
    const isExist = await userAuth_1.default.isUserExist(email);
    if (isExist) {
        return res.status(401).json({
            message: "Email is already exist",
        });
    }
    //Create new user
    const newUser = await user_1.default.createUser(name, lastName, gender, email, phoneNumber, birthDate, username, password, client_1.Role.User);
    //Generate access token and refresh token
    const accessToken = await userAuth_1.default.generateAccessToken(email);
    const refreshToken = await userAuth_1.default.generateRefreshToken(email);
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
        accessTokenExpires: new Date(Date.now() + constant_1.JWT_ACCESS_EXPIRE_TIME),
        refreshTokenExpires: new Date(Date.now() + constant_1.JWT_REFRESH_EXPIRE_TIME)
    });
};
exports.register = register;
const myProfile = async (req, res) => {
    const token = (0, token_1.getJwtTokenHeader)(req);
    const jwtPayload = await userAuth_1.default.decodeAccessToken(token);
    const email = jwtPayload.email;
    const info = await user_1.default.findUserByEmail(email);
    return res.status(200).json({
        id: info?.id,
        email: info?.email,
        username: info?.username,
        role: info?.role
    });
};
exports.myProfile = myProfile;
//# sourceMappingURL=userAuth.js.map