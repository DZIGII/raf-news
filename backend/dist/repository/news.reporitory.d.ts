import { News } from "../models/News";
export declare class NewsRepository {
    findByPk(id: number): Promise<News | null>;
    findAll(limit: number, offset: number): Promise<News[]>;
    countAll(): Promise<number>;
    createNews(data: Partial<News>): Promise<News>;
    updateNews(id: number, data: Partial<News>): Promise<News>;
    deleteNews(newsId: number): Promise<void>;
    countByCategoryId(categoryId: number): Promise<number>;
    findByTagId(tagId: number, limit: number, offset: number): Promise<News[]>;
    countByTagId(tagId: number): Promise<number>;
    findFiltered(search: string | undefined, categoryId: number | undefined, limit: number, offset: number): Promise<News[]>;
    countFiltered(search: string | undefined, categoryId: number | undefined): Promise<number>;
    findRelated(newsId: number, limit?: number): Promise<News[]>;
    findTopReactions(limit?: number): Promise<News[]>;
}
//# sourceMappingURL=news.reporitory.d.ts.map