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

export class NewsService {

    private newsRepository = new NewsRepository()
    private tagRepository = new TagRepository()
    private imageRepository = new NewsImageRepository()
    private newsVisitsRepository = new NewsVisitsRepository()

    async findAll(limit: number, offset: number): Promise<NewsResponseDto[]> {
        const news = await this.newsRepository.findAll(limit, offset)
        return news.map(toNewsResponseDto)
    }

    async newsDetail(id: number): Promise<NewsDetailResponseDto> {
        const news = await this.newsRepository.findByPk(id)
        if (!news) throw new Error('News does not exist')
        await this.newsVisitsRepository.logVisit(id)

        return toNewsDetailResponseDto(news)
    }

    async findMostRead(): Promise<NewsResponseDto[]> {
        const topVisits = await this.newsVisitsRepository.findMostRead(30, 10)
        const result: NewsResponseDto[] = []

        for (const visit of topVisits) {
            const news = await this.newsRepository.findByPk(visit.newsId)
            if (news) result.push(toNewsResponseDto(news))
        }

        return result
    }

    async create(dto: CreateNewsDto, user: JwtPayload, files: Express.Multer.File[]): Promise<NewsDetailResponseDto> {
        const created = await this.newsRepository.createNews({
            title: dto.title,
            text: dto.text,
            userId: user.userId
        })

        if (dto.tags && dto.tags.length > 0) {
            const tagIds: number[] = []
            for (const tagDto of dto.tags) {
                let tag = await this.tagRepository.findByName(tagDto.keyword)
                if (!tag) {
                    tag = await this.tagRepository.createTag({ keyword: tagDto.keyword })
                }
                tagIds.push(tag.tagId)
            }
            for (const tagId of tagIds) {
                await NewsTag.create({ newsId: created.newsId, tagId })
            }
        }

        for (const file of files) {
            const imageUrl = `/uploads/${file.filename}`
            await this.imageRepository.create(created.newsId, imageUrl)
        }

        const news = await this.newsRepository.findByPk(created.newsId)
        if (!news) throw new Error('News not found')

        return toNewsDetailResponseDto(news)
    }


    async update(id: number, dto: CreateNewsDto, user: JwtPayload, files: Express.Multer.File[]): Promise<NewsDetailResponseDto> {
        const news = await this.newsRepository.findByPk(id)
        if (!news) throw new Error('News does not exist')

        if (user.role !== 'ADMIN' && user.userId !== news.userId)
            throw new Error('You are not allowed to do that')

        const oldTagIds = news.tags.map(tag => tag.tagId)

        await this.newsRepository.updateNews(id, {
            title: dto.title,
            text: dto.text,
        })

        await NewsTag.destroy({ where: { newsId: id } })

        const newTagIds: number[] = []
        for (const tagDto of dto.tags) {
            let tag = await this.tagRepository.findByName(tagDto.keyword)
            if (!tag) {
                tag = await this.tagRepository.createTag({ keyword: tagDto.keyword })
            }
            newTagIds.push(tag.tagId)
            await NewsTag.create({ newsId: id, tagId: tag.tagId })
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

        if (user.role !== 'ADMIN' && user.userId !== news.userId) 
            throw new Error('You are not allow to do that')
        

        await this.newsRepository.deleteNews(id)
    }

    async findFiltered(search: string | undefined, categoryId: number | undefined, limit: number, offset: number): Promise<NewsResponseDto[]> {
        const news = await this.newsRepository.findFiltered(search, categoryId, limit, offset)
        return news.map(toNewsResponseDto)
    }

    async findByTagId(tagId: number, limit: number, offset: number): Promise<NewsResponseDto[]> {
        const news = await this.newsRepository.findByTagId(tagId, limit, offset)
        return news.map(toNewsResponseDto)
    }

    async findRelated(newsId: number) {
        return this.newsRepository.findRelated(newsId);
    }

}