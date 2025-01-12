import { User } from '../models/User.js'

export const login = async (req, res) => {
	console.log(req.body)
	const { email, password } = req.body

	try {
		const findUser = await User.findOne(email)
		if (!findUser) throw new Error('This User not Exist')

		const validatePassword = user.comparePassword(password)
		if (!validatePassword) throw new Error('Invalid Credentials')

		res.json({ ok: 'Authenticated User' })
	} catch (error) {
		console.log(error)
		res.status(404).json({ error: error.message })
		//! Falta resolver las validaciones del /Login
	}
}

export const register = async (req, res) => {
	console.log(req.body)
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
