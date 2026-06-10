"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controller/comment.controller");
const readerReactions_middleware_1 = require("../middleware/readerReactions.middleware");
const router = (0, express_1.Router)();
const commentController = new comment_controller_1.CommentController();
router.get("/news/:newsId", (req, res) => {
    commentController.findAllByNews(req, res);
});
router.post("/", (req, res) => {
    commentController.create(req, res);
});
router.post("/:id/like", readerReactions_middleware_1.readerReactions, (req, res) => {
    commentController.like(req, res);
});
router.post("/:id/dislike", readerReactions_middleware_1.readerReactions, (req, res) => {
    commentController.dislike(req, res);
});
exports.default = router;
//# sourceMappingURL=comment.router.js.map