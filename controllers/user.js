import user from '../models/User.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';

export const register = (req, res) => {

	res.render('users/register');

};

export const login = async (req, res) => {

	res.render('users/login');

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

		try {

			const findOne = await user.findOne({
				email: req.body.email,
			});

			if (findOne) {
				req.flash('error_msg', 'email already in use');
				res.redirect('/user/register');
			} else {
				const newUser = new user({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
				});

				bcrypt.genSalt(10, (error, salt) => {
					bcrypt.hash(newUser.password, salt, async (error, hash) => {
						if (error) {
							req.flash('error_msg', 'failed to save user');
							res.redirect('/user/register');
						}
						newUser.password = hash;
						try {
							await newUser.save();
							req.flash('success_msg', 'successfully created user');
							res.redirect('/');
						} catch (err) {
							req.flash('error_msg', 'failed to create user');
							console.log(err);
							res.redirect('/user/register');
						}
					});
				});

			}

		} catch {
			req.flash('error_msg', 'internal error');
			res.redirect('/');
		}

	} else {
		res.render('users/register', {
			errors: errors,
		});
	}

};

export const loginNew = async (req, res, next) => {

	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/user/login',
		failureFlash: true,
	})(req, res, next);

};

export const logout = (req, res) => {

	req.logout();
	req.flash('success_msg', 'successfully logout')
	res.redirect('/');

};