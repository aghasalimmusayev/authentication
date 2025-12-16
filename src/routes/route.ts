import { loginUser, logoutAllDevices, logoutUser, me, refreshToken, registerUser } from "controllers/auth.controller";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";
import { requireRole } from "middlewares/role.middleware";
import { Role } from "types/types";
import { createUserController } from "controllers/admin.controller";
import { getPermissions, userPermissions } from "controllers/text.controller";

const route = Router()

// Private routes
route.post('/register', registerUser) // ✅
route.post('/login', loginUser) // ✅
route.post('/logout', logoutUser) // ✅
route.post('/refresh', refreshToken) // ✅

// Protected routes
route.get('/me', authMiddleware, me) // ✅
route.post('/logout-all', logoutAllDevices) // ✅
route.post('/admin/users', authMiddleware, requireRole(Role.ADMIN), createUserController)

// Test route
// route.get('/test', userPermissions)
route.get('/test', getPermissions)

export default route

