import { Comment } from "../models/Comment";
export declare class CommentRepository {
    findByPk(id: number): Promise<Comment | null>;
    findAll(newsId: number, limit: number, offset: number): Promise<Comment[]>;
    createComment(data: Partial<Comment>): Promise<Comment>;
    likeComment(id: number): Promise<void>;
    dislikeComment(id: number): Promise<void>;
    decrementLike(id: number): Promise<void>;
    decrementDislike(id: number): Promise<void>;
}
//# sourceMappingURL=comment.repository.d.ts.map