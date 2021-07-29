import express from "express";

import * as adminPosts from "../controllers/adminPosts.js";
import * as adminCategories from "../controllers/adminCategories.js";
import * as admin from "../controllers/admin.js";
import isAdmin from "../helpers/isAdmin.js";

const router = express.Router();

router.get("/", isAdmin, admin.admin);

// POSTS
router.get("/posts", isAdmin, adminPosts.posts);
router.get("/posts/add", isAdmin, adminPosts.postsAdd);

router.post("/posts/new", isAdmin, adminPosts.postsNew);
router.post("/posts/edit", isAdmin, adminPosts.postsEdit);

router.get("/posts/edit/:id", isAdmin, adminPosts.postsEditId);
router.delete("/posts/delete/:id", isAdmin, adminPosts.postsDeleteId);

// CATEGORIES
router.get("/categories", isAdmin, adminCategories.categories);
router.get("/categories/add", isAdmin, adminCategories.categoriesAdd);

router.post("/categories/new", isAdmin, adminCategories.categoriesNew);
router.post("/categories/edit", isAdmin, adminCategories.categoriesEdit);

router.get("/categories/edit/:id", isAdmin, adminCategories.categoriesEditId);
router.delete("/categories/delete/:id", isAdmin, adminCategories.categoriesDeleteId);

export default router;