import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
	try {
		// Validate sending of JWT in headers and save in memory
		const { token } = req.cookies
		console.log(token)

		if (!token) throw new Error('Nonexistent Token')

		// Get payload if JWT is valid
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		req.uid = payload.uid

		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ error: error.message })
	}
}

/**
 * Funcionamiento:
 * 1.- Recupera la Cabecera de Autorización y Valida que cumpla el Formato 'Bearer'
 * 2.- Si se cumple lo anterior: elimina el prefijo 'Bearer ' obteniendo el Token
 * 3.- Si no se envío el Token: genera un Error
 * 4.- Valida el Token y decodifica el Payload
 * 5.- Guarda en el Objeto 'req' la propiedad 'uid' del Payload y continua
 */

export const validateTokenRespaldo = (req, res, next) => {
	try {
		// Validate sending of JWT in headers and save in memory
		const token = req.headers.authorization?.replace('Bearer ', '')

		if (!token) throw new Error('Nonexistent Token')

		// Get payload if JWT is valid
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		req.uid = payload.uid

		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ error: error.message })
	}
}

// Optional (lines 15 to 17)
// const { authorization } = req.headers
// if(!authorization) throw new Error('Nonexistent Token')
// const token = authorization.replace('Bearer ', '')
