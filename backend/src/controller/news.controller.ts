import { NewsService } from "../service/news.service";
import { Request, Response } from "express";
import { setReactionsCookie } from "../middleware/readerReactions.middleware";

export class NewsController {

    private newsService = new NewsService()

    async findAll(req: Request, res: Response) {
        try {
            const limit = Number(req.query.limit) || 10
            const page = Number(req.query.page) || 1
            const offset = (page - 1) * limit

            const result = await this.newsService.findAll(limit, offset)
            return res.json(result)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async newsDetail(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            let visitedNews: number[] = []
            try {
                visitedNews = req.cookies?.visitedNews ? JSON.parse(req.cookies.visitedNews) : []
            } catch { visitedNews = [] }

            const result = await this.newsService.newsDetail(id, visitedNews)

            res.cookie('visitedNews', JSON.stringify(result.visitedNews), {
                httpOnly: false,
                sameSite: 'lax',
                maxAge: 365 * 24 * 60 * 60 * 1000
            })

            return res.json(result.news)
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

            const result = await this.newsService.findByTagId(tagId, limit, offset)
            return res.json(result)
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

            const result = await this.newsService.findFiltered(search, categoryId, limit, offset)
            return res.json(result)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async related(req: Request, res: Response) {
        try {
            const newsId = Number(req.params.id);
            const result = await this.newsService.findRelated(newsId);
            res.json(result);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    }

    async topReactions(req: Request, res: Response) {
        try {
            const result = await this.newsService.findTopReactions()
            return res.json(result)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async likeNews(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const updated = await this.newsService.likeNews(id, req.reactions!)
            setReactionsCookie(res, updated)
            return res.status(204).send()
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async dislikeNews(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const updated = await this.newsService.dislikeNews(id, req.reactions!)
            setReactionsCookie(res, updated)
            return res.status(204).send()
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }
}
