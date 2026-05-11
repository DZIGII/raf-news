import { CategoryResponseDto } from "../dto/category/CategoryResponseDto";
import { Category } from "../models/Category";

export function toCategoryResponseDto(category: Category): CategoryResponseDto {
    return {
        categoryId: category.categoryId,
        name: category.name,
        description: category.description
    }
}