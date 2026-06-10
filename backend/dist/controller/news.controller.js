"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const news_service_1 = require("../service/news.service");
const readerReactions_middleware_1 = require("../middleware/readerReactions.middleware");
class NewsController {
    constructor() {
        this.newsService = new news_service_1.NewsService();
    }
    async findAll(req, res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const result = await this.newsService.findAll(limit, offset);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async newsDetail(req, res) {
        try {
            const id = Number(req.params.id);
            let visitedNews = [];
            try {
                visitedNews = req.cookies?.visitedNews ? JSON.parse(req.cookies.visitedNews) : [];
            }
            catch {
                visitedNews = [];
            }
            const result = await this.newsService.newsDetail(id, visitedNews);
            res.cookie('visitedNews', JSON.stringify(result.visitedNews), {
                httpOnly: false,
                sameSite: 'lax',
                maxAge: 365 * 24 * 60 * 60 * 1000
            });
            return res.json(result.news);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async create(req, res) {
        try {
            const files = req.files ?? [];
            const news = await this.newsService.create(req.body, req.user, files);
            return res.status(201).json(news);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const files = req.files ?? [];
            const updated = await this.newsService.update(id, req.body, req.user, files);
            return res.json(updated);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await this.newsService.delete(id, req.user);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findMostRead(req, res) {
        try {
            const news = await this.newsService.findMostRead();
            return res.json(news);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findByTag(req, res) {
        try {
            const tagId = Number(req.params.tagId);
            const limit = Number(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const result = await this.newsService.findByTagId(tagId, limit, offset);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findFiltered(req, res) {
        try {
            const search = typeof req.query.q === 'string' ? req.query.q : undefined;
            const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
            const limit = Number(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const result = await this.newsService.findFiltered(search, categoryId, limit, offset);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async related(req, res) {
        try {
            const newsId = Number(req.params.id);
            const result = await this.newsService.findRelated(newsId);
            res.json(result);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async topReactions(req, res) {
        try {
            const result = await this.newsService.findTopReactions();
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async likeNews(req, res) {
        try {
            const id = Number(req.params.id);
            const updated = await this.newsService.likeNews(id, req.reactions);
            (0, readerReactions_middleware_1.setReactionsCookie)(res, updated);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async dislikeNews(req, res) {
        try {
            const id = Number(req.params.id);
            const updated = await this.newsService.dislikeNews(id, req.reactions);
            (0, readerReactions_middleware_1.setReactionsCookie)(res, updated);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map