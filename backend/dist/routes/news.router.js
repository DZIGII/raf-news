"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("../controller/news.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_1 = require("../config/upload");
const readerReactions_middleware_1 = require("../middleware/readerReactions.middleware");
const router = (0, express_1.Router)();
const newsController = new news_controller_1.NewsController();
router.get("/", (req, res) => {
    newsController.findAll(req, res);
});
router.get("/most-read", (req, res) => {
    newsController.findMostRead(req, res);
});
router.get("/top-reactions", (req, res) => {
    newsController.topReactions(req, res);
});
router.get("/filter", (req, res) => {
    newsController.findFiltered(req, res);
});
router.get("/tag/:tagId", (req, res) => {
    newsController.findByTag(req, res);
});
router.get("/:id/related", (req, res) => {
    newsController.related(req, res);
});
router.get("/:id", (req, res) => {
    newsController.newsDetail(req, res);
});
router.post("/", auth_middleware_1.authMiddleware, upload_1.upload.array("images"), (req, res) => {
    newsController.create(req, res);
});
router.put("/:id", auth_middleware_1.authMiddleware, upload_1.upload.array("images"), (req, res) => {
    newsController.update(req, res);
});
router.delete("/:id", auth_middleware_1.authMiddleware, (req, res) => {
    newsController.delete(req, res);
});
router.post("/:id/like", readerReactions_middleware_1.readerReactions, (req, res) => {
    newsController.likeNews(req, res);
});
router.post("/:id/dislike", readerReactions_middleware_1.readerReactions, (req, res) => {
    newsController.dislikeNews(req, res);
});
exports.default = router;
//# sourceMappingURL=news.router.js.map