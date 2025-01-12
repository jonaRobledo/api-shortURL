import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
		index: { unique: true }
	},
	password: {
		type: String,
		required: true
	}
})

// Anonymous Function to use the context of This
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()

	try {
		const salt = await bcryptjs.genSalt(10)
		this.password = await bcryptjs.hash(this.password, salt)
		next()
	} catch (error) {
		console.log(error)
		throw new Error('Fallo el hash de Contraseña')
	}
})

userSchema.methods.comparePassword = async function (clientPassword) {
	return await bcryptjs.compare(clientPassword, this.password)
}

export const User = model('User', userSchema)
