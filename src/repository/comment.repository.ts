import { Comment } from "../models/Comment";

export class CommentRepository {

    async findByPk(id: number) {
        return Comment.findByPk(id)
    }

    async findAll(newsId: number, limit: number, offset: number): Promise<Comment[]> {
        return Comment.findAll({
            where: { newsId },
            order: [['createdAt', 'DESC']],
            limit,
            offset
        })
    }


    async createComment(data: Partial<Comment>): Promise<Comment> {
        return Comment.create(data);
    }

    async likeComment(id: number): Promise<void> {
        await Comment.increment('like', { where: { commentId: id } })
    }

    async dislikeComment(id: number): Promise<void> {
        await Comment.increment('dislike', {where: {commentId: id}})
    }

    async decrementLike(id: number): Promise<void> {
        await Comment.decrement('like', { where: { commentId: id } })
    }

    async decrementDislike(id: number): Promise<void> {
        await Comment.decrement('dislike', { where: { commentId: id } })
    }
}