import { Router } from "express";
import { NewsController } from "../controller/news.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../config/upload";

const router = Router();
const newsController = new NewsController();

/**
 * @openapi
 * tags:
 *   name: News
 *   description: News articles — listing, detail, search, ranking, CRUD
 */

/**
 * @openapi
 * /news:
 *   get:
 *     tags: [News]
 *     summary: List news articles
 *     description: Returns a paginated list of news articles.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Page size
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: 1-based page number
 *     responses:
 *       200:
 *         description: List of news
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsResponseDto'
 *       400:
 *         description: Listing failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", (req, res) => {
    newsController.findAll(req, res)
})

/**
 * @openapi
 * /news/most-read:
 *   get:
 *     tags: [News]
 *     summary: Get the 10 most-read articles in the last 30 days
 *     description: Returns up to 10 articles ranked by number of visits in the past 30 days, most-visited first.
 *     responses:
 *       200:
 *         description: Ranked list of news
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsResponseDto'
 *       400:
 *         description: Lookup failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/most-read", (req, res) => {
    newsController.findMostRead(req, res)
})

/**
 * @openapi
 * /news/filter:
 *   get:
 *     tags: [News]
 *     summary: Filter news by search term and/or category
 *     description: Both filters are optional. Combined with AND when both are present.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Case-insensitive substring match against title and text
 *       - in: query
 *         name: categoryId
 *         schema: { type: integer }
 *         description: Exact category match
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Page size
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: 1-based page number
 *     responses:
 *       200:
 *         description: Filtered list of news
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsResponseDto'
 *       400:
 *         description: Filter failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/filter", (req, res) => {
    newsController.findFiltered(req, res)
})

/**
 * @openapi
 * /news/{id}:
 *   get:
 *     tags: [News]
 *     summary: Get a news article by id
 *     description: Returns the full article including tags, images, category, comments, and author.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: News article id
 *     responses:
 *       200:
 *         description: News article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsDetailResponseDto'
 *       400:
 *         description: Article not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", (req, res) => {
    newsController.newsDetail(req, res)
})

/**
 * @openapi
 * /news:
 *   post:
 *     tags: [News]
 *     summary: Create a news article
 *     description: Creates a new article authored by the caller. Accepts multipart/form-data with optional image uploads.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateNewsForm'
 *     responses:
 *       201:
 *         description: News created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsDetailResponseDto'
 *       401:
 *         description: Missing or invalid token
 *       400:
 *         description: Creation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", authMiddleware, upload.array("images"), (req, res) => {
    newsController.create(req, res)
})

/**
 * @openapi
 * /news/{id}:
 *   put:
 *     tags: [News]
 *     summary: Update a news article
 *     description: Updates an existing article. Only the original author or an admin can update. Accepts multipart/form-data with optional new image uploads (appended to the article).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: News article id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateNewsForm'
 *     responses:
 *       200:
 *         description: Updated article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsDetailResponseDto'
 *       401:
 *         description: Missing or invalid token
 *       400:
 *         description: Not allowed (non-author/non-admin) or update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", authMiddleware, upload.array("images"), (req, res) => {
    newsController.update(req, res)
})

/**
 * @openapi
 * /news/{id}:
 *   delete:
 *     tags: [News]
 *     summary: Delete a news article
 *     description: Deletes the article with the given id. Only the original author or an admin can delete.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: News article id
 *     responses:
 *       204:
 *         description: Article deleted (no content)
 *       401:
 *         description: Missing or invalid token
 *       400:
 *         description: Not allowed or deletion failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", authMiddleware, (req, res) => {
    newsController.delete(req, res)
})

export default router
