import { CategoryDto } from "../category/CategoryDto";
import { TagDto } from "../tag/TagDto";
import { UserDto } from "../user/UserDto";

export interface CreateNewsDto {
    title: string;
    text: string;
    category: CategoryDto;
    tags: TagDto[];
}