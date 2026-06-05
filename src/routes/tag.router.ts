import { Router } from "express";
import { TagController } from "../controller/tag.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

const router = Router()
const tagController = new TagController()

/**
 * @openapi
 * tags:
 *   name: Tags
 *   description: Tags applied to news articles
 */

/**
 * @openapi
 * /tags:
 *   get:
 *     tags: [Tags]
 *     summary: List tags
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 30 }
 *         description: Page size
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: 1-based page number
 *     responses:
 *       200:
 *         description: List of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TagResponseDto'
 *       400:
 *         description: Listing failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", (req, res) => {
    tagController.findAll(req, res)
})

/**
 * @openapi
 * /tags/find:
 *   get:
 *     tags: [Tags]
 *     summary: Find a tag by keyword
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *         description: Exact keyword to look up
 *     responses:
 *       200:
 *         description: Matching tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagResponseDto'
 *       400:
 *         description: Tag not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/find", (req, res) => {
    tagController.findByKeyword(req, res)
})

/**
 * @openapi
 * /tags/{id}:
 *   get:
 *     tags: [Tags]
 *     summary: Get a tag by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Tag id
 *     responses:
 *       200:
 *         description: Matching tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagResponseDto'
 *       400:
 *         description: Tag not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", (req, res) => {
    tagController.find(req, res)
})

/**
 * @openapi
 * /tags:
 *   post:
 *     tags: [Tags]
 *     summary: Create a tag
 *     description: Any authenticated user can create a tag. Keyword must be unique.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagDto'
 *     responses:
 *       201:
 *         description: Tag created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagResponseDto'
 *       401:
 *         description: Missing or invalid token
 *       400:
 *         description: Validation error — keyword missing or already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", authMiddleware, (req, res) => {
    tagController.create(req, res)
})

/**
 * @openapi
 * /tags/{id}:
 *   delete:
 *     tags: [Tags]
 *     summary: Delete a tag (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Tag id
 *     responses:
 *       204:
 *         description: Tag deleted (no content)
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Authenticated but not an admin
 *       400:
 *         description: Deletion failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (req, res) => {
    tagController.delete(req, res)
})

export default router
