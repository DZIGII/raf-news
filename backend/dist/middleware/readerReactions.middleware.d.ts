import { Request, Response, NextFunction } from 'express';
export type Reactions = {
    liked: number[];
    disliked: number[];
};
export declare function readerReactions(req: Request, res: Response, next: NextFunction): void;
export declare function setReactionsCookie(res: Response, reactions: Reactions): void;
//# sourceMappingURL=readerReactions.middleware.d.ts.map