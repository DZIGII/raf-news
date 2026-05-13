import { Tag } from "../models/Tag";

export class TagRepository {

    async findByPk(id: number) {
        return Tag.findByPk(id);
    }

    async findByName(name: string) {
        return Tag.findOne({where: {name}})
    }

    async findAll(limit: number, offset: number): Promise<Tag[]> {
        return Tag.findAll({limit, offset})
    }

    async createTag(data: Partial<Tag>): Promise<Tag> {
        return Tag.create(data);
    }

    async deleteTagById(id: number): Promise<void> {
        await Tag.destroy({where: {tagId: id}});
    }

    async deleteTagByName(keyword: string): Promise<void> {
        await Tag.destroy({where: {keyword}});
    }
}