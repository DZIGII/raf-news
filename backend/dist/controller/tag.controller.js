"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const tag_service_1 = require("../service/tag.service");
class TagController {
    constructor() {
        this.tagService = new tag_service_1.TagService();
    }
    async find(req, res) {
        try {
            const id = Number(req.params.id);
            const tag = await this.tagService.find(id);
            return res.json(tag);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findAll(req, res) {
        try {
            const limit = Number(req.query.limit) || 30;
            const page = Number(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const tags = await this.tagService.findAll(limit, offset);
            return res.json(tags);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findByKeyword(req, res) {
        try {
            const keyword = String(req.query.q);
            const tag = await this.tagService.findByKeyword(keyword);
            return res.json(tag);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async create(req, res) {
        try {
            const tag = await this.tagService.create(req.body);
            return res.status(201).json(tag);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await this.tagService.delete(id);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map