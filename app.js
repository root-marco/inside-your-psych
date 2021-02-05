import express from 'express';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';

import adminRouter from './routes/admin.js';
import rootRouter from './routes/root.js';
import userRouter from './routes/user.js';

const app = express();
const port = 3000;

app.use(session({
	secret: '0152',
	resave: true,
	saveUninitialized: true,
}));
app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
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
	await mongoose.connect('mongodb://localhost:27017/inside-your-psych', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	console.log('database connected');
} catch(error) {
	handleError(error);
}

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/', rootRouter);

app.listen(port, () => console.log(`server running`));