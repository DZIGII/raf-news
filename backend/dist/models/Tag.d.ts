import { Model } from 'sequelize-typescript';
import { News } from './News';
export declare class Tag extends Model {
    tagId: number;
    keyword: string;
    news: News[];
}
//# sourceMappingURL=Tag.d.ts.map