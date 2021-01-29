import category from '../models/Category.js';

export const root = async (req, res) => {

	res.render('admin/index');
	
};

// POSTS

export const posts = async (req, res) => {

	res.render('admin/posts');

};

export const postsAdd = async (req, res) => {

	try {
		const find = await category.find().lean();
		res.render('admin/postsadd', {
			categories: categories
		});
	} catch {
		res.flash('error_msg', 'error to load form.');
		res.redirect('admin/posts');
	}

};

export const postsNew = async (req, res) => {

};

// CATEGORIES

export const categories = async (req, res) => {

	try {
		const find = await category.find().sort({
			_id: -1
		}).lean();
		res.render('admin/categories', {
			categories: find
		});
	} catch {
		req.flash('error_msg', 'unable to list categories.');
		res.redirect('/admin');
	}

};

export const categoriesAdd = async (req, res) => {

	res.render('admin/categoriesadd');

};

export const categoriesNew = async (req, res) => {

	let errors = [];
	const name = req.body.name;
	const slug = req.body.slug;

	if (!name || typeof name == undefined || name == null) {
		errors.push({
			text: 'Invalid name',
		});
	}

	if (!slug || typeof slug == undefined || slug == null) {
		errors.push({
			text: 'Invalid slug',
		});
	}

	if (errors.length == 0) {
		const newCategory = {
			name: name,
			slug: slug,
		}

		try {
			await new category(newCategory).save()
			req.flash('success_msg', 'successfully created category.');
			res.redirect('/admin/categories');
		} catch {
			req.flash('error_msg', 'error creating category.');
			console.log('error');
		}
	} else {
		res.render('admin/categoriesadd', {
			errors: errors,
		});
	}
};

export const categoriesEdit = async (req, res) => {

	let errors = [];
	const name = req.body.name;
	const slug = req.body.slug;

	if (!name || typeof name == undefined || name == null)
		errors.push({
			text: 'Invalid name'
		});

	if (!slug || typeof slug == undefined || slug == null)
		errors.push({
			text: 'Invalid slug'
		});

	if (errors.length == 0) {
		try {
			const findOne = await category.findOne({
				_id: req.body.id
			});
			findOne.name = req.body.name;
			findOne.slug = req.body.slug;
			try {
				findOne.save();
				req.flash('success_msg', 'successfully edited category.');
				res.redirect('/admin/categories');
			} catch {
				req.flash('error_msg', 'error when save category.');
				res.redirect('/admin/categories');
			}
		} catch {
			req.flash('error_msg', 'error when find category.');
			res.redirect('/admin/categories');
		}
	} else {
		res.render('admin/categoriesedit', {
			errors: errors
		});
	}

};

export const categoriesEditId = async (req, res) => {

	try {
		const findOne = await category.findOne({
			_id: req.params.id
		}).lean();
		res.render('admin/categoriesedit', {
			category: findOne
		});
	} catch {
		req.flash('error_msg', 'this category doesn\'t exist.');
		res.redirect('/admin/categories');
	}

};

export const categoriesDeleteId = async (req, res) => {

	try {
		await category.deleteOne({
			_id: req.params.id
		});
		req.flash('success_msg', 'successfully deleted category.')
		res.redirect('/admin/categories');
	} catch {
		req.flash('error_msg', 'error deleting category.')
		res.redirect('/admin/categories');
	}

};