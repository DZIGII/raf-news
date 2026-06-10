import { CategoryDto } from "../dto/category/CategoryDto";
import { CategoryResponseDto } from "../dto/category/CategoryResponseDto";
import { CreateCategoryDto } from "../dto/category/CreateCategoryDto";
export declare class CategoryService {
    private categoryRepository;
    private newsRepository;
    find(id: number): Promise<CategoryResponseDto>;
    findAll(limit: number, offset: number): Promise<CategoryResponseDto[]>;
    findByName(data: string): Promise<CategoryResponseDto>;
    create(data: CreateCategoryDto): Promise<CategoryResponseDto>;
    updateCategory(data: CategoryDto): Promise<CategoryResponseDto>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=category.service.d.ts.map