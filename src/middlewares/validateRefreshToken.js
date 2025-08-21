import jwt from 'jsonwebtoken'

export const validateRefreshToken = (req, res, next) => {
	try {
		// Validate sending of Refresh Token in headers and save in memory
		const { refreshToken } = req.cookies

		if (!refreshToken) throw new Error('Nonexistent Token')

		// Get payload if Refresh Token is valid
		const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH)
		req.uid = uid

		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ error: error.message })
	}
}
