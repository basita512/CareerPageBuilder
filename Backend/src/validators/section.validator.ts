import { z } from 'zod';

export const createSectionSchema = z.object({
    body: z.object({
        type: z.string().min(1, 'Type is required'),
        title: z.string().optional(),
        content: z.any(),
        orderIndex: z.number().int().optional(),
    }),
});

export const updateSectionSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        title: z.string().optional(),
        content: z.any().optional(),
        isVisible: z.boolean().optional(),
    }),
});

export const reorderSectionsSchema = z.object({
    body: z.object({
        sectionIds: z.array(z.string()).min(1, 'Section IDs are required'),
    }),
});
