import { Tag } from "../models/Tag";
export declare class TagRepository {
    findByPk(id: number): Promise<Tag | null>;
    findByName(keyword: string): Promise<Tag | null>;
    findAll(limit: number, offset: number): Promise<Tag[]>;
    createTag(data: Partial<Tag>): Promise<Tag>;
    deleteTagById(id: number): Promise<void>;
    deleteTagByName(keyword: string): Promise<void>;
}
//# sourceMappingURL=tag.repository.d.ts.map