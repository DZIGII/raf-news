import { CreateNewsDto } from "../dto/news/CreateNewsDto";
import { NewsDetailResponseDto } from "../dto/news/NewsDetaliResponseDto";
import { NewsResponseDto } from "../dto/news/NewsResponseDto";
import { toNewsDetailResponseDto, toNewsResponseDto } from "../mapper/newsMapper";
import { NewsRepository } from "../repository/news.reporitory";
import { TagRepository } from "../repository/tag.repository";
import { NewsTag } from "../models/NewsTag";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { NewsImageRepository } from "../repository/newsImage.repository";
import { NewsVisitsRepository } from "../repository/newsVisits.repository";
import { Reactions } from "../middleware/readerReactions.middleware";
import { CommentRepository } from "../repository/comment.repository";
import { News } from "../models/News";

function g(model: any, field: string): any {
    return model.get(field);
}

export class NewsService {

    private newsRepository = new NewsRepository()
    private tagRepository = new TagRepository()
    private imageRepository = new NewsImageRepository()
    private newsVisitsRepository = new NewsVisitsRepository()

    async findAll(limit: number, offset: number): Promise<{ news: NewsResponseDto[], total: number }> {
        const [news, total] = await Promise.all([
            this.newsRepository.findAll(limit, offset),
            this.newsRepository.countAll()
        ])
        return { news: news.map(toNewsResponseDto), total }
    }

    async newsDetail(id: number, visitedNews: number[]): Promise<{ news: NewsDetailResponseDto, visitedNews: number[] }> {
        const news = await this.newsRepository.findByPk(id)
        if (!news) throw new Error('News does not exist')

        if (!visitedNews.includes(id)) {
            await this.newsVisitsRepository.logVisit(id)
            visitedNews.push(id)
        }

        const visitCount = await this.newsVisitsRepository.countByNewsId(id)

        const detail = toNewsDetailResponseDto(news)
        return { news: { ...detail, visitCount } as any, visitedNews }
    }

    async findMostRead(): Promise<NewsResponseDto[]> {
        const topVisits = await this.newsVisitsRepository.findMostRead(30, 10)
        const result: NewsResponseDto[] = []

        for (const visit of topVisits) {
            const newsId = g(visit, 'newsId')
            const news = await this.newsRepository.findByPk(newsId)
            if (news) result.push(toNewsResponseDto(news))
        }

        return result
    }

    async create(dto: CreateNewsDto, user: JwtPayload, files: Express.Multer.File[]): Promise<NewsDetailResponseDto> {
        if (!dto.title || String(dto.title).trim() === '') throw new Error('Title is required')
        if (!dto.text || String(dto.text).trim() === '') throw new Error('Text is required')

        const categoryId = Number(dto.categoryId)
        if (!categoryId) throw new Error('Category is required')

        const created = await this.newsRepository.createNews({
            title: dto.title,
            text: dto.text,
            userId: user.userId,
            categoryId: categoryId
        })
        const createdId = g(created, 'newsId')

        if (dto.tags && dto.tags.length > 0) {
            const tags = typeof dto.tags === 'string' ? JSON.parse(dto.tags as any) : dto.tags
            const tagIds: number[] = []
            for (const tagDto of tags) {
                if (!tagDto.keyword || tagDto.keyword.trim() === '') continue
                let tag = await this.tagRepository.findByName(tagDto.keyword.trim())
                if (!tag) {
                    tag = await this.tagRepository.createTag({ keyword: tagDto.keyword.trim() })
                }
                tagIds.push(g(tag, 'tagId'))
            }
            for (const tagId of tagIds) {
                await NewsTag.create({ newsId: createdId, tagId })
            }
        }

        for (const file of files) {
            const imageUrl = `/uploads/${file.filename}`
            await this.imageRepository.create(createdId, imageUrl)
        }

        const news = await this.newsRepository.findByPk(createdId)
        if (!news) throw new Error('News not found')

        return toNewsDetailResponseDto(news)
    }


