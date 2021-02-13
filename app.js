import express from 'express';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
dotenv.config();

import adminRouter from './routes/admin.js';
import rootRouter from './routes/root.js';
import userRouter from './routes/user.js';

import configAuth from './config/auth.js';
import passport from 'passport';
configAuth(passport);

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
	secret: '0152',
	resave: true,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars({
	defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.resolve('public')));

try {
	await mongoose.connect(process.env.mongoURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	console.log('database connected');
} catch(error) {
	console.log(error);
}

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/', rootRouter);

app.listen(port, () => console.log(`server running`));