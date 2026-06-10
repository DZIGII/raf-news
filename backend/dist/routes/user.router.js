"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */
router.post("/register", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), (req, res) => userController.register(req, res));
/**
 * @openapi
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Log in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Authentication successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", (req, res) => {
    userController.login(req, res);
});
/**
 * @openapi
 * /users/update:
 *   put:
 *     tags: [Users]
 *     summary: Update current user
 *     security:
 *       - bearerAuth: []
 */
router.put("/update", auth_middleware_1.authMiddleware, (req, res) => {
    userController.update(req, res);
});
/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: List all users (admin only)
 *     security:
 *       - bearerAuth: []
 */
router.get("/", auth_middleware_1.authMiddleware, (req, res) => {
    userController.findAll(req, res);
});
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", auth_middleware_1.authMiddleware, (req, res) => {
    userController.findById(req, res);
});
/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user by admin
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), (req, res) => {
    userController.updateByAdmin(req, res);
});
/**
 * @openapi
 * /users/{id}/toggle-active:
 *   patch:
 *     tags: [Users]
 *     summary: Toggle user active status (admin only)
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:id/toggle-active", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), (req, res) => {
    userController.toggleActive(req, res);
});
/**
 * @openapi
 * /users/delete/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user (admin only)
 *     security:
 *       - bearerAuth: []
 */
router.delete("/delete/:id", auth_middleware_1.authMiddleware, (req, res) => {
    userController.delete(req, res);
});
exports.default = router;
//# sourceMappingURL=user.router.js.map