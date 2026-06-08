import { CategoryService } from "../service/category.service";
import { Request, Response } from "express";


export class CategoryController {

    private categoryService = new CategoryService()

    async find(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const category = await this.categoryService.find(id)

            return res.status(200).json(category)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const limit = Number(req.query.limit) || 30
            const page = Number(req.query.page) || 1
            const offset = (page - 1) * limit
            const categories = await this.categoryService.findAll(limit, offset)

            return res.status(200).json(categories)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findByName(req: Request, res: Response) {
        try {
            const str = String(req.query.q)
            const category = await this.categoryService.findByName(str)
            return res.status(200).json(category)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const category = await this.categoryService.create(req.body)
            return res.status(201).json(category)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const category = await this.categoryService.updateCategory(req.body)
            return res.status(200).json(category)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            await this.categoryService.delete(id)
            return res.status(204).send()
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }
}
