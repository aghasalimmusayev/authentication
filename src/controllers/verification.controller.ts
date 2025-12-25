import { Request, Response, NextFunction } from "express";
import { sendOtpCode, verificateEmail } from "services/verification.service";

export async function getOtpCode(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body
        if (!email) return res.status(400).json({ message: 'Email is required' })
        await sendOtpCode(email)
        return res.status(200).json({
            success: true,
            message: `Otp code has sent to ${email}`
        })
    } catch (err) {
        next(err)
    }
}

export async function emailVerification(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, code } = req.body
        if (!email) return res.status(400).json({ message: 'Email is required' })
        if (typeof code !== 'string') return res.status(400).json({ message: 'Code must be a string' })
        if (!/^\d{6}$/.test(code)) return res.status(400).json({ message: "Code must be 6 digits" });
        await verificateEmail(email, code)
        return res.status(200).json({
            success: true,
            message: 'Your email has been verified succesfully'
        })
    } catch (err) {
        next(err)
    }
}