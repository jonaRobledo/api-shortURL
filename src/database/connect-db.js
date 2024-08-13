import mongoose from 'mongoose'

try {
	//
	await mongoose.connect(process.env.DB_URI)
	console.log('Connected to Mongo Atlas')
} catch (error) {
	console.log('Error connecting to Mongo Atlas')
}
