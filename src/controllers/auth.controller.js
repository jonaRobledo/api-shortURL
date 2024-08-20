import { User } from '../models/user.js'

export const login = async (req, res) => {
	res.send('response by /login route')
}

export const register = async (req, res) => {
	console.log(req.body)
	const { email, password } = req.body

	try {
		const user = new User({ email, password })
		await user.save()

		return res.json({ ok: true })
	} catch (error) {
		console.log(error)
	}

	// res.send('response by /register route')
}
