import express from 'express';
import * as admin from '../controllers/admin.js';
import isAdmin from '../helpers/isAdmin.js';

const router = express.Router();

router.get('/', isAdmin, admin.admin);

// POSTS
router.get('/posts', isAdmin, admin.posts);
router.get('/posts/add', isAdmin, admin.postsAdd);

router.post('/posts/new', isAdmin, admin.postsNew);
router.post('/posts/edit', isAdmin, admin.postsEdit);

router.get('/posts/edit/:id', isAdmin, admin.postsEditId);
router.delete('/posts/delete/:id', isAdmin, admin.postsDeleteId);

// CATEGORIES
router.get('/categories', isAdmin, admin.categories);
router.get('/categories/add', isAdmin, admin.categoriesAdd);

router.post('/categories/new', isAdmin, admin.categoriesNew);
router.post('/categories/edit', isAdmin, admin.categoriesEdit);

router.get('/categories/edit/:id', isAdmin, admin.categoriesEditId);
router.delete('/categories/delete/:id', isAdmin, admin.categoriesDeleteId);

export default router;