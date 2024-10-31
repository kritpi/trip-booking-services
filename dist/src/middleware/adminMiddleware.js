"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth_1 = __importDefault(require("../service/userAuth"));
const client_1 = require("@prisma/client");
const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.headers["authorization"]) {
            return res.sendStatus(403).json({
                message: "Authentication failed"
            });
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not definded');
        }
        const token = req.headers["authorization"].replace("Bearer ", "");
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //Check Role
        const decoded = await userAuth_1.default.decodeAccessToken(token);
        if (decoded.role !== client_1.Role.Admin) {
            return res.sendStatus(403).json({
                message: "Authentication failed"
            });
        }
    }
    catch (error) {
        return res.sendStatus(403).json({
            message: "Token is invalid"
        });
    }
};
exports.default = adminMiddleware;
//# sourceMappingURL=adminMiddleware.js.map