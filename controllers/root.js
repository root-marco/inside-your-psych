import post from '../models/Post.js';

export const root = async (req, res) => {

	try {
		const find = await post.find().sort({
			_id: -1,
		}).populate('category').lean();
		res.render('index', {
			posts: find,
		});
	} catch {
		req.flash('error_msg', 'error 404');
		res.redirect('/404');
	}

};

export const error404 = (req, res) => {
	res.send('<h1>ERROR 404</h1>');
};

export const postSlug = async (req, res) => {

	try {
		const findOne = await post.findOne({
			slug: req.params.slug,
		}).lean();

		if (findOne) {
			res.render('post/post', {
				post: findOne,
			});
		} else {
			req.flash('error_msg', 'this post doesn\`t exist');
			res.redirect('/');
		}

	} catch {
		req.flash('error_msg', 'there was an internal error.');
		res.redirect('/');
	}

};