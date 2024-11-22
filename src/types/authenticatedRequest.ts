import { Request } from "express";
import { CustomJwtPayload } from "./customJwtPayload";

export interface AuthenticatedRequest extends Request {
    user?: CustomJwtPayload;
}