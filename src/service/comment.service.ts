import { CommentRepository } from "../repository/comment.repository"
import { NewsRepository } from "../repository/news.reporitory"
import { CreateCommentDto } from "../dto/comment/CreateCommentDto"
import { toCommetResponsenDto } from "../mapper/commentMapper"

export class CommentService {

    private commentRepository = new CommentRepository()
    private newsRepository = new NewsRepository()

    async create(dto: CreateCommentDto) {

        if (!dto.authorName?.trim() || !dto.content?.trim()) {
            throw new Error("Author name and content are required")
        }

        const news = await this.newsRepository.findByPk(dto.newsId)
        if (!news) {
            throw new Error("News not found")
        }

        const comment = await this.commentRepository.createComment({
            authorName: dto.authorName,
            content: dto.content,
            newsId: dto.newsId
        })

        return toCommetResponsenDto(comment)
    }

    async findByNews(newsId: number, limit: number, page: number) {
        const offset = (page - 1) * limit

        const comments = await this.commentRepository.findByNewsId(
            newsId,
            limit,
            offset
        )

        return comments.map(toCommetResponsenDto)
    }
}