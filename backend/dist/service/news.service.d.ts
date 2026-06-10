import { CreateNewsDto } from "../dto/news/CreateNewsDto";
import { NewsDetailResponseDto } from "../dto/news/NewsDetaliResponseDto";
import { NewsResponseDto } from "../dto/news/NewsResponseDto";
import { JwtPayload } from "jsonwebtoken";
import { Reactions } from "../middleware/readerReactions.middleware";
export declare class NewsService {
    private newsRepository;
    private tagRepository;
    private imageRepository;
    private newsVisitsRepository;
    findAll(limit: number, offset: number): Promise<{
        news: NewsResponseDto[];
        total: number;
    }>;
    newsDetail(id: number, visitedNews: number[]): Promise<{
        news: NewsDetailResponseDto;
        visitedNews: number[];
    }>;
    findMostRead(): Promise<NewsResponseDto[]>;
    create(dto: CreateNewsDto, user: JwtPayload, files: Express.Multer.File[]): Promise<NewsDetailResponseDto>;
    update(id: number, dto: CreateNewsDto, user: JwtPayload, files: Express.Multer.File[]): Promise<NewsDetailResponseDto>;
    delete(id: number, user: JwtPayload): Promise<void>;
    findFiltered(search: string | undefined, categoryId: number | undefined, limit: number, offset: number): Promise<{
        news: NewsResponseDto[];
        total: number;
    }>;
    findByTagId(tagId: number, limit: number, offset: number): Promise<{
        news: NewsResponseDto[];
        total: number;
    }>;
    findRelated(newsId: number): Promise<NewsResponseDto[]>;
    findTopReactions(): Promise<NewsResponseDto[]>;
    likeNews(newsId: number, reactions: Reactions): Promise<Reactions>;
    dislikeNews(newsId: number, reactions: Reactions): Promise<Reactions>;
}
//# sourceMappingURL=news.service.d.ts.map