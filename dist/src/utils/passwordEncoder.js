"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const passwordEncoder = (password) => {
    const salt = bcrypt_1.default.genSaltSync(2);
    const hashed = bcrypt_1.default.hashSync(password, salt);
    return hashed;
};
exports.default = passwordEncoder;
//# sourceMappingURL=passwordEncoder.js.map