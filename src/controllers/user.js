import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';

export async function register(req, res) {

	res.render('users/register');

}

export async function login(req, res) {

	res.render('users/login');

}

export async function registerNew(req, res, next) {

	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;

	let errors = [];

	if (!name || typeof name === undefined) {
		errors.push({ text: 'invalid name' });
	}
	if (!email || typeof email === undefined) {
		errors.push({ text: 'invalid email' });
	}
	if (!password || typeof password === undefined) {
		errors.push({ text: 'invalid password' });
	}
	if (password !== password2) {
		errors.push({text: 'passwords are different from each other' });
	}

	if (errors.length === 0) {

		try {
			const userFindOne = await User.findOne({
				email: req.body.email,
			});

			if (userFindOne) {
				req.flash('error_msg', 'email already in use');
				res.redirect('/user/register');
			} else {
				const newUser = new User({
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
							passport.authenticate('local', {
								successRedirect: '/',
								failureRedirect: '/user/login',
								failureFlash: true,
							})(req, res, next);
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

}

export async function loginNew(req, res, next) {

	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/user/login',
		failureFlash: true,
	})(req, res, next);

}

export async function logout(req, res) {

	req.logout();
	req.flash('success_msg', 'successfully logout');
	res.redirect('/');

}
