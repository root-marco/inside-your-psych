import express from 'express';
import * as admin from '../controllers/admin.js';

const router = express.Router();

router.get('/', admin.root);

router.get('/posts', admin.posts);
router.get('/posts/add', admin.postsAdd);
router.get('/posts/new', admin.postsNew);

router.get('/categories', admin.categories);
router.get('/categories/add', admin.categoriesAdd);
router.get('/categories/edit/:id', admin.categoriesEditId);
router.get('/categories/delete/:id', admin.categoriesDeleteId);
router.post('/categories/new', admin.categoriesNew);
router.post('/categories/edit', admin.categoriesEdit);

export default router;