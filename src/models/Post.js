import mongoose from "mongoose";
import path from "path";
const coverImageBasePath = "covers";

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

	coverImage: {
		type: String,
	},

	date: {
		type: Date,
		default: Date.now(),
	},

});

const basePath = post.virtual("coverImagePath").get(() => {
	if (this.coverImage != null) {
		return path.join("/", coverImageBasePath, this.coverImage);
	}
});

const Post = mongoose.model("post", post);

export default Post;
