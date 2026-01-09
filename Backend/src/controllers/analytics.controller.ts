import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { asyncHandler } from '../utils/errors.util';

export class AnalyticsController {
    static track = asyncHandler(async (req: Request, res: Response) => {
        const result = await AnalyticsService.track({
            ...req.body,
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip,
            referrer: req.headers['referer'],
        });

        res.json({
            success: result.success,
        });
    });

    static getOverview = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;

        const end = endDate ? new Date(endDate as string) : new Date();
        const start = startDate ? new Date(startDate as string) : new Date(new Date().setDate(end.getDate() - 30));

        const overview = await AnalyticsService.getOverview(
            req.user!.companyId,
            start,
            end
        );

        res.json({
            success: true,
            data: overview,
        });
    });

    static getTopJobs = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate, limit } = req.query;

        const end = endDate ? new Date(endDate as string) : new Date();
        const start = startDate ? new Date(startDate as string) : new Date(new Date().setDate(end.getDate() - 30));

        const topJobs = await AnalyticsService.getTopJobs(
            req.user!.companyId,
            start,
            end,
            limit ? parseInt(limit as string) : 10
        );

        res.json({
            success: true,
            data: topJobs,
        });
    });
}
