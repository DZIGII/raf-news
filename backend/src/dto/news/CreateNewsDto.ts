import { TagDto } from "../tag/TagDto";

export interface CreateNewsDto {
    title: string;
    text: string;
    categoryId: number;
    tags: TagDto[];
}
