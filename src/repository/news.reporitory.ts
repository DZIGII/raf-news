import { Op } from "sequelize";
import { News } from "../models/News";

export class NewsRepository {

    async findByPk(id: number) {
        return News.findByPk(id)
    }

    async findAll(limit: number, offset: number): Promise<News[]> {
        return News.findAll({limit, offset})
    }

    async createNews(data: Partial<News>): Promise<News> {
        return News.create({data})
    }

    async updateNews(id: number, data: Partial<News>): Promise<News> {
        const news = await News.findByPk(id)
        if(!news) throw new Error('News dose not exist')
        return news.update({data})
    }

    async deleteNews(id: number) {
        await News.destroy({where:{id}})
    }

    async findFiltered(data: string, limit: number, offset: number): Promise<News[]> {
        return News.findAll({
            where: {
                [Op.or]: [
                    {title: { [Op.iLike]: `%${data}%` }},
                    {text: { [Op.iLike]: `%${data}%` }}
                ]
            },
            limit,
            offset
        })
    }

}