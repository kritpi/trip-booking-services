import { Request } from "express";

export const getJwtTokenHeader = (req: Request): string | undefined => {
    return req.headers["authorization"]?.replace("Bearer ", "");   
}