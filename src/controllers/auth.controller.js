// Import dependencies and custom Modules
import jwt from 'jsonwebtoken'
import { generateToken } from '../helpers/tokenManager.js'

// User Model
import { User } from '../models/User.js'

export const login = async (req, res) => {
	const { email, password } = req.body

	try {
		// Search User by email
		const findUser = await User.findOne({ email })
		if (!findUser) throw { message: 'Invalid Credentials', code: 403 }

		// Compare Client password with User password
		const validatePassword = await findUser.comparePassword(password)
		if (!validatePassword) throw { message: 'Invalid Credentials', code: 403 }

		// Generate the Token
		const { token, expiresIn } = generateToken(findUser.id)

		res.json({ ok: 'Authenticated User', token, expiresIn })
	} catch (error) {
		console.log(error)
		// Custom Error handling
		res.status(error.code).json(error)
	}
}

export const register = async (req, res) => {
	const { email, password } = req.body

	try {
		// Create a User instance
		const user = new User({ email, password })
		// Save User instance in DB
		await user.save()

		// JWT

		res.status(201).json({ ok: 'Registered User' })
	} catch (error) {
		// Mongoose is responsable for validating that the user does not exist
		console.log(error)
		res.status(400).json({ error: 'Error when registering' })
	}
}

// Example Controller to test Token validation
export const getUser = async (req, res) => {
	const uid = req.uid
	try {
		const user = await User.findById(uid).lean()
		res.json({ uid, email: user.email })
	} catch (error) {
		console.log(error)
	}
}
