"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controller/category.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const categoryController = new category_controller_1.CategoryController();
router.get("/", (req, res) => {
    categoryController.findAll(req, res);
});
router.get("/find", (req, res) => {
    categoryController.findByName(req, res);
});
router.get("/:id", (req, res) => {
    categoryController.find(req, res);
});
router.post("/", auth_middleware_1.authMiddleware, (req, res) => {
    categoryController.create(req, res);
});
router.put("/", auth_middleware_1.authMiddleware, (req, res) => {
    categoryController.update(req, res);
});
router.delete("/:id", auth_middleware_1.authMiddleware, (req, res) => {
    categoryController.delete(req, res);
});
exports.default = router;
//# sourceMappingURL=category.router.js.map