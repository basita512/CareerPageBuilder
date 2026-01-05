import { Router } from 'express';
import { JobController } from '../controllers/job.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createJobSchema, updateJobSchema, listJobsSchema } from '../validators/job.validator';

const router = Router();

/**
 * @swagger
 * /api/jobs/company/{slug}:
 *   get:
 *     summary: List all jobs for a company (public)
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Company slug
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: locations
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: jobTypes
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: departments
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       200:
 *         description: Jobs list retrieved successfully
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
 *                 pagination:
 *                   type: object
 */
router.get('/company/:slug', validate(listJobsSchema), JobController.list);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get job by ID (public)
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job retrieved successfully
 *       404:
 *         description: Job not found
 */
router.get('/:id', JobController.getById);

/**
 * @swagger
 * /api/jobs/company/{slug}/filters:
 *   get:
 *     summary: Get available filter options for company jobs
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filter options retrieved
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
 *                     locations:
 *                       type: array
 *                     departments:
 *                       type: array
 *                     jobTypes:
 *                       type: array
 */
router.get('/company/:slug/filters', JobController.getFilterOptions);

/**
 * @swagger
 * /api/jobs/me/jobs:
 *   get:
 *     summary: Get my company's jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me/jobs', authenticate, JobController.getMyJobs);

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - department
 *               - location
 *               - locationType
 *               - jobType
 *               - contractType
 *               - seniority
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Senior Software Engineer'
 *               description:
 *                 type: string
 *                 example: 'We are looking for an experienced engineer...'
 *               department:
 *                 type: string
 *                 example: 'Engineering'
 *               location:
 *                 type: string
 *                 example: 'San Francisco, CA'
 *               locationType:
 *                 type: string
 *                 enum: [remote, onsite, hybrid]
 *               jobType:
 *                 type: string
 *                 enum: [full-time, part-time, contract]
 *               contractType:
 *                 type: string
 *                 enum: [temporary, permanent, internship]
 *               seniority:
 *                 type: string
 *                 enum: [entry, mid, senior, lead, executive, architect]
 *               salaryMin:
 *                 type: integer
 *                 example: 120000
 *               salaryMax:
 *                 type: integer
 *                 example: 180000
 *               salaryCurrency:
 *                 type: string
 *                 default: 'USD'
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               responsibilities:
 *                 type: array
 *                 items:
 *                   type: string
 *               niceToHave:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, validate(createJobSchema), JobController.create);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 */
router.put('/:id', authenticate, validate(updateJobSchema), JobController.update);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 */
router.delete('/:id', authenticate, JobController.delete);

export default router;
