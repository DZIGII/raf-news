"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const Category_1 = require("../models/Category");
class CategoryRepository {
    async findByPk(id) {
        return Category_1.Category.findByPk(id);
    }
    async findAll(limit, offset) {
        return Category_1.Category.findAll({ limit, offset });
    }
    async findByName(name) {
        return Category_1.Category.findOne({ where: { name } });
    }
    async createCategory(data) {
        return Category_1.Category.create(data);
    }
    async updateCategory(data) {
        const ctg = await Category_1.Category.findByPk(data.categoryId);
        if (!ctg)
            throw new Error('Category dosent exist');
        return ctg.update(data);
    }
    async deleteCategoryByPk(id) {
        await Category_1.Category.destroy({ where: { categoryId: id } });
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map