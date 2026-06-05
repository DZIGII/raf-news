import { CategoryDto } from "../dto/category/CategoryDto";
import { CategoryResponseDto } from "../dto/category/CategoryResponseDto";
import { CreateCategoryDto } from "../dto/category/CreateCategoryDto";
import { toCategoryResponseDto } from "../mapper/categoryMapper";
import { CategoryRepository } from "../repository/category.repository";
import { NewsRepository } from "../repository/news.reporitory";


export class CategoryService {

    private categoryRepository = new CategoryRepository()
    private newsRepository = new NewsRepository()

    async find(id: number): Promise<CategoryResponseDto> {
        const category = await this.categoryRepository.findByPk(id)
        if (!category) throw new Error("Category does not exists")

        return toCategoryResponseDto(category)
    }

    async findAll(limit: number, offset: number): Promise<CategoryResponseDto[]> {
        const categories = await this.categoryRepository.findAll(limit, offset);
        return categories.map(toCategoryResponseDto)
    }

    async findByName(data: string): Promise<CategoryResponseDto> {
        const category = await this.categoryRepository.findByName(data)
        if (!category) throw new Error("Category does not exists")

        return toCategoryResponseDto(category)
    }

    async create(data: CreateCategoryDto): Promise<CategoryResponseDto> {
        const existing = await this.categoryRepository.findByName(data.name)
        if (existing) throw new Error('Category with that name already exists')

        const category = await this.categoryRepository.createCategory({
            name: data.name,
            description: data.description
        })

        return toCategoryResponseDto(category)
    }

    async updateCategory(data: CategoryDto): Promise<CategoryResponseDto> {
        const existing = await this.categoryRepository.findByName(data.name)
        if (existing && existing.categoryId !== data.categoryId)
            throw new Error('Category with that name already exists')

        const category = await this.categoryRepository.updateCategory(data)

        return toCategoryResponseDto(category)
    }

    async delete(id: number): Promise<void> {
        const newsCount = await this.newsRepository.countByCategoryId(id)
        if (newsCount > 0)
            throw new Error('Cannot delete category — it contains news articles')

        await this.categoryRepository.deleteCategoryByPk(id);
    }

}
