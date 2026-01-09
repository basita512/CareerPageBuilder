import apiClient from '@/lib/axiosConfig';

export interface SectionContent {
    [key: string]: any;
}

export interface Section {
    id: string;
    type: 'hero' | 'about' | 'values' | 'benefits';
    title: string;
    content: SectionContent;
    orderIndex: number;
    isVisible: boolean;
}

export const sectionService = {
    /**
     * Create a new section
     */
    async createSection(data: Partial<Section>): Promise<{ success: boolean; data: Section }> {
        const response = await apiClient.post('/sections', data);
        return response.data;
    },

    /**
     * Update an existing section
     */
    async updateSection(id: string, data: Partial<Section>): Promise<{ success: boolean; data: Section }> {
        const response = await apiClient.put(`/sections/${id}`, data);
        return response.data;
    },

    /**
     * Delete a section
     */
    async deleteSection(id: string): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.delete(`/sections/${id}`);
        return response.data;
    },

    /**
     * Reorder sections
     */
    async reorderSections(sectionIds: string[]): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.post('/sections/reorder', { sectionIds });
        return response.data;
    }
};
