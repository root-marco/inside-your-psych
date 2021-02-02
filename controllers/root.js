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