import { TagDto } from "../dto/tag/TagDto";
import { TagResponseDto } from "../dto/tag/TagResponseDto";
import { toTagResponseDto } from "../mapper/tagMapper";
import { TagRepository } from "../repository/tag.repository";


export class TagService {

    private tagRepository = new TagRepository()

    async find(id: number): Promise<TagResponseDto> {
        const tag = await this.tagRepository.findByPk(id)
        if (!tag) throw new Error("Tag does not exist")

        return toTagResponseDto(tag)
    }

    async findAll(limit: number, offset: number): Promise<TagResponseDto[]> {
        const tags = await this.tagRepository.findAll(limit, offset)
        return tags.map(toTagResponseDto)
    }

    async findByKeyword(keyword: string): Promise<TagResponseDto> {
        const tag = await this.tagRepository.findByName(keyword)
        if (!tag) throw new Error("Tag does not exist")

        return toTagResponseDto(tag)
    }

    async create(dto: TagDto): Promise<TagResponseDto> {
        if (!dto.keyword || dto.keyword.trim() === "") throw new Error("Keyword is required")

        const existing = await this.tagRepository.findByName(dto.keyword)
        if (existing) throw new Error("Tag with that keyword already exists")

        const tag = await this.tagRepository.createTag({ keyword: dto.keyword })
        return toTagResponseDto(tag)
    }

    async delete(id: number): Promise<void> {
        await this.tagRepository.deleteTagById(id)
    }

}
