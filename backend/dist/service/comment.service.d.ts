import { CommentDto } from "../dto/comment/CommentDto";
import { CommentResponseDto } from "../dto/comment/CommentResponseDto";
import { Reactions } from "../middleware/readerReactions.middleware";
export declare class CommentService {
    private commentReporistory;
    find(id: number): Promise<CommentResponseDto>;
    findAllByNews(newsId: number, limit: number, offset: number): Promise<CommentResponseDto[]>;
    createComment(data: CommentDto): Promise<CommentResponseDto>;
    likeComment(commentId: number, reactions: Reactions): Promise<Reactions>;
    dislikeComment(commentId: number, reactions: Reactions): Promise<Reactions>;
}
//# sourceMappingURL=comment.service.d.ts.map