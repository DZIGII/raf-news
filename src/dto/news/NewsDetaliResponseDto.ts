import { CommentDto } from "../comment/CommentDto";
import { ImageDto } from "../image/ImageDto";
import { UserResponseDto } from "../user/UserResponseDto";

export interface NewsDetailResponseDto {
    newsId: number;
    title: string;
    text: string;
    visits: number;
    createdAt: Date;
    createdBy: UserResponseDto;
    comments: CommentDto[];
    images: ImageDto[];
}
