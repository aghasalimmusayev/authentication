import { loginUser, logoutAllDevices, logoutUser, me, refreshToken, registerUser } from "controllers/auth.controller";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";

const authRoute = Router()

// Private routes
authRoute.post('/register', registerUser) // ✅
authRoute.post('/login', loginUser) // ✅
authRoute.post('/logout', logoutUser) // ✅
authRoute.post('/logout-all', logoutAllDevices) // ✅
authRoute.post('/refresh', refreshToken) // ✅

// Protected routes
authRoute.get('/me', authMiddleware, me) // ✅

export default authRoute

