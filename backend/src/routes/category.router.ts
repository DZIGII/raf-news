import { Router } from "express";
import { CategoryController } from "../controller/category.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

const router = Router()
const categoryController = new CategoryController()

/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: News categories — listing, lookup, and admin management
 */

/**
 * @openapi
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: List categories
 *     description: Returns a paginated list of categories.
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
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryResponseDto'
 *       400:
 *         description: Listing failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", (req, res) => {
    categoryController.findAll(req, res)
})

/**
 * @openapi
 * /categories/find:
 *   get:
 *     tags: [Categories]
 *     summary: Find a category by name
 *     description: Returns the category whose name exactly matches the query parameter.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *         description: Category name to look up
 *     responses:
 *       200:
 *         description: Matching category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponseDto'
 *       400:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/find", (req, res) => {
    categoryController.findByName(req, res)
})

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get a category by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Category id
 *     responses:
 *       200:
 *         description: Matching category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponseDto'
 *       400:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", (req, res) => {
    categoryController.find(req, res)
})

/**
 * @openapi
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a category
 *     description: Any authenticated user can create a category. Name must be unique — duplicates are rejected.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDto'
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponseDto'
 *       401:
 *         description: Missing or invalid token
 *       400:
 *         description: Validation error — e.g. category with that name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", authMiddleware, (req, res) => {
    categoryController.create(req, res)
})

/**
 * @openapi
 * /categories:
 *   put:
 *     tags: [Categories]
 *     summary: Update a category (admin only)
 *     description: The categoryId in the request body identifies the row to update. Name must remain unique across categories.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryDto'
 *     responses:
 *       200:
 *         description: Updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponseDto'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Authenticated but not an admin
 *       400:
 *         description: Validation error — e.g. another category already uses this name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/", authMiddleware, roleMiddleware("ADMIN"), (req, res) => {
    categoryController.update(req, res)
})

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category (admin only)
 *     description: |
 *       Deletes the category with the given id.
 *       Deletion is rejected if any news article still references this category — remove or reassign those news articles first.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Category id
 *     responses:
 *       204:
 *         description: Category deleted (no content)
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Authenticated but not an admin
 *       400:
 *         description: Cannot delete — the category still contains news articles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (req, res) => {
    categoryController.delete(req, res)
})

export default router
