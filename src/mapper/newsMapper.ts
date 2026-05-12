import { NewsDetailResponseDto } from "../dto/news/NewsDetaliResponseDto";
import { News } from "../models/News";

export function toNewsDetailResponseDto(news: News): NewsDetailResponseDto {
    return {
        newsId: news.newsId,
        title: news.title,
        text: news.text,
        visits: news.visits,
        createdAt: news.createdAt,
        like: news.like,
        dislike: news.dislike,
        numberOfVisits: news.numberOfVisits,
        createdBy: news.createdBy,
        comments: news.comments,
        images: news.images
    }
}