// Career Page Builder Types

export type LocationType = 'remote' | 'onsite' | 'hybrid';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type ContractType = 'temporary' | 'permanent' | 'internship';
export type Seniority = 'entry' | 'mid' | 'senior' | 'lead' | 'executive' | 'architect';
export type SectionType = 'hero' | 'about' | 'values' | 'benefits' | 'testimonials' | 'cta' | 'gallery';

export interface Company {
  id: string;
  slug: string;
  name: string;
  website?: string;
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  metaTitle?: string;
  metaDescription?: string;
  faviconUrl?: string;
  description?: string;
  cultureVideoUrl?: string;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  department: string;
  location: string;
  locationType: LocationType;
  jobType: JobType;
  contractType: ContractType;
  seniority: Seniority;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements?: string[];
  benefits?: string[];
  applyUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  id: string;
  companyId: string;
  type: SectionType;
  title?: string;
  content: Record<string, any>;
  orderIndex: number;
  isVisible: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  companyId: string;
  role: 'admin' | 'recruiter';
}

export interface AnalyticsEvent {
  companyId: string;
  eventType: 'page_view' | 'job_view' | 'job_apply_click';
  jobId?: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsOverview {
  totalPageViews: number;
  totalJobViews: number;
  totalApplicationClicks: number;
}
