import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.config'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'No token provided' })

    try {
        const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload & { userId: number; role: 'ADMIN' | 'CREATOR' }
        req.user = decoded
        next()
    } catch {
        res.status(401).json({ message: 'Invalid token' })
    }
}

export function roleMiddleware(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user
        if (!user) return res.status(401).json({ message: 'Not authenticated' })

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        next()
    }
}
