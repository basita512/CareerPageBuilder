import { prisma } from '../config/connect_db';
import { ApiError } from '../utils/errors.util';

export class CompanyService {
    static async getBySlug(slug: string) {
        const company = await prisma.company.findUnique({
            where: { slug },
            include: {
                sections: {
                    where: { isVisible: true },
                    orderBy: { orderIndex: 'asc' },
                },
            },
        });

        if (!company || !company.isActive) {
            throw new ApiError(404, 'Company not found');
        }

        return company;
    }

    static async getMyCompany(companyId: string) {
        const company = await prisma.company.findUnique({
            where: { id: companyId },
            include: {
                sections: {
                    orderBy: { orderIndex: 'asc' },
                },
                _count: {
                    select: {
                        jobs: { where: { isActive: true } },
                    },
                },
            },
        });

        if (!company) {
            throw new ApiError(404, 'Company not found');
        }

        return company;
    }

    static async updateBranding(companyId: string, data: {
        logoUrl?: string;
        bannerUrl?: string;
        primaryColor?: string;
        secondaryColor?: string;
        fontFamily?: string;
    }) {
        const company = await prisma.company.update({
            where: { id: companyId },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });

        return company;
    }

    static async updateSEO(companyId: string, data: {
        metaTitle?: string;
        metaDescription?: string;
        faviconUrl?: string;
    }) {
        const company = await prisma.company.update({
            where: { id: companyId },
            data,
        });

        return company;
    }

    static async publish(companyId: string) {
        const company = await prisma.company.update({
            where: { id: companyId },
            data: {
                isActive: true,
                publishedAt: new Date(),
            },
        });

        return company;
    }
}
