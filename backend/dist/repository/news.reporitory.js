"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepository = void 0;
const sequelize_1 = require("sequelize");
const News_1 = require("../models/News");
const Category_1 = require("../models/Category");
const Tag_1 = require("../models/Tag");
const User_1 = require("../models/User");
const Comment_1 = require("../models/Comment");
const NewsImage_1 = require("../models/NewsImage");
class NewsRepository {
    async findByPk(id) {
        return News_1.News.findByPk(id, {
            include: [
                { model: User_1.User, attributes: ['userId', 'firstName', 'lastName', 'email', 'role', 'isActive'] },
                { model: Category_1.Category },
                { model: Tag_1.Tag, through: { attributes: [] } },
                { model: Comment_1.Comment, separate: true, order: [['createdAt', 'DESC']] },
                { model: NewsImage_1.NewsImage }
            ]
        });
    }
    async findAll(limit, offset) {
        return News_1.News.findAll({
            include: [
                { model: User_1.User, attributes: ['userId', 'firstName', 'lastName', 'email'] },
                { model: Category_1.Category },
                { model: Tag_1.Tag, through: { attributes: [] } },
                { model: NewsImage_1.NewsImage }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });
    }
    async countAll() {
        return News_1.News.count();
    }
    async createNews(data) {
        return News_1.News.create(data);
    }
    async updateNews(id, data) {
        const news = await News_1.News.findByPk(id);
        if (!news)
            throw new Error('News dose not exist');
        return news.update(data);
    }
    async deleteNews(newsId) {
        await News_1.News.destroy({ where: { newsId } });
    }
    async countByCategoryId(categoryId) {
        return News_1.News.count({ where: { categoryId } });
    }
    async findByTagId(tagId, limit, offset) {
        return News_1.News.findAll({
            include: [
                { model: Tag_1.Tag, where: { tagId }, through: { attributes: [] } },
                { model: User_1.User, attributes: ['userId', 'firstName', 'lastName', 'email'] },
                { model: Category_1.Category },
                { model: NewsImage_1.NewsImage }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });
    }
    async countByTagId(tagId) {
        const rows = await News_1.News.findAll({
            include: [{ model: Tag_1.Tag, where: { tagId }, through: { attributes: [] } }],
            attributes: ['newsId']
        });
        return rows.length;
    }
    async findFiltered(search, categoryId, limit, offset) {
        const conditions = [];
        if (search) {
            conditions.push({
                [sequelize_1.Op.or]: [
                    { title: { [sequelize_1.Op.iLike]: `%${search}%` } },
                    { text: { [sequelize_1.Op.iLike]: `%${search}%` } }
                ]
            });
        }
        if (categoryId !== undefined) {
            conditions.push({ categoryId });
        }
        return News_1.News.findAll({
            where: conditions.length > 0 ? { [sequelize_1.Op.and]: conditions } : {},
            include: [
                { model: User_1.User, attributes: ['userId', 'firstName', 'lastName', 'email'] },
                { model: Category_1.Category },
                { model: Tag_1.Tag, through: { attributes: [] } },
                { model: NewsImage_1.NewsImage }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });
    }
    async countFiltered(search, categoryId) {
        const conditions = [];
        if (search) {
            conditions.push({
                [sequelize_1.Op.or]: [
                    { title: { [sequelize_1.Op.iLike]: `%${search}%` } },
                    { text: { [sequelize_1.Op.iLike]: `%${search}%` } }
                ]
            });
        }
        if (categoryId !== undefined) {
            conditions.push({ categoryId });
        }
        return News_1.News.count({
            where: conditions.length > 0 ? { [sequelize_1.Op.and]: conditions } : {}
        });
    }
    async findRelated(newsId, limit = 3) {
        const news = await News_1.News.findByPk(newsId, {
            include: [{ model: Tag_1.Tag, through: { attributes: [] } }]
        });
        if (!news) {
            throw new Error("News does not exist");
        }
        const nd = news.toJSON();
        const tagIds = (nd.tags || []).map((t) => t.tagId);
        if (tagIds.length === 0)
            return [];
        return News_1.News.findAll({
            include: [
                { model: Tag_1.Tag, where: { tagId: { [sequelize_1.Op.in]: tagIds } }, through: { attributes: [] } },
                { model: User_1.User, attributes: ['userId', 'firstName', 'lastName', 'email'] },
                { model: Category_1.Category },
                { model: NewsImage_1.NewsImage }
            ],
            where: {
                newsId: { [sequelize_1.Op.ne]: newsId }
            },
            limit,
            order: [["createdAt", "DESC"]]
        });
    }
    async findTopReactions(limit = 3) {
        return News_1.News.findAll({
            attributes: {
                include: [
                    [News_1.News.sequelize.literal('"like" + "dislike"'), 'totalReactions']
                ]
            },
            order: [[News_1.News.sequelize.literal('"like" + "dislike"'), 'DESC']],
            limit
        });
    }
}
exports.NewsRepository = NewsRepository;
//# sourceMappingURL=news.reporitory.js.map