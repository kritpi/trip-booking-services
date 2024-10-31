"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers["authorization"]) {
            return res.sendStatus(403).json({
                message: "Authenticaion failed"
            });
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }
        const token = req.headers["authorization"].replace("Bearer ", "");
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (error) {
        return res.sendStatus(403).json({
            message: "Token is invalie"
        });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map