import { Model } from 'sequelize-typescript';
import { User } from './User';
import { Tag } from './Tag';
import { Comment } from './Comment';
import { NewsImage } from './NewsImage';
import { Category } from './Category';
export declare class News extends Model {
    newsId: number;
    title: string;
    text: string;
    createdAt: Date;
    like: number;
    dislike: number;
    userId: number;
    categoryId: number;
    category: Category;
    createdBy: User;
    tags: Tag[];
    comments: Comment[];
    images: NewsImage[];
}
//# sourceMappingURL=News.d.ts.map