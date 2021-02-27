// MODULES
import dotenv from 'dotenv'; dotenv.config();
import handlebars from 'express-handlebars';
import session from 'express-session';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import mongoose from 'mongoose';
import passport from 'passport';
import express from 'express';
import path from 'path';

// APP
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.resolve('public')));

// SESSION
app.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
}));

// PASSPORT
import configAuth from './config/auth.js';
app.use(passport.initialize());
app.use(passport.session());
configAuth(passport);

// FLASH
app.use(flash());
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// BODY PARSER
app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json());

// HANDLEBARS
app.engine('handlebars', handlebars({
	defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// ROUTES
import rootRouter from './routes/root.js';
app.use('/', rootRouter);
import adminRouter from './routes/admin.js';
app.use('/admin', adminRouter);
import userRouter from './routes/user.js';
app.use('/user', userRouter);

// MONGOOSE
try {
	await mongoose.connect(process.env.MONGOURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	console.log('database connected');
} catch (error) {
	console.log(error);
}

// LISTEN
app.listen(PORT, () => {
	console.log(`server running on localhost:${PORT}`);
});