// Environment Variables
import 'dotenv/config'

// Import project dependencies
import express from 'express'
import morgan from 'morgan'

// Import your project modules
import './src/database/connect-db.js'
import authRouter from './src/routes/auth.route.js'

// Initialization
const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('tiny'))

// Routes
app.get('/', (req, res) => {
	res.send('Server Running')
})

// Auth Routes
app.use('/api/v1/auth', authRouter)

// Server run
app.listen(process.env.PORT || 3000, () => {
	console.log(`Running on http://localhost:${process.env.PORT}`)
})
