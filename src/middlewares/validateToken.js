import jwt from 'jsonwebtoken'
export const validateToken = (req, res, next) => {
	try {
		const token = req.headers?.authorization.replace('Bearer ', '')
		if (!token) throw new Error('Nonexistent Token')

		const payload = jwt.verify(token, process.env.JWT_SECRET)

		req.uid = payload.uid

		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ error: error.message })
	}
}
