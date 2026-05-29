import { TagService } from "../service/tag.service";
import { Request, Response } from "express";


export class TagController {

    private tagService = new TagService()

    async find(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const tag = await this.tagService.find(id)

            return res.json(tag)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const limit = Number(req.query.limit) || 30
            const page = Number(req.query.page) || 1
            const offset = (page - 1) * limit

            const tags = await this.tagService.findAll(limit, offset)
            return res.json(tags)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findByKeyword(req: Request, res: Response) {
        try {
            const keyword = String(req.query.q)
            const tag = await this.tagService.findByKeyword(keyword)

            return res.json(tag)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const tag = await this.tagService.create(req.body)
            return res.status(201).json(tag)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            await this.tagService.delete(id)
            return res.status(204).send()
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }
}
