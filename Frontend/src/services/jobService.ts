import apiClient from '@/lib/axiosConfig';

export interface Job {
    id: string;
    title: string;
    description: string;
    department: string;
    location: string;
    locationType: 'remote' | 'onsite' | 'hybrid';
    jobType: 'full-time' | 'part-time' | 'contract';
    contractType: 'temporary' | 'permanent' | 'internship';
    seniority: 'entry' | 'mid' | 'senior' | 'lead' | 'executive' | 'architect';
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency: string;
    requirements?: string[];
    responsibilities?: string[];
    niceToHave?: string[];
    status: 'Active' | 'Draft' | 'Closed';
    createdAt: string;
    companyId?: string;
}

export interface CreateJobData {
    title: string;
    description: string;
    department: string;
    location: string;
    locationType: string;
    jobType: string;
    contractType: string;
    seniority: string;
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency: string;
    requirements?: string[];
    responsibilities?: string[];
    niceToHave?: string[];
}

export const jobService = {
    /**
     * Get all jobs for a company (public)
     */
    async getCompanyJobs(slug: string): Promise<{ success: boolean; data: Job[] }> {
        const response = await apiClient.get(`/jobs/company/${slug}`);
        return response.data;
    },

    /**
     * Get a single job by ID (public)
     */
    async getJobById(id: string): Promise<{ success: boolean; data: Job }> {
        const response = await apiClient.get(`/jobs/${id}`);
        return response.data;
    },

    /**
     * Get my company's jobs (recruiter)
     */
    async getMyJobs(): Promise<{ success: boolean; data: Job[] }> {
        const response = await apiClient.get('/jobs/me/jobs');
        return response.data;
    },

    /**
     * Create a new job (recruiter)
     */
    async createJob(data: CreateJobData): Promise<{ success: boolean; data: Job }> {
        const response = await apiClient.post('/jobs', data);
        return response.data;
    },

    /**
     * Update a job (recruiter)
     */
    async updateJob(id: string, data: Partial<CreateJobData>): Promise<{ success: boolean; data: Job }> {
        const response = await apiClient.put(`/jobs/${id}`, data);
        return response.data;
    },

    /**
     * Delete a job (recruiter)
     */
    async deleteJob(id: string): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.delete(`/jobs/${id}`);
        return response.data;
    }
};
