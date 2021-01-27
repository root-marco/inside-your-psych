import category from '../models/Category.js';

export const root = async (req, res) => {
	res.render('admin/index');
};

// POSTS

export const posts = async (req, res) => {
	res.render('admin/posts');
};

export const postsAdd = async (req, res) => {
	category.find().lean().then((categories) => {
		res.render('admin/postsadd', { categories: categories });
	}).catch((err) => {
		res.flash('error_msg', 'error to load form.');
		res.redirect('admin/posts');
	});
};

export const postsNew = async (req, res) => {
	
};

// CATEGORIES

export const categories = async (req, res) => {
	category.find().sort({
		_id: -1
	}).lean().then((categories) => {
		res.render('admin/categories', {
			categories: categories
		});
	}).catch((err) => {
		req.flash('error_msg', 'unable to list categories.');
		res.redirect('/admin');
	});
};

export const categoriesAdd = async (req, res) => {
	res.render('admin/categoriesadd');
};

export const categoriesNew = async (req, res) => {
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

	if (errors.length > 0) {
		res.render('admin/categoriesadd', {
			errors: errors
		});
	} else {
		const newCategory = {
			name: name,
			slug: slug,
		};

		new category(newCategory).save()
			.then(() => {
				req.flash('success_msg', 'successfully created category.')
				res.redirect('/admin/categories');
			}).catch((err) => {
				req.flash('error_msg', 'error creating category.')
				console.log('error')
			});
	}
};

export const categoriesEdit = async (req, res) => {
	category.findOne({
		_id: req.body.id
	}).then((category) => {
		category.name = req.body.name;
		category.slug = req.body.slug;

		category.save().then(() => {
			req.flash('success_msg', 'successfully edited category.');
			res.redirect('/admin/categories');
		}).catch((err) => {
			req.flash('error_msg', 'error when editing category.')
			res.redirect('/admin/categories');
		});
	}).catch((err) => {
		req.flash('error_msg', 'error when editing category.');
		res.redirect('/admin/categories');
	})
};

export const categoriesEditId = async (req, res) => {
	category.findOne({
		_id: req.params.id
	}).lean().then((category) => {
		res.render('admin/categoriesedit', {
			category: category
		});
	}).catch((err) => {
		req.flash('error_msg', 'this category doesn\'t exist.');
		console.log('asdasd')
		res.redirect('/admin/categories');
	});
};

export const categoriesDeleteId = async (req, res) => {
	category.deleteOne({
		_id: req.params.id
	}).lean().then(() => {
		req.flash('success_msg', 'successfully deleted category.')
		res.redirect('/admin/categories');
	}).catch((error) => {
		req.flash('error_msg', 'error deleting category.')
		res.redirect('/admin/categories');
	});

};