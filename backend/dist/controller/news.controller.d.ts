import { Request, Response } from "express";
export declare class NewsController {
    private newsService;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    newsDetail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findMostRead(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findByTag(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findFiltered(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    related(req: Request, res: Response): Promise<void>;
    topReactions(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    likeNews(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    dislikeNews(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=news.controller.d.ts.map