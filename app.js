/* MODULES */
import express from 'express';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';
/* ----- */

const app = express();
const port = 3000;
const db = mongoose.connection;

/* CONFIGS */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/inside-your-psych', { useNewUrlParser: true, useUnifiedTopology: true });
db.on('open', () => console.log('database connected'));
db.on('error', console.error.bind(console, 'connection error'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.resolve('public')));
/* ----- */

/* ROUTES */
app.use('/admin', adminRouter);
/* ----- */

app.listen(port, () => console.log(`server running`));