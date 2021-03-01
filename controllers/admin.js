import category from '../models/Category.js';
import post from '../models/Post.js';

// ADMIN

export function admin(req, res) {

	res.render('admin/index');

}

// POSTS

export async function posts(req, res) {

	try {
		const find = await post.find().sort({
			_id: -1,
		}).populate('category').lean();
		res.render('admin/posts', {
			posts: find,
		});
	} catch {
		req.flash('error_msg', 'unable to list posts.');
		res.redirect('/posts');
	}


}

export async function postsAdd(req, res) {

	try {
		const categoryFind = await category.find().lean();
		res.render('admin/postsadd', {
			categories: categoryFind,
		});
	} catch {
		req.flash('error_msg', 'error to load form.');
		res.redirect('admin/posts');
	}

}

export async function postsNew(req, res) {

	let errors = [];

	const title = req.body.title;
	const slug = req.body.slug;
	const description = req.body.description;
	const content = req.body.content;
	const category = req.body.category;

	if (!title || typeof title == undefined || title == null) {
		errors.push({
			text: 'Invalid title',
		});
	}
	if (!slug || typeof slug == undefined || slug == null) {
		errors.push({
			text: 'Invalid slug',
		});
	}
	if (!description || typeof description == undefined || description == null) {
		errors.push({
			text: 'Invalid description',
		});
	}
	if (!content || typeof content == undefined || content == null) {
		errors.push({
			text: 'Invalid content',
		});
	}
	if (category == '0') {
		errors.push({
			text: 'Invalid category',
		});
	}

	if (errors.length == 0) {
		const newPost = {
			title: title,
			slug: slug,
			description: description,
			content: content,
			category: category,
		};

		try {
			await new post(newPost).save();
			req.flash('success_msg', 'successfully created post.');
			res.redirect('/admin/posts');
		} catch {
			req.flash('error_msg', 'error creating post.');
		}
	} else {
		res.render('admin/posts', {
			errors: errors,
		});
	}

}

export async function postsEdit(req, res) {

	try {
		const findOne = await post.findOne({
			_id: req.body.id,
		});
		findOne.title = req.body.title;
		findOne.slug = req.body.slug;
		findOne.description = req.body.description;
		findOne.content = req.body.content;
		findOne.category = req.body.category;
		try {
			findOne.save();
			req.flash('success_msg', 'successfully edited post.');
			res.redirect('/admin/posts');
		} catch {
			req.flash('error_msg', 'error when save post.');
			res.redirect('/admin/posts');
		}

	} catch {
		req.flash('error_msg', 'error when find post.');
		res.redirect('/admin/posts');
	}

}

export async function postsEditId(req, res) {

	try {
		const findOne = await post.findOne({
			_id: req.params.id,
		}).lean();
		try {
			const find = await category.find().lean();
			res.render('admin/postsedit', {
				categories: find,
				post: findOne,
			});
		} catch {
			req.flash('error_msg', 'failed to list categories');
			res.redirect('/admin/posts');
		}
	} catch {
		req.flash('error_msg', 'failed to load form');
		res.redirect('/admin/posts');
	}

}

export async function postsDeleteId(req, res) {

	try {
		await post.findByIdAndDelete(req.params.id);
		req.flash('success_msg', 'successfully deleted post.');
		res.redirect('/admin/posts');
	} catch {
		req.flash('error_msg', 'error deleting post.');
		res.redirect('/admin/posts');
	}

}

// CATEGORIES

export async function categories(req, res) {

	try {
		const categoryFind = await category.find().sort({
			_id: -1,
		}).lean();
		res.render('admin/categories', {
			categories: categoryFind,
		});
	} catch {
		req.flash('error_msg', 'unable to list categories.');
		res.redirect('/admin');
	}

}

export function categoriesAdd(req, res) {

	res.render('admin/categoriesadd');

}

export async function categoriesNew(req, res) {

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
		};
		try {
			await new category(newCategory).save();
			req.flash('success_msg', 'successfully created category.');
			res.redirect('/admin/categories');
		} catch {
			req.flash('error_msg', 'error creating category.');
		}
	} else {
		res.render('admin/categoriesadd', {
			errors: errors,
		});
	}

}

export async function categoriesEdit(req, res) {

	let errors = [];
	const name = req.body.name;
	const slug = req.body.slug;

	if (!name || typeof name == undefined || name == null)
		errors.push({
			text: 'Invalid name',
		});

	if (!slug || typeof slug == undefined || slug == null)
		errors.push({
			text: 'Invalid slug',
		});

	if (errors.length == 0) {
		try {
			const findOne = await category.findOne({
				_id: req.body.id,
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
			errors: errors,
		});
	}

}

export async function categoriesEditId(req, res) {

	try {
		const categoryFindOne = await category.findOne({
			_id: req.params.id,
		}).lean();
		res.render('admin/categoriesedit', {
			category: categoryFindOne,
		});
	} catch {
		req.flash('error_msg', 'this category doesn\'t exist.');
		res.redirect('/admin/categories');
	}

}

export async function categoriesDeleteId(req, res) {

	try {
		await category.findByIdAndDelete(req.params.id);
		req.flash('success_msg', 'successfully deleted category.');
		res.redirect('/admin/categories');
	} catch {
		req.flash('error_msg', 'error deleting category.');
		res.redirect('/admin/categories');
	}

}