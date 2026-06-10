"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const commentMapper_1 = require("../mapper/commentMapper");
const comment_repository_1 = require("../repository/comment.repository");
class CommentService {
    constructor() {
        this.commentReporistory = new comment_repository_1.CommentRepository();
    }
    async find(id) {
        const comment = await this.commentReporistory.findByPk(id);
        if (!comment)
            throw new Error("Comment dose not exists");
        return (0, commentMapper_1.toCommetResponsenDto)(comment);
    }
    async findAllByNews(newsId, limit, offset) {
        const commetns = await this.commentReporistory.findAll(newsId, limit, offset);
        return commetns.map(commentMapper_1.toCommetResponsenDto);
    }
    async createComment(data) {
        if (!data.authorName || data.authorName.trim() === "")
            throw new Error("Author name is required");
        if (!data.content || data.content.trim() === "")
            throw new Error("Content is required");
        const comment = await this.commentReporistory.createComment({
            authorName: data.authorName,
            content: data.content,
            newsId: data.newsId
        });
        return (0, commentMapper_1.toCommetResponsenDto)(comment);
    }
    async likeComment(commentId, reactions) {
        const comment = await this.commentReporistory.findByPk(commentId);
        if (!comment)
            throw new Error("Comment does not exist");
        if (reactions.liked.includes(commentId))
            return reactions;
        if (reactions.disliked.includes(commentId)) {
            reactions.disliked = reactions.disliked.filter(id => id !== commentId);
            await this.commentReporistory.decrementDislike(commentId);
        }
        reactions.liked.push(commentId);
        await this.commentReporistory.likeComment(commentId);
        return reactions;
    }
    async dislikeComment(commentId, reactions) {
        const comment = await this.commentReporistory.findByPk(commentId);
        if (!comment)
            throw new Error("Comment does not exist");
        if (reactions.disliked.includes(commentId))
            return reactions;
        if (reactions.liked.includes(commentId)) {
            reactions.liked = reactions.liked.filter(id => id !== commentId);
            await this.commentReporistory.decrementLike(commentId);
        }
        reactions.disliked.push(commentId);
        await this.commentReporistory.dislikeComment(commentId);
        return reactions;
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map