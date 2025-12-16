import { Request, Response, NextFunction } from "express";
import { createUser } from "services/admin.service";

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password_hash, role } = req.body
        if (!username || !email || !password_hash || !role) {
            return res.status(400).json({
                type: "application/problem+json",
                status: 400,
                title: "Bad Request",
                detail: "Username, email or password require"
            })
        }
        const result = await createUser({ username, email, password_hash, role })
        if (!result.success) return res.status(409).json({ message: result.error })
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        })
    } catch (err) {
        next(err)
    }
}


