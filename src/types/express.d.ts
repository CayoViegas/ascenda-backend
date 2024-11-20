import { CustomJwtPayload } from "./customJwtPayload";

declare module "express-serve-static-core" {
    interface Request {
        user?: CustomJwtPayload;
    }
}
