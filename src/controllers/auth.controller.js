// Import dependencies and custom Modules
// import jwt from 'jsonwebtoken'
import { generateToken, generateRefreshToken } from '../helpers/tokenManager.js'

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

		// Generate Token and Refresh Token
		const { token, expiresIn } = generateToken(findUser.id)
		const { refreshToken, expiresIn: expiresRefreshToken } = generateRefreshToken(
			findUser.id
		)

		// Save Refresh Token in Cookies
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: !(process.env.MODO === 'developer'),
			expires: new Date(Date.now() + expiresRefreshToken)
		})
		// Send access Token in Headers
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

// Get User data after validating access Token
export const getUser = async (req, res) => {
	try {
		// Search User data by ID
		const user = await User.findById(req.uid).lean()
		res.json({ uid: user._id, email: user.email })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Server Error' })
	}
}

// Generate a new access Token after validating Refresh Token
export const refresh = async (req, res) => {
	try {
		const { token, expiresIn } = generateToken(req.uid)
		res.json({ token, expiresIn })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Server Error' })
	}
}

export const logout = (req, res) => {
	res.clearCookie('refreshToken')
	res.json({ ok: true })
}

/**
 * Flujo del Refresh Token
 * 1.- Crear AccessToken y RefreshToken
 * 2.- Utiliza el AccessToken hasta que expire
 * 3.- Utiliza el RefreshToken para generar nuevos AccessTokens
 * 4.- Cuando expira el RefreshToken debes volver a /login
 */
