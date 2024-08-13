export const login = (req, res) => {
	res.send('response by /login route')
}

export const register = (req, res) => {
	console.log(req.body)
	res.send('response by /register route')
}
