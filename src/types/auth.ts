import { Request } from "express"

export type RegisterDto = {
    email: string,
    password: string,
    name?: string
}

export type LoginDto = {
    email: string,
    password: string,
}

export interface AuthRequest extends Request {
    user?: {
        id: string,
        email: string
    }
}