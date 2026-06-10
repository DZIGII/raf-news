import { CategoryDto } from "../category/CategoryDto";
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
    tags: {
        tagId: number;
        keyword: string;
    }[];
    images: ImageDto[];
}
//# sourceMappingURL=NewsDetaliResponseDto.d.ts.map