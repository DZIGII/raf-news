import { CategoryDto } from "../category/CategoryDto";
import { CommentDto } from "../comment/CommentDto";
import { CommentResponseDto } from "../comment/CommentResponseDto";
import { ImageDto } from "../image/ImageDto";
import { UserResponseDto } from "../user/UserResponseDto";

export interface NewsDetailResponseDto {
    newsId: number;
    title: string;
    text: string;
    createdAt: Date;
    like: number;
    dislike: number;
    createdBy: UserResponseDto;
    category: CategoryDto;
    comments: CommentResponseDto[];
    images: ImageDto[];
}
