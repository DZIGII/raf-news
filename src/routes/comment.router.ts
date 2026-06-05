import { Router } from "express";
import { CommentController } from "../controller/comment.controller";
import { readerReactions } from "../middleware/readerReactions.middleware";

const router = Router()
const commentController = new CommentController()

/**
 * @openapi
 * tags:
 *   name: Comments
 *   description: Anonymous comments on news articles, with like/dislike
 */

/**
 * @openapi
 * /comments/news/{newsId}:
 *   get:
 *     tags: [Comments]
 *     summary: List comments for a news article
 *     description: Returns comments belonging to the given news article, ordered newest first.
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema: { type: integer }
 *         description: ID of the news article
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *         description: Page size
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: 1-based page number
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentResponseDto'
 *       400:
 *         description: Listing failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/news/:newsId", (req, res) => {
    commentController.findAllByNews(req, res)
})

/**
 * @openapi
 * /comments:
 *   post:
 *     tags: [Comments]
 *     summary: Add a comment to a news article
 *     description: Anonymous endpoint — no authentication required. Both authorName and content are required and must be non-blank.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentDto'
 *     responses:
 *       201:
 *         description: Comment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponseDto'
 *       400:
 *         description: Validation error (missing author name, content, or invalid newsId)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", (req, res) => {
    commentController.create(req, res)
})

/**
 * @openapi
 * /comments/{id}/like:
 *   post:
 *     tags: [Comments]
 *     summary: Like a comment
 *     description: |
 *       Increments the like counter on the comment.
 *       Currently anonymous and uncapped — a reader-session check (cookie-based) is planned to ensure
 *       one reaction per reader per comment.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Comment id
 *     responses:
 *       204:
 *         description: Like recorded (no content)
 *       400:
 *         description: Comment not found or update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/:id/like", readerReactions, (req, res) => {
    commentController.like(req, res)
})

/**
 * @openapi
 * /comments/{id}/dislike:
 *   post:
 *     tags: [Comments]
 *     summary: Dislike a comment
 *     description: |
 *       Increments the dislike counter on the comment.
 *       Currently anonymous and uncapped — a reader-session check (cookie-based) is planned to ensure
 *       one reaction per reader per comment.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Comment id
 *     responses:
 *       204:
 *         description: Dislike recorded (no content)
 *       400:
 *         description: Comment not found or update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/:id/dislike", readerReactions, (req, res) => {
    commentController.dislike(req, res)
})

export default router
