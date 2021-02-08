import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import user from '../models/User.js';

import passportLocal from 'passport-local';
const localStrategy = passportLocal.Strategy;

export default passport => {

	passport.use(new localStrategy({
		usernameField: 'email',
	}, async (email, password, done) => {
		try {
			const findOne = await user.findOne({
				email: email,
			});
			if (!user) return done(null, false, {
				message: 'this account doesn\'t exist',
			});

			bcrypt.compare(password, user.password, (error, match) => {
				if (match) return done(null, user);
				else return done(null, false, {
					message: 'Incorrect password',
				});
			});

		} catch {

		}
	}));

	passport.serializeUser((user, done) => {

		done(null, user.id);
		
	});

	passport.deserializeUser(async (id, done) => {

		await user.findById(id, (error, user) => {
			done(error, user);
		});

	});

}