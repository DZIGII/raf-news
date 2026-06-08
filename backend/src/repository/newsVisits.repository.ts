import { Op, fn, col, literal } from "sequelize";
import { NewsVisits } from "../models/NewsVisits";

export class NewsVisitsRepository {

    async findMostRead(daysBack: number, limit: number): Promise<Array<{ newsId: number, visitCount: number }>> {
        const since = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000)

        const rows = await NewsVisits.findAll({
            attributes: [
                'newsId',
                [fn('COUNT', col('news_visits_id')), 'visitCount']
            ],
            where: { visitedAt: { [Op.gte]: since } },
            group: ['newsId'],
            order: [[literal('"visitCount"'), 'DESC']],
            limit
        })

        return rows.map(r => ({
            newsId: r.get('newsId') as number,
            visitCount: Number(r.get('visitCount'))
        }))
    }

    async countByNewsId(newsId: number): Promise<number> {
        return NewsVisits.count({ where: { newsId } })
    }

    async logVisit(newsId: number): Promise<void> {
        await NewsVisits.create({ newsId })
    }

}
