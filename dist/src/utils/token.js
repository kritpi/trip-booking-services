"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtTokenHeader = void 0;
const getJwtTokenHeader = (req) => {
    return req.headers["authorization"]?.replace("Bearer ", "");
};
exports.getJwtTokenHeader = getJwtTokenHeader;
//# sourceMappingURL=token.js.map