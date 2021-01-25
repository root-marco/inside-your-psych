import category from '../models/Category.js';

export const root = async (req, res) => {
	res.render('admin/index');
};

export const posts = async (req, res) => {
	res.send('<h1>Posts page</h1>');
};

export const categories = async (req, res) => {

	category.find().sort({
		_id: -1
	}).lean().then((categories) => {
		res.render('admin/categories', {
			categories: categories
		});
	}).catch((err) => {
		req.flash('error_msg', 'unable to list categories');
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
				req.flash('success_msg', 'successfully created category')
				res.redirect('/admin/categories');
			}).catch((err) => {
				req.flash('error_msg', 'error creating category')
				console.log('error')
			});
	}
};

export const categoriesDelete = async (req, res) => {
	const id = req.params.id;

	category.deleteOne({
		_id: id
	}, (err) => {
		if (!err) {
			req.flash('success_msg', 'successfully deleted category')
			res.redirect('/admin/categories');
		} else {
			req.flash('error_msg', 'error deleting category')
			console.log('error')
		}
	});
};