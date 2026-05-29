import { Router } from "express"
import { CommentController } from "../controller/comment.controller"

const router = Router()
const controller = new CommentController()

router.post("/", (req, res) => controller.create(req, res))

router.get("/news/:newsId", (req, res) =>
    controller.findByNews(req, res)
)

export default router