import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/errors.util';

export class AuthController {
    static register = asyncHandler(async (req: Request, res: Response) => {
        const result = await AuthService.register(req.body);

        res.status(201).json({
            success: true,
            data: result,
            message: 'Registration successful',
        });
    });

    static login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);

        res.json({
            success: true,
            data: result,
            message: 'Login successful',
        });
    });

    static getProfile = asyncHandler(async (req: Request, res: Response) => {
        const user = await AuthService.getProfile(req.user!.id);

        res.json({
            success: true,
            data: user,
        });
    });

    static changePassword = asyncHandler(async (req: Request, res: Response) => {
        const { currentPassword, newPassword } = req.body;
        const result = await AuthService.changePassword(
            req.user!.id,
            currentPassword,
            newPassword
        );

        res.json({
            success: true,
            message: result.message,
        });
    });
}
