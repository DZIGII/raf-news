import { Request, Response, NextFunction } from 'express'

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000

export type Reactions = {
    liked: number[]
    disliked: number[]
}

export function readerReactions(req: Request, res: Response, next: NextFunction) {
    try {
        const raw = req.cookies?.reactions
        req.reactions = raw ? JSON.parse(raw) : { liked: [], disliked: [] }
    } catch {
        req.reactions = { liked: [], disliked: [] }
    }
    next()
}

export function setReactionsCookie(res: Response, reactions: Reactions) {
    res.cookie('reactions', JSON.stringify(reactions), {
        httpOnly: false,
        sameSite: 'lax',
        maxAge: ONE_YEAR_MS
    })
}
