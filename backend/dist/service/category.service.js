"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categoryMapper_1 = require("../mapper/categoryMapper");
const category_repository_1 = require("../repository/category.repository");
const news_reporitory_1 = require("../repository/news.reporitory");
class CategoryService {
    constructor() {
        this.categoryRepository = new category_repository_1.CategoryRepository();
        this.newsRepository = new news_reporitory_1.NewsRepository();
    }
    async find(id) {
        const category = await this.categoryRepository.findByPk(id);
        if (!category)
            throw new Error("Category does not exists");
        return (0, categoryMapper_1.toCategoryResponseDto)(category);
    }
    async findAll(limit, offset) {
        const categories = await this.categoryRepository.findAll(limit, offset);
        return categories.map(categoryMapper_1.toCategoryResponseDto);
    }
    async findByName(data) {
        const category = await this.categoryRepository.findByName(data);
        if (!category)
            throw new Error("Category does not exists");
        return (0, categoryMapper_1.toCategoryResponseDto)(category);
    }
    async create(data) {
        const existing = await this.categoryRepository.findByName(data.name);
        if (existing)
            throw new Error('Category with that name already exists');
        const category = await this.categoryRepository.createCategory({
            name: data.name,
            description: data.description
        });
        return (0, categoryMapper_1.toCategoryResponseDto)(category);
    }
    async updateCategory(data) {
        const existing = await this.categoryRepository.findByName(data.name);
        if (existing && existing.get('categoryId') !== data.categoryId)
            throw new Error('Category with that name already exists');
        const category = await this.categoryRepository.updateCategory(data);
        return (0, categoryMapper_1.toCategoryResponseDto)(category);
    }
    async delete(id) {
        const newsCount = await this.newsRepository.countByCategoryId(id);
        if (newsCount > 0)
            throw new Error('Cannot delete category — it contains news articles');
        await this.categoryRepository.deleteCategoryByPk(id);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map