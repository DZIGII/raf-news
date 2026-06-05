import { NewsDetailResponseDto } from "../dto/news/NewsDetaliResponseDto";
import { NewsResponseDto } from "../dto/news/NewsResponseDto";
import { News } from "../models/News";
import { toCategoryResponseDto } from "./categoryMapper";
import { toCommetResponsenDto } from "./commentMapper";
import { toUserResponseDto } from "./userMapper";

export function toNewsDetailResponseDto(news: News): NewsDetailResponseDto {
    return {
        newsId: news.newsId,
        title: news.title,
        text: news.text,
        createdAt: news.createdAt,
        like: news.like,
        dislike: news.dislike,
        createdBy: toUserResponseDto(news.createdBy),
        category: toCategoryResponseDto(news.category),
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
