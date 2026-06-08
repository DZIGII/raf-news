import { TagResponseDto } from "../dto/tag/TagResponseDto";
import { Tag } from "../models/Tag";

export function toTagResponseDto(tag: Tag): TagResponseDto {
    return {
        tagId: tag.tagId,
        keyword: tag.keyword
    }
}