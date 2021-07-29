import mongoose from "mongoose";

const post = new mongoose.Schema({
	
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
		type: mongoose.Schema.Types.ObjectId,
		ref: "category",
		required: true,
	},

	date: {
		type: Date,
		default: Date.now(),
	},

});

const Post = mongoose.model("post", post);

export default Post;
