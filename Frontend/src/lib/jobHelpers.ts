import { Job } from '@/types';

export const getUniqueLocations = (jobs: Job[]) => {
    return Array.from(new Set(jobs.map(job => job.location))).sort();
};

export const getUniqueDepartments = (jobs: Job[]) => {
    return Array.from(new Set(jobs.map(job => job.department))).sort();
};

export const getUniqueJobTypes = (jobs: Job[]) => {
    return Array.from(new Set(jobs.map(job => job.jobType))).sort();
};
