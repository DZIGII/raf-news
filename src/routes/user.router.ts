import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const userController = new UserController();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: User registration, authentication, and management
 */

/**
 * @openapi
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     description: Creates a new user account with role CREATOR and returns a JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: User created — returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIs...
 *       400:
 *         description: Validation or duplicate-email error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/register", (req, res) => userController.register(req, res));

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Log in an existing user
 *     description: Validates credentials and returns a JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Invalid credentials or disabled account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", (req, res) => {
    userController.login(req, res);
})

/**
 * @openapi
 * /users/update:
 *   put:
 *     tags: [Users]
 *     summary: Update the currently authenticated user
 *     description: Updates the profile of the user identified by the JWT.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: Updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       401:
 *         description: Missing or invalid token
 *       400:
 *         description: Update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/update", authMiddleware, (req, res) => {
    userController.update(req, res)
})

/**
 * @openapi
 * /users/users:
 *   get:
 *     tags: [Users]
 *     summary: List all users (admin only)
 *     security:
 *       - bearerAuth: []
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
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponseDto'
 *       400:
 *         description: Not authorized (non-admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", authMiddleware, (req, res) => {
    userController.findAll(req, res)
})


router.delete("/delete/:id", authMiddleware, (req, res) => {
    userController.delete(req, res)
})

export default router