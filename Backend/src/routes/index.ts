import { Router } from 'express';
import authRoutes from './auth.routes';
import companyRoutes from './company.routes';
import jobRoutes from './job.routes';
import sectionRoutes from './section.routes';
import analyticsRoutes from './analytics.routes';
import uploadRoutes from './upload.routes';
import { apiLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

// Apply rate limiting to all API routes
router.use(apiLimiter);

// Mount routes
router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/jobs', jobRoutes);
router.use('/sections', sectionRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/upload', uploadRoutes);

export default router;
