"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const newsMapper_1 = require("../mapper/newsMapper");
const news_reporitory_1 = require("../repository/news.reporitory");
const tag_repository_1 = require("../repository/tag.repository");
const NewsTag_1 = require("../models/NewsTag");
const newsImage_repository_1 = require("../repository/newsImage.repository");
const newsVisits_repository_1 = require("../repository/newsVisits.repository");
const News_1 = require("../models/News");
function g(model, field) {
    return model.get(field);
}
class NewsService {
    constructor() {
        this.newsRepository = new news_reporitory_1.NewsRepository();
        this.tagRepository = new tag_repository_1.TagRepository();
        this.imageRepository = new newsImage_repository_1.NewsImageRepository();
        this.newsVisitsRepository = new newsVisits_repository_1.NewsVisitsRepository();
    }
    async findAll(limit, offset) {
        const [news, total] = await Promise.all([
            this.newsRepository.findAll(limit, offset),
            this.newsRepository.countAll()
        ]);
        return { news: news.map(newsMapper_1.toNewsResponseDto), total };
    }
    async newsDetail(id, visitedNews) {
        const news = await this.newsRepository.findByPk(id);
        if (!news)
            throw new Error('News does not exist');
        if (!visitedNews.includes(id)) {
            await this.newsVisitsRepository.logVisit(id);
            visitedNews.push(id);
        }
        const visitCount = await this.newsVisitsRepository.countByNewsId(id);
        const detail = (0, newsMapper_1.toNewsDetailResponseDto)(news);
        return { news: { ...detail, visitCount }, visitedNews };
    }
    async findMostRead() {
        const topVisits = await this.newsVisitsRepository.findMostRead(30, 10);
        const result = [];
        for (const visit of topVisits) {
            const newsId = g(visit, 'newsId');
            const news = await this.newsRepository.findByPk(newsId);
            if (news)
                result.push((0, newsMapper_1.toNewsResponseDto)(news));
        }
        return result;
    }
    async create(dto, user, files) {
        if (!dto.title || String(dto.title).trim() === '')
            throw new Error('Title is required');
        if (!dto.text || String(dto.text).trim() === '')
            throw new Error('Text is required');
        const categoryId = Number(dto.categoryId);
        if (!categoryId)
            throw new Error('Category is required');
        const created = await this.newsRepository.createNews({
            title: dto.title,
            text: dto.text,
            userId: user.userId,
            categoryId: categoryId
        });
        const createdId = g(created, 'newsId');
        if (dto.tags && dto.tags.length > 0) {
            const tags = typeof dto.tags === 'string' ? JSON.parse(dto.tags) : dto.tags;
            const tagIds = [];
            for (const tagDto of tags) {
                if (!tagDto.keyword || tagDto.keyword.trim() === '')
                    continue;
                let tag = await this.tagRepository.findByName(tagDto.keyword.trim());
                if (!tag) {
                    tag = await this.tagRepository.createTag({ keyword: tagDto.keyword.trim() });
                }
                tagIds.push(g(tag, 'tagId'));
            }
            for (const tagId of tagIds) {
                await NewsTag_1.NewsTag.create({ newsId: createdId, tagId });
            }
        }
        for (const file of files) {
            const imageUrl = `/uploads/${file.filename}`;
            await this.imageRepository.create(createdId, imageUrl);
        }
        const news = await this.newsRepository.findByPk(createdId);
        if (!news)
            throw new Error('News not found');
        return (0, newsMapper_1.toNewsDetailResponseDto)(news);
    }
    async update(id, dto, user, files) {
        const news = await this.newsRepository.findByPk(id);
        if (!news)
            throw new Error('News does not exist');
        const newsData = news.toJSON();
        if (user.role !== 'ADMIN' && user.userId !== newsData.userId)
            throw new Error('You are not allowed to do that');
        const oldTagIds = (newsData.tags || []).map((tag) => tag.tagId);
        const updateData = {};
        if (dto.title)
            updateData.title = dto.title;
        if (dto.text)
            updateData.text = dto.text;
        if (dto.categoryId)
            updateData.categoryId = Number(dto.categoryId);
        await this.newsRepository.updateNews(id, updateData);
        await NewsTag_1.NewsTag.destroy({ where: { newsId: id } });
        const tags = typeof dto.tags === 'string' ? JSON.parse(dto.tags) : (dto.tags || []);
        const newTagIds = [];
        for (const tagDto of tags) {
            if (!tagDto.keyword || tagDto.keyword.trim() === '')
                continue;
            let tag = await this.tagRepository.findByName(tagDto.keyword.trim());
            if (!tag) {
                tag = await this.tagRepository.createTag({ keyword: tagDto.keyword.trim() });
            }
            const tid = g(tag, 'tagId');
            newTagIds.push(tid);
            await NewsTag_1.NewsTag.create({ newsId: id, tagId: tid });
        }
        for (const oldTagId of oldTagIds) {
            if (!newTagIds.includes(oldTagId)) {
                const count = await NewsTag_1.NewsTag.count({ where: { tagId: oldTagId } });
                if (count === 0) {
                    await this.tagRepository.deleteTagById(oldTagId);
                }
            }
        }
        for (const file of files) {
            const imageUrl = `/uploads/${file.filename}`;
            await this.imageRepository.create(id, imageUrl);
        }
        const updated = await this.newsRepository.findByPk(id);
        if (!updated)
            throw new Error('News not found');
        return (0, newsMapper_1.toNewsDetailResponseDto)(updated);
    }
    async delete(id, user) {
        const news = await this.newsRepository.findByPk(id);
        if (!news)
            throw new Error('News does not exist');
        const newsData = news.toJSON();
        if (user.role !== 'ADMIN' && user.userId !== newsData.userId)
            throw new Error('You are not allowed to do that');
        await this.newsRepository.deleteNews(id);
    }
    async findFiltered(search, categoryId, limit, offset) {
        const [news, total] = await Promise.all([
            this.newsRepository.findFiltered(search, categoryId, limit, offset),
            this.newsRepository.countFiltered(search, categoryId)
        ]);
        return { news: news.map(newsMapper_1.toNewsResponseDto), total };
    }
    async findByTagId(tagId, limit, offset) {
        const [news, total] = await Promise.all([
            this.newsRepository.findByTagId(tagId, limit, offset),
            this.newsRepository.countByTagId(tagId)
        ]);
        return { news: news.map(newsMapper_1.toNewsResponseDto), total };
    }
    async findRelated(newsId) {
        const news = await this.newsRepository.findRelated(newsId);
        return news.map(newsMapper_1.toNewsResponseDto);
    }
    async findTopReactions() {
        const news = await this.newsRepository.findTopReactions(3);
        return news.map(n => {
            const d = n.toJSON();
            return {
                newsId: d.newsId,
                title: d.title,
                text: d.text,
                createdAt: d.createdAt,
                mainImage: null,
                categoryName: '',
                categoryId: d.categoryId,
                authorName: '',
                like: d.like,
                dislike: d.dislike,
                tags: []
            };
        });
    }
    async likeNews(newsId, reactions) {
        const news = await this.newsRepository.findByPk(newsId);
        if (!news)
            throw new Error('News does not exist');
        if (reactions.liked.includes(-newsId))
            return reactions;
        if (reactions.disliked.includes(-newsId)) {
            reactions.disliked = reactions.disliked.filter(id => id !== -newsId);
            await News_1.News.decrement('dislike', { where: { newsId } });
        }
        reactions.liked.push(-newsId);
        await News_1.News.increment('like', { where: { newsId } });
        return reactions;
    }
    async dislikeNews(newsId, reactions) {
        const news = await this.newsRepository.findByPk(newsId);
        if (!news)
            throw new Error('News does not exist');
        if (reactions.disliked.includes(-newsId))
            return reactions;
        if (reactions.liked.includes(-newsId)) {
            reactions.liked = reactions.liked.filter(id => id !== -newsId);
            await News_1.News.decrement('like', { where: { newsId } });
        }
        reactions.disliked.push(-newsId);
        await News_1.News.increment('dislike', { where: { newsId } });
        return reactions;
    }
}
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map