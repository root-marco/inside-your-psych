import category from '../models/Category.js';
import post from '../models/Post.js';

export const root = async (req, res) => {

	res.render('admin/index');

};

// POSTS

export const posts = async (req, res) => {

	try {
		const postFind = await post.find().sort({
			_id: -1,
		}).populate('category').lean();
		res.render('admin/posts', {
			posts: postFind,
		});
	} catch {
		req.flash('error_msg', 'unable to list posts.');
		res.redirect('/posts');
	}


};

export const postsAdd = async (req, res) => {

	try {
		const categoryFind = await category.find().lean();
		res.render('admin/postsadd', {
			categories: categoryFind,
		});
	} catch {
		req.flash('error_msg', 'error to load form.');
		res.redirect('admin/posts');
	}

};

export const postsNew = async (req, res) => {

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
		}

		try {
			await new post(newPost).save();
			req.flash('success_msg', 'successfully created post.');
			res.redirect('/admin/posts');
		} catch {
			req.flash('error_msg', 'error creating post.');
		}
	} else {
		res.render('admin/postsadd', {
			errors: errors,
		});
	}

	console.log(category)

};

export const postsEdit = async (req, res) => {

};

export const postsEditId = async (req, res) => {
	res.render('admin/postsedit');
};

export const postsDeleteId = async (req, res) => {

	try {
		await post.deleteOne({
			_id: req.params.id,
		});
		req.flash('success_msg', 'successfully deleted post.');
		res.redirect('/admin/posts');
	} catch {
		req.flash('error_msg', 'error deleting post.');
		res.redirect('/admin/posts');
	}

};

// CATEGORIES

export const categories = async (req, res) => {

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

};

export const categoriesEdit = async (req, res) => {

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

};

export const categoriesEditId = async (req, res) => {

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

};

export const categoriesDeleteId = async (req, res) => {

	try {
		await category.deleteOne({
			_id: req.params.id,
		});
		req.flash('success_msg', 'successfully deleted category.');
		res.redirect('/admin/categories');
	} catch {
		req.flash('error_msg', 'error deleting category.');
		res.redirect('/admin/categories');
	}

};