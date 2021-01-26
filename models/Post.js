import mongoose from 'mongoose';

const Post = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'category',
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

const post = mongoose.model('post', Post);

export default post;