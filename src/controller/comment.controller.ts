import { CommentService } from "../service/comment.service";
import { Request, Response } from "express";
import { setReactionsCookie } from "../middleware/readerReactions.middleware";


export class CommentController {

    private commentService = new CommentService()

    async findAllByNews(req: Request, res: Response) {
        try {
            const newsId = Number(req.params.newsId)
            const limit = Number(req.query.limit) || 20
            const page = Number(req.query.page) || 1
            const offset = (page - 1) * limit

            const comments = await this.commentService.findAllByNews(newsId, limit, offset)
            return res.json(comments)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const comment = await this.commentService.createComment(req.body)
            return res.status(201).json(comment)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async like(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const updated = await this.commentService.likeComment(id, req.reactions!)
            setReactionsCookie(res, updated)
            return res.status(204).send()
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async dislike(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const updated = await this.commentService.dislikeComment(id, req.reactions!)
            setReactionsCookie(res, updated)
            return res.status(204).send()
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }
}
