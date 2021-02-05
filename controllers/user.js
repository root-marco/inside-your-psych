import user from '../models/User.js';

export const register = (req, res) => {

	res.render('users/register');

};

export const registerNew = async (req, res) => {

	let errors = [];
	
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;

	if (!name || typeof name == undefined || name == null) {
		errors.push({
			text: 'Invalid name',
		});
	}
	if (!email || typeof email == undefined || email == null) {
		errors.push({
			text: 'Invalid email',
		});
	}
	if (!password || typeof password == undefined || password == null) {
		errors.push({
			text: 'Invalid password',
		});
	}
	if (password != password2) {
		errors.push({
			text: 'passwords are different from each other',
		});
	}

	if (errors.length == 0) {

	} else {
		res.render('users/register', {
			errors: errors,
		});
	}

};