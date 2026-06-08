import { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & { userId: number; role: 'ADMIN' | 'CREATOR' }
            reactions?: { liked: number[]; disliked: number[] }
        }
    }
}

export {}
