import { Router } from 'express'
// import { body } from 'express-validator'

import { login, register } from '../controllers/auth.controller.js'
import { authValidation } from '../middlewares/validation.js'

const authRouter = Router()

authRouter.post('/login', authValidation, login)

authRouter.post('/register', authValidation, register)
/*[
	body('email', 'Incorrect email format').trim().isEmail().normalizeEmail(),
	body('password', 'Incorrect password format')
		.trim()
		.isLength({ min: 8, max: 18 })
],*/

export default authRouter
