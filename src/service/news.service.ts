import { CreateNewsDto } from "../dto/news/CreateNewsDto";
import { NewsDetailResponseDto } from "../dto/news/NewsDetaliResponseDto";
import { NewsResponseDto } from "../dto/news/NewsResponseDto";
import { toNewsDetailResponseDto, toNewsResponseDto } from "../mapper/newsMapper";
import { NewsRepository } from "../repository/news.reporitory";
import { TagRepository } from "../repository/tag.repository";
import { NewsTag } from "../models/NewsTag";

export class NewsService {

    private newsRepository = new NewsRepository()
    private tagRepository = new TagRepository()

    async findAll(limit: number, offset: number): Promise<NewsResponseDto[]> {
        const news = await this.newsRepository.findAll(limit, offset)
        return news.map(toNewsResponseDto)
    }

    async newsDetail(id: number): Promise<NewsDetailResponseDto> {
        const news = await this.newsRepository.findByPk(id)
        if (!news) throw new Error('News does not exist')

        return toNewsDetailResponseDto(news)
    }

    async create(dto: CreateNewsDto): Promise<NewsDetailResponseDto> {
        const created = await this.newsRepository.createNews({
            title: dto.title,
            text: dto.text,
            userId: dto.user.userId
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

        const news = await this.newsRepository.findByPk(created.newsId)
        if (!news) throw new Error('News not found')

        return toNewsDetailResponseDto(news)
    }


    async update(id: number, dto: CreateNewsDto): Promise<NewsDetailResponseDto> {
        const news = await this.newsRepository.findByPk(id)
        if (!news) throw new Error('News does not exist')

        const oldTagIds = news.tags.map(tag => tag.tagId)

        await this.newsRepository.updateNews(id, {
            title: dto.title,
            text: dto.text,
            userId: dto.user.userId
        })

        // remove old tag relations and add new ones
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

        // delete tags that are no longer linked to any news
        for (const oldTagId of oldTagIds) {
            if (!newTagIds.includes(oldTagId)) {
                const count = await NewsTag.count({ where: { tagId: oldTagId } })
                if (count === 0) {
                    await this.tagRepository.deleteTagById(oldTagId)
                }
            }
        }

        const updated = await this.newsRepository.findByPk(id)
        if (!updated) throw new Error('News not found')

        return toNewsDetailResponseDto(updated)
    }
    

    async delete(id: number): Promise<void> {
        const news = await this.newsRepository.findByPk(id)
        if (!news) throw new Error('News does not exist')

        await this.newsRepository.deleteNews(id)
    }

    async findFiltered(search: string, limit: number, offset: number): Promise<NewsResponseDto[]> {
        const news = await this.newsRepository.findFiltered(search, limit, offset)
        return news.map(toNewsResponseDto)
    }
}
