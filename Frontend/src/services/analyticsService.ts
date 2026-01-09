import axios from '@/lib/axiosConfig';

export interface AnalyticsOverview {
    pageViews: number;
    jobViews: number;
    applyClicks: number;
    conversionRate: number;
}

export interface TopJob {
    job: {
        id: string;
        title: string;
        department: string;
    };
    views: number;
}

interface AnalyticsResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const analyticsService = {
    getOverview: async (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const response = await axios.get<AnalyticsResponse<AnalyticsOverview>>(`/analytics/overview?${params.toString()}`);
        return response.data;
    },

    getTopJobs: async (limit: number = 10) => {
        const response = await axios.get<AnalyticsResponse<TopJob[]>>(`/analytics/top-jobs?limit=${limit}`);
        return response.data;
    },

    track: async (data: {
        companySlug: string;
        jobId?: string;
        eventType: 'page_view' | 'job_view' | 'apply_click';
        metadata?: any;
    }) => {
        // Don't track if in development or if explicitly disabled (optional)
        // For now, we want to track everything for the demo
        try {
            await axios.post('/analytics/track', data);
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    }
};
