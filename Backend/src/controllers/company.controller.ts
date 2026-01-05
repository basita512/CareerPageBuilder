import { Request, Response } from 'express';
import { CompanyService } from '../services/company.service';
import { asyncHandler } from '../utils/errors.util';

export class CompanyController {
    static getBySlug = asyncHandler(async (req: Request, res: Response) => {
        const { slug } = req.params;
        const company = await CompanyService.getBySlug(slug);

        res.json({
            success: true,
            data: company,
        });
    });

    static getMine = asyncHandler(async (req: Request, res: Response) => {
        const company = await CompanyService.getMyCompany(req.user!.companyId);

        res.json({
            success: true,
            data: company,
        });
    });

    static updateBranding = asyncHandler(async (req: Request, res: Response) => {
        const company = await CompanyService.updateBranding(
            req.user!.companyId,
            req.body
        );

        res.json({
            success: true,
            data: company,
            message: 'Branding updated successfully',
        });
    });

    static updateSEO = asyncHandler(async (req: Request, res: Response) => {
        const company = await CompanyService.updateSEO(
            req.user!.companyId,
            req.body
        );

        res.json({
            success: true,
            data: company,
            message: 'SEO updated successfully',
        });
    });

    static publish = asyncHandler(async (req: Request, res: Response) => {
        const company = await CompanyService.publish(req.user!.companyId);

        res.json({
            success: true,
            data: company,
            message: 'Company published successfully',
        });
    });
}
