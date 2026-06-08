import { NewsDetailResponseDto } from "../dto/news/NewsDetaliResponseDto";
import { NewsResponseDto } from "../dto/news/NewsResponseDto";
import { News } from "../models/News";
import { toCategoryResponseDto } from "./categoryMapper";
import { toCommetResponsenDto } from "./commentMapper";
import { toUserResponseDto } from "./userMapper";

export function toNewsDetailResponseDto(news: News): NewsDetailResponseDto {
    const d: any = news.toJSON();
    return {
        newsId: d.newsId,
        title: d.title,
        text: d.text,
        createdAt: d.createdAt,
        like: d.like,
        dislike: d.dislike,
        createdBy: news.createdBy ? toUserResponseDto(news.createdBy) : undefined as any,
        category: news.category ? toCategoryResponseDto(news.category) : undefined as any,
        comments: news.comments?.map(toCommetResponsenDto) || [],
        tags: d.tags?.map((t: any) => ({ tagId: t.tagId, keyword: t.keyword })) || [],
        images: d.images?.map((img: any) => ({ imageId: img.imageId, imageUrl: img.imageUrl })) || []
    }
}

export function toNewsResponseDto(news: News): NewsResponseDto {
    const d: any = news.toJSON();
    return {
        newsId: d.newsId,
        title: d.title,
        text: d.text,
        createdAt: d.createdAt,
        mainImage: d.images?.[0]?.imageUrl ?? null,
        categoryName: d.category?.name ?? '',
        categoryId: d.categoryId,
        authorName: d.createdBy ? `${d.createdBy.firstName} ${d.createdBy.lastName}` : '',
        like: d.like,
        dislike: d.dislike,
        tags: d.tags?.map((t: any) => ({ tagId: t.tagId, keyword: t.keyword })) || []
    }
}
