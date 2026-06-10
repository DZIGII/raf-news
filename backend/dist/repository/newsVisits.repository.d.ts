export declare class NewsVisitsRepository {
    findMostRead(daysBack: number, limit: number): Promise<Array<{
        newsId: number;
        visitCount: number;
    }>>;
    countByNewsId(newsId: number): Promise<number>;
    logVisit(newsId: number): Promise<void>;
}
//# sourceMappingURL=newsVisits.repository.d.ts.map