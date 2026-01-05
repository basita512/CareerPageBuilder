import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/analytics/track:
 *   post:
 *     summary: Track analytics event (public)
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *               - eventType
 *             properties:
 *               companyId:
 *                 type: string
 *                 example: 'clxxx123456'
 *               eventType:
 *                 type: string
 *                 enum: [page_view, job_view, job_apply_click]
 *                 example: 'job_view'
 *               jobId:
 *                 type: string
 *                 description: Required for job-related events
 *               metadata:
 *                 type: object
 *                 description: Additional event metadata
 *     responses:
 *       201:
 *         description: Event tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post('/track', AnalyticsController.track);

/**
 * @swagger
 * /api/analytics/overview:
 *   get:
 *     summary: Get analytics overview for my company
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for analytics period
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for analytics period
 *     responses:
 *       200:
 *         description: Analytics overview retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalPageViews:
 *                       type: integer
 *                     totalJobViews:
 *                       type: integer
 *                     totalApplicationClicks:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 */
router.get('/overview', authenticate, AnalyticsController.getOverview);

/**
 * @swagger
 * /api/analytics/top-jobs:
 *   get:
 *     summary: Get top performing jobs by views
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of top jobs to return
 *     responses:
 *       200:
 *         description: Top jobs retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       jobId:
 *                         type: string
 *                       title:
 *                         type: string
 *                       views:
 *                         type: integer
 *       401:
 *         description: Unauthorized
 */
router.get('/top-jobs', authenticate, AnalyticsController.getTopJobs);

export default router;
