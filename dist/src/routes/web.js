"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webRouter = () => {
    const web = (0, express_1.Router)();
    web.get('/', (req, res) => {
        res.send('Hello World');
    });
    return web;
};
exports.default = webRouter;
//# sourceMappingURL=web.js.map