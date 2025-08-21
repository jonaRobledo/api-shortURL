import { Router } from 'express'

import {
	getUser,
	login,
	register,
	refresh,
	logout
} from '../controllers/auth.controller.js'
import { authValidation } from '../middlewares/validateUser.js'
import { validateToken } from '../middlewares/validateToken.js'
import { validateRefreshToken } from '../middlewares/validateRefreshToken.js'

const authRouter = Router()

authRouter.post('/login', authValidation, login)

// Validation migrated to custom Middleware
authRouter.post('/register', authValidation, register)

// Route to test Authentication Token
authRouter.get('/getUser', validateToken, getUser)

// Route to test Authentication with Refresh Token
authRouter.get('/refresh', validateRefreshToken, refresh)

// Route to test Logout and clear Cookies
authRouter.get('/logout', logout)

export default authRouter
