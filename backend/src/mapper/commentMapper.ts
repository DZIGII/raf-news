import { CommentDto } from "../dto/comment/CommentDto";
import { CommentResponseDto } from "../dto/comment/CommentResponseDto";
import { Comment } from "../models/Comment";

export function toCommetResponsenDto(comment: Comment): CommentResponseDto {
    const d: any = comment.toJSON();
    return {
        commentId: d.commentId,
        authorName: d.authorName,
        content: d.content,
        createdAt: d.createdAt,
        like: d.like,
        dislike: d.dislike
    }
}
