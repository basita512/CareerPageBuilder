import { Router } from 'express';
import { SectionController } from '../controllers/section.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createSectionSchema, updateSectionSchema, reorderSectionsSchema } from '../validators/section.validator';

const router = Router();

/**
 * @swagger
 * /api/sections:
 *   post:
 *     summary: Create a new section
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [hero, about, values, benefits, testimonials, cta]
 *                 example: 'hero'
 *               title:
 *                 type: string
 *                 example: 'Join Our Amazing Team'
 *               content:
 *                 type: object
 *                 description: JSON content specific to section type
 *               orderIndex:
 *                 type: integer
 *                 default: 0
 *               isVisible:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Section created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, validate(createSectionSchema), SectionController.create);

/**
 * @swagger
 * /api/sections/{id}:
 *   put:
 *     summary: Update a section
 *     tags: [Sections]
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
 *               content:
 *                 type: object
 *               isVisible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Section updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Section not found
 */
router.put('/:id', authenticate, validate(updateSectionSchema), SectionController.update);

/**
 * @swagger
 * /api/sections/reorder:
 *   post:
 *     summary: Reorder sections
 *     tags: [Sections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sectionIds
 *             properties:
 *               sectionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ['sec1', 'sec2', 'sec3']
 *     responses:
 *       200:
 *         description: Sections reordered successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/reorder', authenticate, validate(reorderSectionsSchema), SectionController.reorder);

/**
 * @swagger
 * /api/sections/{id}:
 *   delete:
 *     summary: Delete a section
 *     tags: [Sections]
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
 *         description: Section deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Section not found
 */
router.delete('/:id', authenticate, SectionController.delete);

export default router;
