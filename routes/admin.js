import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.render('admin/index');
});

router.get('/posts', (req, res) => {
	res.send('<h1>Posts page</h1>');
});

router.get('/categories', (req, res) => {
	res.send('<h1>Categories page</h1>');
});

export default router;