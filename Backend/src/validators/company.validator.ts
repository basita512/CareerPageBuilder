import { z } from 'zod';

export const updateBrandingSchema = z.object({
    body: z.object({
        logoUrl: z.string().url().optional(),
        bannerUrl: z.string().url().optional(),
        primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
        secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
        fontFamily: z.string().optional(),
    }),
});

export const updateSEOSchema = z.object({
    body: z.object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        faviconUrl: z.string().url().optional(),
    }),
});
