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

export const error404 = async (req, res) => {
	res.send('<h1>ERROR 404</h1>');
};