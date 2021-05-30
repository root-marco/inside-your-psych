import express from "express";
import * as root from "../controllers/root.js";

const router = express.Router();

router.get("/", root.root);
router.get("/post/:slug", root.postSlug);
router.get("/categories", root.categories);
router.get("/categories/:slug", root.categoriesSlug);
router.get("/404", root.error404);

// COMMENTS
router.post("/post/:slug/newComment", root.postComment);

export default router;