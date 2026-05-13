import { Comment } from "../models/Comment";

export class CommentRepository {

    async findByPk(id: number) {
        return Comment.findByPk(id)
    }

    async findAll(limit: number, offset: number): Promise<Comment[]> {
        return Comment.findAll({limit, offset})
    }

    async createComment(data: Partial<Comment>): Promise<Comment> {
        return Comment.create({data});
    }

    async likeComment(id: number): Promise<void> {
        await Comment.increment('likes', { where: { commentId: id } })
    }

    async dislikeComment(id: number): Promise<void> {
        await Comment.increment('like', {where: {commentId: id}})
    }
}