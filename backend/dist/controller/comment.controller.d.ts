import { Request, Response } from "express";
export declare class CommentController {
    private commentService;
    findAllByNews(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    like(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    dislike(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=comment.controller.d.ts.map