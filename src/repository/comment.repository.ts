import { Comment } from "../models/Comment";

export class CommentRepository {

    async findByPk(id: number) {
        return Comment.findByPk(id)
    }

    async findAll(limit: number, offset: number): Promise<Comment[]> {
        return Comment.findAll({limit, offset})
    }

    async createComment(data: Partial<Comment>): Promise<Comment> {
        return Comment.create(data); // ({}) -> ()
    }

    async likeComment(id: number): Promise<void> {
        await Comment.increment('like', { where: { commentId: id } }) //likes->like
    }

    async dislikeComment(id: number): Promise<void> {
        await Comment.increment('dislike', {where: {commentId: id}})
    }

    async findByNewsId(newsId: number, limit: number, offset: number): Promise<Comment[]> {
    return Comment.findAll({
        where: { newsId },
        limit,
        offset,
        order: [['createdAt', 'DESC']]
    })
}
}