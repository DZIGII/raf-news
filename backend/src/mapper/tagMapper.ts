import { TagResponseDto } from "../dto/tag/TagResponseDto";
import { Tag } from "../models/Tag";

export function toTagResponseDto(tag: Tag): TagResponseDto {
    const d: any = tag.toJSON();
    return {
        tagId: d.tagId,
        keyword: d.keyword
    }
}
