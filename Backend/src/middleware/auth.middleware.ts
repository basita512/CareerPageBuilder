import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/connect_db';
import { ApiError } from '../utils/errors.util';

interface JwtPayload {
    userId: string;
    companyId: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                companyId: string;
                role: string;
            };
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new ApiError(401, 'No token provided');
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        // Fetch user from database
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                companyId: true,
                role: true,
                isActive: true,
            },
        });

        if (!user || !user.isActive) {
            throw new ApiError(401, 'Invalid token');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(new ApiError(401, 'Invalid token'));
        } else {
            next(error);
        }
    }
};

export const requireRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ApiError(401, 'Unauthorized'));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, 'Insufficient permissions'));
        }

        next();
    };
};
