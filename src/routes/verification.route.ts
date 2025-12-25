import { emailVerification, getOtpCode } from "controllers/verification.controller";
import { Router } from "express";

const verificationRoute = Router()

verificationRoute.post('/get-otp-code', getOtpCode)
verificationRoute.post('/verify-email', emailVerification)

export default verificationRoute