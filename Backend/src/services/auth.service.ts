import bcrypt from 'bcryptjs';
import { prisma } from '../config/connect_db';
import { generateToken } from '../utils/jwt.util';
import { ApiError } from '../utils/errors.util';

export class AuthService {
    static async register(data: {
        companyName: string;
        companySlug: string;
        email: string;
        password: string;
        name: string;
    }) {
        // Check if slug exists
        const existingCompany = await prisma.company.findUnique({
            where: { slug: data.companySlug },
        });

        if (existingCompany) {
            throw new ApiError(409, 'Company slug already taken');
        }

        // Check if email exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new ApiError(409, 'Email already registered');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(data.password, 10);

        // Create company and user in transaction
        const result = await prisma.$transaction(async (tx) => {
            const company = await tx.company.create({
                data: {
                    name: data.companyName,
                    slug: data.companySlug,
                },
            });

            const user = await tx.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    passwordHash,
                    companyId: company.id,
                    role: 'admin',
                },
            });

            return { company, user };
        });

        return {
            company: result.company,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
            },
        };
    }

    static async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                company: {
                    select: { id: true, name: true, slug: true },
                },
            },
        });

        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid credentials');
        }

        if (!user.isActive) {
            throw new ApiError(403, 'Account is deactivated');
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Generate token
        const token = generateToken({
            userId: user.id,
            companyId: user.companyId,
            role: user.role,
        });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                company: user.company,
            },
        };
    }

    static async getProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        logoUrl: true,
                    },
                },
            },
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Return only the fields we want
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            company: user.company,
            createdAt: user.createdAt,
        };
    }

    static async changePassword(
        userId: string,
        currentPassword: string,
        newPassword: string
    ) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

        if (!isPasswordValid) {
            throw new ApiError(401, 'Current password is incorrect');
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newPasswordHash },
        });

        return { message: 'Password changed successfully' };
    }
}
