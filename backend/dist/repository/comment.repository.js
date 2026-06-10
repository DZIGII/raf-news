"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const Comment_1 = require("../models/Comment");
class CommentRepository {
    async findByPk(id) {
        return Comment_1.Comment.findByPk(id);
    }
    async findAll(newsId, limit, offset) {
        return Comment_1.Comment.findAll({
            where: { newsId },
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });
    }
    async createComment(data) {
        return Comment_1.Comment.create(data);
    }
    async likeComment(id) {
        await Comment_1.Comment.increment('like', { where: { commentId: id } });
    }
    async dislikeComment(id) {
        await Comment_1.Comment.increment('dislike', { where: { commentId: id } });
    }
    async decrementLike(id) {
        await Comment_1.Comment.decrement('like', { where: { commentId: id } });
    }
    async decrementDislike(id) {
        await Comment_1.Comment.decrement('dislike', { where: { commentId: id } });
    }
}
exports.CommentRepository = CommentRepository;
//# sourceMappingURL=comment.repository.js.map