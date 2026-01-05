import { Request, Response } from 'express';
import { JobService } from '../services/job.service';
import { asyncHandler } from '../utils/errors.util';

export class JobController {
    static list = asyncHandler(async (req: Request, res: Response) => {
        const { slug } = req.params;
        const {
            page = '1',
            limit = '10',
            search,
            locations,
            locationTypes,
            jobTypes,
            departments,
            seniorities,
        } = req.query as any;

        const filters = {
            locations,
            locationTypes,
            jobTypes,
            departments,
            seniorities,
        };

        const result = await JobService.list(
            slug,
            filters,
            search,
            parseInt(page as string, 10),
            parseInt(limit as string, 10)
        );

        res.json({
            success: true,
            data: result.jobs,
            pagination: result.pagination,
        });
    });

    static getById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const job = await JobService.getById(id);

        res.json({
            success: true,
            data: job,
        });
    });

    static getFilterOptions = asyncHandler(async (req: Request, res: Response) => {
        const { slug } = req.params;
        const options = await JobService.getFilterOptions(slug);

        res.json({
            success: true,
            data: options,
        });
    });

    static create = asyncHandler(async (req: Request, res: Response) => {
        const job = await JobService.create(req.user!.companyId, req.body);

        res.status(201).json({
            success: true,
            data: job,
            message: 'Job created successfully',
        });
    });

    static update = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const job = await JobService.update(id, req.user!.companyId, req.body);

        res.json({
            success: true,
            data: job,
            message: 'Job updated successfully',
        });
    });

    static delete = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await JobService.delete(id, req.user!.companyId);

        res.json({
            success: true,
            message: 'Job deleted successfully',
        });
    });

    static getMyJobs = asyncHandler(async (req: Request, res: Response) => {
        const jobs = await JobService.getMyJobs(req.user!.companyId);

        res.json({
            success: true,
            data: jobs,
        });
    });
}
