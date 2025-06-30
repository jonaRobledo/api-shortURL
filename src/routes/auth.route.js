import { Router } from 'express'
// import { body } from 'express-validator'

import { getUser, login, register } from '../controllers/auth.controller.js'
import { authValidation } from '../middlewares/validateUser.js'
import { validateToken } from '../middlewares/validateToken.js'

const authRouter = Router()

authRouter.post('/login', authValidation, login)

authRouter.post('/register', authValidation, register)
/* Validation migrated to custom Middleware
[
	body('email', 'Incorrect email format').trim().isEmail().normalizeEmail(),
	body('password', 'Incorrect password format')
		.trim()
		.isLength({ min: 8, max: 18 })
],*/

// Example Route to test Token validation
authRouter.get('/getUser', validateToken, getUser)

export default authRouter
