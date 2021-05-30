import mongoose from "mongoose";

const comment = new mongoose.Schema({

	content: {
		type: String,
		required: true,
	},

	pageSlug: {
		type: String,
		required: true,
	},

	createdBy: {
		type: String,
		required: true,
	},
	
});

const Comment = mongoose.model("comment", comment);

export default Comment;
