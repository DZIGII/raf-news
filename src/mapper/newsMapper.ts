import { NewsDetailResponseDto } from "../dto/news/NewsDetaliResponseDto";
import { NewsResponseDto } from "../dto/news/NewsResponseDto";
import { News } from "../models/News";
import { toCommetResponsenDto } from "./commentMapper";
import { toUserResponseDto } from "./userMapper";

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
        createdBy: toUserResponseDto(news.createdBy),
        comments: news.comments.map(toCommetResponsenDto),
        images: news.images.map(img => ({ imageId: img.imageId, imageUrl: img.imageUrl }))
    }
}

export function toNewsResponseDto(news: News): NewsResponseDto {
    return {
        newsId: news.newsId,
        title: news.title,
        mainImage: news.images?.[0]?.imageUrl ?? null,
        tagIds: news.tags.map(tag => tag.tagId)
    }
}