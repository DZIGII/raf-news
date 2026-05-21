import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {
    private userService = new UserService()

    async login(req: Request, res: Response) {
        try {
            const token = await this.userService.login(req.body)
            return res.json({ token })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async register(req: Request, res: Response) {
        try {
            const user = await this.userService.register(req.body)
            return res.status(201).json(user)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updated = await this.userService.update(req.body, req.user!)
            return res.json(updated)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id)
            await this.userService.delete(userId, req.user!)
            return res.status(204).send()
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const limit = Number(req.query.limit) || 10
            const page = Number(req.query.page) || 1
            const offset = (page - 1) * limit

            const users = await this.userService.findAll(limit, offset, req.user!)
            return res.json(users)
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    
}
