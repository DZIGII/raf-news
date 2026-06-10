"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    async login(req, res) {
        try {
            const token = await this.userService.login(req.body);
            return res.json(token);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async register(req, res) {
        try {
            const token = await this.userService.register(req.body);
            return res.status(201).json(token);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async update(req, res) {
        try {
            const updated = await this.userService.update(req.body, req.user);
            return res.json(updated);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async updateByAdmin(req, res) {
        try {
            const userId = Number(req.params.id);
            const updated = await this.userService.updateByAdmin(userId, req.body, req.user);
            return res.json(updated);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async toggleActive(req, res) {
        try {
            const userId = Number(req.params.id);
            const updated = await this.userService.toggleActive(userId, req.user);
            return res.json(updated);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findById(req, res) {
        try {
            const userId = Number(req.params.id);
            const user = await this.userService.findById(userId);
            return res.json(user);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            const userId = Number(req.params.id);
            await this.userService.delete(userId, req.user);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findAll(req, res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const result = await this.userService.findAll(limit, offset, req.user);
            return res.json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map