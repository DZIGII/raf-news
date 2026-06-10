"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewsDetailResponseDto = toNewsDetailResponseDto;
exports.toNewsResponseDto = toNewsResponseDto;
const categoryMapper_1 = require("./categoryMapper");
const commentMapper_1 = require("./commentMapper");
const userMapper_1 = require("./userMapper");
function toNewsDetailResponseDto(news) {
    const d = news.toJSON();
    return {
        newsId: d.newsId,
        title: d.title,
        text: d.text,
        createdAt: d.createdAt,
        like: d.like,
        dislike: d.dislike,
        createdBy: news.createdBy ? (0, userMapper_1.toUserResponseDto)(news.createdBy) : undefined,
        category: news.category ? (0, categoryMapper_1.toCategoryResponseDto)(news.category) : undefined,
        comments: news.comments?.map(commentMapper_1.toCommetResponsenDto) || [],
        tags: d.tags?.map((t) => ({ tagId: t.tagId, keyword: t.keyword })) || [],
        images: d.images?.map((img) => ({ imageId: img.imageId, imageUrl: img.imageUrl })) || []
    };
}
function toNewsResponseDto(news) {
    const d = news.toJSON();
    return {
        newsId: d.newsId,
        title: d.title,
        text: d.text,
        createdAt: d.createdAt,
        mainImage: d.images?.[0]?.imageUrl ?? null,
        categoryName: d.category?.name ?? '',
        categoryId: d.categoryId,
        authorName: d.createdBy ? `${d.createdBy.firstName} ${d.createdBy.lastName}` : '',
        like: d.like,
        dislike: d.dislike,
        tags: d.tags?.map((t) => ({ tagId: t.tagId, keyword: t.keyword })) || []
    };
}
//# sourceMappingURL=newsMapper.js.map