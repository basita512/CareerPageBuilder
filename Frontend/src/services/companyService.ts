import apiClient from '@/lib/axiosConfig';
import axios from 'axios';

export interface BrandingConfig {
    companyName: string;
    logoUrl?: string;
    bannerUrl?: string;
    colors: Record<string, string>;
    fontFamily: string;
    website?: string;
    themeMode?: 'light' | 'dark';
}

export interface SEOConfig {
    metaTitle: string;
    metaDescription: string;
    faviconUrl?: string;
}

export interface CompanyDetails {
    id: string;
    slug: string;
    name: string;
    website?: string;
    logoUrl?: string;
    bannerUrl?: string;
    colors?: Record<string, string>;
    fontFamily?: string;
    metaTitle?: string;
    metaDescription?: string;
    faviconUrl?: string;
    themeMode?: 'light' | 'dark';
    sections?: any[];
}

export const companyService = {
    /**
     * Get current user's company details
     */
    async getMyCompany(): Promise<{ success: boolean; data: CompanyDetails }> {
        const response = await apiClient.get('/companies/me/details');
        return response.data;
    },

    /**
     * Update company branding
     */
    async updateBranding(data: Partial<BrandingConfig>): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.put('/companies/branding', data);
        return response.data;
    },

    /**
     * Update company SEO
     */
    async updateSEO(data: Partial<SEOConfig>): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.put('/companies/seo', data);
        return response.data;
    },

    async publishPage(): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.post('/companies/publish');
        return response.data;
    },

    /**
     * Get public company details by slug
     * Uses a clean axios instance to avoid sending auth tokens and handling 401 redirects
     */
    async getPublicCompany(slug: string): Promise<{ success: boolean; data: CompanyDetails & { jobs: any[] } }> {
        // Create a new instance to bypass interceptors
        const publicClient = axios.create({
            baseURL: apiClient.defaults.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await publicClient.get(`/companies/${slug}`);
        return response.data;
    }
};
