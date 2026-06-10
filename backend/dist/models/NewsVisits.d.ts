import { Model } from 'sequelize-typescript';
import { News } from './News';
export declare class NewsVisits extends Model {
    newsVisitsId: number;
    newsId: number;
    news: News;
    visitedAt: Date;
}
//# sourceMappingURL=NewsVisits.d.ts.map