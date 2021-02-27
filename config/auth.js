import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';

import User from '../models/User.js';

const localStrategy = passportLocal.Strategy;

export default passport => {

	passport.use(new localStrategy({
		usernameField: 'email',
	}, async (email, password, done) => {
		const findOne = await User.findOne({
			email: email,
		});
		if (!findOne) return done(null, false, {
			message: 'this account doesn\'t exist',
		});

		bcrypt.compare(password, findOne.password, (error, match) => {
			if (match) return done(null, findOne);
			else return done(null, false, {
				message: 'Incorrect password',
			});
		});

	}));

	passport.serializeUser((user, done) => {

		done(null, user.id);

	});

	passport.deserializeUser(async (id, done) => {

		await User.findById(id, (error, user) => {
			done(error, user);
		});

	});

}