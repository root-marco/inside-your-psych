import express from 'express';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.JSON);

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(port, () => {
	console.log(`server listen on port ${port}`);
});
