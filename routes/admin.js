import express from 'express';
import * as admin from '../controllers/admin.js';

const router = express.Router();

router.get('/', admin.root);
router.get('/posts', admin.posts);
router.get('/categories', admin.categories);
router.get('/categories/add', admin.categoriesAdd);
router.get('/categories/edit/:id', admin.categoriesEdit);

router.post('/categories/new', admin.categoriesNew);

export default router;
