// src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define custom interface for the authenticated request
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authenticateToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No authorization header found",
                success: false,
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "No token found",
                success: false,
            });
        }

        // Add some debugging
        console.log("Verifying token:", token.substring(0, 20) + "...");

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // Add debugging for decoded token
        console.log("Token verified, decoded user:", {
            userId: (decoded as any).userId,
            email: (decoded as any).email,
        });

        // Add user data to request
        req.user = {
            userId: (decoded as any).userId,
            email: (decoded as any).email,
        };

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token has expired",
                success: false,
            });
        }

        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
};
