import { Request, Response } from "express";
export declare class TagController {
    private tagService;
    find(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findByKeyword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=tag.controller.d.ts.map