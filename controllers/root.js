import Post from '../models/Post.js';
import Category from '../models/Category.js';
import Comment from '../models/Comments.js';

export async function root(req, res) {

	try {
		const find = await Post.find().sort({
			_id: -1,
		}).populate('category').lean();
		res.render('index', {
			posts: find,
		});
	} catch {
		req.flash('error_msg', 'error 404');
		res.redirect('/404');
	}

}

export async function postComment(req, res) {

	const content = req.body.content;

	const pageSlug = Post.findOne({
		slug: req.params.slug,
	});

	const postComment = {
		content: content,
		pageSlug: req.params.slug,
		createdBy: 'Gab/Marc',
	};

	try {
		await new Comment(postComment).save();
		res.redirect(`/post/${req.params.slug}`);
	}
	catch {
		req.flash('error_msg','Error creating comment');
		res.redirect('/');
	}

};

export async function postSlug(req, res) {

	const slug = req.params.slug;
	
	try {
		const findOne = await Post.findOne({
			slug: slug,
		}).lean();

		const comments = await Comment.find({
			pageSlug: slug,
		}).lean();

		if (findOne) {
			res.render('post/post', {
				post: findOne,
				comments: comments,
			});
		} else {
			req.flash('error_msg', 'this post doesn\`t exist');
			res.redirect('/');
		}

	} catch {
		req.flash('error_msg', 'there was an internal error.');
		res.redirect('/');
	}

}

export async function categories(req, res) {

	try {
		const find = await Category.find().lean();
		res.render('category/category', {
			categories: find,
		});
	} catch {
		req.flash('error_msg', 'cannot find categories.');
		res.redirect('/');
	}

}

export async function categoriesSlug(req, res) {

	try {
		const findOne = await Category.findOne({
			slug: req.params.slug,
		}).lean();

		if (findOne) {
			try {
				const find = await Post.find({
					category: findOne._id,
				}).lean();
				res.render('category/posts', {
					posts: find,
					category: findOne,
				});
			} catch {
				req.flash('error_msg', 'error to load posts');
				res.redirect('/categories');
			}
		} else {
			req.flash('error_msg', 'this category doesn\'t exist.');
			res.redirect('/categories');
		}

	} catch {
		req.flash('error_msg', 'cannot find category.');
		res.redirect('/categories');
	}

}

export function error404(req, res) {

	res.send('<h1>ERROR 404</h1>');

}