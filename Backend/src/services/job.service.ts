import { prisma } from '../config/connect_db';
import { ApiError } from '../utils/errors.util';
import { Prisma } from '../../prisma/generated/prisma/client';

export interface JobFilters {
    locations?: string[];
    locationTypes?: string[];
    jobTypes?: string[];
    departments?: string[];
    seniorities?: string[];
}

export class JobService {
    static async list(
        companySlug: string,
        filters?: JobFilters,
        search?: string,
        page: number = 1,
        limit: number = 20
    ) {
        const company = await prisma.company.findUnique({
            where: { slug: companySlug },
            select: { id: true },
        });

        if (!company) {
            throw new ApiError(404, 'Company not found');
        }

        const where: Prisma.JobWhereInput = {
            companyId: company.id,
            isActive: true,
        };

        // Apply filters
        if (filters) {
            if (filters.locations?.length) {
                where.location = { in: filters.locations };
            }
            if (filters.locationTypes?.length) {
                where.locationType = { in: filters.locationTypes };
            }
            if (filters.jobTypes?.length) {
                where.jobType = { in: filters.jobTypes };
            }
            if (filters.departments?.length) {
                where.department = { in: filters.departments };
            }
            if (filters.seniorities?.length) {
                where.seniority = { in: filters.seniorities };
            }
        }

        // Search query
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [jobs, total] = await Promise.all([
            prisma.job.findMany({
                where,
                take: limit,
                skip: (page - 1) * limit,
                orderBy: { postedAt: 'desc' },
            }),
            prisma.job.count({ where }),
        ]);

        return {
            jobs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasMore: page * limit < total,
            },
        };
    }

    static async getById(jobId: string) {
        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: {
                company: {
                    select: {
                        name: true,
                        slug: true,
                        logoUrl: true,
                        website: true,
                    },
                },
            },
        });

        if (!job || !job.isActive) {
            throw new ApiError(404, 'Job not found');
        }

        // Increment view count
        await prisma.job.update({
            where: { id: jobId },
            data: { viewCount: { increment: 1 } },
        });

        return job;
    }

    static async getFilterOptions(companySlug: string) {
        const company = await prisma.company.findUnique({
            where: { slug: companySlug },
            select: { id: true },
        });

        if (!company) {
            throw new ApiError(404, 'Company not found');
        }

        const [locations, departments] = await Promise.all([
            prisma.job.findMany({
                where: { companyId: company.id, isActive: true },
                select: { location: true },
                distinct: ['location'],
            }),
            prisma.job.findMany({
                where: { companyId: company.id, isActive: true },
                select: { department: true },
                distinct: ['department'],
            }),
        ]);

        return {
            locations: locations.map(j => j.location),
            departments: departments.map(j => j.department),
            locationTypes: ['remote', 'hybrid', 'onsite'],
            jobTypes: ['full-time', 'part-time', 'contract', 'internship'],
            seniorities: ['entry', 'mid', 'senior', 'lead', 'executive'],
        };
    }

    static async create(companyId: string, data: any) {
        // Generate slug from title if not provided
        let slug = data.slug;
        if (!slug) {
            // Convert title to slug: "Senior Software Engineer" -> "senior-software-engineer"
            slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            // Ensure uniqueness by checking if slug exists
            const existingJob = await prisma.job.findFirst({
                where: { companyId, slug },
            });

            if (existingJob) {
                // Append timestamp to make it unique
                slug = `${slug}-${Date.now()}`;
            }
        }

        const job = await prisma.job.create({
            data: {
                ...data,
                slug,
                companyId,
                niceToHave: data.niceToHave || [],
            },
        });

        return job;
    }

    static async update(jobId: string, companyId: string, data: any) {
        // Verify ownership
        const job = await prisma.job.findFirst({
            where: { id: jobId, companyId },
        });

        if (!job) {
            throw new ApiError(404, 'Job not found');
        }

        return await prisma.job.update({
            where: { id: jobId },
            data,
        });
    }

    static async delete(jobId: string, companyId: string) {
        await prisma.job.deleteMany({
            where: { id: jobId, companyId },
        });

        return { message: 'Job deleted successfully' };
    }

    static async getMyJobs(companyId: string) {
        const jobs = await prisma.job.findMany({
            where: { companyId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: {
                        analyticsEvents: {
                            where: { eventType: 'job_view' },
                        },
                    },
                },
            },
        });

        return jobs;
    }
}
