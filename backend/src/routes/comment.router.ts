import { Router } from "express";
import { CommentController } from "../controller/comment.controller";
import { readerReactions } from "../middleware/readerReactions.middleware";

const router = Router()
const commentController = new CommentController()

router.get("/news/:newsId", (req, res) => {
    commentController.findAllByNews(req, res)
})

router.post("/", (req, res) => {
    commentController.create(req, res)
})

router.post("/:id/like", readerReactions, (req, res) => {
    commentController.like(req, res)
})

router.post("/:id/dislike", readerReactions, (req, res) => {
    commentController.dislike(req, res)
})

export default router
