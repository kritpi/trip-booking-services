"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const web_1 = __importDefault(require("./web"));
const setUpRouter = (app) => {
    app.use("/", (0, web_1.default)());
    app.use("/", (0, api_1.default)());
};
exports.default = setUpRouter;
//# sourceMappingURL=index.js.map