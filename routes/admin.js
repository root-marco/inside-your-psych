import express from 'express';
import * as admin from '../controllers/admin.js';

const router = express.Router();

router.get('/', admin.root);

// POSTS
router.get('/posts', admin.posts);
router.get('/posts/add', admin.postsAdd);
router.post('/posts/new', admin.postsNew);
router.post('/posts/edit', admin.categoriesEdit);
router.get('/posts/edit/:id', admin.postsEditId);
router.get('/posts/delete/:id', admin.postsDeleteId);

// CATEGORIES
router.get('/categories', admin.categories);
router.get('/categories/add', admin.categoriesAdd);
router.post('/categories/new', admin.categoriesNew);
router.post('/categories/edit', admin.categoriesEdit);
router.get('/categories/edit/:id', admin.categoriesEditId);
router.get('/categories/delete/:id', admin.categoriesDeleteId);

export default router;