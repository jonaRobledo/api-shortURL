import jwt from 'jsonwebtoken'

export const validateRefreshToken = (req, res, next) => {
	try {
		// Validate sending of Refresh Token in headers and save in memory
		const { refreshToken } = req.cookies
		// console.log(refreshToken)

		if (!refreshToken) throw new Error('Nonexistent Token')

		// Get payload if Refresh Token is valid
		const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH)
		// console.log('uid: ' + payload.uid)
		req.uid = uid
		// console.log('req.uid: ' + req.uid)

		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ error: error.message })
	}
}
