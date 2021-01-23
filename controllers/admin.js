import category from '../models/Category.js';

export const root = async (req, res) => {
	res.render('admin/index');
};

export const posts = async (req, res) => {
	res.send('<h1>Posts page</h1>');
};

export const categories = async (req, res) => {
	res.render('admin/categories');
};

export const categoriesAdd = async (req, res) => {
	res.render('admin/categoriesadd');
};

export const categoriesNew = async (req, res) => {
	let errors = [];
	const name = req.body.name;
	const slug = req.body.slug;

	if ( !name || typeof name == undefined || name == null)
	errors.push({ text: 'Invalid name' });

	if ( !slug || typeof slug == undefined || slug == null)
	errors.push({ text: 'Invalid slug' });

	if (errors.length > 0) {
		res.render('admin/categoriesadd', { errors: errors });
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
}
