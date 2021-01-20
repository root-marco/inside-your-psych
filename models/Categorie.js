import mongoose from 'mongoose';

const Categorie = new mongoose.Schema({
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

mongoose.model('categories', Categorie);