// Import dependencies
import jwt from 'jsonwebtoken'

// User Model
import { User } from '../models/User.js'

export const login = async (req, res) => {
	const { email, password } = req.body

	try {
		const findUser = await User.findOne({ email })
		if (!findUser) throw { message: 'Nonexistent User', code: 403 }

		const validatePassword = await findUser.comparePassword(password)
		if (!validatePassword) throw { message: 'Invalid Credentials', code: 403 }

		const token = jwt.sign({ uid: findUser._id }, process.env.JWT_SECRET)

		res.json({ ok: 'Authenticated User', token })
	} catch (error) {
		console.log(error)
		// Custom Error handling
		res.status(error.code).json(error)
	}
}

export const register = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = new User({ email, password })
		await user.save()

		// JWT

		res.status(201).json({ ok: 'Registered User' })
	} catch (error) {
		// Mongoose is responsable for validating that the user does not exist
		console.log(error)
		res.status(400).json({ error: 'Error when registering' })
	}
}
