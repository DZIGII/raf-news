import { NewsService } from "../service/news.service";
import { UserService } from "../service/user.service";
import { Request, Response } from "express";

export class NewsController {

    private newsService = new NewsService()

    async findAll(req: Request, res: Response) {
        try {
            const limit = Number(req.query.limit) || 10
            const page = Number(req.query.page) || 1
            const offset = (page - 1) * limit

            const news = await this.newsService.findAll(limit, offset)
            return res.json(news)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async newsDetail(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const news = await this.newsService.newsDetail(id)

            return res.json(news)
        } catch(err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const files = (req.files as Express.Multer.File[]) ?? []
            const news = await this.newsService.create(req.body, req.user!, files)
            return res.status(201).json(news)
        } catch(err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const files = (req.files as Express.Multer.File[]) ?? []
            const updated = await this.newsService.update(id, req.body, req.user!, files)
            return res.json(updated)
        } catch(err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            await this.newsService.delete(id, req.user!)

            return res.status(204).send()
        } catch(err: any) {
            return res.status(400).json({error: err.message})
        }
    }

    async findMostRead(req: Request, res: Response) {
        try {
            const news = await this.newsService.findMostRead()
            return res.json(news)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findByTag(req: Request, res: Response) {
        try {
            const tagId = Number(req.params.tagId)
            const limit = Number(req.query.limit) || 10
            const page = Number(req.query.page) || 1
            const offset = (page - 1) * limit

            const news = await this.newsService.findByTagId(tagId, limit, offset)
            return res.json(news)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findFiltered(req: Request, res: Response) {
        try {
            const search = typeof req.query.q === 'string' ? req.query.q : undefined
            const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined
            const limit = Number(req.query.limit) || 10
            const page = Number(req.query.page) || 1
            const offset = (page - 1) * limit

            const news = await this.newsService.findFiltered(search, categoryId, limit, offset)
            return res.json(news)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }


}