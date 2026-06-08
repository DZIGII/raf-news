import { CategoryResponseDto } from "../dto/category/CategoryResponseDto";
import { Category } from "../models/Category";

export function toCategoryResponseDto(category: Category): CategoryResponseDto {
    const d: any = category.toJSON();
    return {
        categoryId: d.categoryId,
        name: d.name,
        description: d.description
    }
}
