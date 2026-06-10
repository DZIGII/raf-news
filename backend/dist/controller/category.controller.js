"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../service/category.service");
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.CategoryService();
    }
    async find(req, res) {
        try {
            const id = Number(req.params.id);
            const category = await this.categoryService.find(id);
            return res.status(200).json(category);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findAll(req, res) {
        try {
            const limit = Number(req.query.limit) || 30;
            const page = Number(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const categories = await this.categoryService.findAll(limit, offset);
            return res.status(200).json(categories);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findByName(req, res) {
        try {
            const str = String(req.query.q);
            const category = await this.categoryService.findByName(str);
            return res.status(200).json(category);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async create(req, res) {
        try {
            const category = await this.categoryService.create(req.body);
            return res.status(201).json(category);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async update(req, res) {
        try {
            const category = await this.categoryService.updateCategory(req.body);
            return res.status(200).json(category);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await this.categoryService.delete(id);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map