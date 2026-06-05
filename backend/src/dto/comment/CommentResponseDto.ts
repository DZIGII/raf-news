export interface CommentResponseDto {
    authorName: string;
    content: string;
    createdAt: Date;
    like: number;
    dislike: number;
}