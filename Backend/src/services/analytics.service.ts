import { prisma } from '../config/connect_db';

export class AnalyticsService {
    static async track(data: {
        companySlug: string;
        jobId?: string;
        eventType: string;
        userAgent?: string;
        ipAddress?: string;
        referrer?: string;
        metadata?: any;
    }) {
        const company = await prisma.company.findUnique({
            where: { slug: data.companySlug },
            select: { id: true },
        });

        if (!company) {
            return { success: false };
        }

        await prisma.analyticsEvent.create({
            data: {
                companyId: company.id,
                jobId: data.jobId,
                eventType: data.eventType,
                userAgent: data.userAgent,
                ipAddress: data.ipAddress,
                referrer: data.referrer,
                metadata: data.metadata || {},
            },
        });

        return { success: true };
    }

    static async getOverview(
        companyId: string,
        startDate: Date,
        endDate: Date
    ) {
        const [pageViews, jobViews, jobClicks, applyClicks] = await Promise.all([
            prisma.analyticsEvent.count({
                where: {
                    companyId,
                    eventType: 'page_view',
                    createdAt: { gte: startDate, lte: endDate },
                },
            }),
            prisma.analyticsEvent.count({
                where: {
                    companyId,
                    eventType: 'job_view',
                    createdAt: { gte: startDate, lte: endDate },
                },
            }),
            prisma.analyticsEvent.count({
                where: {
                    companyId,
                    eventType: 'job_click',
                    createdAt: { gte: startDate, lte: endDate },
                },
            }),
            prisma.analyticsEvent.count({
                where: {
                    companyId,
                    eventType: 'apply_click',
                    createdAt: { gte: startDate, lte: endDate },
                },
            }),
        ]);

        return {
            pageViews,
            jobViews,
            jobClicks,
            applyClicks,
            conversionRate: jobViews > 0 ? (applyClicks / jobViews) * 100 : 0,
        };
    }

    static async getTopJobs(
        companyId: string,
        startDate: Date,
        endDate: Date,
        limit: number = 10
    ) {
        const jobStats = await prisma.analyticsEvent.groupBy({
            by: ['jobId'],
            where: {
                companyId,
                jobId: { not: null },
                eventType: 'job_view',
                createdAt: { gte: startDate, lte: endDate },
            },
            _count: { jobId: true },
            orderBy: { _count: { jobId: 'desc' } },
            take: limit,
        });

        const jobIds = jobStats.map(stat => stat.jobId).filter(Boolean) as string[];
        const jobs = await prisma.job.findMany({
            where: { id: { in: jobIds } },
            select: { id: true, title: true, department: true },
        });

        return jobStats.map(stat => ({
            job: jobs.find(j => j.id === stat.jobId),
            views: stat._count.jobId,
        }));
    }
}
