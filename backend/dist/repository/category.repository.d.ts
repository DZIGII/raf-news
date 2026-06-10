import { Category } from "../models/Category";
export declare class CategoryRepository {
    findByPk(id: number): Promise<Category | null>;
    findAll(limit: number, offset: number): Promise<Category[]>;
    findByName(name: string): Promise<Category | null>;
    createCategory(data: Partial<Category>): Promise<Category>;
    updateCategory(data: Partial<Category>): Promise<Category>;
    deleteCategoryByPk(id: number): Promise<void>;
}
//# sourceMappingURL=category.repository.d.ts.map