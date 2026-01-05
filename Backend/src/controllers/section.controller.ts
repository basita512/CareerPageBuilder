import { Request, Response } from 'express';
import { SectionService } from '../services/section.service';
import { asyncHandler } from '../utils/errors.util';

export class SectionController {
    static create = asyncHandler(async (req: Request, res: Response) => {
        const section = await SectionService.create(req.user!.companyId, req.body);

        res.status(201).json({
            success: true,
            data: section,
            message: 'Section created successfully',
        });
    });

    static update = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const section = await SectionService.update(
            id,
            req.user!.companyId,
            req.body
        );

        res.json({
            success: true,
            data: section,
            message: 'Section updated successfully',
        });
    });

    static reorder = asyncHandler(async (req: Request, res: Response) => {
        const { sectionIds } = req.body;
        await SectionService.reorder(req.user!.companyId, sectionIds);

        res.json({
            success: true,
            message: 'Sections reordered successfully',
        });
    });

    static delete = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await SectionService.delete(id, req.user!.companyId);

        res.json({
            success: true,
            message: 'Section deleted successfully',
        });
    });
}
