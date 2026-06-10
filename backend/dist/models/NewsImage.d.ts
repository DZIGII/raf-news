import { Model } from "sequelize-typescript";
import { News } from "./News";
export declare class NewsImage extends Model {
    imageId: number;
    imageUrl: string;
    newsId: number;
    news: News;
}
//# sourceMappingURL=NewsImage.d.ts.map