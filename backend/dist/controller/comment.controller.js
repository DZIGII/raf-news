"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_service_1 = require("../service/comment.service");
const readerReactions_middleware_1 = require("../middleware/readerReactions.middleware");
class CommentController {
    constructor() {
        this.commentService = new comment_service_1.CommentService();
    }
    async findAllByNews(req, res) {
        try {
            const newsId = Number(req.params.newsId);
            const limit = Number(req.query.limit) || 20;
            const page = Number(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const comments = await this.commentService.findAllByNews(newsId, limit, offset);
            return res.json(comments);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async create(req, res) {
        try {
            const comment = await this.commentService.createComment(req.body);
            return res.status(201).json(comment);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async like(req, res) {
        try {
            const id = Number(req.params.id);
            const updated = await this.commentService.likeComment(id, req.reactions);
            (0, readerReactions_middleware_1.setReactionsCookie)(res, updated);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async dislike(req, res) {
        try {
            const id = Number(req.params.id);
            const updated = await this.commentService.dislikeComment(id, req.reactions);
            (0, readerReactions_middleware_1.setReactionsCookie)(res, updated);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map