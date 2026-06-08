import { Router } from "express";
import { NewsController } from "../controller/news.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../config/upload";
import { readerReactions } from "../middleware/readerReactions.middleware";

const router = Router();
const newsController = new NewsController();

router.get("/", (req, res) => {
    newsController.findAll(req, res)
})

router.get("/most-read", (req, res) => {
    newsController.findMostRead(req, res)
})

router.get("/top-reactions", (req, res) => {
    newsController.topReactions(req, res)
})

router.get("/filter", (req, res) => {
    newsController.findFiltered(req, res)
})

router.get("/tag/:tagId", (req, res) => {
    newsController.findByTag(req, res)
})

router.get("/:id/related", (req, res) => {
    newsController.related(req, res);
});

router.get("/:id", (req, res) => {
    newsController.newsDetail(req, res)
})

router.post("/", authMiddleware, upload.array("images"), (req, res) => {
    newsController.create(req, res)
})

router.put("/:id", authMiddleware, upload.array("images"), (req, res) => {
    newsController.update(req, res)
})

router.delete("/:id", authMiddleware, (req, res) => {
    newsController.delete(req, res)
})

router.post("/:id/like", readerReactions, (req, res) => {
    newsController.likeNews(req, res)
})

router.post("/:id/dislike", readerReactions, (req, res) => {
    newsController.dislikeNews(req, res)
})

export default router
