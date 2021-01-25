/* MODULES */
import express from 'express';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';

import adminRouter from './routes/admin.js';

const app = express();
const port = 3000;

// SESSION
app.use(session({
	secret: '0152',
	resave: true,
	saveUninitialized: true,
}));
app.use(flash());

// MIDDLEWARE
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_mgs = req.flash('error_msg');
	next();
});

// BODY PARSER
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// HANDLEBARS
app.engine('handlebars', handlebars({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// PUBLIC
app.use(express.static(path.resolve('public')));

// MONGOOSE
const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/inside-your-psych', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
db.on('open', () => console.log('database connected'));
db.on('error', console.error.bind(console, 'connection error'));

// ROUTES
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
	res.send('<a href="/admin">admin</a>')
});

app.listen(port, () => console.log(`server running`));