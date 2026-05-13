import { CategoryDto } from "../category/CategoryDto";
import { CommentDto } from "../comment/CommentDto";
import { CommentResponseDto } from "../comment/CommentResponseDto";
import { ImageDto } from "../image/ImageDto";
import { UserResponseDto } from "../user/UserResponseDto";

export interface NewsDetailResponseDto {
    newsId: number;
    title: string;
    text: string;
    visits: number;
    createdAt: Date;
    like: number;
    dislike: number;
    numberOfVisits: number;
    createdBy: UserResponseDto;
    category: CategoryDto;
    comments: CommentResponseDto[];
    images: ImageDto[];
}
