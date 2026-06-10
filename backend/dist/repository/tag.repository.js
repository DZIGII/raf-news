"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRepository = void 0;
const Tag_1 = require("../models/Tag");
class TagRepository {
    async findByPk(id) {
        return Tag_1.Tag.findByPk(id);
    }
    async findByName(keyword) {
        return Tag_1.Tag.findOne({ where: { keyword } });
    }
    async findAll(limit, offset) {
        return Tag_1.Tag.findAll({ limit, offset });
    }
    async createTag(data) {
        return Tag_1.Tag.create(data);
    }
    async deleteTagById(id) {
        await Tag_1.Tag.destroy({ where: { tagId: id } });
    }
    async deleteTagByName(keyword) {
        await Tag_1.Tag.destroy({ where: { keyword } });
    }
}
exports.TagRepository = TagRepository;
//# sourceMappingURL=tag.repository.js.map