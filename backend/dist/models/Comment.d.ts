import { Model } from 'sequelize-typescript';
import { News } from './News';
export declare class Comment extends Model {
    commentId: number;
    authorName: string;
    content: string;
    createdAt: Date;
    like: number;
    dislike: number;
    newsId: number;
    news: News;
}
//# sourceMappingURL=Comment.d.ts.map