import mongoose from 'mongoose';

const User = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Number,
		default: 0,
	},
});

const user = mongoose.model('user', User);

export default user;