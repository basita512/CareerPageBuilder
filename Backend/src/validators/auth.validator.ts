import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        companyName: z.string().min(1, 'Company name is required'),
        companySlug: z.string()
            .min(3)
            .max(50)
            .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        name: z.string().min(1, 'Name is required'),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
    }),
});
