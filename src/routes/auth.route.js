import { Router } from 'express'

import {
	getUser,
	login,
	register,
	refresh
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

authRouter.get('/refresh', validateRefreshToken, refresh)

export default authRouter