    async update(id: number, dto: CreateNewsDto, user: JwtPayload, files: Express.Multer.File[]): Promise<NewsDetailResponseDto> {
        const news = await this.newsRepository.findByPk(id)
        if (!news) throw new Error('News does not exist')

        const newsData: any = news.toJSON()

        if (user.role !== 'ADMIN' && user.userId !== newsData.userId)
            throw new Error('You are not allowed to do that')

        const oldTagIds = (newsData.tags || []).map((tag: any) => tag.tagId)

        const updateData: any = {}
        if (dto.title) updateData.title = dto.title
        if (dto.text) updateData.text = dto.text
        if (dto.categoryId) updateData.categoryId = Number(dto.categoryId)

        await this.newsRepository.updateNews(id, updateData)

        await NewsTag.destroy({ where: { newsId: id } })

        const tags = typeof dto.tags === 'string' ? JSON.parse(dto.tags as any) : (dto.tags || [])
        const newTagIds: number[] = []
        for (const tagDto of tags) {
            if (!tagDto.keyword || tagDto.keyword.trim() === '') continue
            let tag = await this.tagRepository.findByName(tagDto.keyword.trim())
            if (!tag) {
                tag = await this.tagRepository.createTag({ keyword: tagDto.keyword.trim() })
            }
            const tid = g(tag, 'tagId')
            newTagIds.push(tid)
            await NewsTag.create({ newsId: id, tagId: tid })
        }

        for (const oldTagId of oldTagIds) {
            if (!newTagIds.includes(oldTagId)) {
                const count = await NewsTag.count({ where: { tagId: oldTagId } })
                if (count === 0) {
                    await this.tagRepository.deleteTagById(oldTagId)
                }
            }
        }

        for (const file of files) {
            const imageUrl = `/uploads/${file.filename}`
            await this.imageRepository.create(id, imageUrl)
        }

        const updated = await this.newsRepository.findByPk(id)
        if (!updated) throw new Error('News not found')

        return toNewsDetailResponseDto(updated)
    }


    async delete(id: number, user: JwtPayload): Promise<void> {
        const news = await this.newsRepository.findByPk(id)
        if (!news) throw new Error('News does not exist')

        const newsData: any = news.toJSON()
        if (user.role !== 'ADMIN' && user.userId !== newsData.userId)
            throw new Error('You are not allowed to do that')

        await this.newsRepository.deleteNews(id)
    }

    async findFiltered(search: string | undefined, categoryId: number | undefined, limit: number, offset: number): Promise<{ news: NewsResponseDto[], total: number }> {
        const [news, total] = await Promise.all([
            this.newsRepository.findFiltered(search, categoryId, limit, offset),
            this.newsRepository.countFiltered(search, categoryId)
        ])
        return { news: news.map(toNewsResponseDto), total }
    }

    async findByTagId(tagId: number, limit: number, offset: number): Promise<{ news: NewsResponseDto[], total: number }> {
        const [news, total] = await Promise.all([
            this.newsRepository.findByTagId(tagId, limit, offset),
            this.newsRepository.countByTagId(tagId)
        ])
        return { news: news.map(toNewsResponseDto), total }
    }

    async findRelated(newsId: number) {
        const news = await this.newsRepository.findRelated(newsId);
        return news.map(toNewsResponseDto);
    }

    async findTopReactions(): Promise<NewsResponseDto[]> {
        const news = await this.newsRepository.findTopReactions(3)
        return news.map(n => {
            const d: any = n.toJSON()
            return {
                newsId: d.newsId,
                title: d.title,
                text: d.text,
                createdAt: d.createdAt,
                mainImage: null,
                categoryName: '',
                categoryId: d.categoryId,
                authorName: '',
                like: d.like,
                dislike: d.dislike,
                tags: []
            }
        })
    }

    async likeNews(newsId: number, reactions: Reactions): Promise<Reactions> {
        const news = await this.newsRepository.findByPk(newsId)
        if (!news) throw new Error('News does not exist')

        if (reactions.liked.includes(-newsId)) return reactions

        if (reactions.disliked.includes(-newsId)) {
            reactions.disliked = reactions.disliked.filter(id => id !== -newsId)
            await News.decrement('dislike', { where: { newsId } })
        }

        reactions.liked.push(-newsId)
        await News.increment('like', { where: { newsId } })

        return reactions
    }

    async dislikeNews(newsId: number, reactions: Reactions): Promise<Reactions> {
        const news = await this.newsRepository.findByPk(newsId)
        if (!news) throw new Error('News does not exist')

        if (reactions.disliked.includes(-newsId)) return reactions

        if (reactions.liked.includes(-newsId)) {
            reactions.liked = reactions.liked.filter(id => id !== -newsId)
            await News.decrement('like', { where: { newsId } })
        }

        reactions.disliked.push(-newsId)
        await News.increment('dislike', { where: { newsId } })

        return reactions
    }
}
