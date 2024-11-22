import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../types/customJwtPayload";
import { AuthenticatedRequest } from "../types/authenticatedRequest";

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Authorization token is required." });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as CustomJwtPayload;

        req.user = decoded;

        next();
    } catch (error) {
        console.error("Authentication error.", error);
        res.status(401).json({ error: "Invalid or expired token." });
    }
};
