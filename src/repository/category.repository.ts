import { Category } from "../models/Category";

export class CategoryRepository {

    async findByPk(id: number) {
        return Category.findByPk(id)
    } 

    async findAll(limit: number, offset: number): Promise<Category[]> {
        return Category.findAll({limit, offset})
    }

    async findByName(name: string): Promise<Category | null> {
        return Category.findOne({where: {name}})
    }

    async createCategory(data: Partial<Category>): Promise<Category> {
        return Category.create(data)
    }

    async updateCategory(data: Partial<Category>): Promise<Category> {
        const ctg = await Category.findByPk(data.categoryId)
        if (!ctg) throw new Error('Category dosent exist')
        return ctg.update(data)
    }

    async deleteCategoryByPk(id: number) {
        await Category.destroy({where: {categoryId: id}})
    }
    
}