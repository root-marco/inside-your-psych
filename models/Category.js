import mongoose from 'mongoose';

const Category = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

const category = mongoose.model('category', Category);

export default category;
