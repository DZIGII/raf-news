import { Request, Response } from "express"
import { CommentService } from "../service/comment.service"

export class CommentController {

    private commentService = new CommentService()

    async create(req: Request, res: Response) {
        try {
            const result = await this.commentService.create(req.body)
            res.status(201).json(result)
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    }

    async findByNews(req: Request, res: Response) {
        try {
            const newsId = Number(req.params.newsId)
            const limit = Number(req.query.limit) || 10
            const page = Number(req.query.page) || 1

            const result = await this.commentService.findByNews(
                newsId,
                limit,
                page
            )

            res.json(result)
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    }
}