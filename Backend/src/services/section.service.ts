import { prisma } from '../config/connect_db';
import { ApiError } from '../utils/errors.util';

export class SectionService {
    static async create(companyId: string, data: {
        type: string;
        title?: string;
        content: any;
        orderIndex?: number;
    }) {
        // Get max order index
        const maxOrder = await prisma.section.aggregate({
            where: { companyId },
            _max: { orderIndex: true },
        });

        const section = await prisma.section.create({
            data: {
                companyId,
                type: data.type,
                title: data.title,
                content: data.content,
                orderIndex: data.orderIndex ?? (maxOrder._max.orderIndex ?? 0) + 1,
            },
        });

        return section;
    }

    static async update(
        sectionId: string,
        companyId: string,
        data: {
            title?: string;
            content?: any;
            isVisible?: boolean;
        }
    ) {
        // Verify ownership
        const section = await prisma.section.findFirst({
            where: { id: sectionId, companyId },
        });

        if (!section) {
            throw new ApiError(404, 'Section not found');
        }

        const updated = await prisma.section.update({
            where: { id: sectionId },
            data,
        });

        return updated;
    }

    static async reorder(companyId: string, sectionIds: string[]) {
        // Batch update order indices
        const updates = sectionIds.map((id, index) =>
            prisma.section.updateMany({
                where: { id, companyId },
                data: { orderIndex: index },
            })
        );

        await prisma.$transaction(updates);

        return { message: 'Sections reordered successfully' };
    }

    static async delete(sectionId: string, companyId: string) {
        await prisma.section.deleteMany({
            where: { id: sectionId, companyId },
        });

        return { message: 'Section deleted successfully' };
    }
}
