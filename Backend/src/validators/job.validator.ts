import { z } from 'zod';

export const createJobSchema = z.object({
    body: z.object({
        slug: z.string().optional(), // Optional, auto-generated from title if not provided
        title: z.string().min(1, 'Title is required'),
        description: z.string().min(1, 'Description is required'),
        department: z.string().min(1, 'Department is required'),
        location: z.string().min(1, 'Location is required'),
        locationType: z.enum(['remote', 'hybrid', 'onsite']),
        jobType: z.enum(['full-time', 'part-time', 'contract']),
        contractType: z.enum(['temporary', 'permanent', 'internship']),
        seniority: z.enum(['entry', 'mid', 'senior', 'lead', 'executive', 'architect']),
        salaryMin: z.number().int().positive().optional(),
        salaryMax: z.number().int().positive().optional(),
        salaryCurrency: z.string().default('USD'),
        requirements: z.array(z.string()),
        responsibilities: z.array(z.string()),
        niceToHave: z.array(z.string()).optional(),
        applicationUrl: z.string().url().optional(),
    }),
});

export const updateJobSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        department: z.string().optional(),
        location: z.string().optional(),
        locationType: z.enum(['remote', 'hybrid', 'onsite']).optional(),
        jobType: z.enum(['full-time', 'part-time', 'contract', 'internship']).optional(),
        contractType: z.enum(['temporary', 'permanent', 'internship']).optional(),
        seniority: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']).optional(),
        salaryMin: z.number().int().positive().optional(),
        salaryMax: z.number().int().positive().optional(),
        requirements: z.array(z.string()).optional(),
        responsibilities: z.array(z.string()).optional(),
        niceToHave: z.array(z.string()).optional(),
        isActive: z.boolean().optional(),
    }),
});

export const listJobsSchema = z.object({
    query: z.object({
        page: z.string().optional().transform(val => val ? parseInt(val) : 1),
        limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
        search: z.string().optional(),
        locations: z.string().optional().transform(val => val?.split(',')),
        locationTypes: z.string().optional().transform(val => val?.split(',')),
        jobTypes: z.string().optional().transform(val => val?.split(',')),
        departments: z.string().optional().transform(val => val?.split(',')),
        seniorities: z.string().optional().transform(val => val?.split(',')),
    }),
});
