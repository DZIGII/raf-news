import { Op } from "sequelize";
import { News } from "../models/News";
import { Category } from "../models/Category";

export class NewsRepository {

    async findByPk(id: number) {
        return News.findByPk(id)
    }

    async findAll(limit: number, offset: number): Promise<News[]> {
        return News.findAll({limit, offset})
    }

    async createNews(data: Partial<News>): Promise<News> {
        return News.create(data)
    }

    async updateNews(id: number, data: Partial<News>): Promise<News> {
        const news = await News.findByPk(id)
        if(!news) throw new Error('News dose not exist')
        return news.update(data)
    }

    async deleteNews(newsId: number) {
        await News.destroy({where:{newsId}})
    }

    async findFiltered(search: string | undefined, categoryId: number | undefined, limit: number, offset: number): Promise<News[]> {
        const conditions: any[] = []

        if (search) {
            conditions.push({
                [Op.or]: [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { text:  { [Op.iLike]: `%${search}%` } }
                ]
            })
        }

        if (categoryId !== undefined) {
            conditions.push({ categoryId })
        }

        return News.findAll({
            where: conditions.length > 0 ? { [Op.and]: conditions } : {},
            limit,
            offset
        })
    }

}
