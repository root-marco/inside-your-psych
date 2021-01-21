import express from 'express';
import mongoose from 'mongoose';
import categoriy from '../models/Categorie.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.render('admin/index');
});

router.get('/posts', (req, res) => {
	res.send('<h1>Posts page</h1>');
});

router.get('/categories', (req, res) => {
	res.render('admin/categories');
});

router.get('/categories/add', (req, res) => {
	res.render('admin/categoryadd');
});

router.post('/categories/new', (req, res) => {
	const newCategory = {
		name: req.body.name,
		slug: req.body.slug,
	};

	new categoriy(newCategory).save()
	.then(() => console.log('category added'))
	.catch((err) => console.log('error'));

});

export default router;