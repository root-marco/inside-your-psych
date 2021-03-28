import Post from '../models/Post.js';
import Category from '../models/Category.js';
import Comment from '../models/Comments.js';
import User from '../models/User.js';

export async function root(req, res) {

	try {
		const postFind = await Post.find().sort({
			_id: -1,
		}).populate('category').lean();
		res.render('index', {
			posts: postFind,
		});
	} catch {
		req.flash('error_msg', 'error 404');
		res.redirect('/404');
	}

}

export async function postComment(req, res) {

	let userFindOne;

	try {
		userFindOne = User.findOne({
			_id: req.session.passport.user,
		});
	} catch {
		userFindOne = {
			name: "Anonymous",
		};
	}

	const postComment = {
		content: req.body.content,
		pageSlug: req.params.slug,
		createdBy: userFindOne.name,
	};

	try {
		await new Comment(postComment).save();
		res.redirect(`/post/${req.params.slug}`);
	} catch (error) {
		console.log(error);
		req.flash('error_msg','Error creating comment');
		res.redirect('/');
	}

}

export async function postSlug(req, res) {

	try {
		const postFindOne = await Post.findOne({
			slug: req.params.slug,
		}).lean();

		const commentFind = await Comment.find({
			pageSlug: req.params.slug,
		}).lean();

		if (postFindOne) {
			res.render('post/post', {
				post: postFindOne,
				comments: commentFind,
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
		const categoryFind = await Category.find().lean();
		res.render('category/category', {
			categories: categoryFind,
		});
	} catch {
		req.flash('error_msg', 'cannot find categories.');
		res.redirect('/');
	}

}

export async function categoriesSlug(req, res) {

	try {
		const categoryFindOne = await Category.findOne({
			slug: req.params.slug,
		}).lean();

		if (categoryFindOne) {
			try {
				const find = await Post.find({
					category: categoryFindOne._id,
				}).lean();
				res.render('category/posts', {
					posts: find,
					category: categoryFindOne,
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