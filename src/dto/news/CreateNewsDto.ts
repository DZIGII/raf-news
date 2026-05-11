export interface CreateNewsDto {
    title: string;
    text: string;
    userId: number;
    tagsIds: number[];
}