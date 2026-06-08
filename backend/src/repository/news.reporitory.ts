import { Op } from "sequelize";
import { News } from "../models/News";
import { Category } from "../models/Category";
import { Tag } from "../models/Tag";
import { User } from "../models/User";
import { Comment } from "../models/Comment";
import { NewsImage } from "../models/NewsImage";

export class NewsRepository {

    async findByPk(id: number) {
        return News.findByPk(id, {
            include: [
                { model: User, attributes: ['userId', 'firstName', 'lastName', 'email', 'role', 'isActive'] },
                { model: Category },
                { model: Tag, through: { attributes: [] } },
                { model: Comment, separate: true, order: [['createdAt', 'DESC']] },
                { model: NewsImage }
            ]
        })
    }

    async findAll(limit: number, offset: number): Promise<News[]> {
        return News.findAll({
            include: [
                { model: User, attributes: ['userId', 'firstName', 'lastName', 'email'] },
                { model: Category },
                { model: Tag, through: { attributes: [] } },
                { model: NewsImage }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        })
    }

    async countAll(): Promise<number> {
        return News.count()
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

    async countByCategoryId(categoryId: number): Promise<number> {
        return News.count({ where: { categoryId } })
    }

    async findByTagId(tagId: number, limit: number, offset: number): Promise<News[]> {
        return News.findAll({
            include: [
                { model: Tag, where: { tagId }, through: { attributes: [] } },
                { model: User, attributes: ['userId', 'firstName', 'lastName', 'email'] },
                { model: Category },
                { model: NewsImage }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        })
    }

    async countByTagId(tagId: number): Promise<number> {
        const rows = await News.findAll({
            include: [{ model: Tag, where: { tagId }, through: { attributes: [] } }],
            attributes: ['newsId']
        })
        return rows.length
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
            include: [
                { model: User, attributes: ['userId', 'firstName', 'lastName', 'email'] },
                { model: Category },
                { model: Tag, through: { attributes: [] } },
                { model: NewsImage }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        })
    }

    async countFiltered(search: string | undefined, categoryId: number | undefined): Promise<number> {
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
        return News.count({
            where: conditions.length > 0 ? { [Op.and]: conditions } : {}
        })
    }

    async findRelated(newsId: number, limit: number = 3): Promise<News[]> {
        const news = await News.findByPk(newsId, {
            include: [{ model: Tag, through: { attributes: [] } }]
        });

        if (!news) {
            throw new Error("News does not exist");
        }

        const nd: any = news.toJSON();
        const tagIds = (nd.tags || []).map((t: any) => t.tagId);

        if (tagIds.length === 0) return [];

        return News.findAll({
            include: [
                { model: Tag, where: { tagId: { [Op.in]: tagIds } }, through: { attributes: [] } },
                { model: User, attributes: ['userId', 'firstName', 'lastName', 'email'] },
                { model: Category },
                { model: NewsImage }
            ],
            where: {
                newsId: { [Op.ne]: newsId }
            },
            limit,
            order: [["createdAt", "DESC"]]
        });
    }

    async findTopReactions(limit: number = 3): Promise<News[]> {
        return News.findAll({
            attributes: {
                include: [
                    [News.sequelize!.literal('"like" + "dislike"'), 'totalReactions']
                ]
            },
            order: [[News.sequelize!.literal('"like" + "dislike"'), 'DESC']],
            limit
        })
    }

}
