export interface NewsResponseDto {
    newsId:number;
    title: string;
    mainImage: string | null;
    tagIds: number[];
}