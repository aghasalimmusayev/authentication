import jwt, { SignOptions } from 'jsonwebtoken'
import crypto from 'crypto'
import pool from 'db/connection'
import bcrypt from 'bcrypt'
import { JwtPayload } from 'types/types'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '10m';

if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined in environment variables')

export const generateAccessToken = (payload: JwtPayload): string => {
    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] }
    return jwt.sign(payload, JWT_SECRET, options);
}

export const generateRefreshToken = (): string => {
    return crypto.randomBytes(64).toString('hex')
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
}

export const saveToken = async (userId: string, token: string) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await pool.query(`insert into refresh_tokens (user_id, token, expires_at) values ($1, $2, $3)`,
        [userId, token, expiresAt])
}

export const cleanUpTokens = async (userId: string) => {
    await pool.query(`delete from refresh_tokens where user_id = $1 and (expires_at < NOW() or is_revoked = true)`, [userId])
}

export const verifyRefreshToken = async (token: string) => {
    const result = await pool.query(`select * from refresh_tokens 
        where token = $1 and is_revoked = false and expires_at > now()`, [token]);
    return result.rows[0] || null;
};

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}
