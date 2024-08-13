import { body, validationResult } from 'express-validator'

export const authValidation = (req, res, next) => {
	// Validation with Express-Validator
	body('email', 'Incorrect email format').trim().isEmail().normalizeEmail()
	body('password', 'Incorrect password format')
		.trim()
		.isLength({ min: 8, max: 18 })

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	next()
}
