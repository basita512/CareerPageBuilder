import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateBrandingSchema, updateSEOSchema } from '../validators/company.validator';

const router = Router();

/**
 * @swagger
 * /api/companies/{slug}:
 *   get:
 *     summary: Get company by slug (public)
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Company slug
 *         example: acme-corp
 *     responses:
 *       200:
 *         description: Company retrieved successfully
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
 *                     id:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     name:
 *                       type: string
 *                     website:
 *                       type: string
 *                     logoUrl:
 *                       type: string
 *                     bannerUrl:
 *                       type: string
 *                     primaryColor:
 *                       type: string
 *                     secondaryColor:
 *                       type: string
 *       404:
 *         description: Company not found
 */
router.get('/:slug', CompanyController.getBySlug);

/**
 * @swagger
 * /api/companies/me/details:
 *   get:
 *     summary: Get my company details
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company details retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 */
router.get('/me/details', authenticate, CompanyController.getMine);

/**
 * @swagger
 * /api/companies/branding:
 *   put:
 *     summary: Update company branding
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logoUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/logo.png
 *               bannerUrl:
 *                 type: string
 *                 format: uri
 *               primaryColor:
 *                 type: string
 *                 pattern: '^#[0-9A-Fa-f]{6}$'
 *                 example: '#3B82F6'
 *               secondaryColor:
 *                 type: string
 *                 pattern: '^#[0-9A-Fa-f]{6}$'
 *                 example: '#1E40AF'
 *               fontFamily:
 *                 type: string
 *                 example: 'Inter'
 *     responses:
 *       200:
 *         description: Branding updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/branding', authenticate, validate(updateBrandingSchema), CompanyController.updateBranding);

/**
 * @swagger
 * /api/companies/seo:
 *   put:
 *     summary: Update company SEO settings
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metaTitle:
 *                 type: string
 *                 example: 'Join Our Team - Acme Corp Careers'
 *               metaDescription:
 *                 type: string
 *                 example: 'Explore exciting career opportunities at Acme Corp'
 *               faviconUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: SEO updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/seo', authenticate, validate(updateSEOSchema), CompanyController.updateSEO);

/**
 * @swagger
 * /api/companies/publish:
 *   post:
 *     summary: Publish company career page
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company published successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post('/publish', authenticate, CompanyController.publish);

export default router;
