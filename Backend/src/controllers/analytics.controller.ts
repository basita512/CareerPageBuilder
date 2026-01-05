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

        const overview = await AnalyticsService.getOverview(
            req.user!.companyId,
            new Date(startDate as string),
            new Date(endDate as string)
        );

        res.json({
            success: true,
            data: overview,
        });
    });

    static getTopJobs = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate, limit } = req.query;

        const topJobs = await AnalyticsService.getTopJobs(
            req.user!.companyId,
            new Date(startDate as string),
            new Date(endDate as string),
            limit ? parseInt(limit as string) : 10
        );

        res.json({
            success: true,
            data: topJobs,
        });
    });
}
