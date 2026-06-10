"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const tagMapper_1 = require("../mapper/tagMapper");
const tag_repository_1 = require("../repository/tag.repository");
class TagService {
    constructor() {
        this.tagRepository = new tag_repository_1.TagRepository();
    }
    async find(id) {
        const tag = await this.tagRepository.findByPk(id);
        if (!tag)
            throw new Error("Tag does not exist");
        return (0, tagMapper_1.toTagResponseDto)(tag);
    }
    async findAll(limit, offset) {
        const tags = await this.tagRepository.findAll(limit, offset);
        return tags.map(tagMapper_1.toTagResponseDto);
    }
    async findByKeyword(keyword) {
        const tag = await this.tagRepository.findByName(keyword);
        if (!tag)
            throw new Error("Tag does not exist");
        return (0, tagMapper_1.toTagResponseDto)(tag);
    }
    async create(dto) {
        if (!dto.keyword || dto.keyword.trim() === "")
            throw new Error("Keyword is required");
        const existing = await this.tagRepository.findByName(dto.keyword);
        if (existing)
            throw new Error("Tag with that keyword already exists");
        const tag = await this.tagRepository.createTag({ keyword: dto.keyword });
        return (0, tagMapper_1.toTagResponseDto)(tag);
    }
    async delete(id) {
        await this.tagRepository.deleteTagById(id);
    }
}
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map