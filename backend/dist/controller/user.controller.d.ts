import { Request, Response } from "express";
export declare class UserController {
    private userService;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateByAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    toggleActive(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=user.controller.d.ts.map