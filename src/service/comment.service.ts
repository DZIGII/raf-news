import { CommentDto } from "../dto/comment/CommentDto";
import { CommentResponseDto } from "../dto/comment/CommentResponseDto";
import { toCommetResponsenDto } from "../mapper/commentMapper";
import { Reactions } from "../middleware/readerReactions.middleware";
import { CommentRepository } from "../repository/comment.repository";


export class CommentService {

    private commentReporistory = new CommentRepository()

    async find(id: number): Promise<CommentResponseDto> {
        const comment = await this.commentReporistory.findByPk(id)
        if (!comment) throw new Error("Comment dose not exists")

        return toCommetResponsenDto(comment)
    }

    async findAllByNews(newsId: number, limit: number, offset: number): Promise<CommentResponseDto[]> {
        const commetns = await this.commentReporistory.findAll(newsId, limit, offset)
        return commetns.map(toCommetResponsenDto)
    }

    async createComment(data: CommentDto): Promise<CommentResponseDto> {
        if (!data.authorName || data.authorName.trim() === "") throw new Error("Author name is required")
        if (!data.content || data.content.trim() === "") throw new Error("Content is required")

        const comment = await this.commentReporistory.createComment({
            authorName: data.authorName,
            content: data.content,
            newsId: data.newsId
        })

        return toCommetResponsenDto(comment)
    }

    async likeComment(commentId: number, reactions: Reactions): Promise<Reactions> {
        const comment = await this.commentReporistory.findByPk(commentId)
        if (!comment) throw new Error("Comment does not exist")

        if (reactions.liked.includes(commentId)) return reactions

        if (reactions.disliked.includes(commentId)) {
            reactions.disliked = reactions.disliked.filter(id => id !== commentId)
            await this.commentReporistory.decrementDislike(commentId)
        }

        reactions.liked.push(commentId)
        await this.commentReporistory.likeComment(commentId)

        return reactions
    }

    async dislikeComment(commentId: number, reactions: Reactions): Promise<Reactions> {
        const comment = await this.commentReporistory.findByPk(commentId)
        if (!comment) throw new Error("Comment does not exist")

        if (reactions.disliked.includes(commentId)) return reactions

        if (reactions.liked.includes(commentId)) {
            reactions.liked = reactions.liked.filter(id => id !== commentId)
            await this.commentReporistory.decrementLike(commentId)
        }

        reactions.disliked.push(commentId)
        await this.commentReporistory.dislikeComment(commentId)

        return reactions
    }
}
