// Import the dependencies
import jwt from 'jsonwebtoken'

export const generateToken = (uid) => {
	const expiresIn = 60 * 15

	try {
		const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
		//console.log('T: ', token)
		return { token, expiresIn }
	} catch (error) {
		console.log(error)
	}
}

export const generateRefreshToken = (uid) => {
	const expiresIn = 60 * 60 * 24 * 15 * 1000

	try {
		const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
			expiresIn
		})
		//console.log('RF: ', refreshToken)
		return { refreshToken, expiresIn }
	} catch (error) {
		console.log(error)
	}
}
