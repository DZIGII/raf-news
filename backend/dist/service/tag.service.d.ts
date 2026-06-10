import { TagDto } from "../dto/tag/TagDto";
import { TagResponseDto } from "../dto/tag/TagResponseDto";
export declare class TagService {
    private tagRepository;
    find(id: number): Promise<TagResponseDto>;
    findAll(limit: number, offset: number): Promise<TagResponseDto[]>;
    findByKeyword(keyword: string): Promise<TagResponseDto>;
    create(dto: TagDto): Promise<TagResponseDto>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=tag.service.d.ts.map