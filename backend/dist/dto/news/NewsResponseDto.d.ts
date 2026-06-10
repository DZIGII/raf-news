export interface NewsResponseDto {
    newsId: number;
    title: string;
    text: string;
    createdAt: Date;
    mainImage: string | null;
    categoryName: string;
    categoryId: number;
    authorName: string;
    like: number;
    dislike: number;
    tags: {
        tagId: number;
        keyword: string;
    }[];
}
//# sourceMappingURL=NewsResponseDto.d.ts.map