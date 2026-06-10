"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsVisitsRepository = void 0;
const sequelize_1 = require("sequelize");
const NewsVisits_1 = require("../models/NewsVisits");
class NewsVisitsRepository {
    async findMostRead(daysBack, limit) {
        const since = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);
        const rows = await NewsVisits_1.NewsVisits.findAll({
            attributes: [
                'newsId',
                [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('news_visits_id')), 'visitCount']
            ],
            where: { visitedAt: { [sequelize_1.Op.gte]: since } },
            group: ['newsId'],
            order: [[(0, sequelize_1.literal)('"visitCount"'), 'DESC']],
            limit
        });
        return rows.map(r => ({
            newsId: r.get('newsId'),
            visitCount: Number(r.get('visitCount'))
        }));
    }
    async countByNewsId(newsId) {
        return NewsVisits_1.NewsVisits.count({ where: { newsId } });
    }
    async logVisit(newsId) {
        await NewsVisits_1.NewsVisits.create({ newsId });
    }
}
exports.NewsVisitsRepository = NewsVisitsRepository;
//# sourceMappingURL=newsVisits.repository.js.map