import { Request, Response, NextFunction } from "express";
import { verifyToken } from "utils/jwt";

export interface AuthRequest extends Request {
    user?: {
        id: string,
        email: string
    }
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({
        type: "application/problem+json",
        status: 401,
        title: "Unauthorized",
        detail: "Authorization header missing"
    })
    const [type, token] = auth.split(" ")
    // auth string-bele olur: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    // split[1] onu bosluga gore parcalayib goturur
    if (type !== "Bearer" || !token) return res.status(401).json({
        type: "application/problem+json",
        status: 401,
        title: "Unauthorized",
        detail: "Invalid authorization format"
    })
    try {
        const decoded = verifyToken(token) // accesstoken
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            type: "application/problem+json",
            status: 401,
            title: "Unauthorized",
            detail: "Invalid or expired token"
        })
    }
}