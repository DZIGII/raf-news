import { CommentDto } from "../dto/comment/CommentDto";
import { CommentResponseDto } from "../dto/comment/CommentResponseDto";
import { Comment } from "../models/Comment";

export function toCommetResponsenDto(comment: Comment): CommentResponseDto {
    return {
        authorName: comment.authorName,
        content: comment.content,
        createdAt: comment.createdAt,
        like: comment.like,
        dislike: comment.dislike
    }
}