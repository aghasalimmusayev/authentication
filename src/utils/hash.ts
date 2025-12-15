import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const SALT_ROUND = Number(process.env.SALT_ROUND ?? 10)

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUND)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
}
