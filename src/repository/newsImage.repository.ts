import { NewsImage } from '../models/NewsImage'

export class NewsImageRepository {
    async create(newsId: number, imageUrl: string): Promise<NewsImage> {
        return NewsImage.create({ newsId, imageUrl })
    }
}